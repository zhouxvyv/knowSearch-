package com.zhifou.ztc.service.impl;

import com.jayway.jsonpath.JsonPath;
import com.zhifou.ztc.dao.elasticSerach.TopicESImp;
import com.zhifou.ztc.mapper.AnswerMapper;
import com.zhifou.ztc.mapper.NoAnswerTopicMapper;
import com.zhifou.ztc.mapper.TopicMapper;
import com.zhifou.ztc.pojo.Answer;
import com.zhifou.ztc.pojo.Subject;
import com.zhifou.ztc.pojo.Topic;
import com.zhifou.ztc.service.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service("answerService")
public class AnswerServiceImpl implements AnswerService {

    @Autowired
    AnswerMapper answerMapper;
    @Autowired
    TopicMapper topicMapper;
    @Autowired
    NoAnswerTopicMapper noAnswerTopicMapper;
    @Autowired
    TopicESImp topicESImp;

    @Override
    public boolean addAnswer(Answer answer){
        int i = answerMapper.addAnswer(answer);
        return i!=0;
    }
    @Override
    public List<Answer> getAnswers(int topicId) {
        List<Answer> answerDomains = answerMapper.selectAnswerByTopicId(topicId);
        return answerDomains;
    }

    @Override
    public boolean deleteAnswer(int answerId) {
        return answerMapper.deleteAnswer(answerId);
    }

    @Override
    @Transactional
    public boolean confirmAnswer(int answerId) {

        Answer answer = answerMapper.getAnswer(answerId);
        Topic topic = new Topic();
        topic.setTopicTitle(answer.getNoTopic().getTopicTitle());
        topic.setTopicAnswer(answer.getAnswer());

        String expainImages = answer.getImage();
        List<String> imgs = (List<String>) JsonPath.parse(expainImages).read("$");
        StringBuilder sb = new StringBuilder();
        for (String s: imgs ){
            sb.append("<img src='"+s+"' alt='' style='max-width: 80%'></img>");
        }
        topic.setTopicExplain(sb.toString());
        topic.setSubjectId(1);
        Date date = new Date();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        topic.setUploadDate(simpleDateFormat.format(date.getTime()));
        topic.setTopicOptions(answer.getNoTopic().getOptions());
        topic.setTopicType(answer.getNoTopic().getType());

        boolean b1 = topicMapper.createTopic(topic);
        boolean b2 = answerMapper.deleteAnswerOfNotopic(answer.getNoTopic().getTopicId());
        boolean b3 = noAnswerTopicMapper.deleteTopicById(answer.getNoTopic().getTopicId());


        new Thread(){
            @Override
            public void run(){
                try {
                    topicESImp.addition();
                    System.out.println("zhouxv  asdasdas");
                } catch (IOException e) {
                    System.out.println("\n\n\nzhouxv同步搜索引擎失败\n\n\n");
                }
            }
        }.start();
        return b1&&b2&&b3;
    }
}
