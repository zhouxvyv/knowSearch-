package com.zhifou.ztc.utils;

import java.util.Random;

public class RandomUtils {
    public static int getRandom(int begin,int end) {
        Random random = new Random();
        if(begin>end){
            int trmp =begin;
            begin=end;
            end=trmp;
        }
        int n = (int)(Math.floor(Math.random()*(end-begin+1))+begin);
        return n;
    }
    public static int getRandom(int end){
        return getRandom(0, end);
    }
}
