package com.zhifou.ztc.service.impl;

import com.zhifou.ztc.pojo.User;
import com.zhifou.ztc.mapper.UserMapper;
import com.zhifou.ztc.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service("userService")
public class UserServiceImpl implements UserService {
    @Autowired
    UserMapper userMapper;

    // 是否存在用户(name,pwd)
    @Override
    public boolean existUser(User userDomain){
        User user = getUser(userDomain);
        if(user==null) return false;
        else return true;
    }
    // 获取用户(name,pwd)的全部信息user(*)
    @Override
    public User getUser(User userDomain){
        List<User> allUser = getAllUser(userDomain);
        System.out.println("\n\n\n\n\n\n\n\n");
        System.out.println(allUser);
        if(allUser!=null && allUser.size()>=1)
            return allUser.get(0);
        else return null;
    }
    // 获取所有用户(name,pwd)的全部信息user(*)
    @Override
    public List<User> getAllUser(User userDomain){
        return userMapper.findLoginUser(userDomain);
        //return userDao.findLoginUser(userDomain);
    }
    // 获取今日搜索次数最多的用户
    @Override
    public List<Map<String, Object>> findTopStudy(){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        return userMapper.getTopSearch(sdf.format(new Date()));
        //return userDao.getTopSearch();
    }


    @Override
    public List<User> Search(User userDomain) {
        List<User> list;
        //list = userDaoImp.search(userDomain);
        list = userMapper.search(userDomain);
        return list;
    }

    @Override
    public Boolean updatePwd(User user, User  newUser) {
        boolean flag=false;
        boolean b=false;
        //b = userDaoImp.searchPwd(user);
        List<User> list = userMapper.searchPwd(user);
        if (!list.isEmpty())
            b=true;
        if(b)
        {
            //flag = userDaoImp.updatePwd(newUser);
            flag = userMapper.updatePwd(newUser);
        }
        return flag;
    }

    @Override
    public Boolean update(User userDomain) {
        boolean b;
        //b = userDaoImp.update(userDomain);
        b = userMapper.update(userDomain);
        return b;
    }

    @Override
    public Boolean updateAvatar(User userDomain) {
        boolean b;
        //b = userDaoImp.updateAvatar(userDomain);
        b = userMapper.updateAvatar(userDomain);
        return b;
    }

    @Override
    public Boolean delete(User userDomain) {
        boolean flag = userMapper.deleteUser(userDomain);
        return flag;
    }

    @Override
    public boolean addUser(String userName, String pwd) {
        return userMapper.addUser(userName, pwd);
    }

    @Override
    @Transactional
    public boolean addUserAsset(User user, int i) throws Exception {
        // 总的加财产次数被限制
        int userAddCount = userMapper.getUserById(user.getUserId()).getAddCount();
        boolean b1=false;
        boolean b2=false;
        if(userAddCount>0) {
            b1 = userMapper.addUserAsset(user.getUserId(), i);
            b2 = userMapper.delAddCount(user.getUserId());
        }
        if(!(b1&&b2)) throw new Exception();
        return true;
    }

    @Override
    @Transactional
    public boolean delUserAsset(User user, int i) {
        // 总
        boolean b1 = false;
        User user1 = userMapper.getUserById(user.getUserId());
        if(user1.getFreeCount()>0){
            b1 = userMapper.delFreeCount(user1.getUserId());
            return b1;
        }
        if(user1.getAsset()>=i)
            b1 = userMapper.delUserAsset(user.getUserId(), i);
        return b1;
    }
}
