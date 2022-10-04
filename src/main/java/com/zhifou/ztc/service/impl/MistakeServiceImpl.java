package com.zhifou.ztc.service.impl;


import com.zhifou.ztc.pojo.User;
import com.zhifou.ztc.pojo.Mistake;
import com.zhifou.ztc.mapper.MistakeMapper;
import com.zhifou.ztc.service.MistakeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("mistakeService")
public class MistakeServiceImpl implements MistakeService {
    @Autowired
    MistakeMapper mistakeMapper;
    @Override
    public List<Mistake> search(User userDomain, int num) {
        List<Mistake> list;
        //list = mistakeDao.search(userDomain,num);
        list = mistakeMapper.search(userDomain, num);
        return list;
    }

    @Override
    public Boolean delete(int id) {
        boolean flag;
        //flag = mistakeDao.delete(id);

        Mistake mistake = new Mistake();
        mistake.setMistakeId(id);
        flag = mistakeMapper.delete(mistake);
        return flag;
    }
}
