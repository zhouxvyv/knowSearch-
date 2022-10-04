package com.zhifou.ztc.mapper;

import com.zhifou.ztc.pojo.Subject;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("subjectMapper")
public interface SubjectMapper {
    String getSubjectName(int subjectId);
    List<Subject> getUserSubject(int userId);
    boolean addUserSubject(@Param("userId") int userId,@Param("subjectId") int subjectId);
    boolean deleteUserSubject(@Param("userId") int userId,@Param("subjectId") int subjectId);
    List<Subject> readSubject();
}
