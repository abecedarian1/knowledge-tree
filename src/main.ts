/**
 * 开始日期：2023/05/03
 */

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

/*  --vue.config.js中已经配置了自动按需引入，不需要引入所有
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
.use(ElementPlus)
 */
createApp(App)
.use(router)
.mount('#app')
