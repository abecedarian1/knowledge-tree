// 配置Element的按需引入
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    productionSourceMap: false,
    //Webpack中的自定义配置项  ---vue-cli中只能配置部分webpack项
    configureWebpack:(config)=>{
        //打包环境
        if(process.env.NODE_ENV === 'production'){

            config.module.rules.push({
                //每个配置文件只能被其中一个loader配置处理
                oneOf:[
                    {
                        test: /\.m?jsx?$/,
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
                    {
                        test:/\.s[ac]ss$/,
                        exclude:/node_modules/,
                        use:[
                            //将JS字符串生成为style节点
                            // "style-loader",
                            MiniCssExtractPlugin.loader,
                            //将CSS转化成CommonJS模块
                            'css-loader',
                            //将Sass编译成CSS
                            'sass-loader'
                        ]
                    }
                ]
            })
            config.plugins.push(
                //该插件必须引入--确保上述规则在.vue文件的相应模块生效
                new VueLoaderPlugin()
            )
        }
    }
}
