import Home from '../pages/Home/Home'
import WebFront from '../pages/WebFront/WebFront'
import Base from '../pages/WebFront/Base/Base'

import {Navigate} from 'react-router-dom'

const routes = [

  {
    path:'/home',
    element:<Home />
  },
  {
      path:'/',
      element:<Navigate to='/home'/>
  },

  {
    path:'/:block',
    element:<WebFront/>,
    children:[
      {
        path:':leftSide',
        element:<Base/>,          
      },
        
      // {
      //   path:':leftSide/:rightBlock',
      //   element:JS
      // },
      
      // {
      //   path:':leftSide/:rightBlock/:content',
      //   element:JsContent
      // }
    ]
  },

  // 前端  动态路由
  // {
  //   path:'/content-management',
  //   component:ContentMangement

  // },
  // {
  //   path:'/component-quick-find',
  //   component:ComponentQuickFind
  // },

]
export default routes