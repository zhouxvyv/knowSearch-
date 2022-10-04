package com.zhifou.ztc.service.impl;

import com.zhifou.ztc.dao.elasticSerach.TopicESImp;
import com.zhifou.ztc.mapper.TestMapper;
import com.zhifou.ztc.mapper.TopicMapper;
import com.zhifou.ztc.pojo.Test;
import com.zhifou.ztc.pojo.Topic;
import com.zhifou.ztc.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.*;

@Service("testService")
public class TestServiceImpl implements TestService {
    @Autowired
    TestMapper testMapper;
    @Autowired
    TopicMapper topicMapper;

    @Override
    public List<Test> getTest(String testName, int pageIndex, int pageSize){
        List<Test> pageTest;
        //pageTest = testMapper.getPageTest(testName, pageIndex, pageSize);
        pageTest = testMapper.getPageTest(testName, pageIndex, pageSize);
        return pageTest;
        //return testDao.getPageTest(testName,pageIndex,pageSize);
    }
    @Override
    public List<Test> getTest(String testName,List<Topic> topicByText) throws IOException {
        //  简单匹配,分两步获取题目列表
        //  List<Test> testByName;
        //  testByName = testMapper.getTestNameLikeText(testName);
        // 查询含有该题目的试卷
        //  List<Test> testByTopic = getTestByHasTopicLikeText(testName);
        // 合并
        //  testByName.addAll(testByTopic);
        //  ArrayList<Test> testDomains = new ArrayList<>(testByName);


        // 获取相应题目
        /*TopicESImp topicESImp = new TopicESImp();
        List<Topic> topicByText = null;
        try {
            topicByText = topicESImp.Search(testName);
        } catch (Exception e) {
            System.out.println("Exception-------当前搜索引擎不存在-----------改用默认数据");
            topicByText = topicMapper.getAllTopic();
        }*/
        if(testName.equals("")||testName.length()>10)
            testName = "^$";
        List<Test> testList = testMapper.getTestNameLikeTextOrHasTopic(testName, topicByText);

        return testList;
    }
    @Override
    public List<Test> getTestByHasTopicLikeText(String text){
        TopicESImp topicESImp = new TopicESImp();
        List<Topic> list = null;
        try {
            list = topicESImp.Search(text);
        } catch (Exception e) {
            System.out.println("Exception-------当前搜索引擎不存在-----------改用默认数据");
            list = topicMapper.getAllTopic();
        }
        return getTestByTopic(list);
    }

    @Override
    public List<Test> getTestByTopic(List<Topic> topicList) {
        if(topicList.size()>0){

            return testMapper.getTestByTopic(topicList);
        }else {
            return new ArrayList<>();
        }
    }

    @Override
    public boolean addLikeTest(int userId, int testId){
        if(!testMapper.deleteLikeTest(userId, testId)){
            testMapper.addLikeTest(userId,testId,new Timestamp(new Date().getTime()));
            return true;
        }
        return false;
    }
    @Override
    public List<Test> getLikeTest(int userId) {
        return testMapper.getLikeTest(userId);
    }


    @Override
    public boolean insertOnePaper(String paperName,String uploadTime) {
        System.out.println(paperName);
        return testMapper.insertOnePaper(paperName, uploadTime);
    }

    @Override
    public String selectByNameAndDate(String paperName, String uploadTime) {
        return testMapper.selectByNameAndDate(paperName,uploadTime);
    }

    @Override
    public boolean isnertQueToPaper(String paperId, String queId, int queOrder) {
        return testMapper.isnertQueToPaper(paperId, queId, queOrder);
    }

    @Override
    public List<Test> selectTest() {
        return testMapper.selectTest();
    }

    @Override
    public boolean updateTestState(String state, String testId) {
        return testMapper.updateTestState(state,testId);
    }

    @Override
    public List<Topic> getTestTopicList(int testId) {
        return testMapper.getTestTopicList(testId);
    }
}
