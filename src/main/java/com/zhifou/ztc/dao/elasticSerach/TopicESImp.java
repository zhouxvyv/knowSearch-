package com.zhifou.ztc.dao.elasticSerach;


import com.alibaba.fastjson.JSON;
import com.google.gson.Gson;
import com.zhifou.ztc.pojo.Topic;
import com.zhifou.ztc.mapper.TopicMapper;
import com.zhifou.ztc.utils.ClientUtils;
import org.elasticsearch.action.bulk.BulkRequest;
import org.elasticsearch.action.bulk.BulkResponse;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.common.xcontent.XContentType;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.index.query.SimpleQueryStringBuilder;
import org.elasticsearch.rest.RestStatus;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
@Service
public class TopicESImp implements TopicES {
    private RestHighLevelClient client= ClientUtils.Client();
    @Autowired
    TopicMapper topicMapper;
    @Override
    public void addition() throws IOException {
        List<Topic> list = topicMapper.add();
        addition(list);
    }
    public void addition(List<Topic> list) throws IOException {
        BulkRequest bulkRequest = new BulkRequest();
        Gson gson = new Gson();
        for (Topic topic : list) {
            String s = gson.toJson(topic);
            IndexRequest top = new IndexRequest("topic").id(topic.getTopicId() + "").source(s, XContentType.JSON);
            bulkRequest.add(top);
        }
        BulkResponse response = client.bulk(bulkRequest, RequestOptions.DEFAULT);
        RestStatus status = response.status();
    }

    @Override
    public List<Topic> Search(String s) throws IOException {
        SearchRequest searchRequest = new SearchRequest("topic");
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        SimpleQueryStringBuilder query = QueryBuilders.simpleQueryStringQuery(s).field("topicTitle").field("topicOption");
        searchSourceBuilder.query(query);
        searchSourceBuilder.from(0);
        searchSourceBuilder.size(3);
        searchRequest.source(searchSourceBuilder);
        SearchResponse response = client.search(searchRequest, RequestOptions.DEFAULT);
        SearchHits hits = response.getHits();
        SearchHit[] hits1 = hits.getHits();
        List <Topic> list=new ArrayList<>();
        for (SearchHit documentFields : hits1) {
            String sourceAsString = documentFields.getSourceAsString();
            Topic topic = JSON.parseObject(sourceAsString, Topic.class);
            list.add(topic);
        }
        return list;
    }

    @Override
    public List<Topic> SearchSame(String s) throws IOException {
        SearchRequest searchRequest = new SearchRequest("topic");
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        SimpleQueryStringBuilder query = QueryBuilders.simpleQueryStringQuery(s).field("label");
        searchSourceBuilder.query(query);
        searchSourceBuilder.from(0);
        searchSourceBuilder.size(4);
        searchRequest.source(searchSourceBuilder);
        SearchResponse response = client.search(searchRequest, RequestOptions.DEFAULT);
        SearchHits hits = response.getHits();
        SearchHit[] hits1 = hits.getHits();
        List <Topic> list=new ArrayList<>();
        for (SearchHit documentFields : hits1) {
            String sourceAsString = documentFields.getSourceAsString();
            Topic topic = JSON.parseObject(sourceAsString, Topic.class);
            list.add(topic);
        }
        return list;
    }

}
