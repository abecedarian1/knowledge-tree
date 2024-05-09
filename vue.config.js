// 配置Element的按需引入
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

// sass-loader  sass  style-loader(换成mini-css-extract-plugin)  css-loader 
//上面这些不需要配置 webpack会自动检测。 只需要安装 

module.exports = {
    //Webpack中的自定义配置项  ---vue-cli中只能配置部分webpack项
    configureWebpack: {
        module:{
            rules:[
                {
                    test:/\.js$/,
                    exclude:/node_modules/,
                    use:[
                        {
                            loader:'babel-loader',
                            options:{
                                //第二次打包会变快
                                cacheDirectory:true,  //开启babel编译缓存
                                cacheCompression:false,  //缓存文件不要压缩
                                 //下面部分写到babel.config.js中
                                // presets:['@babel/preset-env'],
                                plugins:["@babel/plugin-transform-runtime"],  //减少代码体积
                            }
                        }
                    ],
                },
                // {
                //     test:/\.s[ac]ss$/,
                //     exclude:/node_modules/,
                //     use:[
                //         //将JS字符串生成为style节点
                //         "style-loader",
                //         //将CSS转化成CommonJS模块
                //         "css-loader",
                //         //将Sass编译成CSS
                //         "sass-loader"
                //     ]
                //     // loaders:['style','css','sass']
                // },
            ]
        },
        //按需自动引入element-plus的配置————而不需要全部引入
        plugins: [
            AutoImport.default({
                resolvers: [ElementPlusResolver()],
            }),
            Components.default({
                resolvers: [ElementPlusResolver()],
            }),
        ],
    }
}
