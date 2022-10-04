package com.zhifou.ztc.controller;

import com.zhifou.ztc.pojo.User;
import com.zhifou.ztc.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class UserController {


    @Autowired
    HttpSession httpSession;
    @Autowired
    UserService userService;



    @RequestMapping(value = "/loginServlet.Servlet")
    @ResponseBody
    public HashMap<String, Object> login(User user, String keep, String code, HttpServletResponse response){

        HashMap<String, Object> map = new HashMap<>();
        if(keep==null) keep = "N";

        if(code==null || !code.equals(httpSession.getAttribute("checkCode"))){
            map.put("success", false);
            map.put("message", "验证码错误");
        } else if(user.getUserName()!=null && user.getPwd()!=null){
            User getUser = userService.getUser(user);

            if(getUser!=null){
                System.out.println("-------------------------------------------2");
                // 登录成功
                httpSession.setAttribute("user",getUser);
                if(keep.equals("Y")) {
                    System.out.println("-------------------------------------------3");
                    Cookie name = new Cookie("no", user.getUserName());
                    Cookie password = new Cookie("pwd", user.getPwd());
                    name.setMaxAge(60*60*24*30);
                    password.setMaxAge(60*60*24*30);
                    response.addCookie(name);
                    response.addCookie(password);
                }

                // 设置返回的json
                map.put("user", user);
                map.put("success", true);
                map.put("message", "成功");
            }
            if(getUser==null){
                System.out.println("-------------------------------------------1");
                // 用户不存在,设置返回错误
                map.put("success", false);
                map.put("message", "用户不存在或密码错误");
            }
        } else {
            // 缺少用户名或密码
            map.put("success", false);
            map.put("message", "登录信息缺失");
        }
        return map;
    }

    @RequestMapping(value="/exitServlet.Servlet")
    @ResponseBody
    public HashMap<String, Object> exit(HttpServletResponse response){
        httpSession.removeAttribute("user");
        Cookie no = new Cookie("no","");
        Cookie pwd = new Cookie("pwd", "");
        no.setMaxAge(0);
        pwd.setMaxAge(0);
        response.addCookie(no);
        response.addCookie(pwd);
        HashMap<String, Object> map = new HashMap<>();
        map.put("success",true);
        return map;
    }

    @RequestMapping("/findTopUserServlet.servlet")
    @ResponseBody
    public List<Map<String, Object>> findTopUser(){
        List<Map<String, Object>> topStudy = userService.findTopStudy();
        return topStudy;
    }

    @RequestMapping("/signinServlet")
    @ResponseBody
    public HashMap<String, Object> signin(String userName, String pwd){
        boolean b = userService.addUser(userName,pwd);
        HashMap<String, Object> map = new HashMap<>();
        map.put("success", b);
        return map;
    }
}
