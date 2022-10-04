package com.zhifou.ztc.listener;

import com.zhifou.ztc.mapper.UserMapper;
import com.zhifou.ztc.pojo.User;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.web.context.ContextCleanupListener;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import java.util.Calendar;
import java.util.Date;
import java.util.Timer;
import java.util.TimerTask;

public class UserServletContextListener implements ServletContextListener {

    public void contextInitialized(ServletContextEvent event) {
        Calendar date = Calendar.getInstance();


        if(date.get(Calendar.HOUR)>2)
            date.set(date.get(Calendar.YEAR), date.get(Calendar.MONTH), date.get(Calendar.DATE)+1, 2, 0, 0);
        else
            date.set(date.get(Calendar.YEAR), date.get(Calendar.MONTH), date.get(Calendar.DATE), 2, 0, 0);

        long daySpan = 1000*60*60*24;
        Timer t = new Timer();

        //分离定时操作与业务的进程所使用的资源
        ApplicationContext app = new ClassPathXmlApplicationContext("spring-context-config.xml");
        final UserMapper userMapper = (UserMapper) app.getBean("userMapper");
        userMapper.updateDefaultUser(3);

        t.schedule(new TimerTask() {

            public void run() {
                System.out.println("定时器执行..");
                int i = userMapper.updateDefaultUser(3);
            }

        }, date.getTime(), daySpan);
    }

    public void contextDestroyed(ServletContextEvent event) {
    }


}
