package com.zhifou.ztc.utils;

import com.jayway.jsonpath.JsonPath;
import com.zhifou.ztc.utils.webapi.百度文字识别.testApi.TextRecognitionUtil;
import com.zhifou.ztc.utils.webapi.百度文字识别.testApi.apiUtil.InputStreamUtil;
import com.zhifou.ztc.utils.webapi.讯飞公式识别.FormulaRecognitionUtil;

import java.awt.geom.Area;
import java.io.*;
import java.util.List;
import java.util.concurrent.CountDownLatch;

public class OCRUtil {
    public static void main(String[] args) {
        String s = main1();
        System.out.println(s);
    }
    public static String main1() {
        File file = new File("D:\\Desktop\\Snipaste_2022-06-13_23-18-18.png");
        InputStream in = null;
        try {
            in = new FileInputStream(file);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        String s = readText(in);
        return s;
    }

    public static String readText(InputStream inputStream){
        byte[] imgData = new byte[0];
        try {
            imgData = InputStreamUtil.inputToByteArray(inputStream);
        } catch (IOException e) {
            e.printStackTrace();
        }

        String[] res={""};



        CountDownLatch count = new CountDownLatch(1);
        BaiDuApiReadThread baiDuApiReadThread = new BaiDuApiReadThread(count,res,imgData);
        baiDuApiReadThread.start();
        XunFeiApiReadThread xunFeiApiReadThread = new XunFeiApiReadThread(count,res,imgData);
        xunFeiApiReadThread.start();

        try {
            count.await();
            baiDuApiReadThread.stop();
            xunFeiApiReadThread.stop();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return res[0];
    }
}
class BaiDuApiReadThread extends Thread{
    CountDownLatch count;
    String[] result;
    byte[] imgData;
    TextRecognitionUtil textRecognitionUtil = new TextRecognitionUtil();


    public BaiDuApiReadThread(CountDownLatch count, String[] res,byte[] imgData){
        this.count=count;
        this.result=res;
        this.imgData = imgData;
    }
    @Override
    public void run(){

        result[0] = textRecognitionUtil.docAnalysis(imgData);
        List<String> sss = JsonPath.parse(result[0]).read("$.results[*].words.word");
        String key = "";
        for (String i : sss) {
            key = key + i;
        }
        key = key.replace("{", " ");
        key = key.replace("}", " ");
        key = key.replaceAll("\\[a-z]+","");
        result[0]=key;
        count.countDown();
    }
}
class XunFeiApiReadThread extends Thread{
    CountDownLatch count;
    String[] result;
    byte[] imgData;
    FormulaRecognitionUtil formulaRecognitionUtil = new FormulaRecognitionUtil();


    public XunFeiApiReadThread(CountDownLatch count, String[] res,byte[] imgData){
        this.count=count;
        this.result=res;
        this.imgData = imgData;
    }
    @Override
    public void run(){

        try {
            result[0] = formulaRecognitionUtil.getContent(imgData);
        } catch (Exception e) {
            result=null;
        }
        count.countDown();
    }
}
