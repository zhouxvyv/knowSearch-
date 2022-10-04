package com.zhifou.ztc.utils;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import javax.sql.DataSource;

public class Jdbcutil {
        public static DataSource source=new ComboPooledDataSource();
        public static DataSource getDataSource(){return source;}
        /*public static ApplicationContext app= new ClassPathXmlApplicationContext("applicationContext.xml");
        public static DataSource dataSource=app.getBean(DataSource.class);
        public static DataSource getDataSource(){return dataSource;}*/
}
