package com.zhifou.ztc.domain.Domainct;

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
    int subjectId;
    String label;
    String imgs;
    int status;

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
                '}';
    }
}
