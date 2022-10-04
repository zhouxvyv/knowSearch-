package com.zhifou.ztc.dao;



import com.zhifou.ztc.domain.AnsDomain;
import com.zhifou.ztc.domain.DataDomain;
import com.zhifou.ztc.domain.QuesDomain;

import java.util.List;
import java.util.Map;

public interface DpDao {
    public int constructDp(int userId);
    public boolean saveLOTinfo(int topicListId, int topicId);
    public List<QuesDomain> initUniqeQueList(int userId, int dpListId, int amount, int subject, String a);
    public List<QuesDomain> initReQueList(int userId, int dpListId, int amount, int subject, String a);
    public List<QuesDomain> initQueList(int userId, int dpListId, int amount, int subject, String a);
    public boolean dpExistCheck(int userId);
    public List<QuesDomain> queryDPList(int userId, String date);
    public List<AnsDomain> queryDpAns(int dpId);
    public boolean updateUserAns(String[] userAns, int dpId, int userId);
    public boolean updateTopicState(List<AnsDomain> ansList, String userAns[], int dpId, int userid);
    public boolean updateMistakeInfo(int topicID, int userID);
    public int queryDpId(int userId, String date);
    public int[] getRandomArray(int num, int scope);
    public boolean isExistence(int[] numArray, int lucky);
    public int getPracticeTimes(int userid, String date);
    public int trueAnswerAmount(int userid);
    public int answerAmount(int userid);
    public int todayUserAnswer(int userid, String date, int flag);
    public int monthlyTrueAnswerAmount(int userid, String date);
    public int monthlyAnswerAmount(int userid, String date);
    public int LMtrueAnswerAmount(int userid, String targetDate);
    public int LManswerAmount(int userid, String targetDate);
    public int LDUserAnswer(int userid, int flag);
    public List<QuesDomain> queryCurrentFalseQueList(int userId, String date);
    public List<Map<String, Object>> queryDpDay(int userId, String date);
    public boolean updataUserDPData(DataDomain dataDomain);
    public List<DataDomain> queryUserDPData(int userid);
}
