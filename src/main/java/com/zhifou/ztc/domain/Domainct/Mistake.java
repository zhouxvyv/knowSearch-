package com.zhifou.ztc.domain.Domainct;

public class Mistake {
    int mistakeId;
    String mistakeTime;
    String subjectName;
    String topicTitle;

    public int getMistakeId() {
        return mistakeId;
    }

    public void setMistakeId(int mistakeId) {
        this.mistakeId = mistakeId;
    }

    public String getMistakeTime() {
        return mistakeTime;
    }

    public void setMistakeTime(String mistakeTime) {
        this.mistakeTime = mistakeTime;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public String getTopicTitle() {
        return topicTitle;
    }

    public void setTopicTitle(String topicTitle) {
        this.topicTitle = topicTitle;
    }

    @Override
    public String toString() {
        return "Mistake{" +
                "mistakeId=" + mistakeId +
                ", mistakeTime='" + mistakeTime + '\'' +
                ", subjectName='" + subjectName + '\'' +
                ", topicTitle='" + topicTitle + '\'' +
                '}';
    }
}
