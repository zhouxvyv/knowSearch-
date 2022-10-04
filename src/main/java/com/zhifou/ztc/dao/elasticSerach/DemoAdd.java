package com.zhifou.ztc.dao.elasticSerach;

import com.zhifou.ztc.mapper.TopicMapper;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.io.IOException;

public class DemoAdd {

    public static void main(String[] args) throws IOException {
        ApplicationContext app = new ClassPathXmlApplicationContext("spring-context-config.xml");
        TopicESImp bean = app.getBean(TopicESImp.class);
        TopicMapper bean1 = app.getBean(TopicMapper.class);
        bean.addition(bean1.add());
    }
}
