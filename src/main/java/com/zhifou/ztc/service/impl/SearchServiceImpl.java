package com.zhifou.ztc.service.impl;

import com.zhifou.ztc.mapper.SearchMapper;
import com.zhifou.ztc.pojo.Search;
import com.zhifou.ztc.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("searchService")
public class SearchServiceImpl implements SearchService {

    @Autowired
    SearchMapper searchMapper;


    @Override
    public boolean insertSearch(Search searchDomain){
        return searchMapper.insert(searchDomain);
        //return searchMapper.insert(searchDomain);
    }
}
