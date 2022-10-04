package com.zhifou.ztc.controller;

import com.zhifou.ztc.pojo.Collection;
import com.zhifou.ztc.pojo.User;
import com.zhifou.ztc.service.CollectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequestMapping(value = "/user")
@Controller
public class CollectionController {

    @Autowired
    HttpSession httpSession;
    @Autowired
    CollectionService collectionService;



    @RequestMapping(value = "/collection.action")
    @ResponseBody
    public Map<String,Object> getCollection(@RequestParam("num")Integer num){
        User userDomain =(User)httpSession.getAttribute("user");
        List<Collection> list= collectionService.searchCollection(userDomain, num);
        HashMap<String, Object> map = new HashMap<>();
        if(list!=null)
        {
            map.put("success",true);
            map.put("list",list);
        }
        else
        {
            map.put("success",false);
        }
        return map;
    }

    @RequestMapping(value = "/deleteCollection.action")
    @ResponseBody
    public Map<String,Object> delCollection(@RequestParam("id")Integer id){
        Boolean flag = collectionService.delete(id);
        HashMap<String, Object> map = new HashMap<>();
        if(flag)
        {
            map.put("success",true);
        }
        else
        {
            map.put("success",false);
            map.put("msg","系统错误，请联系管理员");
        }
       return map;
    }
}
