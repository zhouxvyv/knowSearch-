package com.zhifou.ztc.controller;

import com.google.gson.Gson;
import com.zhifou.ztc.pojo.User;
import com.zhifou.ztc.pojo.NoTopic;
import com.zhifou.ztc.service.NoAnswerTopicService;
import com.zhifou.ztc.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class UserMessageController {

    @Autowired
    HttpSession httpSession;
    @Autowired
    UserService userService;
    @Autowired
    NoAnswerTopicService noAnswerTopicService;



    @RequestMapping(value = "/acquire.action")
    @ResponseBody
    public Map<String, Object> userShow(){
        User user= (User)httpSession.getAttribute("user");
        List<User> list = userService.Search(user);
        System.out.println(list);
        HashMap<String, Object> map = new HashMap<>();
        if(list!=null)
        {
            map.put("success",true);
            map.put("list",list);
        }
        else
            map.put("success",false);
        return map;
    }

    @RequestMapping(value = "/updateUser.action")
    @ResponseBody
    public Map<String, Object> updateUser(@RequestParam("name") String name, @RequestParam("birthday") String birthday, @RequestParam("grade") String grade, @RequestParam("hometown") String hometown, @RequestParam("setting") String setting){
        User userDomain= (User)httpSession.getAttribute("user");
        userDomain.setUserName(name);
        userDomain.setBirthday(birthday);
        userDomain.setGrade(grade);
        userDomain.setHometown(hometown);
        userDomain.setSetting(setting);
        Boolean flag = userService.update(userDomain);
        Map<String, Object> map = new HashMap<>();
        if(flag)
        {
            map.put("success",true);
        }
        else
        {
            map.put("success",false);
        }
        return map;
    }

    @RequestMapping(value="/getUserServlet.Servlet")
    @ResponseBody
    public HashMap<String, Object> getUser(){

        HashMap<String, Object> map = new HashMap<>();
        User user = (User) httpSession.getAttribute("user");
        if(user!=null){
            map.put("user", user);
            map.put("success", true);
        }
        else {
            map.put("success",false);
        }
        return map;
    }

    @RequestMapping(value="/getMyNoAnswerServlet")
    @ResponseBody
    public HashMap<String, Object> getMyNoAnswer(){
        User user = (User) httpSession.getAttribute("user");
        HashMap<String, Object> map = new HashMap<>();
        Gson gson = new Gson();
        if(user!=null){
            List<NoTopic> noAnswerTopic = noAnswerTopicService.getNoAnswerTopic(user.getUserId());
            map.put("list",noAnswerTopic);
        }
        return map;
    }
}
