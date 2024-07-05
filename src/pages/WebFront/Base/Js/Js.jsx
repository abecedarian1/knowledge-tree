import {useSearchParams,Link} from 'react-router-dom'
import {useEffect,useState,} from 'react'
import baseService from '../../../../axios/baseService'
import js from './Js.module.scss'

const getCurrentMessage = async (mainId,branchId,branchRightId) => {
    let list = []
    let modelTitle = ''
 
    // 获取上级路由信息
    await baseService.get('/modelBranchList?id='+branchRightId).then(async(res)=>{
        modelTitle = res.data[0].name
        //获取当前路由信息    
       await baseService.get('/contentList?parentId='+branchRightId).then((res)=>{
            list = res.data
            list.forEach(item => {
                item.url = item.url + '?mainId='+mainId+'&branchId='+branchId+'&branchRightId='+branchRightId+'&id='+ item.id          
            });
        })
    })
    return {list,modelTitle}
}

export default function Js(){
    const [searchParams] = useSearchParams()
    const [modelTitle,setModelTitle] = useState('')
    const [contentList,setContentList] = useState([])
    let mainId = searchParams.get('mainId')
    let branchId  = searchParams.get('branchId')
    let branchRightId  = searchParams.get('branchRightId')

    useEffect(()=>{
        getCurrentMessage(mainId,branchId,branchRightId).then((res)=>{
            setModelTitle(res.modelTitle)
            setContentList(res.list)
        })
    },[mainId,branchId,branchRightId])

    return (
        <div className={js.js}>
            <div className={js.title}>{modelTitle}</div>
            {contentList.length > 0 && (
                <div>
                    <ul>
                        {contentList.map((item,index)=>{
                            return(
                                <li key={item.id}>
                                    <Link to={item.url}>{(index+1)+'. '+item.name}</Link>
                                </li>
                            )
                        })}
                    </ul> 
                </div>
            )}
        </div>
    )
}