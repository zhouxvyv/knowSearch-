package com.zhifou.ztc.pojo;

import com.zhifou.ztc.pojo.Subject;
import com.zhifou.ztc.pojo.Topic;
import com.zhifou.ztc.pojo.User;

import java.util.Date;

public class Mistake {
    int mistakeId;
    Date mistakeTime;
    int topicId;
    int userId;
    int subjectId;

    Topic topic;
    User user;
    Subject subject;

    public int getMistakeId() {
        return mistakeId;
    }

    public void setMistakeId(int mistakeId) {
        this.mistakeId = mistakeId;
    }

    public Date getMistakeTime() {
        return mistakeTime;
    }

    public void setMistakeTime(Date mistakeTime) {
        this.mistakeTime = mistakeTime;
    }

    public int getTopicId() {
        return topicId;
    }

    public void setTopicId(int topicId) {
        this.topicId = topicId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(int subjectId) {
        this.subjectId = subjectId;
    }

    public Topic getTopic() {
        return topic;
    }

    public void setTopic(Topic topic) {
        this.topic = topic;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Subject getSubject() {
        return subject;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }

    @Override
    public String toString() {
        return "Mistake{" +
                "mistakeId=" + mistakeId +
                ", mistakeTime=" + mistakeTime +
                ", topic=" + topic +
                ", user=" + user +
                ", subject=" + subject +
                '}';
    }
}
