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
    参考官网:https://www.webpackjs.com/loaders/
            https://cli.vuejs.org/zh/guide/
            https://vue-loader.vuejs.org/zh/

## 3. package.js中的 dependencies 和 devDependencies 的区别
   (1)"dependencies"   

​      项目运行所在环境

​       包下载命令:

​            npm install xxx --save

​            npm  install xxx

   (2)"devDependencies"

​      项目打包所在环境 ————并且安装包不会打包到最终产物中(不确定)

​      包下载命令:

​           npm install -D   xxx 

​           npm install  xxx --save-dev
