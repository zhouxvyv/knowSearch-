package com.zhifou.ztc.mapper;

import com.zhifou.ztc.pojo.User;
import com.zhifou.ztc.pojo.NoTopic;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoAnswerTopicMapper {
    // 将noTopic出入到数据表中
    boolean addNoAnswerTopic(NoTopic topic);
    // 获取用户上传的题目
    List<NoTopic> getNoAnswerTopicOfUser(User user);
    // 删除noTopic
    int deleteTopic(@Param("noTopics") List<NoTopic> noTopics);
    // 随机获取一道题目,更具分类
    List<NoTopic> selectRandNoAnswerTopicByCheck(@Param("noTopic") NoTopic noTopic,@Param("userId") int userId);
    // 更新题目,前提是题目含有id
    boolean updateNoAnswerTopic(NoTopic noAnswerTopicDomain);


    List<NoTopic> readAllNoTopic();

    boolean clearAnswerCounter(int topicId);

    boolean addAnswerCounter(int topicId);

    NoTopic findByTopicId(int topicId);

    boolean deleteTopicById(int topicId);
}
