// 配置Element的按需引入
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    productionSourceMap: false,
    devServer:{
        //解决跨域问题
        proxy: {
            '/demoviedo':{
                target: 'https://interactive-examples.mdn.mozilla.net',
                changeOrigin: true,  //如果接口跨域这里就要这个参数配置
                pathRewrite: {
                    '^/demoviedo': '/'  // 去掉路径中的 /demoviedo 前缀 //实际请求地址是https://interactive-examples.mdn.mozilla.net
                }
            },
            // 可以添加多个代理
        }
    },
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
                    // scss打包还有问题  css  是不是也得写上来
                    // {
                    //     test:/\.s[ac]ss$/,
                    //     exclude:/node_modules/,
                    //     use:[
                    //         //将JS字符串生成为style节点
                    //         // "style-loader",
                    //         MiniCssExtractPlugin.loader,
                    //         //将CSS转化成CommonJS模块
                    //         'css-loader',
                    //         //将Sass编译成CSS
                    //         'sass-loader'
                    //     ]
                    // },
                    // {
                    //     test:/\.css$/,
                    //     exclude:/node_modules/,
                    //     use:[
                    //         //将JS字符串生成为style节点
                    //         // "style-loader",
                    //         MiniCssExtractPlugin.loader,
                    //         //将CSS转化成CommonJS模块
                    //         'css-loader',
                    //     ]
                    // }
                ]
            })
            config.plugins.push(
                //该插件必须引入--确保上述规则在.vue文件的相应模块生效
                new VueLoaderPlugin(),
                // 这个是否有用，有待验证？？
                new CssMinimizerPlugin(),
                //打包完成后,生成在线包分析图
                new BundleAnalyzerPlugin(),
            )


            // 这个在默认情况下只会影响到按需加载的内容。。。。
            let splitChunks =  config.optimization.splitChunks
            // 按需加载时候最大的并行请求数
            splitChunks.maxAsyncRequests = 5
            // 最大初始化请求数
            splitChunks.maxInitialRequests = 3
            // 形成一个新代码块的最小体积
            splitChunks.minSize = 30000


            //确保最后提取的文件大小不能为0--类似于minSize
            splitChunks.minRemainingSize = 0
             //达到该体积后就需要拆分
            // splitChunks.enforceSizeThreshold=300000;
            // 打包分割符
            splitChunks.automaticNameDelimiter = '~'            
            let chunkRule = {
                // 是否可以把它使用统一变量进行模块拆分
                echarts:{
                    name: 'echarts',
                    test: /[\\/]node_modules[\\/](echarts)[\\/]/, //正则匹配要拆分的模块
                    priority: 10,
                    chunks: 'all',
                },
                tinymce:{
                    name: 'tinymce',
                    test: /[\\/]node_modules[\\/](tinymce)[\\/]/, //正则匹配要拆分的模块
                    priority: 15,
                    chunks: 'all',
                },
                elementPlus:{
                    name: 'element-plus',
                    test: /[\\/]node_modules[\\/](element-plus)[\\/]/, //正则匹配要拆分的模块
                    priority: 20,
                    chunks: 'all',
                },
            }
            Object.assign(splitChunks.cacheGroups,chunkRule)
        }
    },
}
