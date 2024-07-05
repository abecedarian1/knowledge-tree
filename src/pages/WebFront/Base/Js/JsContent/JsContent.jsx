import baseService from "../../../../../axios/baseService"
import {useEffect,useState} from 'react'
import {useSearchParams} from 'react-router-dom'
import jsContent from  './JsContent.module.scss'

const getCurrentMessage = async(id) => {
    let title = ''
    let detailContent = ''
    // 通过id查找对应的内容
    await baseService.get('/content?id='+id).then((res)=>{
        detailContent = res.data.content
    })
    // 通过id查找name
    await baseService.get('/contentList?id='+id).then((res)=>{
        title = res.data[0].name
    })
    return {detailContent,title}
}

export default function JsContent(){
    const [searchParams] = useSearchParams()
    const [title,setTitle] = useState('')
    const [detailContent,setDetailContent] = useState('')
    let id = searchParams.get('id')
    useEffect(()=>{
        getCurrentMessage(id).then((res)=>{
            setTitle(res.title)
            setDetailContent(res.detailContent)
        })
    },[id])

    return(
        <div>
            <div><h3>{title}</h3></div>
            <div dangerouslySetInnerHTML={{__html:detailContent}} className={jsContent.content}>
            </div>
        </div>
    )
}