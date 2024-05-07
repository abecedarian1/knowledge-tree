// 这些不需要 webpack会自动检测：
// 只需要安装 sass-loader  sass  style-loader  css-loader

// module.exports = {
//     //Webpack中的自定义配置项  ---vue-cli中只能配置部分webpack项
//     configureWebpack: {
//         module:{
//             rules:[
//                 {
//                     test:/\.s[ac]ss$/,
//                     exclude:/node_modules/,
//                     use:[
//                         //将JS字符串生成为style节点
//                         "style-loader",
//                         //将CSS转化成CommonJS模块
//                         "css-loader",
//                         //将Sass编译成CSS
//                         "sass-loader"
//                     ]
//                     // loaders:['style','css','sass']
//                 }
//             ]
//         }
//     }
// }
