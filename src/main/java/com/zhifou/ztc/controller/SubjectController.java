package com.zhifou.ztc.controller;

import com.zhifou.ztc.pojo.Subject;
import com.zhifou.ztc.service.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;

@Controller
public class SubjectController {
    @Autowired
    SubjectService subjectService;

    @RequestMapping("getAllSubject")
    @ResponseBody
    public List<Subject> getAllSubject(){
        return subjectService.readSubject();
    }
}
