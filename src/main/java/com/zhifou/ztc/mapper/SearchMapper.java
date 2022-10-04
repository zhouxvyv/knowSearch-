package com.zhifou.ztc.mapper;

import com.zhifou.ztc.domain.Domainct.Record;
import com.zhifou.ztc.pojo.Search;
import com.zhifou.ztc.pojo.User;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("searchMapper")
public interface SearchMapper {
    int delete(Search searchDomain);
    int update(Search searchDomain);
    boolean insert(Search searchDomain);
    List<Search> select(Search searchDomain);
    List<Search> search(@Param("user") User userDomain, @Param("num") int num);
    Boolean deleteAllRecordOfUser(User user);
}
