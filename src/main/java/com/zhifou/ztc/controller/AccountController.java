package com.zhifou.ztc.controller;


import com.zhifou.ztc.pojo.User;
import com.zhifou.ztc.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@RequestMapping(value = "/user")
@Controller
public class AccountController {

    @Autowired
    HttpSession httpSession;
    @Autowired
    UserServiceImpl userServiceImpl;



    //更新账号密码
    @RequestMapping(value = "updatePwd.action",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> UpdatePwd(@RequestParam("rePwd") String rePwd, @RequestParam("Pwd") String Pwd){
        User user1 =(User) httpSession.getAttribute("user");
        User user=new User(user1.getUserName(), Pwd);
        User newUser = new User(user1.getUserName(), rePwd);

        Boolean flag = userServiceImpl.updatePwd(user,newUser);
        HashMap<String, Object> map = new HashMap<>();
        if(flag)
        {
            map.put("success",true);
        }
        else
            map.put("success",false);
        return map;
    }

    @RequestMapping(value = "deleteUser.action",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> deleteUser(){
        User user =(User) httpSession.getAttribute("user");
        Boolean flag = userServiceImpl.delete(user);
        HashMap<String, Object> map = new HashMap<>();
        if(flag)
        {
            map.put("success",true);
        }
        else
            map.put("success",false);
        return map;
    }
}
