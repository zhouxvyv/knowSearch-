package com.zhifou.ztc.controller;

import com.zhifou.ztc.utils.CreateCodeUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.HashMap;

@Controller
public class CodeController {


    @RequestMapping(value = "/createCodeImageServlet.Servlet")
    @ResponseBody
    public String createCodeImage(HttpServletRequest request, HttpServletResponse response) throws IOException {
        HttpSession session = request.getSession();

        String code = CreateCodeUtils.creatCode();
        session.setAttribute("checkCode",code);

        //生成验证码图片
        BufferedImage image = CreateCodeUtils.createCodeImage(100,35,code);
        //输出相应的图片
        ImageIO.write(image,"jpg",response.getOutputStream());
        return "success";
    }

    @RequestMapping(value = "/checkCodeServlet.Servlet")
    @ResponseBody
    public HashMap<String, Object> checkCode(String code, HttpSession session){
        HashMap<String, Object> map = new HashMap<>();

        if(code.equals(session.getAttribute("checkCode"))){
            map.put("success",true);
            map.put("message","ok");
        }else {
            map.put("success", false);
            map.put("message", "验证码错误...");
        }

        return map;
    }
}
