package com.zhifou.ztc.service;

import com.zhifou.ztc.pojo.User;

import java.util.List;
import java.util.Map;

public interface UserService {
    // 是否存在用户(name,pwd)
    boolean existUser(User userDomain);

    // 获取用户(name,pwd)的全部信息user(*)
    User getUser(User userDomain);

    // 获取所有用户(name,pwd)的全部信息user(*)
    List<User> getAllUser(User userDomain);

    // 获取今日搜索次数最多的用户
    List<Map<String, Object>> findTopStudy();

    public List<User> Search(User userDomain);
    public  Boolean updatePwd(User user, User newUser);
    public  Boolean update(User userDomain);
    public  Boolean updateAvatar(User userDomain);
    public Boolean delete(User userDomain);

    boolean addUser(String userName, String pwd);

    boolean addUserAsset(User user, int i) throws Exception;
    boolean delUserAsset(User user, int i);
}
