package com.zhifou.ztc.controller;

import com.zhifou.ztc.pojo.User;
import com.zhifou.ztc.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RequestMapping("/user")
@Controller
public class AvatarController {

    @Autowired
    HttpSession httpSession;
    @Autowired
    HttpServletRequest request;
    @Autowired
    UserService userService;



    @RequestMapping("/updateAvatar.action")
    @ResponseBody
    public Map<String, Object> updateAvatar(MultipartFile uploadFile) throws IOException {
        User user = (User)httpSession.getAttribute("user");
        String originalFilename = uploadFile.getOriginalFilename();
        System.out.println(originalFilename);
        String path=request.getSession().getServletContext().getRealPath("/headimg/");
        uploadFile.transferTo(new File(path+originalFilename));
        System.out.println(path+originalFilename);
        user.setAvatar("/headimg/"+originalFilename);
        Boolean flag = userService.updateAvatar(user);
        HashMap<String, Object> map = new HashMap<>();
        if(flag!=null)
        {
            map.put("success",true);
            map.put("path","/headimg/"+originalFilename);
        }
        else
        {
            map.put("success",false);
        }
        return map;
    }
}
