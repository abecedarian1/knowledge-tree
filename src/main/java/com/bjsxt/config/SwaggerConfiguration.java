package com.bjsxt.config;

/**
 * Swagger文档描述页面
 * */

import com.bjsxt.anno.MyAnnotation4Swagger;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.RequestHandler;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

import  com.google.common.base.Predicates;
import  springfox.documentation.builders.RequestHandlerSelectors;

@Configuration
public class SwaggerConfiguration {
    /**
     * 创建Docket类型的对象。并使用spring容器管理
     * Docket 是 Swagger中的全局配置对象
     * */
    @Bean
    public Docket docket(){
        Docket docket = new Docket(DocumentationType.SWAGGER_2);

        // API帮助文档的描述信息
        ApiInfo apiInfo =
                new ApiInfoBuilder()
                        .contact(   //配置Swagger文档主体内容
                                new Contact(
                                        "李敏Swagger开发文档",   //文档发布者名称
                                        "http://limin.com",              //文档发布者网站地址
                                        "1584968548@qq.com"             //文档发布者的电子邮箱
                                )
                        )
                        .title("知识图谱-后端接口文档")
                        .description("知识图谱-后端接口文档详细描述-用于后端接口调用的帮助文档")
                        .version("1.1")
                        .build();

        //给docket上下文配置api描述信息
        docket.apiInfo(apiInfo);


        docket = docket
                .select()  //获取Docket中的选择器  返回 ApiSelectorBuilder. 构建选择器的。 如：扫描什么包的注解
                .apis(

                        Predicates.and(
                            Predicates.not(     //在swagger上不显示有关 MyAnnotation4Swagger注解有关的内容
                                    RequestHandlerSelectors.withMethodAnnotation(  //当方法上有注解时返回true
                                            MyAnnotation4Swagger.class
                                    )
                            ),
                                RequestHandlerSelectors.basePackage("com.bjsxt.controller")
                        )
                )
                .apis(RequestHandlerSelectors.basePackage("com.bjsxt.controller"))
                .paths(      //在页面上显示包含有如下路径的接口
                        Predicates.or(  // 多个规则符合任意一个即可通过
                            PathSelectors.regex("/swagger/.*"),    //使用正则表达式，约束生成API文档的路径地址
                            PathSelectors.regex("/swagger2/.*"),
                            PathSelectors.regex("/.*")   //任意形式的路径
                        )

                )
                .build();  //重新构建docket对象



        return docket;

    }
}

