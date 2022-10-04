package com.zhifou.ztc.pojo;

import java.sql.Date;
import java.sql.Timestamp;

public class Search {
    int searchNo;
    int userId;
    String image;
    Timestamp time;
    String title;

    User owner;


    public Search(){

    }

    public Search(int userId, String image, Timestamp datetime, String title) {
        this.userId = userId;
        this.image = image;
        this.time = datetime;
        this.title = title;
    }

    public int getSearchNo() {
        return searchNo;
    }

    public void setSearchNo(int searchNo) {
        this.searchNo = searchNo;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Timestamp getTime() {
        return time;
    }

    public void setTime(Timestamp time) {
        this.time = time;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    @Override
    public String toString() {
        return "Search{" +
                "searchNo=" + searchNo +
                ", userId=" + userId +
                ", image='" + image + '\'' +
                ", time='" + time + '\'' +
                ", title='" + title + '\'' +
                ", owner=" + owner +
                '}';
    }
}
