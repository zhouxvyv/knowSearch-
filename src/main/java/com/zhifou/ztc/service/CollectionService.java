package com.zhifou.ztc.service;

import com.zhifou.ztc.pojo.Collection;
import com.zhifou.ztc.pojo.User;

import java.util.List;

public interface CollectionService {
    public List<Collection> searchCollection(User userDomain, int num);
    public  Boolean delete(int id);
}
