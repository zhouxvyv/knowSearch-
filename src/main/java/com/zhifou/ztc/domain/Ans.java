package com.zhifou.ztc.domain;

import java.util.ArrayList;
import java.util.List;

public class Ans{
    private int dpId;
    private String[] ansList;



    public int getdpId() {
        return dpId;
    }

    public void setdpId(int dpId) {
        this.dpId = dpId;
    }

    public String[] getAnsList() {
        return ansList;
    }

    public void setAnsList(String[] ansList) {
        this.ansList = ansList;
    }
    @Override
    public String toString() {
        return "Ans{" +
                "dpId=" + dpId +
                ", ansList=" + ansList +
                '}';
    }
}
