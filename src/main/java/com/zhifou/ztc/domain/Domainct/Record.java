package com.zhifou.ztc.domain.Domainct;

public class Record {
    int searchNo;
    int userId;
    String image;
    String time;
    String title;

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

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Override
    public String toString() {
        return "Record{" +
                "searchNo=" + searchNo +
                ", userId=" + userId +
                ", image='" + image + '\'' +
                ", time='" + time + '\'' +
                ", title='" + title + '\'' +
                '}';
    }
}
