package com.zhifou.ztc.domain;

public class DataDomain {
    private int state;
    private String practiceTime;
    private String ptRate;
    private String totalSCRate;
    private String totalRate;
    private String userCorrectAns;
    private String userFalseAns;
    private String rightRate;
    private String falseRate;
    private String userTotalAns;
    private String timesData;
    private String rateData;

    public String getTotalRate() {
        return totalRate;
    }

    public void setTotalRate(String totalRate) {
        this.totalRate = totalRate;
    }

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }

    public String getPracticeTime() {
        return practiceTime;
    }

    public void setPracticeTime(String practiceTime) {
        this.practiceTime = practiceTime;
    }

    public String getPtRate() {
        return ptRate;
    }

    public void setPtRate(String ptRate) {
        this.ptRate = ptRate;
    }

    public String getTotalSCRate() {
        return totalSCRate;
    }

    public void setTotalSCRate(String totalSCRate) {
        this.totalSCRate = totalSCRate;
    }

    public String getUserCorrectAns() {
        return userCorrectAns;
    }

    public void setUserCorrectAns(String userCorrectAns) {
        this.userCorrectAns = userCorrectAns;
    }

    public String getUserFalseAns() {
        return userFalseAns;
    }

    public void setUserFalseAns(String userFalseAns) {
        this.userFalseAns = userFalseAns;
    }

    public String getRightRate() {
        return rightRate;
    }

    public void setRightRate(String rightRate) {
        this.rightRate = rightRate;
    }

    public String getFalseRate() {
        return falseRate;
    }

    public void setFalseRate(String falseRate) {
        this.falseRate = falseRate;
    }

    public String getUserTotalAns() {
        return userTotalAns;
    }

    public void setUserTotalAns(String userTotalAns) {
        this.userTotalAns = userTotalAns;
    }

    public String getTimesData() {
        return timesData;
    }

    public void setTimesData(String timesData) {
        this.timesData = timesData;
    }

    public String getRateData() {
        return rateData;
    }

    public void setRateData(String rateData) {
        this.rateData = rateData;
    }

    @Override
    public String toString() {
        return "DataDomain{" +
                "state=" + state +
                ", practiceTime='" + practiceTime + '\'' +
                ", ptRate='" + ptRate + '\'' +
                ", totalSCRate='" + totalSCRate + '\'' +
                ", totalRate='" + totalRate + '\'' +
                ", userCorrectAns='" + userCorrectAns + '\'' +
                ", userFalseAns='" + userFalseAns + '\'' +
                ", rightRate='" + rightRate + '\'' +
                ", falseRate='" + falseRate + '\'' +
                ", userTotalAns='" + userTotalAns + '\'' +
                ", timesData='" + timesData + '\'' +
                ", rateData='" + rateData + '\'' +
                '}';
    }
}
