package com.zhifou.ztc.mapper;


import com.zhifou.ztc.pojo.User;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;


import java.util.List;
import java.util.Map;

@Repository("userMapper")
public interface UserMapper {
    List<User> getUserWithCollection(User user);
    List<User> findLoginUser(User userDomain);
    List<Map<String, Object>> getTopSearch(String time);
    List<User> search(User userDomain);
    boolean updatePwd(User user);
    List<User> searchPwd(User userDomain);
    boolean deleteUser(User userDomain);
    boolean updateEmail(User userDomain);
    boolean update(User userDomain);
    int updateDefaultUser(int count);
    boolean updateAvatar(User userDomain);
    List<User> readAllUser();
    boolean addUser(@Param("userName") String userName,@Param("pwd") String pwd);

    boolean addUserAsset(@Param("userId") int userId,@Param("count") int count);

    boolean delUserAsset(@Param("userId") int userId,@Param("count") int count);

    User getUserById(int userId);

    boolean delAddCount(int userId);

    boolean delFreeCount(int userId);
}
