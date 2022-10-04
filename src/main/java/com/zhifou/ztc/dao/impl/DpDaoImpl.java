package com.zhifou.ztc.dao.impl;


import com.zhifou.ztc.dao.DpDao;
import com.zhifou.ztc.domain.AnsDomain;
import com.zhifou.ztc.domain.DataDomain;
import com.zhifou.ztc.domain.QuesDomain;
import com.zhifou.ztc.utils.Jdbcutil;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.text.SimpleDateFormat;
import java.util.*;

@Repository("dpDao")
public class DpDaoImpl implements DpDao {
    private JdbcTemplate jdbcTemplate = new JdbcTemplate(Jdbcutil.getDataSource());

    @Override
    public int[] getRandomArray(int num, int scope){
        int[] numArray=new int[num];
        int lucky;
        boolean isContinue=true;
        for(int i=0;i<numArray.length;i++){
            do {
                lucky=(int)(Math.random()*scope);//获得随机数
                isContinue=isExistence(numArray, lucky);
            } while (isContinue);
            numArray[i]=lucky;
        }
        return numArray;
    }
    public boolean isExistence(int[] numArray,int lucky){
        for (int i : numArray) {
            if(i==lucky){
                return true;
            }
        }
        return false;
    }

    public List<QuesDomain> initUniqeQueList(int userId, int dpListId, int queAmount, int subject, String a) {//自动抽取每日一练题目，每个用户抽取的结果不重复
        String sql = "SELECT topic_id,topic_title,topic_options FROM topictable \n" +
                "where topic_type=? and topic_id not in\n" +
                "(select topic_id from dptable,testdaytopic \n" +
                "where dptable.dp_list_id=testdaytopic.dp_list_id and dptable.user_id=?)\n"+
                "limit 0,100";
        List rows = jdbcTemplate.queryForList(sql, a, userId);
        System.out.println("select ok!");
        int amount = rows.size();
        System.out.println("amount="+amount);
        Random rand = new Random();
        int[] numArray=new int[queAmount];
        numArray=getRandomArray(queAmount,amount);
        System.out.println("random ok!");
        List<QuesDomain> queList = new ArrayList<QuesDomain>();
        for (int i = 0; i < queAmount; i++) {
            Map userMap = (Map) rows.get(numArray[i]);
            QuesDomain que = new QuesDomain();
            que.setTopicSeqence(i+1);
            que.setTopicId(Integer.parseInt(userMap.get("topic_id").toString()));
            que.setTopicTitle((String) userMap.get("topic_title"));
            que.setTopicOptions((String) userMap.get("topic_options"));
            DpDao dpDao = new DpDaoImpl();
            boolean flag = dpDao.saveLOTinfo(dpListId, que.getTopicId());
            queList.add(i, que);
            System.out.println(que);
        }
        return queList;
    }
    public List<QuesDomain> initReQueList(int userId,int dpListId,int queAmount,int subject,String a){
                String sql = "SELECT topic_id,topic_title,topic_options FROM topictable \n" +
                "where topic_type=? and topic_id in\n" +
                "(select topic_id from dptable,testdaytopic \n" +
                "where dptable.dp_list_id=testdaytopic.dp_list_id and dptable.user_id=?)\n"+
                "limit 0,100";
        List rows = jdbcTemplate.queryForList(sql, a, userId);
        int amount = rows.size();
        Random rand = new Random();
        int[] numArray=new int[10];
        numArray=getRandomArray(queAmount,amount);
        List<QuesDomain> queList = new ArrayList<QuesDomain>();
        for (int i = 0; i < queAmount; i++) {
            Map userMap = (Map) rows.get(numArray[i]);
            QuesDomain que = new QuesDomain();
            que.setTopicSeqence(i+1);
            que.setTopicId(Integer.parseInt(userMap.get("topic_id").toString()));
            que.setTopicTitle((String) userMap.get("topic_title"));
            que.setTopicOptions((String) userMap.get("topic_options"));
            DpDao dpDao = new DpDaoImpl();
            boolean flag = dpDao.saveLOTinfo(dpListId, que.getTopicId());
            queList.add(i, que);
            System.out.println(que);
        }
        return queList;
    }
    public List<QuesDomain> initQueList(int userId,int dpListId,int queAmount,int subject,String a){
        String sql = "SELECT topic_id,topic_title,topic_options FROM topictable \n" +
                "where topic_type=? \n" +
                "limit 0,100";
        List rows = jdbcTemplate.queryForList(sql, a);
        int amount = rows.size();
        Random rand = new Random();
        int[] numArray=new int[queAmount];
        numArray=getRandomArray(queAmount,amount);
        List<QuesDomain> queList = new ArrayList<QuesDomain>();
        for (int i = 0; i < queAmount; i++) {
            Map userMap = (Map) rows.get(numArray[i]);
            QuesDomain que = new QuesDomain();
            que.setTopicSeqence(i+1);
            que.setTopicId(Integer.parseInt(userMap.get("topic_id").toString()));
            que.setTopicTitle((String) userMap.get("topic_title"));
            que.setTopicOptions((String) userMap.get("topic_options"));
            DpDao dpDao = new DpDaoImpl();
            boolean flag = dpDao.saveLOTinfo(dpListId, que.getTopicId());
            queList.add(i, que);
            System.out.println(que);
        }
        return queList;
    }

    public List<QuesDomain> queryDPList(int userId,String date){
        System.out.println("userID is:"+userId+"   "+"date is:"+date);
        String sql="select topic_id,topic_title,topic_options,topic_answer,topic_explain from topictable\n" +
                "where topic_id in(\n" +
                "select topic_id from testdaytopic where dp_list_id in\n" +
                "(select dp_list_id from dptable where user_id= ? and dp_date= ? ))";
        List<QuesDomain> queList=null;
        try {
            queList=jdbcTemplate.query(sql,new BeanPropertyRowMapper<QuesDomain>(QuesDomain.class),userId,date);
        } catch (DataAccessException e) {
            e.printStackTrace();
        }
        String sql2="select user_ans,istrue from testdaytopic\n" +
                "where dp_list_id in\n" +
                "(select dp_list_id from dptable where user_id= ? and dp_date=? )";
        List<QuesDomain> queList2= null; try {
            queList2 = jdbcTemplate.query(sql2,new BeanPropertyRowMapper<QuesDomain>(QuesDomain.class),userId,date);
        } catch (DataAccessException e) {
            e.printStackTrace();
        }
        String sql3="select state from dptable\n" +
                "where dp_list_id in\n" +
                "(select dp_list_id from dptable where user_id= ? and dp_date=? )";
        List<QuesDomain> queList3= null; try {
            queList3 = jdbcTemplate.query(sql3,new BeanPropertyRowMapper<QuesDomain>(QuesDomain.class),userId,date);
        } catch (DataAccessException e) {
            e.printStackTrace();
        }
        if(queList.size()==0||queList2.size()==0||queList3.size()==0){
            return null;
        }
        int state=queList3.get(0).getState();
        for(int i=0;i<queList.size();i++){
            queList.get(i).setUserAns(queList2.get(i).getUserAns());
            queList.get(i).setIstrue(queList2.get(i).getIstrue());
            queList.get(i).setTopicSeqence(i+1);
            queList.get(i).setState(state);
            System.out.println(queList.get(i));
        }
        return queList;
    }

    public int constructDp(int userId) {//创建题单，并返回题单号
        Date date = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        String dateString = formatter.format(date.getTime());
        String sql = "insert into dptable(user_id,dp_date,state) " +
                "values(?,?,0)";
        int cnt = jdbcTemplate.update(sql, userId, dateString);
        String sql2 = "select dp_list_id from dptable where user_id=? and dp_date=?";
        List rows = jdbcTemplate.queryForList(sql2, userId, dateString);
        Map tmp = (Map) rows.get(0);
        int dpId = Integer.parseInt(tmp.get("dp_list_id").toString());
        System.out.println(dpId);
        dpId = jdbcTemplate.queryForObject(sql2, Integer.class, userId, dateString);
        System.out.println(dpId);
        return dpId;
    }

    public boolean dpExistCheck(int userId) {//校验用户是否已存在每日一练
        Date date = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        String dateString = formatter.format(date.getTime());
        System.out.println("data is :"+dateString);
        String sql = "select dp_list_id from dptable where user_id=? and dp_date=?";
        List rows = jdbcTemplate.queryForList(sql, userId, dateString);
        System.out.println(rows);
        if (rows.size() > 0) {
            return true;
        } else {
            return false;
        }
    }

    public boolean saveLOTinfo(int topicListId, int topicId) {//将详细题单存入数据库
        String sql = "insert into testdaytopic (dp_list_id,topic_id) values(?,?)";
        int cnt = jdbcTemplate.update(sql, topicListId, topicId);
        if (cnt > 0)
            return true;
        else
            return false;
    }

    public List<AnsDomain> queryDpAns(int dpId){
        String sql="select topic_answer from topictable where topic_id in\n" +
                "(select topic_id from testdaytopic where dp_list_id=?)";
        List rows=jdbcTemplate.queryForList(sql,dpId);
        List<AnsDomain> ansList=new ArrayList<AnsDomain>();
        for(int i=0;i<rows.size();i++){
            AnsDomain ansDomain=new AnsDomain();
            Map ansMap = (Map) rows.get(i);
            ansDomain.setAns((String) ansMap.get("topic_answer"));
            ansDomain.setExplain((String)ansMap.get("topic_explain"));
            ansList.add(i,ansDomain);
        }
        return ansList;
    }
    public boolean updateUserAns(String[] userAns,int dpId,int userId){
        System.out.println(dpId);
        System.out.println(userId);
        String sql1="select topic_id from testdaytopic where dp_list_id=?";//获取题号
        String sql2="update testdaytopic set user_ans=? where dp_list_id=? and topic_id=?";//存入用户答案
        String sql3="update dptable set state=1 where dp_list_id=? and user_id=?";
        List rows=jdbcTemplate.queryForList(sql1,dpId);
        System.out.println(rows);
        List<QuesDomain> quesList=new ArrayList<QuesDomain>();
        int cnt=0;
        for(int i=0;i<rows.size();i++){
            Map ansMap = (Map) rows.get(i);
            cnt=jdbcTemplate.update(sql2,userAns[i+1],dpId,Integer.parseInt(ansMap.get("topic_id").toString()));
            System.out.println("cnt is "+cnt);
            cnt=0;
        }
        try {
            cnt=jdbcTemplate.update(sql3,dpId,userId);
        } catch (DataAccessException e) {
            e.printStackTrace();
        }
        return true;
    }
    public boolean updateTopicState(List<AnsDomain> ansList,String userAns[],int dpId,int userid){
        String sql1="select topic_id from testdaytopic where dp_list_id=?";
        String sql2="update testdaytopic set istrue=? where dp_list_id=? and topic_id=?";
        String a="true";
        String b="false";
        List rows=jdbcTemplate.queryForList(sql1,dpId);
        List<QuesDomain> quesList=new ArrayList<QuesDomain>();
        int cnt=0;
        DpDao dpDao=new DpDaoImpl();
        for(int i=0;i<rows.size();i++){

            Map ansMap = (Map) rows.get(i);
            String ans1=ansList.get(i).getAns();
            if(ans1.equals(userAns[i+1])){
                cnt=jdbcTemplate.update(sql2,a,dpId,Integer.parseInt(ansMap.get("topic_id").toString()));
            }else{
                cnt=jdbcTemplate.update(sql2,b,dpId,Integer.parseInt(ansMap.get("topic_id").toString()));
                dpDao.updateMistakeInfo(Integer.parseInt(ansMap.get("topic_id").toString()),userid);
            }
        }
        return true;
    }
    public boolean updateMistakeInfo(int topicID,int userID){
        Date date=new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String dateString = formatter.format(date.getTime());
        String sql="insert into mistake (mistake_time,topic_id,user_id) values(?,?,?)";
        int cnt = jdbcTemplate.update(sql, dateString,topicID, userID);
        if (cnt > 0)
            return true;
        else
            return false;
    }
    public int queryDpId(int userId,String date){
        System.out.println(userId+date);
        String sql="select dp_list_id from dptable where user_id=? and dp_date=?";
        List rows= null;
        try {
            rows = jdbcTemplate.queryForList(sql,userId,date);
        } catch (DataAccessException e) {
            e.printStackTrace();
        }
        if(rows.size()==0)
            return 0;
        Map ansMap = (Map) rows.get(0);
        int dpId=Integer.parseInt(ansMap.get("dp_list_id").toString());
        System.out.println(dpId);
        return dpId;
    }

    public int getPracticeTimes(int userid,String date){
        String sql="select count(*) from dptable \n" +
                "where user_id=? and state=1 \n" +
                "and dp_date like ?";
        int ans=0;
        try {
            ans=jdbcTemplate.queryForObject(sql,Integer.class,userid,date);
        } catch (DataAccessException e) {
            e.printStackTrace();
        }
        return ans;
    }
    public int trueAnswerAmount(int userid){
        String sql="select count(*) from testdaytopic\n" +
                "where istrue='true' and dp_list_id in\n" +
                "(select dp_list_id from dptable where user_id=?)";
        int ans=0;
        try {
            ans=jdbcTemplate.queryForObject(sql,Integer.class,userid);
        } catch (DataAccessException e) {
            e.printStackTrace();
        }
        return ans;
    }
    public int answerAmount(int userid){
        String sql="select count(*) from testdaytopic\n" +
                "where dp_list_id in\n" +
                "(select dp_list_id from dptable where user_id=? and state=1)";
        int ans=0;
        try {
            ans=jdbcTemplate.queryForObject(sql,Integer.class,userid);
        } catch (DataAccessException e) {
            e.printStackTrace();
        }
        return ans;
    }
    public int todayUserAnswer(int userid,String date,int flag){
        String sql1="select count(*) from testdaytopic\n" +
                "where istrue='false' and dp_list_id in\n" +
                "(select dp_list_id from dptable where user_id=? and state=1 and dp_date=?)";
        String sql2="select count(*) from testdaytopic\n" +
                "where istrue='true' and dp_list_id in\n" +
                "(select dp_list_id from dptable where user_id=? and state=1 and dp_date=?)";
        int ans=0;
        if(flag==0){
            try {
                ans=jdbcTemplate.queryForObject(sql1,Integer.class,userid,date);
            } catch (DataAccessException e) {
                e.printStackTrace();
            }
            return ans;
        }else{
            try {
                ans=jdbcTemplate.queryForObject(sql2,Integer.class,userid,date);
            } catch (DataAccessException e) {
                e.printStackTrace();
            }
            return ans;
        }
    }
    public int monthlyTrueAnswerAmount(int userid,String date){
        String sql="select count(*) from testdaytopic\n" +
                "where istrue='true'and dp_list_id in\n" +
                "(select dp_list_id from dptable where user_id=? and dp_date like ?)";
        int ans=0;
        try {
            ans=jdbcTemplate.queryForObject(sql,Integer.class,userid,date);
        } catch (DataAccessException e) {
            e.printStackTrace();
        }
        return ans;
    }
    public int monthlyAnswerAmount(int userid,String date){
        String sql="select count(*) from testdaytopic\n" +
                "where dp_list_id in\n" +
                "(select dp_list_id from dptable where user_id=? and dp_date like ?)";
        int ans=0;
        try {
            ans=jdbcTemplate.queryForObject(sql,Integer.class,userid,date);
        } catch (DataAccessException e) {
            e.printStackTrace();
        }
        return ans;
    }
    public int LMtrueAnswerAmount(int userid,String targetDate){
        String sql="select count(*) from testdaytopic\n" +
                "where istrue='true' and dp_list_id in\n" +
                "(select dp_list_id from dptable where user_id=? and state=1 and dp_date<?)";
        int ans=0;
        try {
            ans=jdbcTemplate.queryForObject(sql,Integer.class,userid,targetDate);
        } catch (DataAccessException e) {
            e.printStackTrace();
        }
        return ans;
    }
    public int LManswerAmount(int userid,String targetDate){
        String sql="select count(*) from testdaytopic\n" +
                "where dp_list_id in\n" +
                "(select dp_list_id from dptable where user_id=? and state=1 and dp_date<?)";
        int ans=0;
        try {
            ans=jdbcTemplate.queryForObject(sql,Integer.class,userid,targetDate);
        } catch (DataAccessException e) {
            e.printStackTrace();
        }
        return ans;
    }
    public int LDUserAnswer(int userid,int flag){
        String sql1="select count(*) from testdaytopic\n" +
                "where istrue='false' and dp_list_id =\n" +
                "(select dp_list_id from dptable where user_id=? and state=1\n" +
                "order by dp_date desc \n" +
                "limit 1 offset 2)";
        String sql2="select count(*) from testdaytopic\n" +
                "where istrue='true' and dp_list_id =\n" +
                "(select dp_list_id from dptable where user_id=? and state=1\n" +
                "order by dp_date desc \n" +
                "limit 1 offset 2)";
        int ans=0;
        if(flag==0){
            try {
                ans=jdbcTemplate.queryForObject(sql1,Integer.class,userid);
            } catch (DataAccessException e) {
                e.printStackTrace();
            }
            return ans;
        }else{
            try {
                ans=jdbcTemplate.queryForObject(sql2,Integer.class,userid);
            } catch (DataAccessException e) {
                e.printStackTrace();
            }
            return ans;
        }
    }

    public List<QuesDomain> queryCurrentFalseQueList(int userId,String date){
        System.out.println("userID is:"+userId+"   "+"date is:"+date);
        String sql="select topic_id,topic_title,topic_options,topic_answer,topic_explain from topictable \n" +
                "where topic_id in(select topic_id from testdaytopic where istrue='false' and dp_list_id in\n" +
                "(select dp_list_id from dptable where user_id= ? and dp_date= ? ))";
        List<QuesDomain> queList=null;
        try {
            queList=jdbcTemplate.query(sql,new BeanPropertyRowMapper<QuesDomain>(QuesDomain.class),userId,date);
        } catch (DataAccessException e) {
            e.printStackTrace();
        }
        String sql2="select user_ans,istrue from testdaytopic\n" +
                "where istrue='false' and dp_list_id in\n" +
                "(select dp_list_id from dptable where user_id= ? and dp_date=? )";
        List<QuesDomain> queList2= null;
        try {
            queList2 = jdbcTemplate.query(sql2,new BeanPropertyRowMapper<QuesDomain>(QuesDomain.class),userId,date);
        } catch (DataAccessException e) {
            e.printStackTrace();
        }
        String sql3="select state from dptable\n" +
                "where dp_list_id in\n" +
                "(select dp_list_id from dptable where user_id= ? and dp_date=? )";
        List<QuesDomain> queList3= null;
        try {
            queList3 = jdbcTemplate.query(sql3,new BeanPropertyRowMapper<QuesDomain>(QuesDomain.class),userId,date);
        } catch (DataAccessException e) {
            e.printStackTrace();
        }
        if(queList.size()==0||queList2.size()==0||queList3.size()==0){
            return null;
        }
        int state=queList3.get(0).getState();
        for(int i=0;i<queList.size();i++){
            queList.get(i).setUserAns(queList2.get(i).getUserAns());
            queList.get(i).setIstrue(queList2.get(i).getIstrue());
            queList.get(i).setTopicSeqence(i+1);
            queList.get(i).setState(state);
            System.out.println(queList.get(i));
        }
        return queList;
    }
    public List<Map<String, Object>> queryDpDay(int userId, String date){
        String sql="select dp_date from dptable\n" +
                "where user_id=? and state=1 and dp_date like ?";
        List<Map<String, Object>> ansDate = new ArrayList<>();
        try {
            ansDate=jdbcTemplate.queryForList(sql,userId,date);
        } catch (DataAccessException e) {
            e.printStackTrace();
        }
        System.out.println(ansDate);
        return ansDate;
    }
    public boolean updataUserDPData(DataDomain dataDomain){
        String sql="update usercurdata\n" +
                "set state=?,practiceTime=?,ptRate=?,totalSCRate=?,userCorrectAns=?,rightRate=?,userFalseAns=?,falseRate=?,userTotalAns=?,timesData=?,rateData=?,totalRate=?\n" +
                "where user_id=2";
        int cnt = jdbcTemplate.update(sql,dataDomain.getState(),dataDomain.getPracticeTime(),dataDomain.getPtRate(),dataDomain.getTotalRate(),dataDomain.getUserCorrectAns(),
                dataDomain.getRightRate(),dataDomain.getUserFalseAns(),dataDomain.getFalseRate(),dataDomain.getUserTotalAns(),dataDomain.getTimesData(),dataDomain.getRateData(),dataDomain.getTotalRate());
        boolean flag=false;
        if(cnt>0){
            flag=true;
        }
        return flag;
    }
    public List<DataDomain> queryUserDPData(int userid){
        String sql="select * from usercurdata where user_id=?";
        List<DataDomain> dataDomains=jdbcTemplate.query(sql,new BeanPropertyRowMapper<DataDomain>(DataDomain.class),userid);
        return dataDomains;
    }
}
