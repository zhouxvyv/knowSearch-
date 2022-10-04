package com.zhifou.ztc.mapper;

import com.zhifou.ztc.pojo.Topic;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Mapper
public interface TopicMapper {
    List<Topic> getAllTopic();
    List<Topic> add();
    boolean updateTopic(Topic topic);
    boolean deleteTopic(Topic topic);
    List<Topic> readTopic(int topicId);
    List<Topic> getTopicHasLabel(String labelRegex);
    List<Topic> selectForBGQueList();
    Topic onlyOneQue(int topicId);
    boolean insertTopic(@Param("topicTitle") String topicTitle, @Param("topicType") String topicType, @Param("topicOption") String topicOption, @Param("topicAnswer") String topicAnswer, @Param("topicExplain") String topicExplain, @Param("uploadDate") String uploadDate);
    String selectTopicByTitleAndDate(@Param("topicTitle") String topicTitle,@Param("uploadDate") String uploadDate);
    boolean updateTopicState(@Param("state") String state,@Param("topicId") String topicId);

    boolean createTopic(Topic topic);
}
