
//babel 和 Corejs 将 ES6 语法转为向后兼容的JS语法，兼容旧版浏览器
module.exports = {
    // 智能预设，能够编译ES6语法
    presets:[
        [
            "@babel/preset-env",
            {
                useBuiltIns:'usage',  //按需加载，自动引入
                corejs:3
            },
        ]
    ],
}