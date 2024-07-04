import './Home.scss'
import baseService from '../../axios/baseService'
import {useEffect,useState} from 'react'
import {NavLink} from 'react-router-dom'
const getHomeList=async()=>{
    let list = []
    let res = await baseService.get('/getKnowledgeCategory')
    list = res.data
    list.forEach((item) => {
        item.url = item.url+"?mainId="+item.id
    });
    return list
}


export default function Home() {
    const [categoryList,setCategoryList] = useState([])
    useEffect(()=>{
        getHomeList().then(res=>{
            setCategoryList(res)
        })

    },[])

    return(
        <div>
            <div className="banner">
                <div className="tittle_bg"> </div>
                <div className="tittle"><h1>线上个人笔记</h1></div>
                <div className="search">
                    <div style={{width: '85%', position: 'relative'}}>
                        <span><input type="text" className="search_content" placeholder="请输入你想查找的内容"/></span>
                        <span><input type="submit" className="search_button" value="搜索"/></span>
                    </div>
            </div>
            </div>

            <div className="content">
                <ul  v-if={(categoryList.length>0).toString()}>
                    {
                        categoryList.map((item)=>{
                            if(item.name=='内容新增'){
                                return <li key={item.id}>11{item.name}</li>
                            }else if(item.name=='公共组件'){
                                return <li key={item.id}>11{item.name}</li>
                            }
                            return(

                                <li key={item.id}>
                                    <NavLink to={'/'+item.url}>{item.name}</NavLink>
                                </li>)
                        })
                    }

                    {/* <li v-for="(item,index) in categroyList" :key="index" >

                        <router-link v-if="item.name=='内容新增'" to="content-management">{{item.name}}</router-link>
                        <router-link v-else-if="item.name=='公共组件'" to="component-quick-find">{{item.name}}</router-link>
                        <router-link v-else :to="item.url">{{item.name}}</router-link>
                    </li>  */}
                </ul>

            
            </div>
        </div>
    )
}