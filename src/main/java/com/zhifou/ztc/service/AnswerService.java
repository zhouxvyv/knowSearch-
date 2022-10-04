package com.zhifou.ztc.service;

import com.zhifou.ztc.pojo.Answer;

import java.util.List;

public interface AnswerService {
    boolean addAnswer(Answer answer);

    List<Answer> getAnswers(int topicId);

    boolean deleteAnswer(int answerId);

    boolean confirmAnswer(int answerId);
}
