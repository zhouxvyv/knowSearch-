package com.zhifou.ztc.service;


import com.zhifou.ztc.pojo.NoTopic;

import java.util.List;

public interface NoAnswerTopicService {
    boolean addNoAnswerTopic(NoTopic topic);

    List<NoTopic> getNoAnswerTopic(int userId);

    boolean removeTopic(int topicId);

    List<NoTopic> getNoAnswerTopicByType(String type,int userId);

    boolean updateNoAnswerTopic(NoTopic noAnswerTopicDomain);

    boolean clearAnswerCounter(int topicId);

    boolean addAnswerCount(int topicId);
}
