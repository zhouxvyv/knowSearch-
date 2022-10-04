package com.zhifou.ztc.mapper;

import com.zhifou.ztc.pojo.Test;
import com.zhifou.ztc.pojo.Topic;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;


import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
@Repository("testMapper")
public interface TestMapper {
    List<Test> getPageTest(@Param("testName") String testName, @Param("pageIndex") int pageIndex, @Param("pageSize") int pageSize);
    List<Test> getTestNameLikeText(String testName);
    List<Test> getTestNameLikeTextOrHasTopic(@Param("text") String testName, @Param("topicIdList") List<Topic> topicIdList);
    List<Test> getLikeTest(int userId);
    List<Test> getTestByTopicAndMessage(@Param("topicIdList") List<Topic> topicIdList);
    List<Test> getTestByTopic(@Param("topicIdList") List<Topic> topicIdList);
    boolean addLikeTest(@Param("userId") int userId, @Param("testId") int testId, @Param("time") Timestamp time);
    boolean select(@Param("userId") int userId, @Param("testId") int testId);
    boolean deleteLikeTest(@Param("userId") int userId, @Param("testId") int testId);
    boolean insertOnePaper(@Param("paperName") String paperName, @Param("uploadTime") String uploadDate);
    String selectByNameAndDate(@Param("paperName") String paperName,@Param("uploadTime")String uploadDate);
    boolean isnertQueToPaper(@Param("paperId") String paperId,@Param("queId") String queId,@Param("queOrder") int queOrder);
    List<Test> selectTest();
    boolean updateTestState(@Param("state") String state,@Param("testId") String testId);

    List<Topic> getTestTopicList(int testId);
}
