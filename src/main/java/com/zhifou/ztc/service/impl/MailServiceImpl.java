package com.zhifou.ztc.service.impl;


import com.zhifou.ztc.pojo.User;
import com.zhifou.ztc.mapper.UserMapper;
import com.zhifou.ztc.service.MailService;
import com.zhifou.ztc.utils.MailUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("mailService")
public class MailServiceImpl implements MailService {
    @Autowired
    UserMapper userMapper;

    @Override
    public boolean send(String mail,String content,String title){
        boolean flag = MailUtils.sendMail(mail, content, title);
        return flag;
    }
    @Override
    public boolean updateMail(User userDomain) {
        boolean flag = userMapper.updateEmail(userDomain);
        return  flag;
    }
}
