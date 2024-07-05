import { useSearchParams, Link } from 'react-router-dom'
import { useEffect,useState } from 'react'
import baseService from  '../../../axios/baseService'
import base from './Base.module.scss'

const getCurrentMessage= async (mainId,branchId) => {
    if(mainId && branchId){
        let list = []
        //获取当前路由信息
        await baseService.get('/modelBranchList?parentId='+branchId).then((res)=>{
            list = res.data
            if(list.length>0){
                list.forEach(item => {
                    item.url = item.url+'?mainId='+mainId+'&branchId='+branchId+'&branchRightId='+item.id
                });
            }
        })
        return list
    }
}

export default function Base(){
    const [searchParams] = useSearchParams()
    const [modelList,setModelList] = useState([])

    let mainId = searchParams.get('mainId')
    let branchId = searchParams.get('branchId')

    useEffect(()=>{
        getCurrentMessage(mainId,branchId).then((res)=>{
            setModelList(res)
        })
    },[mainId,branchId])

    return(
        <div className={base.base}>
            {modelList.length > 0 && (
                <ul>
                    {
                        modelList.map((item)=>{
                            return <li key={item.id}>
                                <Link to={item.url}>{item.name}</Link>
                            </li>
                        })
                    }
                </ul>
            )}
        </div>
    )
}