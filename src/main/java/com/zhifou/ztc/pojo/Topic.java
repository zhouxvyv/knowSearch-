package com.zhifou.ztc.pojo;


import java.util.List;

public class Topic {
    int topicId;
    String topicTitle;
    String topicType;
    String topicOptions;
    String topicAnswer;
    String topicExplain;
    int answerNumber;
    int answerOkNumber;
    String topicSource;
    int subjectId; //Subject关联
    String label;
    String imgs;
    int status;
    int state;
    String uploadDate;
    int searchTimes;
    //

    Subject subject;
    List<Collection> collections;

    public Topic(){

    }

    public Topic(int topicId) {
        this.topicId = topicId;
    }

    public Topic(int topicId, String topicTitle, String topicType, String topicOptions, String topicAnswer, String topicExplain, int answerNumber, int answerOkNumber, String topicSource, int subjectId, String label, String imgs, int status) {
        this.topicId = topicId;
        this.topicTitle = topicTitle;
        this.topicType = topicType;
        this.topicOptions = topicOptions;
        this.topicAnswer = topicAnswer;
        this.topicExplain = topicExplain;
        this.answerNumber = answerNumber;
        this.answerOkNumber = answerOkNumber;
        this.topicSource = topicSource;
        this.subjectId = subjectId;
        this.label = label;
        this.imgs = imgs;
        this.status = status;
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

    public String getTopicType() {
        return topicType;
    }

    public void setTopicType(String topicType) {
        this.topicType = topicType;
    }

    public String getTopicOptions() {
        return topicOptions;
    }

    public void setTopicOptions(String topicOptions) {
        this.topicOptions = topicOptions;
    }

    public String getTopicAnswer() {
        return topicAnswer;
    }

    public void setTopicAnswer(String topicAnswer) {
        this.topicAnswer = topicAnswer;
    }

    public String getTopicExplain() {
        return topicExplain;
    }

    public void setTopicExplain(String topicExplain) {
        this.topicExplain = topicExplain;
    }

    public int getAnswerNumber() {
        return answerNumber;
    }

    public void setAnswerNumber(int answerNumber) {
        this.answerNumber = answerNumber;
    }

    public int getAnswerOkNumber() {
        return answerOkNumber;
    }

    public void setAnswerOkNumber(int answerOkNumber) {
        this.answerOkNumber = answerOkNumber;
    }

    public String getTopicSource() {
        return topicSource;
    }

    public void setTopicSource(String topicSource) {
        this.topicSource = topicSource;
    }

    public int getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(int subjectId) {
        this.subjectId = subjectId;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getImgs() {
        return imgs;
    }

    public void setImgs(String imgs) {
        this.imgs = imgs;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public Subject getSubject() {
        return subject;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }

    public String getUploadDate() {
        return uploadDate;
    }

    public void setUploadDate(String uploadDate) {
        this.uploadDate = uploadDate;
    }

    public int getSearchTimes() {
        return searchTimes;
    }

    public void setSearchTimes(int searchTimes) {
        this.searchTimes = searchTimes;
    }

    @Override
    public String toString() {
        return "Topic{" +
                "topicId=" + topicId +
                ", topicTitle='" + topicTitle + '\'' +
                ", topicType='" + topicType + '\'' +
                ", topicOptions='" + topicOptions + '\'' +
                ", topicAnswer='" + topicAnswer + '\'' +
                ", topicExplain='" + topicExplain + '\'' +
                ", answerNumber=" + answerNumber +
                ", answerOkNumber=" + answerOkNumber +
                ", topicSource='" + topicSource + '\'' +
                ", subjectId=" + subjectId +
                ", label='" + label + '\'' +
                ", imgs='" + imgs + '\'' +
                ", status=" + status +
                ", state=" + state +
                ", uploadDate='" + uploadDate + '\'' +
                ", searchTimes=" + searchTimes +
                ", subject=" + subject +
                ", collections=" + collections +
                '}';
    }
}
