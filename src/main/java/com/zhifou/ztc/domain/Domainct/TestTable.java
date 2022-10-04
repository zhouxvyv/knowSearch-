package com.zhifou.ztc.domain.Domainct;

public class TestTable {
    int testId;
    String testName;
    int subjectId;
    String uploadTime;
    String sourceUrl;

    public int getTestId() {
        return testId;
    }

    public void setTestId(int testId) {
        this.testId = testId;
    }

    public String getTestName() {
        return testName;
    }

    public void setTestName(String testName) {
        this.testName = testName;
    }

    public int getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(int subjectId) {
        this.subjectId = subjectId;
    }

    public String getUploadTime() {
        return uploadTime;
    }

    public void setUploadTime(String uploadTime) {
        this.uploadTime = uploadTime;
    }

    public String getSourceUrl() {
        return sourceUrl;
    }

    public void setSourceUrl(String sourceUrl) {
        this.sourceUrl = sourceUrl;
    }

    @Override
    public String toString() {
        return "TestTable{" +
                "testId=" + testId +
                ", testName='" + testName + '\'' +
                ", subjectId=" + subjectId +
                ", uploadTime='" + uploadTime + '\'' +
                ", sourceUrl='" + sourceUrl + '\'' +
                '}';
    }
}
