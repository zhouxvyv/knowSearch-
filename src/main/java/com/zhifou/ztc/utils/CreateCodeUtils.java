package com.zhifou.ztc.utils;

import java.awt.*;
import java.awt.image.BufferedImage;

public class CreateCodeUtils {
    //生成验证码
    public static String creatCode(){
        String str = "ABCDEFGHIGKLMNOPQRESUVWXYZabcdefghigklmnopqrstuvwxyz0123456789";
        String code = ""+str.charAt(RandomUtils.getRandom(61))+
                str.charAt(RandomUtils.getRandom(61))+
                str.charAt(RandomUtils.getRandom(61))+
                str.charAt(RandomUtils.getRandom(61));
        return code;
    }
    //绘制验证码图片
    public static BufferedImage createCodeImage(int width,int height,String code){
        BufferedImage image = new BufferedImage(width,height,BufferedImage.TYPE_INT_RGB);
        Graphics graphics = image.getGraphics();
        //绘制背景和边框
        graphics.setColor(Color.white);
        graphics.fillRect(0,0,width,height);
        graphics.setColor(Color.white);
        graphics.fillRect(2,2,width-4,height-4);
        //绘制文字
        graphics.setColor(Color.BLACK);
        graphics.setFont(new Font("Arial",Font.BOLD,(int)(height*2/3)));
        for(int i=0;i<4;i++){
            graphics.drawString(code.charAt(i)+"",width/10+width/5*i,height*2/3);
        }
        //绘制干扰线
        /*graphics.setColor(Color.green);
        for (int i = 0; i < 6; i++) {
            graphics.drawLine(RandomUtils.getRandom(width/3),
                    (RandomUtils.getRandom(height)+height/2)%height,
                    RandomUtils.getRandom(width/3)+width*2/3,
                    (RandomUtils.getRandom(height)+height/2)%height);
        }*/
        return image;
    }
}
