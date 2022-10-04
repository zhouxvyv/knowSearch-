package com.zhifou.ztc.service.impl;

import com.zhifou.ztc.pojo.User;
import com.zhifou.ztc.mapper.NoAnswerTopicMapper;
import com.zhifou.ztc.pojo.NoTopic;
import com.zhifou.ztc.service.NoAnswerTopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("noAnswerTopicService")
public class NoAnswerTopicServiceImpl implements NoAnswerTopicService {
    @Autowired
    NoAnswerTopicMapper noAnswerTopicMapper;

    @Override
    public boolean addNoAnswerTopic(NoTopic topic){
        boolean b = noAnswerTopicMapper.addNoAnswerTopic(topic);
        return b;
    }
    @Override
    public List<NoTopic> getNoAnswerTopic(int userId){
        List<NoTopic> noAnswerTopics;
        //noAnswerTopics = noAnswerTopicDao.getNoAnswerTopic(userId);
        User user = new User();
        user.setUserId(userId);
        noAnswerTopics = noAnswerTopicMapper.getNoAnswerTopicOfUser(user);
        return noAnswerTopics;
    }

    @Override
    public boolean removeTopic(int topicId) {
        NoTopic noAnswerTopicDomain = new NoTopic();
        noAnswerTopicDomain.setTopicId(topicId);
        ArrayList<NoTopic> noAnswerTopicDomains = new ArrayList<>();
        noAnswerTopicDomains.add(noAnswerTopicDomain);
        int i = noAnswerTopicMapper.deleteTopic(noAnswerTopicDomains);
        return i>0;
        //return noAnswerTopicDao.deleteTopic(topicId);
    }

    @Override
    public List<NoTopic> getNoAnswerTopicByType(String type,int userId) {
        NoTopic noAnswerTopicDomain = new NoTopic();
        if(type.equals(""))
            type="%";
        noAnswerTopicDomain.setType(type);
        List<NoTopic> noAnswerTopicDomains = noAnswerTopicMapper.selectRandNoAnswerTopicByCheck(noAnswerTopicDomain,userId);
        return noAnswerTopicDomains;
    }

    @Override
    public boolean updateNoAnswerTopic(NoTopic noAnswerTopicDomain) {
        return noAnswerTopicMapper.updateNoAnswerTopic(noAnswerTopicDomain);
        //return noAnswerTopicDao.updateNoAnswerTopic(noAnswerTopicDomain);
    }

    @Override
    public boolean clearAnswerCounter(int topicId) {
        return noAnswerTopicMapper.clearAnswerCounter(topicId);
    }

    @Override
    public boolean addAnswerCount(int topicId) {
        return noAnswerTopicMapper.addAnswerCounter(topicId);
    }
}
