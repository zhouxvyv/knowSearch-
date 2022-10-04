package com.zhifou.ztc.controller;

import com.zhifou.ztc.domain.Domainct.Record;
import com.zhifou.ztc.pojo.Search;
import com.zhifou.ztc.pojo.User;
import com.zhifou.ztc.service.RecordService;
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
public class RecordController {

    //获取历史记录
    @Autowired
    HttpSession httpSession;
    @Autowired
    RecordService recordService;



    @RequestMapping(value = "record.action")
    @ResponseBody
    public Map<String,Object> Record(@RequestParam("num")Integer num){
        User userDomain  =(User) httpSession.getAttribute("user");
        List<Search> list = recordService.show(userDomain,num);
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

    @RequestMapping(value = "DeleteRecord.action")
    @ResponseBody
    public Map<String,Object> DeleteRecord(){
        User user  =(User) httpSession.getAttribute("user");
        Boolean flag = recordService.delete(user);
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
