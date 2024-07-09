import home from './Home.module.scss'
import baseService from '../../axios/baseService'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import bannerImg from '../../imgs/banner.jpg'
const getHomeList = async () => {
    let list = []
    let res = await baseService.get('/getKnowledgeCategory')
    list = res.data
    list.forEach((item) => {
        item.url ='/' + item.url + "?mainId=" + item.id
    });
    return list
}

export default function Home() {
    const [categoryList, setCategoryList] = useState([])
    useEffect(() => {
        getHomeList().then(res => {
            setCategoryList(res)
        })
    }, [])

    return (
        <div>
            <div className={home.banner}>
                <img className={home.banner_pic} src={bannerImg} alt="图片加载失败" />
                <div className={home.tittle_bg}>
                    <div className={home.tittle}><h1>线上个人笔记</h1></div>
                </div>
                <div className={home.search}>
                    <div style={{ width: '85%', position: 'relative' }}>
                        <span><input type="text" className={home.search_content} placeholder="请输入你想查找的内容" /></span>
                        <span><input type="submit" className={home.search_button} value="搜索" /></span>
                    </div>
                </div>
            </div>

            <div className={home.content}>
                {
                    categoryList.length > 0 &&
                    (<ul>
                        {categoryList.map((item) => {
                            if (item.name == '内容新增') {
                                return (
                                    <li key={item.id}>
                                        <NavLink to='/contentManagement'>{item.name}</NavLink>
                                    </li>
                                )
                            } else if (item.name == '公共组件') {
                                return <li key={item.id}>11{item.name}</li>
                            }
                            return (
                                <li key={item.id}>
                                    <NavLink to={item.url}>{item.name}</NavLink>
                                </li>
                            )
                        })}
                    </ul>)
                }
                {/* <li v-for="(item,index) in categroyList" :key="index" >
                        <router-link v-else-if="item.name=='公共组件'" to="component-quick-find">{{item.name}}</router-link>
                    </li>  */}
            </div>
        </div>
    )
}