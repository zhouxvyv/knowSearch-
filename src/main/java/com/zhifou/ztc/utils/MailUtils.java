package com.zhifou.ztc.utils;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

public class MailUtils {
    public static boolean sendMail(String mail,String content,String title) {
        boolean flag=false;
        // 1.创建连接对象javax.mail.Session
        // 2.创建邮件对象 javax.mail.Message
        String from = "1687488753@qq.com";// 发件人电子邮箱
        String host = "smtp.qq.com"; // 指定发送邮件的主机smtp.qq.com(QQ)|smtp.163.com(网易)
        final String authorizationCode = "yswdfzftsbyvfabg"; //授权码
        Properties properties = System.getProperties();// 获取系统属性
        properties.setProperty("mail.smtp.host", host);// 设置邮件服务器
        properties.setProperty("mail.smtp.auth", "true");// 打开认证
        properties.setProperty("mail.smtp.socketFactory.port", "465");
        try {
            //QQ邮箱需要下面这段代码，163邮箱不需要
            /*MailSSLSocketFactory sf = new MailSSLSocketFactory();
            sf.setTrustAllHosts(true);
            properties.put("mail.smtp.ssl.enable", "true");
            properties.put("mail.smtp.ssl.socketFactory", sf);*/


            // 1.获取默认session对象
            Session session = Session.getDefaultInstance(properties, new Authenticator() {
                public PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication("1687488753@qq.com",authorizationCode); // 发件人邮箱账号、授权码
                }
            });

            // 2.创建邮件对象
            Message message = new MimeMessage(session);
            // 2.1设置发件人
            message.setFrom(new InternetAddress(from));
            // 2.2设置接收人
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(mail));
            // 2.3设置邮件主题
            message.setSubject(title);
            // 2.4设置邮件内容

            message.setContent(content, "text/html;charset=UTF-8");
            // 3.发送邮件
            Transport.send(message);
            flag=true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return flag;
    }
    public static void main(String[] args) {
        MailUtils.sendMail("2598665635@qq.com","1","账号激活");
        System.out.println("发送成功");
    }
}
