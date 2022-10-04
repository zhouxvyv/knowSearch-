package com.zhifou.ztc.mapper;

import com.zhifou.ztc.pojo.Answer;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerMapper {
    int addAnswer(Answer answer);
    List<Answer> selectAnswerByTopicId(int topicId);
    List<Answer> readAllAnswer();
    boolean deleteAnswer(int answerId);

    Answer getAnswer(int answerId);

    boolean deleteAnswerOfNotopic(int topicId);
}
