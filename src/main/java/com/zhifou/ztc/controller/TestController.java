package com.zhifou.ztc.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.zhifou.ztc.dao.elasticSerach.TopicESImp;
import com.zhifou.ztc.pojo.Topic;
import com.zhifou.ztc.pojo.User;
import com.zhifou.ztc.pojo.Test;
import com.zhifou.ztc.service.TestService;
import com.zhifou.ztc.service.TopicService;
import org.elasticsearch.http.HttpRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
public class TestController {

    @Autowired
    TestService testService;
    @Autowired
    TopicService topicService;

    @RequestMapping("/getExamTopicList")
    @ResponseBody
    public HashMap<String,Object> getExamTopicList(int testId){
        List<Topic> topics = testService.getTestTopicList(testId);
        HashMap<String, Object> map = new HashMap<>();
        map.put("queList",topics);
        map.put("result",true);
        map.put("amount",topics.size());
        return map;
    }


    @RequestMapping("/getTestPaperServlet.servlet")
    @ResponseBody
    public HashMap<String,Object> getTestPaper(@RequestParam("text") String text, @RequestParam(value = "pageIndex",required = false,defaultValue = "1") int pageIndex, @RequestParam(value = "pageSize",required = false,defaultValue = "10") int pageSize, HttpServletRequest request) throws IOException {
        List<Test> test = null;
        System.out.println(text);
        System.out.println(pageIndex+"--"+pageSize);

        TopicESImp topicESImp = new TopicESImp();
        List<Topic> topicByText = null;
        try {
            topicByText = topicESImp.Search(text);
        } catch (Exception e) {
            System.out.println("Exception-------当前搜索引擎不存在-----------改用默认数据");
            topicByText = topicService.getAllTopic();
        }
        test = testService.getTest(text,topicByText);

        ArrayList<Test> tests = new ArrayList<>();
        for(int i = (pageIndex-1)*pageSize;i<pageIndex*pageSize&&i<test.size();i++){
            tests.add(test.get(i));
        }


        HashMap<String, Object> map = new HashMap<>();
        map.put("testList",tests);
        map.put("testCount",test.size());
        map.put("topics",topicByText);
        map.put("success",false);
        return map;
    }

    @RequestMapping("/getLikeTestServlet")
    @ResponseBody
    public HashMap<String, Object> getLikeTest(HttpSession session){
        User user = (User) session.getAttribute("user");
        List<Test> likeTest=new ArrayList<>();
        if(user!=null)
            likeTest = testService.getLikeTest(user.getUserId());

        HashMap<String, Object> map = new HashMap<>();
        map.put("testIdList",likeTest);
        map.put("success",true);
        return map;
    }

    @RequestMapping("/turnLikeServlet")
    @ResponseBody
    public HashMap<String, Object> turnLike(int testId, HttpSession session){
        User user = (User) session.getAttribute("user");
        boolean b = testService.addLikeTest(user.getUserId(), testId);
        HashMap<String, Object> map = new HashMap<>();
        map.put("success", true);
        if(b){
            map.put("message","已收藏");
        } else{
            map.put("message","收藏");
        }
        return map;
    }

    @RequestMapping("/insertPaperServlet")
    @ResponseBody
    public String insertPaper( @RequestParam("paperList[]") String[] paperList,@RequestParam("paperName") String paperName){
        Calendar calendar = Calendar.getInstance();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String date=formatter.format(calendar.getTime());
        System.out.println(testService.insertOnePaper(paperName,date));
        System.out.println(testService.selectByNameAndDate(paperName,date));
        String paperId=(String) testService.selectByNameAndDate(paperName,date);
        int cnt=1;
        for(String str:paperList){
            System.out.println(str);
            testService.isnertQueToPaper(paperId,str,cnt);
            cnt++;
        }
        return paperId;
    }

    @RequestMapping("/selectPaperlistServlet")
    @ResponseBody
    public HashMap<String,Object> selectPapers(@RequestParam("pn") int pn){
        int page=pn;
        int pageSize=15;
        PageHelper.startPage(page, pageSize);
        List<Test> list=testService.selectTest();
        PageInfo<Test> pageInfo = new PageInfo<Test>(list);
        HashMap<String, Object> map = new HashMap<>();
        map.put("page", pageInfo);
        return map;
    }

    @RequestMapping("/updatePaperStateServlet")
    @ResponseBody
    public boolean updatePaperState(@RequestParam("state") String state,@RequestParam("testId") String testId){
        return testService.updateTestState(state,testId);
    }
}
