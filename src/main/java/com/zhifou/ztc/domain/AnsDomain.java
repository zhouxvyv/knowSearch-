package com.zhifou.ztc.domain;

public class AnsDomain {

    private String ans;
    private String userAns;
    private String explain;
    private boolean state;

    public String getAns() {
        return ans;
    }

    public void setAns(String ans) {
        this.ans = ans;
    }

    public String getUserAns() {
        return userAns;
    }

    public void setUserAns(String userAns) {
        this.userAns = userAns;
    }

    public String getExplain() {
        return explain;
    }

    public void setExplain(String explain) {
        this.explain = explain;
    }

    public boolean isState() {
        return state;
    }

    public void setState(boolean state) {
        this.state = state;
    }

    @Override
    public String toString() {
        return "AnsDomain{" +
                "ans='" + ans + '\'' +
                ", userAns='" + userAns + '\'' +
                ", explain='" + explain + '\'' +
                ", state=" + state +
                '}';
    }
}
