// 配置Element的按需引入
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const { VueLoaderPlugin } = require('vue-loader')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    productionSourceMap: false,
    //Webpack中的自定义配置项  ---vue-cli中只能配置部分webpack项
    configureWebpack: {
        module:{
            rules:[
                {
                    //每个配置文件只能被其中一个loader配置处理
                    oneOf:[
                        {
                            test:/\.js$/,
                            // exclude:/node_modules/,
                            exclude:file=>(
                                /node_modules/.test(file) && !/\.vue\.js/.test(file)
                            ),
                            use:[
                                {
                                    loader:'babel-loader',
                                    options:{
                                        //第二次打包会变快 ---项目小，反而会导致变慢
                                        cacheDirectory:true,  //开启babel编译缓存
                                        cacheCompression:false,  //缓存文件不要压缩
                                         //下面部分写到babel.config.js中
                                        // presets:['@babel/preset-env'],
                                        plugins:["@babel/plugin-transform-runtime"],  //减少代码体积
                                    }
                                }
                            ],
                        },

                        // 前端运行有时候正常，有时候报错，不知道是不是和默认配置冲突了
                        // {
                        //     test:/\.scss$/,
                        //     exclude:/node_modules/,
                        //     use:[
                        //         process.env.NODE_ENV != 'production' ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
                        //         'css-loader',
                        //         'sass-loader'
                        //     ]
                        // }

                        // {
                        //     test:/\.s[ac]ss$/i,
                        //     exclude:/node_modules/,
                        //     use:[
                        //         //将JS字符串生成为style节点
                        //         // "style-loader",
                        //         MiniCssExtractPlugin.loader,
                        //         //将CSS转化成CommonJS模块
                        //         "css-loader",
                        //         //将Sass编译成CSS
                        //         "sass-loader"
                        //     ]
                        //     // loaders:['style','css','sass']
                        // },
                    ]
                }
            ]
        },
        
        plugins: [
            //该插件必须引入--确保上述规则在.vue文件的相应模块生效
            new VueLoaderPlugin(),
            //按需自动引入element-plus的配置————而不需要全部引入
            AutoImport.default({
                resolvers: [ElementPlusResolver()],
            }),
            Components.default({
                resolvers: [ElementPlusResolver()],
            }),
        ],
    }
}
