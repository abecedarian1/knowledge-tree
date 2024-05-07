package com.bjsxt.dao;

import com.bjsxt.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
@Mapper
public interface UserDao {
    //根据用户名查询用户

    @Autowired
    User findByUserName(String username);
//    List<User> findByUserName(String username);

    //注册用户
    @Autowired
    void save(User user);

}
