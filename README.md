# knowledge-tree
vue [PC]
vue + elementPlus

## 1. VUE中使用markdown
   参考链接(官网)：http://tinymce.ax-z.cn/plugins/codesample.php

   安装指南： https://blog.csdn.net/m0_64664995/article/details/131915102

## 2.打包优化问题：
    (1)配置babel 和 Corejs 将ES6进行语法兼容，
    (2)配置babel-loader编译缓存（加快二次打包速度）,配置代码压缩
    (3)配置CSS压缩抽取
    (4)引入 vue-loader ,处理单文件组件
    (5)删除打包文件中的源码：productionSourceMap: false,    
    (6)修改打包配置，减少单文件体积，增快打包速度
    参考官网:https://www.webpackjs.com/loaders/
            https://cli.vuejs.org/zh/guide/
            https://vue-loader.vuejs.org/zh/
            

>npm run production-inspect       #打包配置参考
>
>npm run development-inspect   #开发配置参考

## 3. package.js中的 dependencies 和 devDependencies 的区别

   (1)"dependencies"   
     
      dependencies中列出的包将在生产和开发环境中都使用。

​       包下载命令:

​            npm install xxx --save

​            npm  install xxx

   (2)"devDependencies"

      devDependencies中列出的包仅在开发环境中使用。


​      项目打包所在环境 ————并且安装包不会打包到最终产物中(不确定)

​      包下载命令:

​           npm install -D   xxx 

​           npm install  xxx --save-dev

## 4.跨域问题

当请求地址不是当前服务器地址时(例如 https://interactive-examples.mdn.mozilla.net)，需要进行跨域配置

> 本地运行跨域参照vue.config.js中的devServer配置

线上发布项目需要使用nginx代理进行如下配置：

（参照vue.config.js中的代理配置）

>server {
>
>​    listen 前端启动端口号;
>
>​    location /demoviedo/ {
>
>​        proxy_pass https://interactive-examples.mdn.mozilla.net;
>
> 	   proxy_set_header Host $host;
>
>​        proxy_set_header X-Real-IP $remote_addr;
>
>​        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
>
>​	    proxy_set_header X-Forwarded-Proto $scheme;
>
>​    }
>}





