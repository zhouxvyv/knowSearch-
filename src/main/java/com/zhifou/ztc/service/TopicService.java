package com.zhifou.ztc.service;

import com.zhifou.ztc.pojo.Topic;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface TopicService {
    public List<Topic> search(String key) throws IOException;

    List<Topic> getAllTopic();

    List<Topic> readTopic(int topicId);

    Boolean updateTopic(Topic topic);

    Boolean deleteTopic(Topic topic);

    List<Topic> getSimilarTopics(List<Topic> list);

    List<Topic> getQueForBG();

    Topic onlyOneQue(int topicId);

    boolean insertTopic(String topicTitle,String topicType,String topicOption,String topicAnswer,String topicExplain,String uploadDate);

    String selectTopicByTitleAndDate(String topicTitle,String uploadDate);

    boolean updateTopicState(String state,String topicId);
}
