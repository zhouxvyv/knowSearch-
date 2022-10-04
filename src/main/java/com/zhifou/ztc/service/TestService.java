package com.zhifou.ztc.service;

import com.zhifou.ztc.pojo.Test;
import com.zhifou.ztc.pojo.Topic;

import java.io.IOException;
import java.util.List;

public interface TestService {
    List<Test> getTest(String testName, int pageIndex, int pageSize);

    List<Test> getTest(String testName,List<Topic> topicByText) throws IOException;

    List<Test> getTestByHasTopicLikeText(String text);

    List<Test> getTestByTopic(List<Topic> topicList);

    boolean addLikeTest(int userId, int testId);

    List<Test> getLikeTest(int userId);

    boolean insertOnePaper(String paperName,String uploadTime);

    String selectByNameAndDate(String paperName, String uploadTime);

    boolean isnertQueToPaper(String paperId,String queId,int queOrder);

    List<Test> selectTest();

    boolean updateTestState(String state,String testId);

    List<Topic> getTestTopicList(int testId);
}
