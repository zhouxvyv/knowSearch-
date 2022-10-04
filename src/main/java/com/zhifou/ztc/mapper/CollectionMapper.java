package com.zhifou.ztc.mapper;

import com.zhifou.ztc.pojo.Collection;
import com.zhifou.ztc.pojo.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface CollectionMapper {

    List<Collection> collections(@Param("user") User user,@Param("num") int num);
    List<Collection> getCollectionByUser(@Param("user") User user, @Param("num") int num);
    Boolean delete(int id);
    List<Collection> getAllTestCollection();
}
