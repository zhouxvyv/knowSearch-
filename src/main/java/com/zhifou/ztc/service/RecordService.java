package com.zhifou.ztc.service;

import com.zhifou.ztc.domain.Domainct.Record;
import com.zhifou.ztc.pojo.Search;
import com.zhifou.ztc.pojo.User;

import java.util.List;

public interface RecordService {
    boolean addRecord(Search search);

    public List<Search> show(User userDomain, int num);
    public  Boolean delete(User user);
}
