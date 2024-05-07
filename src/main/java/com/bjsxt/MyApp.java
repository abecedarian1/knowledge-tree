package com.bjsxt;


/**
 *  启动位置
 *  */

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import  org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import  springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * EnableSwagger2 -- 是springfox 提供的一个注解，代表swagger2相关技术开启。
 * 会扫描当前类所在包，以及子包中所有的类型中的注解。做swagger文档的定值。
 * */

/**
 * @SpringBootAlication 这个注解的修饰范围：只能用在入口类上，只能出现一次
 * 作用：标识这个类是一个springBoot入口类， 启动整个springBoot项目总入口
 * */

@SpringBootApplication
@EnableSwagger2
@MapperScan("com.bjsxt.dao")   //扫描dao目录下的所有文件

//打包所加
@ComponentScan(basePackages = {"com.bjsxt.*"})
public class MyApp {
    public static void main(String[] args){
        //启动springBoot应用   参数1：制定入口类的类对象.class , 参数2：main函数的参数
        SpringApplication.run(MyApp.class,args);
    }

}
