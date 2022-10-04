package com.zhifou.ztc.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.google.gson.Gson;
import com.jayway.jsonpath.JsonPath;
import com.zhifou.ztc.dao.elasticSerach.TopicESImp;
import com.zhifou.ztc.pojo.*;
import com.zhifou.ztc.service.*;
import com.zhifou.ztc.utils.OCRUtil;
import com.zhifou.ztc.utils.webapi.百度文字识别.testApi.TextRecognitionUtil;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.*;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
public class TopicController {
    @Autowired
    TopicService topicService;
    @Autowired
    AnswerService answerService;
    @Autowired
    NoAnswerTopicService noAnswerTopicService;
    @Autowired
    SearchService searchService;
    @Autowired
    TestService testService;
    @Autowired
    UserService userService;




    @RequestMapping("/findTopicByTextServlet")
    @ResponseBody
    public HashMap<String, Object> findTopicByText(String text, HttpServletRequest request) throws IOException {
        HashMap<String, Object> map = new HashMap<>();
        TopicESImp topicESImp = new TopicESImp();
        List<Topic> list = null;
        list = topicESImp.Search(text);
//        list = topicService.getAllTopic();
        System.out.println(list);
        List<Test> testList = testService.getTestByTopic(list);
        System.out.println(testList);
        List<Topic> recommend = topicService.getSimilarTopics(list);
        //隐藏答案
        for(Topic t : list){
            t.setTopicAnswer("");
            t.setTopicExplain("");
        }
        User user = (User) request.getSession().getAttribute("user");
        if(user!=null){
            Search search = new Search();
            search.setImage("");
            search.setUserId(user.getUserId());
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("YYYY-MM-DD");

            search.setTime(new Timestamp(new Date().getTime()));
            search.setTitle(text);
            searchService.insertSearch(search);
        }


        map.put("success","ok");
        map.put("topics",list);
        map.put("tests",testList);
        map.put("recommends",recommend);
        return map;
    }

    @RequestMapping("/deleteTopicServlet.servlet")
    @ResponseBody
    public HashMap<String, Object> deleteTopic(int topicId){
        Topic topic = new Topic(topicId);
        Boolean aBoolean = topicService.deleteTopic(topic);
        HashMap<String, Object> map = new HashMap<>();
        if (aBoolean) map.put("success","ok");
        else map.put("success","false");
        return map;
    }

    @RequestMapping("/readFileServlet.Servlet")
    @ResponseBody
    public HashMap<String, Object> readFile(MultipartFile file, HttpSession session) throws IOException {
        WebApplicationContext webApplicationContext = ContextLoader.getCurrentWebApplicationContext();
        ServletContext servletContext = webApplicationContext.getServletContext();

        String key="";
        HashMap<String, Object> map = new HashMap<>();
        if(file==null){
            map.put("success",false);
        }else {
            map.put("success", true);

            key = OCRUtil.readText(file.getInputStream());
            key = key.replaceAll("\\\\","");
            key = key.replaceAll("[{}]","");
            System.out.println("\n\n\n"+key+"\n\n\n");

            User user = (User) session.getAttribute("user");
            if (user != null) {
                // 5.存储文件
                String realPath = servletContext.getRealPath("/public/findImage");
                UUID uuid = UUID.randomUUID();
                String filePath = realPath + "/" + uuid + "-" + file.getOriginalFilename();
                InputStream is = file.getInputStream();
                File file1 = new File(filePath);
                if (!file1.exists()) {
                    file1.createNewFile();
                }
                OutputStream os = new FileOutputStream(file1);
                IOUtils.copy(is, os);
                IOUtils.closeQuietly(is);
                IOUtils.closeQuietly(os);


                String webPath = "/public/findImage" + "/" + uuid + "-" + file.getOriginalFilename();
                Search searchDomain = new Search(user.getUserId(), webPath, new Timestamp(new Date().getTime()), key);
                searchService.insertSearch(searchDomain);
                System.out.println(searchDomain);
            }
        }
        map.put("key", key);
        return map;
    }

    @RequestMapping("/addAnswerServlet")
    @ResponseBody
    public HashMap<String, Object> addAnswer(MultipartFile[] files, int topicId, String answer, HttpSession session) throws IOException {
        WebApplicationContext webApplicationContext = ContextLoader.getCurrentWebApplicationContext();
        ServletContext servletContext = webApplicationContext.getServletContext();

        User user = (User) session.getAttribute("user");
        HashMap<String, Object> map = new HashMap<>();
        List<String> images = new ArrayList<>();
        if(user!=null){

            boolean b1 = false;
            try {
                b1 = userService.addUserAsset(user,2);
            } catch (Exception e) {
                map.put("getAsset",false);
            }
            map.put("getAsset",b1);
            if(b1){
                session.setAttribute("user",userService.getUser(user));
            }


            for (int i=0;i<files.length;i++){


                String realPath = servletContext.getRealPath("/public/noAnswerTopicImage");
                System.out.println(realPath);
                UUID uuid = UUID.randomUUID();
                String filePath = realPath+"/"+uuid+"-"+files[i].getOriginalFilename();
                InputStream is=files[i].getInputStream();
                File file1=new File(filePath);
                if(!file1.exists()){
                    file1.createNewFile();
                }
                OutputStream os=new FileOutputStream(file1);
                IOUtils.copy(is, os);
                IOUtils.closeQuietly(is);
                IOUtils.closeQuietly(os);

                String webPath = "/public/noAnswerTopicImage" + "/" + uuid + "-" + files[i].getOriginalFilename();
                // 这里需要存储noANs题目
                String image = webPath;
                images.add(image);
            }
            Answer answerDomain = new Answer(answer, new Gson().toJson(images), user.getUserId(), topicId);
            boolean b = answerService.addAnswer(answerDomain);
            noAnswerTopicService.addAnswerCount(topicId);
            map.put("success",b);
            if(!b){
                map.put("message","系统错误,请稍后重试");
            }
        }
        else {
            map.put("success",false);
            map.put("message","用户信息错误,请刷新重试...");
        }
        return map;
    }

    @RequestMapping("/removeNoAnswerTopicServlet")
    @ResponseBody
    public HashMap<String, Object> removeNoAnswerTopic(int topicId){
        boolean b = noAnswerTopicService.removeTopic(topicId);
        HashMap<String, Object> map = new HashMap<>();
        map.put("success",b);
        return map;
    }

    @RequestMapping("/checkTopicServlet.servlet")
    @ResponseBody
    public HashMap<String, Object> checkTopic(){
        List<Topic> allTopic = topicService.getAllTopic();
        HashMap<String, Object> map = new HashMap<>();
        map.put("success","ok");
        map.put("topics",allTopic);
        return map;
    }

    @RequestMapping("/getAnswerOfNoTopicServlet")
    @ResponseBody
    public List<Answer> getAnswerOfNoTopic(int topicId){
        List<Answer> answers = answerService.getAnswers(topicId);
        return answers;
    }

    @RequestMapping("/getRandNoAnswerTopicServlet")
    @ResponseBody
    public List<NoTopic> getRandNoAnswerTopic(@RequestParam(value = "type",required = false,defaultValue = "") String type,
                                              @RequestParam(value = "subject",required = false,defaultValue = "") String subject,
                                              HttpSession session){
        System.out.println(type+"-------------------------");
        User user = (User) session.getAttribute("user");
        List<NoTopic> noAnswerTopicByType = noAnswerTopicService.getNoAnswerTopicByType(type,user.getUserId());
        return noAnswerTopicByType;
    }

    @RequestMapping("/updateTopicServlet.servlet")
    @ResponseBody
    public HashMap<String, Object> updateTopic(int topicId,String topicTitle, String topicType, String topicOptions,
            String topicAnswer, String topicExplain, String topicSource, String[] imgs,
                                               int state, String label){

        Topic topic = new Topic(topicId,topicTitle,topicType, topicOptions,
                topicAnswer,topicExplain,0,0,
                topicSource,1,label, new ArrayList<String>(Arrays.asList(imgs)).toString(),state);
        Boolean aBoolean = topicService.updateTopic(topic);
        HashMap<String, Object> map = new HashMap<>();
        if (aBoolean) map.put("success","ok");
        else map.put("success","false");
        return map;

    }
    @RequestMapping("/uploadNoAnswerTopicServlet")
    @ResponseBody
    public HashMap<String, Object> uploadNoAnswerTopic(@RequestParam(value = "texts[]", required = false,defaultValue = "[]") String[] texts,
                                                       @RequestParam("htmls[]") String[] htmls,
                                                       @RequestParam("type") String type,
                                                       @RequestParam("subjectName") String subject,
                                                       @RequestParam(value = "topicId", defaultValue = "-1") int topicId,
                                                       HttpSession session) throws IOException {

        HashMap<String, Object> map = new HashMap<>();
        map.put("texts",texts);
        System.out.println(texts.length);
        map.put("htmls",htmls);
        map.put("type",type);
        map.put("subject",subject);
        NoTopic noTopic = new NoTopic();
        noTopic.setTopicId(topicId);
        noTopic.setType(type);
        User user = (User) session.getAttribute("user");
        noTopic.setUserId(user.getUserId());
        List<String> textList = new ArrayList<>();
        for(int i=1;i<texts.length;i++){
            textList.add(texts[i]);
        }
        noTopic.setTopicTitle(texts[0]);
        noTopic.setOptions(new Gson().toJson(textList));
        noTopic.setTopicImage("");

        boolean b = noAnswerTopicService.addNoAnswerTopic(noTopic);
        map.put("success",b);


        /*WebApplicationContext webApplicationContext = ContextLoader.getCurrentWebApplicationContext();
        ServletContext servletContext = webApplicationContext.getServletContext();
        Gson gson = new Gson();
        User user = (User) session.getAttribute("user");
        if(user!=null){
            // 5.存储文件
            String realPath = servletContext.getRealPath("/public/noAnswerTopicImage");
            UUID uuid = UUID.randomUUID();
            String filePath = realPath+"/"+uuid+"-"+file.getName();


            InputStream is=file.getInputStream();
            File file1=new File(filePath);
            if(!file1.exists()){
                file1.createNewFile();
            }
            OutputStream os=new FileOutputStream(file1);
            IOUtils.copy(is, os);
            IOUtils.closeQuietly(is);
            IOUtils.closeQuietly(os);


            String webPath = "/public/noAnswerTopicImage" + "/" + uuid + "-" + file.getName();
            // 这里需要存储noANs题目
            image = webPath;


            if(topicId==0){
                System.out.println("insert");
                NoTopic noAnswerTopic = new NoTopic(title, image, user.getUserId(),type, gson.toJson(options));
                noAnswerTopicService.addNoAnswerTopic(noAnswerTopic);
            }else {
                NoTopic noAnswerTopic = new NoTopic(topicId,title, image, user.getUserId(),type, gson.toJson(options));
                System.out.println(options);
                boolean b = noAnswerTopicService.updateNoAnswerTopic(noAnswerTopic);
            }
            map.put("success",true);
        }
        else {
            map.put("success",false);
        }*/
        return map;
    }


    @RequestMapping("/readAnswerServlet")
    @ResponseBody
    public HashMap<String, Object> readAnswer(int topicId,HttpSession session){
        List<Topic> topics = topicService.readTopic(topicId);
        User user = (User) session.getAttribute("user");

        boolean b = userService.delUserAsset(user,2);
        if(b) {
            user = userService.getUser(user);
            session.setAttribute("user", user);
        }
        HashMap<String, Object> map = new HashMap<>();
        map.put("success",b);
        map.put("message","您今日免费次数与金币不足");
        map.put("topicList",topics);
        return map;
    }

    @RequestMapping("/selectBGQuesServlet")
    @ResponseBody
    public HashMap<String, Object> selectBGQues(@RequestParam(value = "pn",  defaultValue = "1") Integer pn) {
        int page = pn;
        int pageSize = 15;
        PageHelper.startPage(page, pageSize);
        List<Topic> list = topicService.getQueForBG();
        PageInfo<Topic> pageInfo = new PageInfo<Topic>(list);
        HashMap<String, Object> map = new HashMap<>();
        map.put("page", pageInfo);
        return map;
    }

    @RequestMapping("/removeAnswerServlet")
    @ResponseBody
    public HashMap<String,Object> removeAnswer(int answerId){
        HashMap<String, Object> map = new HashMap<>();
        boolean b = answerService.deleteAnswer(answerId);
        map.put("success",b);
        return map;
    }

    @RequestMapping("/confirmAnswerServlet")
    @ResponseBody
    public HashMap<String,Object> confirmAnswerServlet(int answerId, HttpSession session){
        HashMap<String, Object> map = new HashMap<>();
        boolean b = answerService.confirmAnswer(answerId);
        User user = (User) session.getAttribute("user");
        System.out.println("zhouxv");
        session.setAttribute("user",userService.getUser(user));
        map.put("success",b);
        return map;
    }

    @RequestMapping("/queryByQueIdServlet")
    @ResponseBody
    public HashMap<String,Object> queryByQueId(@RequestParam("paperList[]") String[] paperList){
        List<Topic> queList=new ArrayList<>();
        for(String str:paperList){
            queList.add(topicService.onlyOneQue(Integer.parseInt(str)));
        }
        HashMap<String, Object> map = new HashMap<>();
        map.put("queList",queList);
        return map;
    }

    @RequestMapping("/insertTopicServlet")
    @ResponseBody
    public HashMap<String,Object> insertTopic(@RequestParam("topicTitle") String topicTitle,@RequestParam("topicType") String topicType,
                                              @RequestParam("topicOption") String topicOption,@RequestParam("topicAnswer") String topicAnswer,
                                              @RequestParam("topicExplain") String topicExplain)
    {
        Calendar calendar = Calendar.getInstance();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String uploadDate=formatter.format(calendar.getTime());
        topicService.insertTopic(topicTitle,topicType,topicOption,topicAnswer,topicExplain,uploadDate);
        String queId=topicService.selectTopicByTitleAndDate(topicTitle,uploadDate);
        HashMap<String, Object> map = new HashMap<>();
        map.put("queId",queId);
        return map;
    }
    @RequestMapping("/updateTopicStateServlet")
    @ResponseBody
    public boolean updateTopicState(@RequestParam("state") String state,@RequestParam("topicId") String topicId){
        return topicService.updateTopicState(state,topicId);
    }

    @RequestMapping("/clearAnswerCounter")
    @ResponseBody
    public boolean clearAnswerCounter(@RequestParam("topicId") int topicId){
        boolean b = noAnswerTopicService.clearAnswerCounter(topicId);
        return b;
    }
}
