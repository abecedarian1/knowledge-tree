import { createRouter, createWebHashHistory,createWebHistory, RouteRecordRaw } from 'vue-router'
import baseService from "@/axios/baseService"

// 
import CommonBar from '../components/CommonBar.vue'
import Home from '../views/Home.vue'
// import WebFront from '../views/web-front/WebFront.vue'
// import Base from '../views/web-front/base/Base.vue'
// import JS from '@/views/web-front/base/JS/Js.vue'
// import JsContent from '@/views/web-front/base/JS/JsContent.vue'
// import ContentMangement from '@/views/content-management/ContentManagement.vue'
// import ComponentQuickFind from '@/views/component-quick-find/ComponentQuickFind.vue'
// import NotFoundComponent from '@/errors/404.vue'
// import NullContentError from '@/errors/NullContentError.vue'


// 路由懒加载 --异步加载
const WebFront = () => import('../views/web-front/WebFront.vue')
const Base = () => import('../views/web-front/base/Base.vue')
const JS = () => import('@/views/web-front/base/JS/Js.vue')
const JsContent = () => import('@/views/web-front/base/JS/JsContent.vue')
const ContentMangement = () => import('@/views/content-management/ContentManagement.vue')
const ComponentQuickFind = () => import('@/views/component-quick-find/ComponentQuickFind.vue')
const NotFoundComponent = () => import('@/errors/404.vue')
const NullContentError = () => import('@/errors/NullContentError.vue')

const findMessage = async(to:any )=> {
    /**下面这种写法报错,路由不跳转---原因未知  question */
    // await baseService.get('/getKnowledgeCategory?id='+to.query.mainId)
    // .then((res)=>{console.log(res)})
    // .catch((err)=>{
    //   console.log('err',err)
    //   //重定向到 未找到内容 页面
    //   return '/error'
    // })  
    try{
      let res = await baseService.get('/getKnowledgeCategory?id='+to.query.mainId)
      let title = res.data[0].name
      let parentUrl = res.data[0].url
      let data = {
        title,
        parentUrl
      }
      Object.assign(to.query,data)
    }catch(err){
      //重定向到 未找到内容 页面
      return '/error'
    }
}

// 进入路由前,加载数据,防止页面空白 || 也可以在页面中添加--加载loading动画
const LoadingData=async(to:any)=>{
  let res = await baseService.get('/getKnowledgeCategory')
  let list = res.data
  list.forEach((item:any) => {
      item.url = item.url+"?mainId="+item.id
  });
  Object.assign(to.query,{list})
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: CommonBar,

    children:[
      {
        path:"",
        name: 'home',
        alias:'home', //别名
        component:Home,
        //路由独享守卫
        beforeEnter:LoadingData,
      },
      // 前端  动态路由
      {
        path:':block',
        name:'block',
        component:WebFront,
        // 内容找不到的 路由守卫 放这里
        beforeEnter:findMessage,
        children:[
          {
            path:':leftSide',
            component:Base,          
          },
            
          {
            path:':leftSide/:rightBlock',
            component:JS
          },
          
          {
            path:':leftSide/:rightBlock/:content',
            component:JsContent
          }
        ]
      },  
      {
        path:'/content-management',
        component:ContentMangement

      },
      {
        path:'/component-quick-find',
        component:ComponentQuickFind
      },
    ]
  },

  //匹配路径里边的内容没有找到
  { 
    path: '/error', 
    name:'NullContentError',
    component: NullContentError 
  },

  // 所查找的路由不在已定义的路由列表中
  { 
    path: '/404', 
    name:'NotFound',
    component: NotFoundComponent 
  },

  // 万能路由---匹配上面定义的路由没有找到的情况
  { 
    path: '/:pathMatch(.*)', 
    redirect:'/404',
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  // history: createWebHistory(),
  routes
})

export default router
