package com.zhifou.ztc.service;



import com.zhifou.ztc.domain.AnsDomain;
import com.zhifou.ztc.domain.DataDomain;
import com.zhifou.ztc.domain.QuesDomain;

import java.util.List;

public interface DpService {
    public List<QuesDomain> constructDpList(int userId, int difficulty, int state, int amount, int subject, int type);//根据用户id创建题单，并返回题单编号
    public List<QuesDomain> queryDPList(int userId, String date);//根据用户Id与时间题单创建时间查询题单信息
    public boolean ansJudgement(List<AnsDomain> ansList, String userAns[], int dpId, int userid);
    public List<AnsDomain> queryDpAns(int dpId);
    public boolean updateUserAns(String[] userAns, int dpId, int userId);
    public int queryDpId(int userId, String date);
    public int getPracticeTimes(int userid, String date);
    public double correctRate(int userid);
    public int todayUserAnswer(int userid, String date, int flag);
    public double monthlyCorrectRate(int userid, String date);
    public double LMCorrectRate(int userid, String targetDate);
    public double rateCoculate(double a, double b);
    public int LDUserAns(int userid, int flag);
    public List<QuesDomain> queryCurrentFalseQueList(int userId, String date);
    public boolean dpExistCheck(int userId);
    public int[] queryDPDay(int userId, String date, int month, int year);
    public void updataUserDpData(int userId);
    public List<DataDomain> queryUserDPData(int userid);
    public String[] constructMonthList();

}
