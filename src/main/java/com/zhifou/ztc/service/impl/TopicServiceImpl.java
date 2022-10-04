package com.zhifou.ztc.service.impl;

import com.zhifou.ztc.dao.elasticSerach.TopicES;
import com.zhifou.ztc.dao.elasticSerach.TopicESImp;
import com.zhifou.ztc.mapper.TopicMapper;
import com.zhifou.ztc.pojo.Topic;
import com.zhifou.ztc.service.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;

@Service("topicService")
public class TopicServiceImpl implements TopicService {
    @Autowired
    TopicMapper topicMapper;

    @Override
    public List<Topic> search(String key) throws IOException {
        TopicES es=new TopicESImp();
        List<Topic> list = es.Search(key);
        return list;
    }
    @Override
    public List<Topic> getAllTopic(){
        List<Topic> allTopic=null;
        //allTopic = topicDao.getAllTopic();
        allTopic = topicMapper.getAllTopic();
        return allTopic;
    }
    @Override
    public List<Topic> readTopic(int topicId){
        System.out.println(topicMapper);
        return topicMapper.readTopic(topicId);
    }
    @Override
    public Boolean updateTopic(Topic topic){
        return topicMapper.updateTopic(topic);
        //return topicDao.updateTopic(topic);
    }
    @Override
    public Boolean deleteTopic(Topic topic){
        return topicMapper.deleteTopic(topic);
        //return topicDao.deleteTopic(topic);
    }

    @Override
    public List<Topic> getSimilarTopics(List<Topic> list) {
        HashSet<String> labels = new HashSet<>();
        for (Topic topic : list){
            String label = topic.getLabel();
            String[] splitLabel = label.split(",");
            labels.addAll(Arrays.asList(splitLabel));
        }
        List<String> labelList = new ArrayList<>(labels);
        StringBuilder regex = new StringBuilder();
        for (String s : labelList){
            regex.append("|"+s);
        }
        if(regex.length()>0)
            regex.deleteCharAt(0);
        else {
            regex.append("^$");//
        }
        System.out.println(regex);
        return topicMapper.getTopicHasLabel(regex.toString());
    }
    public List<Topic> getQueForBG(){
        return topicMapper.selectForBGQueList();
    }


    @Override
    public Topic onlyOneQue(int topicId) {
        return topicMapper.onlyOneQue(topicId);
    }

    @Override
    public boolean insertTopic(String topicTitle, String topicType, String topicOption, String topicAnswer, String topicExplain, String uploadDate) {
        return topicMapper.insertTopic(topicTitle,topicType,topicOption,topicAnswer,topicExplain,uploadDate);
    }

    @Override
    public String selectTopicByTitleAndDate(String topicTitle, String uploadDate) {
        return topicMapper.selectTopicByTitleAndDate(topicTitle,uploadDate);
    }

    @Override
    public boolean updateTopicState(String state, String topicId) {
        return topicMapper.updateTopicState(state,topicId);
    }

}
