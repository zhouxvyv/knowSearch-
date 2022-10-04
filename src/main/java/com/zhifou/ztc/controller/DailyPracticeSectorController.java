package com.zhifou.ztc.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zhifou.ztc.domain.Ans;
import com.zhifou.ztc.domain.AnsDomain;
import com.zhifou.ztc.domain.DataDomain;
import com.zhifou.ztc.domain.QuesDomain;
import com.zhifou.ztc.pojo.User;
import com.zhifou.ztc.service.DpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.*;


@Controller
public class DailyPracticeSectorController {
    @Autowired
    HttpSession httpSession;

    @Autowired
    @Qualifier("dpService")
    DpService dpService;

    @RequestMapping(value = "/DailyPracticeTodaySpringMVC")
    @ResponseBody
    public Map<String, Object> DailyPracticeToday() throws JsonProcessingException {
        User user =(User) httpSession.getAttribute("user");
        int userid = user.getUserId();

        boolean flag=dpService.dpExistCheck(userid);
        Map<String,Object> map=new HashMap<String,Object>();
        if(flag){
            map.put("result",true);
        }else{
            map.put("result",false);
        }
        ObjectMapper objectMapper=new ObjectMapper();
        String json=objectMapper.writeValueAsString(map);
        System.out.println("Controller serv running...");
        return map;
    }

    @RequestMapping(value = "/DpListConstructSpringMVC")
    @ResponseBody
    public HashMap<String, Object> DpListConstruct(Integer subject,Integer difficulty,Integer state,Integer amount,Integer type)throws Exception{
        User user =(User) httpSession.getAttribute("user");
        int userId = user.getUserId();
        List<QuesDomain> queList = new ArrayList<>();
        queList=dpService.constructDpList(userId,difficulty,state,amount,subject,type);
        HashMap<String, Object> map = new HashMap<String,Object>();
        if(queList.size()>0){
            map.put("queList",queList);
            map.put("amount",amount);
            map.put("result",true);
        }else{
            map.put("result",false);
        }
        ObjectMapper objectMapper = new ObjectMapper();
        String json=objectMapper.writeValueAsString(map);
        System.out.println("running success");
        return map;
    }

    @RequestMapping(value = "/ansOperationSpringMVC")
    @ResponseBody
    public HashMap<String, Object> ansOperation(@RequestBody List<Ans> ansContainer) throws Exception{
        System.out.println(ansContainer);
        User user =(User) httpSession.getAttribute("user");
        int userId = user.getUserId();
        String[] a=new String[10];
        int dpId=ansContainer.get(0).getdpId();
        String[] ansList = (String[]) ansContainer.get(0).getAnsList();
        boolean flag=dpService.updateUserAns(ansList,dpId,userId);
        List<AnsDomain> ans=new ArrayList<AnsDomain>();
        ans=dpService.queryDpAns(dpId);
        boolean flag2=dpService.ansJudgement(ans,ansList,dpId,userId);
        dpService.updataUserDpData(userId);
        HashMap<String,Object> map= new HashMap<String,Object>();
        map.put("result",true);
        ObjectMapper objectMapper = new ObjectMapper();
        String json = objectMapper.writeValueAsString(map);
        return map;
    }

    @RequestMapping(value = "/QueryDplistSpringMVC")
    @ResponseBody
    public HashMap<String, Object> QueryDpList(String date)throws Exception{
        User user =(User) httpSession.getAttribute("user");
        int userId = user.getUserId();
        int dpId=dpService.queryDpId(userId,date);
        List<QuesDomain> queList = new ArrayList<>();
        queList=dpService.queryDPList(userId,date);
        HashMap<String, Object> map = new HashMap<>();
        map.put("dpId",dpId);
        if(queList!=null){
            System.out.println(queList);
            map.put("queList",queList);
            map.put("amount",queList.size());
            map.put("result",true);
        }else {
            map.put("result",false);
        }
        return map;
        /*ObjectMapper objectMapper = new ObjectMapper();
        String json = objectMapper.writeValueAsString(map);
        return json;*/
    }

    @RequestMapping(value = "/DailyPracticeDataSpringMVC")
    @ResponseBody
    public HashMap<String, Object> DailyPracticeData()throws Exception{
        User user =(User) httpSession.getAttribute("user");
        int userid = user.getUserId();
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
        practiceTimes = dpService.getPracticeTimes(userid, dateString1);
        int LMPracticeTimes = dpService.getPracticeTimes(userid, lastmonth);
        double ptRate = dpService.rateCoculate((double) practiceTimes, (double) LMPracticeTimes);//练习天数数据（包含天数以及增长率，增长率未处理符号）

        totalRate = dpService.correctRate(userid);
        String thisMonth = Integer.toString(year) + "-" + Integer.toString(month) + "-01";
        double LMTotalRate = dpService.LMCorrectRate(userid, thisMonth);
        double totalSCRate = dpService.rateCoculate(totalRate,LMTotalRate);//用户总正确率（包含正确率以及相较上月增长率，

        userCorrectAns = dpService.todayUserAnswer(userid, dateString2, 1);
        int LDUserCorrectAns=dpService.LDUserAns(userid,1);
        System.out.println(LDUserCorrectAns+"   "+userCorrectAns);
        double rightRate=dpService.rateCoculate((double) userCorrectAns,(double) LDUserCorrectAns);//用户当日答题正确数（包含增长率）

        userFalseAns = dpService.todayUserAnswer(userid, dateString2, 0);
        int LDUserFalseAns=dpService.LDUserAns(userid,0);
        double falseRate=dpService.rateCoculate((double)userFalseAns,(double) LDUserFalseAns);//用户当日答题错误数

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
            times=dpService.getPracticeTimes(userid,tmpDate);
            timesData[pos]=times;
            rate=dpService.monthlyCorrectRate(userid,tmpDate);
            rateData[pos]=rate;
        }
        List<QuesDomain> queList=new ArrayList<QuesDomain>();
        queList=dpService.queryCurrentFalseQueList(userid,dateString2);
        HashMap<String,Object> map=new HashMap<String,Object>();
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
        map.put("curMonth",monthList);
        ObjectMapper objectMapper = new ObjectMapper();
        String json = objectMapper.writeValueAsString(map);
        return map;
    }

    @RequestMapping(value = "/queryDPDays")
    @ResponseBody
    public int[] queryDpDays(int year,int month){
        System.out.println(year);
        String date=" ";
        User user =(User) httpSession.getAttribute("user");
        int userId = user.getUserId();
        if (month < 10) {
            date = year + "-0" + month + "%";
        } else {
            date = year + "-" + month + "%";
        }

        System.out.println(date);
        return dpService.queryDPDay(userId,date,month,year);
    }

    @RequestMapping(value = "queryUserDPData")
    @ResponseBody
    public HashMap<String,Object> queryUserDPData() throws Exception{
        User user =(User) httpSession.getAttribute("user");
        int userid = user.getUserId();
        List<DataDomain> dataDomainList = new ArrayList<DataDomain>();
        dataDomainList=dpService.queryUserDPData(userid);
        String curMonthList[]=new String[7];
        curMonthList=dpService.constructMonthList();
        HashMap<String,Object> map=new HashMap<String,Object>();
        map.put("curMonth",curMonthList);
        map.put("dataDomain",dataDomainList);
        map.put("result",true);
        return map;
    }
}
