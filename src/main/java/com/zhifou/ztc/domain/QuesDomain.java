package com.zhifou.ztc.domain;

public class QuesDomain {
    private int topicSeqence;
    private int topicId;
    private String topicTitle;
    private String topicOptions;
    private String topicAnswer;
    private String topicExplain;
    private String userAns;
    private String istrue;
    private int state;

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }

    public int getTopicSeqence() {
        return topicSeqence;
    }

    public void setTopicSeqence(int topicSeqence) {
        this.topicSeqence = topicSeqence;
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

    public String getUserAns() {
        return userAns;
    }

    public void setUserAns(String userAns) {
        this.userAns = userAns;
    }

    public String getIstrue() {
        return istrue;
    }

    public void setIstrue(String istrue) {
        this.istrue = istrue;
    }

    @Override
    public String toString() {
        return "QuesDomain{" +
                "topicSeqence=" + topicSeqence +
                ", topicId=" + topicId +
                ", topicTitle='" + topicTitle + '\'' +
                ", topicOptions='" + topicOptions + '\'' +
                ", topicAnswer='" + topicAnswer + '\'' +
                ", topicExplain='" + topicExplain + '\'' +
                ", userAns='" + userAns + '\'' +
                ", istrue='" + istrue + '\'' +
                ", state=" + state +
                '}';
    }
}
