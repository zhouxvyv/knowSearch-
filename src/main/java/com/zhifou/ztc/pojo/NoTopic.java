package com.zhifou.ztc.pojo;

import java.util.List;

public class NoTopic {
    int topicId;
    String topicTitle;
    String topicImage;
    int userId;
    String type;
    String options;
    int answerCount;

    User owner;
    List<Answer> answers;


    public NoTopic(){

    }

    public NoTopic(String topicTitle, String topicImage, int userId, String type, String options) {
        this.topicTitle = topicTitle;
        this.topicImage = topicImage;
        this.userId = userId;
        this.type = type;
        this.options = options;
    }

    public NoTopic(int topicId, String topicTitle, String topicImage, int userId, String type, String options) {
        this.topicId = topicId;
        this.topicTitle = topicTitle;
        this.topicImage = topicImage;
        this.userId = userId;
        this.type = type;
        this.options = options;
    }

    public int getTopicId() {
        return topicId;
    }

    public void setTopicId(int topicId) {
        this.topicId = topicId;
    }

    public String getTopicTitle() {
        return topicTitle;
    }

    public void setTopicTitle(String topicTitle) {
        this.topicTitle = topicTitle;
    }

    public String getTopicImage() {
        return topicImage;
    }

    public void setTopicImage(String topicImage) {
        this.topicImage = topicImage;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getOptions() {
        return options;
    }

    public void setOptions(String options) {
        this.options = options;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public int getAnswerCount() {
        return answerCount;
    }

    public void setAnswerCount(int answerCount) {
        this.answerCount = answerCount;
    }

    @Override
    public String toString() {
        return "NoTopic{" +
                "topicId=" + topicId +
                ", topicTitle='" + topicTitle + '\'' +
                ", topicImage='" + topicImage + '\'' +
                ", userId=" + userId +
                ", type='" + type + '\'' +
                ", options='" + options + '\'' +
                ", owner=" + owner +
                '}';
    }
}
