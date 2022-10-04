package com.zhifou.ztc.service.impl;

import com.zhifou.ztc.dao.DpDao;
import com.zhifou.ztc.domain.AnsDomain;
import com.zhifou.ztc.domain.DataDomain;
import com.zhifou.ztc.domain.QuesDomain;
import com.zhifou.ztc.service.DpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

@Service("dpService")
public class DpServiceImpl implements DpService {
    @Autowired
    @Qualifier("dpDao")
    private DpDao dpDao ;


    public List<QuesDomain> constructDpList(int userId,int difficulty,int state,int amount,int subject,int type) {
        //收到用户id， 判断是否已经存在当日每日一练题单
        System.out.println("constructDpList");
        System.out.println("userId is:"+userId);
        boolean flag = dpDao.dpExistCheck(userId);
        int dpListId = 0;
        List<QuesDomain> topicList = new ArrayList<QuesDomain>();
        if (flag) {//若已经存在，操作结束，返回
            Date date = new Date();
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
            String dateString = formatter.format(date.getTime());
            topicList=dpDao.queryDPList(userId,dateString);
            System.out.println("constructDpList end");
            return topicList;
        } else {//若不存在，开始创建题单
            String a = "单选题";
            String b = "问答题";
            String c="";
            if(type==1){
                c=a;
            }else if(type==2){
                c=b;
            }else if(type==3){
                c="'单选题' or topic_type='问答题'";
            }
            dpListId = dpDao.constructDp(userId);//创建题单，获取题单号
            if (state==1){
                topicList = dpDao.initUniqeQueList(userId, dpListId,amount,subject,a);//抽取从未练习过的题目，并将题单信息存入数据库
            }else if(state==2){
                topicList = dpDao.initQueList(userId, dpListId,amount,subject,a);//随机抽取题目，并将题单信息存入数据库
            }else{
                topicList = dpDao.initReQueList(userId, dpListId,amount,subject,a);//抽取已练习过的题目，并将题单信息存入数据库
            }
            System.out.println("constructDpList end");
            return topicList;
        }
    }

    public List<QuesDomain> queryDPList(int userId, String date) {//已存在题单，搜索题目信息
        List<QuesDomain> queList = dpDao.queryDPList(userId, date);
        return queList;
    }
    public boolean ansJudgement(List<AnsDomain> ansList, String userAns[], int dpId, int userid){
        return dpDao.updateTopicState(ansList,userAns,dpId,userid);
    }
    public List<AnsDomain> queryDpAns(int dpId){
        return dpDao.queryDpAns(dpId);
    }
    public boolean updateUserAns(String[] userAns,int dpId,int userId){
        return dpDao.updateUserAns(userAns,dpId,userId);
    }
    public int queryDpId(int userId,String date){
        return dpDao.queryDpId(userId,date);
    }
    public int getPracticeTimes(int userid,String date){
        return dpDao.getPracticeTimes(userid,date);
    }
    public double correctRate(int userid){
        int correctAmount=dpDao.trueAnswerAmount(userid);
        int answerAmount=dpDao.answerAmount(userid);
        double ans=0;
        if(correctAmount!=0&&answerAmount!=0){
            ans=(double)(correctAmount*100)/(double)answerAmount;
        }else{
            ans=0;
        }
        String tmp= String.format("%.2f",ans);
        ans=Double.parseDouble(tmp);
        return ans;
    }
    public int todayUserAnswer(int userid,String date,int flag){
        return dpDao.todayUserAnswer(userid,date,flag);
    }
    public double monthlyCorrectRate(int userid, String date){
        int trueAnsAmount=dpDao.monthlyTrueAnswerAmount(userid,date);
        int ansAmount= dpDao.monthlyAnswerAmount(userid,date);
        /*System.out.println("true is :"+trueAnsAmount+"total is:"+ansAmount);*/
        double ans=(double)(trueAnsAmount*100)/(double) ansAmount;
        if(trueAnsAmount==0||ansAmount==0)
            ans=0;
        String tmp= String.format("%.2f",ans);
        ans=Double.parseDouble(tmp);
        return ans;
    }
    public double rateCoculate(double a,double b){
        double ans=(double) ((a-b)*100)/(double) b;
        String tmp= String.format("%.2f",ans);
        ans=Double.parseDouble(tmp);
        return ans;

    }
    public double LMCorrectRate(int userid,String targetDate){
        int correctAmount=dpDao.LMtrueAnswerAmount(userid,targetDate);
        int answerAmount=dpDao.LManswerAmount(userid,targetDate);
        double ans=(double)(correctAmount*100)/(double)answerAmount;
        if(correctAmount==0||answerAmount==0)
            ans=0;
        String tmp= String.format("%.2f",ans);
        ans=Double.parseDouble(tmp);
        return ans;
    }
    public int LDUserAns(int userid,int flag){
        return dpDao.LDUserAnswer(userid,flag);
    }
    public List<QuesDomain> queryCurrentFalseQueList(int userId,String date){
        return dpDao.queryCurrentFalseQueList(userId,date);
    }

    public boolean dpExistCheck(int userid){
        return dpDao.dpExistCheck(userid);
    }

    public int[] queryDPDay(int userId,String ddate,int month,int year){
        List<Map<String,Object>> date=dpDao.queryDpDay(userId,ddate);
        int size=date.size();
        int days=0;

        if(month==2){
            boolean b1 = year%4==0;
            boolean b2 = year%100!=0;
            boolean b3 = year%400==0;
            if(b1&&b2||b3){
                days=29;
            }else{
                days=28;
            }
        }else{
            if(month==1||month==3||month==5||month==7||month==8||month==10||month==12)
                days=31;
            else{
                days=30;
            }
        }
        int[] ansDay=new int[days+1];
        for(int i=0;i<size;i++){
            Date tmp=(Date) date.get(i).get("dp_date");
            Calendar cal=Calendar.getInstance();
            cal.setTime(tmp);
            int day=cal.get(Calendar.DATE);
            ansDay[day]=1;
        }
        return ansDay;
    }

    public void updataUserDpData(int userid){
        int practiceTimes = 0;
        double totalRate = 0;
        int userCorrectAns = 0;
        int userFalseAns = 0;
        int timesData[] = new int[7];
        String monthList[]=new String [7];
        double rateData[] = new double[7];
        Date date = new Date();
        SimpleDateFormat formatter1 = new SimpleDateFormat("yyyy-MM");
        SimpleDateFormat formatter2 = new SimpleDateFormat("yyyy-MM-dd");
        String dateString1 = formatter1.format(date.getTime());
        String dateString2 = formatter2.format(date.getTime());
        dateString1 += '%';
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        int year = cal.get(Calendar.YEAR);
        int month = cal.get(Calendar.MONTH) + 1;
        String lastmonth = "";
        if ((month - 1) > 0) {
            lastmonth = Integer.toString(year) + "-";
            if((month-1)<10){
                lastmonth+="0"+ Integer.toString(month - 1) + "%";
            }else {
                lastmonth+= Integer.toString(month - 1) + "%";
            }
        } else {
            lastmonth = Integer.toString(year - 1) + "-" + Integer.toString(12 + month - 1) + "%";
        }
        practiceTimes = getPracticeTimes(userid, dateString1);
        int LMPracticeTimes =getPracticeTimes(userid, lastmonth);
        double ptRate = rateCoculate((double) practiceTimes, (double) LMPracticeTimes);//练习天数数据（包含天数以及增长率，增长率未处理符号）

        totalRate = correctRate(userid);
        String thisMonth = Integer.toString(year) + "-" + Integer.toString(month) + "-01";
        double LMTotalRate = LMCorrectRate(userid, thisMonth);
        double totalSCRate = rateCoculate(totalRate,LMTotalRate);//用户总正确率（包含正确率以及相较上月增长率，

        userCorrectAns = todayUserAnswer(userid, dateString2, 1);
        int LDUserCorrectAns=LDUserAns(userid,1);
        System.out.println("correct :"+LDUserCorrectAns+"   "+userCorrectAns);
        double rightRate=rateCoculate((double) userCorrectAns,(double) LDUserCorrectAns);//用户当日答题正确数（包含增长率）

        userFalseAns = todayUserAnswer(userid, dateString2, 0);
        int LDUserFalseAns=LDUserAns(userid,0);
        System.out.println("falsen :"+LDUserFalseAns+" "+userFalseAns);
        double falseRate=rateCoculate((double)userFalseAns,(double) LDUserFalseAns);//用户当日答题错误数

        int userTotalAns=userCorrectAns+userFalseAns;//用户当日答题总数

        for(int i=0;i<6;i++){
            int times=0;
            double rate=0;
            String tmpMonth="";
            String tmpYear="";
            String tmpDate="";
            if(month>=6){
                tmpMonth=Integer.toString(month-i);
                tmpYear=Integer.toString(year);
                if ((month-i)<10){
                    tmpDate=tmpYear+"-0"+tmpMonth+"%";
                }
                else{
                    tmpDate=tmpYear+"-"+tmpMonth+"%";
                }
            }else{
                if(month-i>0){
                    tmpMonth=Integer.toString(month-i);
                    tmpYear=Integer.toString(year);
                    if ((month-i)<10){
                        tmpDate=tmpYear+"-0"+tmpMonth+"%";
                    }
                    else{
                        tmpDate=tmpYear+"-"+tmpMonth+"%";
                    }
                }else{
                    tmpMonth=Integer.toString(12+month-i);
                    tmpYear=Integer.toString(year-1);
                    if ((12+month-i)<10){
                        tmpDate=tmpYear+"-0"+tmpMonth+"%";
                    }
                    else{
                        tmpDate=tmpYear+"-"+tmpMonth+"%";
                    }
                }
            }
            int pos=6-i;
            monthList[pos]=tmpMonth;
            times=getPracticeTimes(userid,tmpDate);
            timesData[pos]=times;
            rate=monthlyCorrectRate(userid,tmpDate);
            rateData[pos]=rate;
        }
        List<QuesDomain> queList=new ArrayList<QuesDomain>();
        queList=queryCurrentFalseQueList(userid,dateString2);
        DataDomain dataDomain = new DataDomain();
        dataDomain.setState(userTotalAns);
        dataDomain.setPracticeTime(String.valueOf(practiceTimes));
        dataDomain.setPtRate(String.valueOf(ptRate));
        dataDomain.setTotalSCRate(String.valueOf(totalSCRate));
        dataDomain.setUserCorrectAns(String.valueOf(userCorrectAns));
        dataDomain.setTotalRate(String.valueOf(totalRate));
        dataDomain.setRightRate(String.valueOf(rightRate));
        dataDomain.setUserFalseAns(String.valueOf(userFalseAns));
        dataDomain.setFalseRate(String.valueOf(falseRate));
        dataDomain.setUserTotalAns(String.valueOf(userTotalAns));
        String str1="";
        String str2="";
        for(int i=1;i<=6;i++)
        {
            str1+=String.valueOf(timesData[i]);
            str2+=String.valueOf(rateData[i]);
            if(i!=6){
                str1+='/';
                str2+='/';
            }
        }
        dataDomain.setTimesData(str1);
        dataDomain.setRateData(str2);
        dpDao.updataUserDPData(dataDomain);

        /*HashMap<String,Object> map=new HashMap<String,Object>();
        map.put("state",userTotalAns);
        map.put("practiceTime",practiceTimes);//练习天数
        map.put("ptRate",ptRate);//练习天数增长率
        map.put("totalRate",totalRate);//总正确率
        map.put("totalSCRate",totalSCRate);//总正确率增长率
        map.put("userCorrectAns",userCorrectAns);////用户当天正确答案数
        map.put("rightRate",rightRate);//用户当天正确答案数增长率
        map.put("userFalseAns",userFalseAns);//用户当天错误答案数
        map.put("falseRate",falseRate);//用户当天错误答案数增长率
        map.put("userTotalAns",userTotalAns);//用户当天练习总题数
        map.put("timesData",timesData);//前六个月（包括本月）练习次数
        map.put("rateData",rateData);//前六个月（包括本月）正确率
        map.put("result",true);
        map.put("queList",queList);
        map.put("curMonth",monthList);*/
    }
    public List<DataDomain> queryUserDPData(int userid){
        return dpDao.queryUserDPData(userid);
    }
    public String[] constructMonthList(){
        String monthList[]=new String [7];
        Date date = new Date();
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        int year = cal.get(Calendar.YEAR);
        int month = cal.get(Calendar.MONTH) + 1;
        for(int i=0;i<6;i++){
            int times=0;
            double rate=0;
            String tmpMonth="";
            String tmpYear="";
            String tmpDate="";
            if(month>=6){
                tmpMonth=Integer.toString(month-i);
                tmpYear=Integer.toString(year);
                if ((month-i)<10){
                    tmpDate=tmpYear+"-0"+tmpMonth+"%";
                }
                else{
                    tmpDate=tmpYear+"-"+tmpMonth+"%";
                }
            }else{
                if(month-i>0){
                    tmpMonth=Integer.toString(month-i);
                    tmpYear=Integer.toString(year);
                    if ((month-i)<10){
                        tmpDate=tmpYear+"-0"+tmpMonth+"%";
                    }
                    else{
                        tmpDate=tmpYear+"-"+tmpMonth+"%";
                    }
                }else{
                    tmpMonth=Integer.toString(12+month-i);
                    tmpYear=Integer.toString(year-1);
                    if ((12+month-i)<10){
                        tmpDate=tmpYear+"-0"+tmpMonth+"%";
                    }
                    else{
                        tmpDate=tmpYear+"-"+tmpMonth+"%";
                    }
                }
            }
            int pos=6-i;
            monthList[pos]=tmpMonth;
        }
        return monthList;
    }
}
