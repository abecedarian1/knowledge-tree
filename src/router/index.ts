import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

// 
import CommonBar from '../components/CommonBar.vue'
import Home from '../views/Home.vue'
// import WebFront from '../views/web-front/WebFront.vue'
// import Base from '../views/web-front/base/Base.vue'
// import JS from '@/views/web-front/base/JS/Js.vue'
// import JsContent from '@/views/web-front/base/JS/JsContent.vue'
// import ContentMangement from '@/views/content-management/ContentManagement.vue'
// import ComponentQuickFind from '@/views/component-quick-find/ComponentQuickFind.vue'

// 路由懒加载 --异步加载
const WebFront = () => import('../views/web-front/WebFront.vue')
const Base = () => import('../views/web-front/base/Base.vue')
const JS = () => import('@/views/web-front/base/JS/Js.vue')
const JsContent = () => import('@/views/web-front/base/JS/JsContent.vue')
const ContentMangement = () => import('@/views/content-management/ContentManagement.vue')
const ComponentQuickFind = () => import('@/views/component-quick-find/ComponentQuickFind.vue')




const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: CommonBar,

    children:[
      {
        path:"/",
        component:Home,
        // component:ComponentQuickFind,
      },

      
      // 前端  动态路由
      {
        path:'/:block',
        component:WebFront,

        children:[

          {
            path:'/:block/:leftSide',
            component:Base,          
          },
            
          {
            path:'/:block/:leftSide/:rightBlock',
            component:JS
          },
          
          {
            path:'/:block/:leftSide/:rightBlock/:content',
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


  

  // {
  //   path: '/about',
  //   name: 'about',
  //   component: () => import('../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
