# knowledge-tree
vue [PC]
vue + elementPlus

## 1. VUE中使用markdown
   参考链接(官网)：http://tinymce.ax-z.cn/plugins/codesample.php

   安装指南： https://blog.csdn.net/m0_64664995/article/details/131915102

## 2.打包优化问题：
    (1)element-plus 采用按需自动引入的配置————减少打包体积
    (2)配置babel 和 Corejs 将ES6进行语法兼容，
    (3)配置babel-loader编译缓存（加快二次打包速度）,配置代码压缩
    (4)配置CSS压缩抽取
    提速10s，压缩3M
