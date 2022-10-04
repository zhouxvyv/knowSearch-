package com.zhifou.ztc.mapper;

import com.zhifou.ztc.pojo.Mistake;
import com.zhifou.ztc.pojo.User;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("mistakeMapper")
public interface MistakeMapper {
    List<Mistake> search(@Param("user") User user,@Param("num") int num);
    List<Mistake> searchNew(@Param("user") User user,@Param("num") int num);
    boolean delete(Mistake mistake);
    List<Mistake> readAllMistake();
}
