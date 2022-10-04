package com.zhifou.ztc.service;

import com.zhifou.ztc.pojo.User;

public interface MailService {
    public boolean send(String mail, String content, String title);
    public boolean updateMail(User userDomain);
}
