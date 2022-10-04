package com.zhifou.ztc.controller;

import com.zhifou.ztc.pojo.User;
import com.zhifou.ztc.service.impl.MailServiceImpl;
import com.zhifou.ztc.service.MailService;
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
public class MailController {

    @Autowired
    HttpSession httpSession;
    @Autowired
    MailService mailService;



    @RequestMapping(value = "sendMail.action",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> sendMail(@RequestParam("email") String email){
        String  random = (int)((Math.random()*9+1)*100000)+"";
        MailServiceImpl mail = new MailServiceImpl();
        boolean flag = mail.send(email, random, "更改邮箱");
        HashMap<String, Object> map = new HashMap<>();
        if(flag)
        {
            map.put("success",true);
            map.put("msg",random);
        }
        else
            map.put("success",false);
        return map;
    }

    @RequestMapping(value = "changeMail.action",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> changeMail(@RequestParam("email") String email){
        User userDomain =(User)httpSession.getAttribute("user");
        userDomain.setEmail(email);
        boolean flag = mailService.updateMail(userDomain);
        HashMap<String, Object> map = new HashMap<>();
        if(flag)
        {
            map.put("success",true);
            map.put("msg","邮箱更改成功");
        }
        else
        {
            map.put("success",false);
            map.put("msg","更改失败，请联系管理员");
        }
        return map;
    }
}
