package com.zhifou.ztc.pojo;

public class Collection {
    int testCollectionId;
    int testId;
    int userId;
    String time;

    Test test;
    User user;

    public int getTestCollectionId() {
        return testCollectionId;
    }

    public void setTestCollectionId(int testCollectionId) {
        this.testCollectionId = testCollectionId;
    }

    public int getTestId() {
        return testId;
    }

    public void setTestId(int testId) {
        this.testId = testId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public Test getTest() {
        return test;
    }

    public void setTest(Test test) {
        this.test = test;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Collection{" +
                "testCollectionId=" + testCollectionId +
                ", testId=" + testId +
                ", userId=" + userId +
                ", time='" + time + '\'' +
                ", test=" + test +
                ", user=" + user +
                '}';
    }
}
