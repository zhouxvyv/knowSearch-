package com.zhifou.ztc.service.impl;

import com.zhifou.ztc.mapper.SubjectMapper;
import com.zhifou.ztc.pojo.Subject;
import com.zhifou.ztc.service.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("subjectService")
public class SubjectServiceImpl implements SubjectService {
    @Autowired
    @Qualifier("subjectMapper")
    SubjectMapper subjectMapper;

    @Override
    public List<Subject> readSubject() {
        return subjectMapper.readSubject();
    }
}
