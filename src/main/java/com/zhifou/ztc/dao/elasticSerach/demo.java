package com.zhifou.ztc.dao.elasticSerach;


import com.alibaba.fastjson.JSON;
import com.google.gson.Gson;
import com.zhifou.ztc.domain.Domainct.Person;
import com.zhifou.ztc.domain.Domainct.BookTable;
import com.zhifou.ztc.utils.ClientUtils;
import org.elasticsearch.action.bulk.BulkRequest;
import org.elasticsearch.action.bulk.BulkResponse;
import org.elasticsearch.action.delete.DeleteRequest;
import org.elasticsearch.action.delete.DeleteResponse;
import org.elasticsearch.action.get.GetRequest;
import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.action.update.UpdateRequest;
import org.elasticsearch.client.IndicesClient;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.client.indices.CreateIndexRequest;
import org.elasticsearch.client.indices.CreateIndexResponse;
import org.elasticsearch.client.indices.GetIndexRequest;
import org.elasticsearch.client.indices.GetIndexResponse;
import org.elasticsearch.cluster.metadata.MappingMetadata;
import org.elasticsearch.common.xcontent.XContentType;
import org.elasticsearch.index.query.*;
import org.elasticsearch.rest.RestStatus;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.sort.SortOrder;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class demo {
    private RestHighLevelClient client;
    @Test
    public  void add() throws IOException {
        client= ClientUtils.Client();
        IndicesClient indices = client.indices();
        CreateIndexRequest first = new CreateIndexRequest("first2");
        CreateIndexResponse createIndexResponse = indices.create(first, RequestOptions.DEFAULT);
        System.out.println(createIndexResponse.isAcknowledged());
    }
    @Test
    public void select() throws Exception{
        client=ClientUtils.Client();
        IndicesClient indices = client.indices();
        GetIndexRequest getIndexRequest = new GetIndexRequest("index_01");
        GetIndexResponse getIndexResponse = indices.get(getIndexRequest, RequestOptions.DEFAULT);
        Map<String, MappingMetadata> mappings = getIndexResponse.getMappings();
        for (String s : mappings.keySet()) {
            System.out.println(s+":"+mappings.get(s).getSourceAsMap());
        }
    }
    @Test
    public void addDoc() throws Exception{
        client = ClientUtils.Client();
        Person person = new Person();
        person.setId("2");
        person.setName("李四");
        person.setAge(21);
        person.setAddress("北京朝阳");
        Gson gson = new Gson();
        String data = gson.toJson(person);
        IndexRequest indexRequest = new IndexRequest("index_01").id(person.getId()).source(data, XContentType.JSON);
        IndexResponse indexResponse = client.index(indexRequest, RequestOptions.DEFAULT);
        System.out.println(indexResponse.getId());
    }
    @Test
    public void update1() throws Exception{
        client=ClientUtils.Client();
        GetRequest Request = new GetRequest("index_01","1");
        GetResponse response = client.get(Request, RequestOptions.DEFAULT);
        System.out.println(response.getSourceAsMap());
    }
    @Test
    public void delete() throws Exception{
        client=ClientUtils.Client();
        DeleteRequest delete=new DeleteRequest("index_01","2");
        DeleteResponse response = client.delete(delete, RequestOptions.DEFAULT);
        System.out.println(response);
    }
    @Test
    public void bulk() throws  Exception{
        client=ClientUtils.Client();
        BulkRequest bulkRequest = new BulkRequest();

        DeleteRequest deleteRequest = new DeleteRequest("index_01","1");
        bulkRequest.add(deleteRequest);

        Person p = new Person();
        p.setName("9号");
        Gson gson = new Gson();
        String data = gson.toJson(p);
        IndexRequest indexRequest = new IndexRequest("index_01").id("9").source(data,XContentType.JSON);
        bulkRequest.add(indexRequest);

        Person p1 = new Person();
        p1.setName("9号");
        Gson gson1 = new Gson();
        String data1 = gson1.toJson(p);
        UpdateRequest updateRequest = new UpdateRequest("index_01","8").doc(data1,XContentType.JSON);
        bulkRequest.add(updateRequest);
        BulkResponse response= client.bulk(bulkRequest, RequestOptions.DEFAULT);
        RestStatus status = response.status();
    }
    /*@Test
    public void addition() throws IOException {
        TableDao bookTableDao = new topicTableImp();
        List<bookTable> list = bookTableDao.add();
        BulkRequest bulkRequest = new BulkRequest();
        client=ClientUtils.Client();
        Gson gson = new Gson();
        for (bookTable s:list ) {
            String data = gson.toJson(s);
            IndexRequest indexRequest = new IndexRequest("index_01").id(s.getBook_id()+"").source(data,XContentType.JSON);
            bulkRequest.add(indexRequest);
        }
        BulkResponse response = client.bulk(bulkRequest, RequestOptions.DEFAULT);
        RestStatus status = response.status();
    }*/
    @Test
    public void matchAll() throws IOException {
        client=ClientUtils.Client();
        SearchRequest searchRequest=new SearchRequest("index_01");
        SearchSourceBuilder sourceBuilder=new SearchSourceBuilder();
        QueryBuilder query= QueryBuilders.matchAllQuery();
        sourceBuilder.query(query);
        sourceBuilder.from(0);
        sourceBuilder.size(20);
        searchRequest.source(sourceBuilder);
        SearchResponse searchResponse = client.search(searchRequest, RequestOptions.DEFAULT);
        SearchHits hits = searchResponse.getHits();
        long value = hits.getTotalHits().value;
        System.out.println(value);

        List<BookTable> list=new ArrayList<>();
        SearchHit[] hits1 = hits.getHits();
        for (SearchHit documentFields : hits1) {
            String sourceAsString = documentFields.getSourceAsString();
            BookTable bookTable = JSON.parseObject(sourceAsString, BookTable.class);
            list.add(bookTable);
        }
        for (BookTable bookTable : list) {
            System.out.println(bookTable);
        }
    }
    @Test
    public void termQuery() throws IOException {
        client=ClientUtils.Client();
        SearchRequest searchRequest = new SearchRequest("index_01");
        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
        QueryBuilder query=QueryBuilders.termQuery("book_name","中国植物");
        sourceBuilder.query(query);
        searchRequest.source(sourceBuilder);
        SearchResponse search = client.search(searchRequest, RequestOptions.DEFAULT);
        SearchHits hits = search.getHits();
        SearchHit[] hits1 = hits.getHits();
        List<BookTable> list=new ArrayList<>();
        for (SearchHit documentFields : hits1) {
            String sourceAsString = documentFields.getSourceAsString();
            BookTable bookTable = JSON.parseObject(sourceAsString, BookTable.class);
            list.add(bookTable);
        }
        for (BookTable bookTable : list) {
            System.out.println(bookTable);
        }
        long value = hits.getTotalHits().value;
        System.out.println(value);
    }
    @Test
    public void MatchQuery() throws IOException {
        client=ClientUtils.Client();
        SearchRequest searchRequest = new SearchRequest("index_01");
        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
        MatchQueryBuilder query = QueryBuilders.matchQuery("book_name", "中国植物");
        query.operator(Operator.AND);//求并集
        sourceBuilder.query(query);
        searchRequest.source(sourceBuilder);
        SearchResponse search = client.search(searchRequest, RequestOptions.DEFAULT);
        SearchHits hits = search.getHits();
        SearchHit[] hits1 = hits.getHits();
        List<BookTable> list=new ArrayList<>();
        for (SearchHit documentFields : hits1) {
            String sourceAsString = documentFields.getSourceAsString();
            BookTable bookTable = JSON.parseObject(sourceAsString, BookTable.class);
            list.add(bookTable);
        }
        for (BookTable bookTable : list) {
            System.out.println(bookTable);
        }
        long value = hits.getTotalHits().value;
        System.out.println(value);
    }
    //模糊查询 wildcard regex prefix
    @Test
    public void Match() throws IOException {
        client=ClientUtils.Client();
        SearchRequest searchRequest = new SearchRequest("index_01");
        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
        PrefixQueryBuilder query = QueryBuilders.prefixQuery("book_name","天");
        /*
        RegexpQueryBuilder query = QueryBuilders.regexpQuery("book_name","\\w+(.)*");
        WildcardQueryBuilder query = QueryBuilders.wildcardQuery("book_name","天");*/
        sourceBuilder.query(query);
        searchRequest.source(sourceBuilder);
        SearchResponse search = client.search(searchRequest, RequestOptions.DEFAULT);
        SearchHits hits = search.getHits();
        SearchHit[] hits1 = hits.getHits();
        List<BookTable> list=new ArrayList<>();
        for (SearchHit documentFields : hits1) {
            String sourceAsString = documentFields.getSourceAsString();
            BookTable bookTable = JSON.parseObject(sourceAsString, BookTable.class);
            list.add(bookTable);
        }
        for (BookTable bookTable : list) {
            System.out.println(bookTable);
        }
        long value = hits.getTotalHits().value;
        System.out.println(value);
    }

    //范围查询
    @Test
    public void Range() throws IOException {
        client=ClientUtils.Client();
        SearchRequest searchRequest = new SearchRequest("index_01");
        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
        RangeQueryBuilder query = QueryBuilders.rangeQuery("book_id");
        query.gte(10);
        query.lte(25);
        sourceBuilder.query(query);
        sourceBuilder.sort("book_id", SortOrder.DESC);
        //设置降序排列
        searchRequest.source(sourceBuilder);
        SearchResponse search = client.search(searchRequest, RequestOptions.DEFAULT);
        SearchHits hits = search.getHits();
        SearchHit[] hits1 = hits.getHits();
        List<BookTable> list=new ArrayList<>();
        for (SearchHit documentFields : hits1) {
            String sourceAsString = documentFields.getSourceAsString();
            BookTable bookTable = JSON.parseObject(sourceAsString, BookTable.class);
            list.add(bookTable);
        }
        for (BookTable bookTable : list) {
            System.out.println(bookTable);
        }
        long value = hits.getTotalHits().value;
        System.out.println(value);
    }

    //多词条查询
    @Test
    public void more() throws IOException {
        client=ClientUtils.Client();
        SearchRequest searchRequest = new SearchRequest("index_01");
        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
        QueryStringQueryBuilder query = QueryBuilders.queryStringQuery("天国").field("book_name").field("book_introduction").defaultOperator(Operator.OR);
        sourceBuilder.query(query);
        sourceBuilder.sort("book_id", SortOrder.DESC);
        //设置降序排列
        searchRequest.source(sourceBuilder);
        SearchResponse search = client.search(searchRequest, RequestOptions.DEFAULT);
        SearchHits hits = search.getHits();
        SearchHit[] hits1 = hits.getHits();
        List<BookTable> list=new ArrayList<>();
        for (SearchHit documentFields : hits1) {
            String sourceAsString = documentFields.getSourceAsString();
            BookTable bookTable = JSON.parseObject(sourceAsString, BookTable.class);
            list.add(bookTable);
        }
        for (BookTable bookTable : list) {
            System.out.println(bookTable);
        }
        long value = hits.getTotalHits().value;
        System.out.println(value);
    }


    //聚合查询
    @Test
    public void agg() throws IOException {
        client=ClientUtils.Client();
        SearchRequest searchRequest = new SearchRequest("index_01");
        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
        MatchQueryBuilder query = QueryBuilders.matchQuery("book_name", "天空");
        sourceBuilder.query(query);
        /*桶查询
        AggregationBuilder agg= AggregationBuilders.terms("name").field("book_name");
        sourceBuilder.aggregation(agg);*/
        sourceBuilder.sort("book_id", SortOrder.DESC);
        //设置降序排列
        searchRequest.source(sourceBuilder);
        SearchResponse search = client.search(searchRequest, RequestOptions.DEFAULT);

        /*将结果转换为相应格式输出
        Aggregations aggregations = search.getAggregations();
        Map<String, Aggregation> asMap = aggregations.getAsMap();
        Terms name = (Terms) asMap.get("name");
        List<? extends Terms.Bucket> buckets = name.getBuckets();
        List list=new ArrayList();
        for (Terms.Bucket bucket : buckets) {
            Object key = bucket.getKey();
            list.add(key);
        }
        for (Object o : list) {
            System.out.println(o);
        }*/
        SearchHits hits = search.getHits();
        SearchHit[] hits1 = hits.getHits();
        List<BookTable> list=new ArrayList<>();
        for (SearchHit documentFields : hits1) {
            String sourceAsString = documentFields.getSourceAsString();
            BookTable bookTable = JSON.parseObject(sourceAsString, BookTable.class);
            list.add(bookTable);
        }
        for (BookTable bookTable : list) {
            System.out.println(bookTable);
        }
        long value = hits.getTotalHits().value;
        System.out.println(value);
    }


}
