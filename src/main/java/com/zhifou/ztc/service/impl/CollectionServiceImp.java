package com.zhifou.ztc.service.impl;

import com.zhifou.ztc.mapper.CollectionMapper;
import com.zhifou.ztc.pojo.Collection;
import com.zhifou.ztc.pojo.User;
import com.zhifou.ztc.service.CollectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("collectionService")
public class CollectionServiceImp implements CollectionService {
    @Autowired
    CollectionMapper collectionMapper;

    @Override
    public List<Collection> searchCollection(User userDomain, int num) {
        List<Collection> list = collectionMapper.collections(userDomain, num);
        return list;
    }

    @Override
    public Boolean delete(int id) {
        Boolean flag = collectionMapper.delete(id);
        return flag;
    }
}
