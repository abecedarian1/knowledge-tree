import webFront from './WebFront.module.scss'
import { useSearchParams, Link, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import baseService from '../../axios/baseService'

let selectId = null
const getCurrentMessage = async (mainId) => {
    // 通过id调用查询接口
    let res = await baseService.get('/getKnowledgeCategory?id=' + mainId)
    let titleName = res.data[0].name
    let parentUrl = res.data[0].url
    let sideBarList = []
    // 当前内容列表
    await baseService.get('/modelList?parentId=' + mainId).then((res) => {
        sideBarList = res.data
        sideBarList.forEach(item => {
            item.url = '/' + parentUrl + '/' + item.url + '?mainId=' + mainId + '&branchId=' + item.id
        });
    })
    return { sideBarList, titleName }
}

const goHome = () => {
    window.location.replace('/');
}
const goBack=()=>{
    window.history.go(-1)
}
const selectOption = (id) => {
    return () => {
        selectId = id
    }
}


export default function WebFront() {
    const [titleName, setTitleName] = useState('')
    const [sideBarList, setSideBarList] = useState([])
    const [searchParams] = useSearchParams()
    let mainId = searchParams.get('mainId')

    useEffect(() => {
        getCurrentMessage(mainId).then((res) => {
            setSideBarList(res.sideBarList)
            setTitleName(res.titleName)
        })
    }, [mainId])

    return (
        <div>
            <div className={webFront.user_bar}>
                <span onClick={goHome} style={{ textDecoration: 'none', color: '#335f5b', marginLeft: '20px', float: 'left' }}>
                    回到首页
                </span>
                <span onClick={goBack} style={{ textDecoration: 'none', color: '#335f5b', marginRight: '20px', float: 'right' }}>
                    返回
                </span>

                <div style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: '30px', fontWeight: 'bolder', color: '#2C3E50' }}>{titleName}</span>
                </div>
            </div>

            <div className={webFront.content}>
                <div className={webFront.option_bar}>
                    <ul>
                        {
                            sideBarList.map((item) => {
                                return (
                                    <li key={item.id} onClick={selectOption(item.id)} className={selectId==item.id ? webFront.select_option : ''} >
                                        <Link className={webFront.bg} to={item.url}>{item.name}</Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div id="test" className={webFront.box_1}>
                    {
                        selectId == null ?
                            (<div style={{ textAlign: 'left', fontSize: '20px', padding: '10px' }}>请选择~~~</div>) :
                            (<div><Outlet /></div>)
                    }

                </div>
            </div>

        </div>
    )
}