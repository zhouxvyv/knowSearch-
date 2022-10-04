package com.zhifou.ztc.pojo;

import java.util.List;

public class User {
    int userId;
    String userName;
    String pwd;
    String tel;
    String email;
    String avatar;
    String setting;
    String hometown;
    String birthday;
    String grade;
    int asset;
    int freeCount;
    int addCount;

    List<Collection> collections;
    List<Mistake> mistakeHistory;
    List<Search> searchHistory;


    public User (){

    }

    public User(String userName, String pwd) {
        this.userName = userName;
        this.pwd = pwd;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getSetting() {
        return setting;
    }

    public void setSetting(String setting) {
        this.setting = setting;
    }

    public String getHometown() {
        return hometown;
    }

    public void setHometown(String hometown) {
        this.hometown = hometown;
    }

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public int getAsset() {
        return asset;
    }

    public void setAsset(int asset) {
        this.asset = asset;
    }

    public int getFreeCount() {
        return freeCount;
    }

    public void setFreeCount(int freeCount) {
        this.freeCount = freeCount;
    }

    public int getAddCount() {
        return addCount;
    }

    public void setAddCount(int addCount) {
        this.addCount = addCount;
    }

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", userName='" + userName + '\'' +
                ", pwd='" + pwd + '\'' +
                ", tel='" + tel + '\'' +
                ", email='" + email + '\'' +
                ", avatar='" + avatar + '\'' +
                ", setting='" + setting + '\'' +
                ", hometown='" + hometown + '\'' +
                ", birthday='" + birthday + '\'' +
                ", grade='" + grade + '\'' +
                ", asset=" + asset +
                ", freeCount=" + freeCount +
                ", addCount=" + addCount +
                '}';
    }
}
