import Home from '../pages/Home/Home'
import WebFront from '../pages/WebFront/WebFront'
import {Navigate} from 'react-router-dom'

export default [
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
      element:<WebFront/>
    },

]