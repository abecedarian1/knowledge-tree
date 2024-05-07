package com.bjsxt.service;

import com.bjsxt.dao.UserDao;

import com.bjsxt.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.DigestUtils;
import org.springframework.util.ObjectUtils;
//import com.bjsxt.service.UserService;
import javax.annotation.Resource;
import java.nio.charset.StandardCharsets;

@Service
@Transactional

public class UserServiceImpl implements UserService {
     @Resource    //把一个类注入进来，相当于import
    private UserDao userDao;
    public UserServiceImpl(UserDao userDao) {
        this.userDao = userDao;
    }



    @Override
    public void userName(User user) {
        //1.根据用户查询数据库是否存在该用户名
        User userDB = userDao.findByUserName(user.getUsername());
        if(!ObjectUtils.isEmpty(userDB)) throw new RuntimeException("用户名已存在");

        //2.进行注册之前给明文加密
        String passwordSecret =  DigestUtils.md5DigestAsHex(user.getPassword().getBytes(StandardCharsets.UTF_8));
        user.setPassword(passwordSecret);

        userDao.save(user);
    }



}
