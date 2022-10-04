package com.zhifou.ztc.service;

import com.zhifou.ztc.pojo.User;
import com.zhifou.ztc.pojo.Mistake;

import java.util.List;

public interface MistakeService {
    public List<Mistake> search(User userDomain, int num);
    public Boolean delete(int id);
}
