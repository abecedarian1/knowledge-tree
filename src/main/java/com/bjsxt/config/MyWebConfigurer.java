package com.bjsxt.config;

/**
 * 通过实现接口并重写方法解决跨域问题
 * */

import org.springframework.boot.SpringBootConfiguration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootConfiguration
public class MyWebConfigurer implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry){

        /**
         * 所有请求都允许跨域，使用这种配置就不需要
         * 在interceptor中配置header
         * */

        registry.addMapping("/**")
                .allowCredentials(true)
                //.allowedOrigins("http://loccalhost:8081")
                //.allowedOrigins("*")  //允许访问的地址   //2.4.0以前的sping-boot用法+
                .allowedOriginPatterns("*")
                .allowedMethods("POST","GET","PUT","OPTIONS","DELETE","HEAD")
                .allowedHeaders("*")
                .maxAge(3600);
    }
}
