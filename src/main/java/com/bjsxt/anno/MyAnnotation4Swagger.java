package com.bjsxt.anno;


/**
 * 自定义的注解类，和swagger配置文件 以及 接口文件（MyController）  结合使用
 * */

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

//表示当前类是一个注解 @interface
/**
 * @Target - 描述当前的注解可以定义在什么资源上。
 * 属性 value
 *  - 定义具体的资源，包括：
 *    - ElementType.METHOD 可以定义在方法上
 *    - ElementType.TYPE 可以定义在类型上
 *    - ElementType.FIELD 可以定义在属性上
 *    - ElementType.PARAMETER 可以定义在方法参数上
 *  *
 */
@Target(value={ElementType.METHOD,ElementType.TYPE})      //当前注解所能描述的信息

/**
 * @Retention - 当前注解在什么时候有效
 * 属性 value
 *  *  - 定义具体的生效标记，包括：
 *  *  RetentionPolicy.RUNTIME - 运行时有效
 *  *  RetentionPolicy.SOURCE - 源码时有效
 * */
@Retention(RetentionPolicy.RUNTIME)
public @interface MyAnnotation4Swagger {

    //自定义注解中的属性，相当于 @MyAnnotation4Swagger(value="")
    String value() default "";

}
