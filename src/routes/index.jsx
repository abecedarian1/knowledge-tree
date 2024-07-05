import Home from '../pages/Home/Home'
import WebFront from '../pages/WebFront/WebFront'
import Base from '../pages/WebFront/Base/Base'
import Js from '../pages/WebFront/Base/Js/Js'
import JsContent from '../pages/WebFront/Base/Js/JsContent/JsContent'
import ContentMangement from '../pages/ContentManagement/ContentManagement'

// import {Navigate} from 'react-router-dom'

const routes = [
  {
    path:'/',
    element:<Home />
  },
  {
    path:':block',
    element:<WebFront/>,
    children:[
      {
        path:':leftSide',
        element:<Base/>,          
      },
      {
        path:':leftSide/:rightBlock',
        element:<Js/>
      },
      
      {
        path:':leftSide/:rightBlock/:content',
        element:<JsContent/>
      }
    ]
  },      
  // 前端  动态路由
  {
    path:'contentManagement',
    element:<ContentMangement/>
  },


  // {
  //   path:'/component-quick-find',
  //   element:ComponentQuickFind
  // },





  // {
  //     path:'/',
  //     element:<Navigate to='/home'/>
  // },

  

]
export default routes