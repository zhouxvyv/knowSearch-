package com.zhifou.ztc.service.impl;

import com.zhifou.ztc.domain.Domainct.Record;
import com.zhifou.ztc.mapper.SearchMapper;
import com.zhifou.ztc.pojo.Search;
import com.zhifou.ztc.pojo.User;
import com.zhifou.ztc.service.RecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecordServiceImpl implements RecordService {
    @Autowired
    SearchMapper searchMapper;
    @Override
    public boolean addRecord(Search search) {
        return false;
    }

    @Override
    public List<Search> show(User userDomain, int num) {
        return searchMapper.search(userDomain, num);
    }

    @Override
    public Boolean delete(User user) {
        return searchMapper.deleteAllRecordOfUser(user);
    }
}
