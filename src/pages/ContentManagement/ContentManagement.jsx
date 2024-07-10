
import { Modal } from 'bootstrap'; 

import contentManagement from "./ContentManagement.module.scss"
import baseService from "../../axios/baseService"
import { useEffect } from "react"
import { useState ,useRef } from "react"
import { Editor } from '@tinymce/tinymce-react';


// import $ from 'jquery'

// 自定义 标签空前缀 类样式
const customPreNull  = " " + contentManagement.pre_null
//自定义 标签前缀下拉三角🔻 类样式
const customPreDropDownToggle  = " " +  contentManagement.dropdown_toggle
//自定义 标签前缀右指向三角▶ 类样式
const customPreDropEndToggle  = " " +  contentManagement.dropend_toggle

//需要添加一个条件判断————question 
const customPreToggle = customPreDropEndToggle


//获取导航列表
const getCurrentMessage = async () => {
    let list = []
    await baseService.get("/getKnowledgeTree").then((res)=>{
        list = res.data
    })  
    return list
}

//选择的导航元素所包含的列表
const getNavItemList= async (levelFlag,id) => {
     let navItemList = []
     let params = {
         level:levelFlag,
         parentId:id
     }
     await baseService.post("/management/getList",params).then((res)=>{
         if(res.data.length>0){
            navItemList = res.data
         }
     })
     return navItemList
}


//覆盖bootstrap的下拉菜单显示
function useSubNavShowOrHide(event){
    if(event.target.getAttribute("data-bs-toggle") === 'dropdown'){
        //兄弟节点
        let sibling = event.target.nextSibling
        // 默认为false
        let pressed = event.target.getAttribute('aria-pressed') === 'true'
        // 点击后要改变
        if(!pressed){
            sibling.style.display = 'block'
        }else{
            sibling.style.display = 'none'
        }
        //设置相反值
        event.target.setAttribute("aria-pressed",!pressed)
        // 当折叠回来后，还要控制子元素中的下拉项全部折叠---question
        // nav的样式需要改 ----
        // useRef需要理解 -----
    }
}

// 不可以作为自定义hook
// Nav中的多层循环下拉
function subNavDomLoop(item){
    return (
        <li key={item.level+'-'+item.id} className="nav-item dropdown">
            <a data-nav-index={item.level+'-'+item.id} className={"nav-link"+customPreToggle } href="#" role="button" aria-pressed="false" aria-expanded="false" data-bs-toggle="dropdown" >
                {item.label}
            </a>
            {/* // 下拉 */}
            <ul className={"dropdown-menu" + " " + contentManagement.dropdown_menu}>
                {item.children.map((item)=>{
                    if( !item.children || item.children.length == 0){
                        return (<li key={item.level+'-'+item.id}><a data-nav-index={item.level+'-'+item.id} className={"dropdown-item nav-link"+ customPreNull} href="#">{item.label}</a></li>)     
                    }
                    else{
                        return (
                            subNavDomLoop(item)
                        )
                    }
                })}
            </ul>
        </li>
    )
}



export default function ContentMangement(){
    const [navTree,setNavTree] = useState([])
    const [navItemList,setNavItemList] = useState([])
    const [selectNavItemMsg,setSelectNavItemMsg] = useState({levelFlag:'',parentId:''})
    const [showContent,setShowContent] = useState(false)
    const [detailContent,setDetailContent] = useState({id:'',content:'',title:''})
    //与页面渲染无关的尽量不要用useState() 
    let itemId = ''    //新增/修改元素的id
    const editorRef = useRef(null);

    const saveContent = () => {
        if (editorRef.current) {
            let param = {
                content:editorRef.current.getContent(),
                parentId:detailContent.id
            }
            //修改
            baseService.put("/content",param).then((res)=>{
                if(res.data == 'success'){
                    //提示
                    document.getElementById('msgTip').style.display = 'block'
                    setTimeout(()=>{
                        document.getElementById('msgTip').style.display = 'none'
                    },1500)
                }
            })   
        }
    };
    
   
    useEffect(()=>{
        getCurrentMessage().then((res)=>{
            setNavTree(res)
        })
        // 放在useEffect（组件挂载）中可以保证在DOM加载完成后获取到元素内容
        const addOrUpdateModal = document.getElementById('addOrUpdateModal')
        const modalInstance = new Modal(addOrUpdateModal);
        
        //弹窗点击显示事件
        const handleModalClickEvent= async (event)=>{
            let levelFlag = selectNavItemMsg.levelFlag
            let parentId  = selectNavItemMsg.parentId
            // 触发弹窗的按钮
            const button = event.relatedTarget
            const modalTitle = addOrUpdateModal.querySelector('.modal-title')
            if(button.innerText === '新增'){
                modalTitle.textContent = '新增'
                itemId = ''
            }else if(button.innerText === '修改'){
                modalTitle.textContent = '修改'
                itemId = button.parentNode.getAttribute('data-item-id')
            }
            await baseService.post("/management/getManagementContent?level="+levelFlag+'&id='+itemId+'&parentId='+parentId).then((res)=>{
                let data = res.data
                addOrUpdateModal.querySelector('#parentName').value = data.parentName
                addOrUpdateModal.querySelector('#itemTitle').value = data.name
                addOrUpdateModal.querySelector('#itemUrl').value = data.url
            }).catch(err=>{console.log(err)})
        }
 
        // 表单提交
        const submitFormMsg =()=>{
            let inputName = addOrUpdateModal.querySelector('#itemTitle').value
            let inputUrl = addOrUpdateModal.querySelector('#itemUrl').value
            let params = {}
            params = {
                level:selectNavItemMsg.levelFlag,
                id:itemId,
                name:inputName,
                url:inputUrl,
                parentId:selectNavItemMsg.parentId
            }
            baseService.post("/management/addOrUpdate",params).then((res)=>{
                if(res.data == 'success'){
                    // 刷新导航 和列表
                    getCurrentMessage().then((res)=>{
                        setNavTree(res)
                    })
                    getNavItemList(selectNavItemMsg.levelFlag,selectNavItemMsg.parentId).then((res)=>{
                        setNavItemList(res)
                    })
                    //提示
                    document.getElementById('msgTip').style.display = 'block'
                    setTimeout(()=>{
                        document.getElementById('msgTip').style.display = 'none'
                    },1500)
                    modalInstance.hide();     // 关闭弹窗
                    //关闭背景遮罩 和body残留样式 -_-  hide()只局部生效
                    let backdrop = document.querySelector('.modal-backdrop.show')
                    backdrop && backdrop.parentNode.removeChild(backdrop)
                    document.body.removeAttribute('style')
                }
            })  
        }

      
        if(addOrUpdateModal){
            // 保证监听器只能挂载一次————放在useEffect中
            addOrUpdateModal.addEventListener('show.bs.modal',handleModalClickEvent);
            addOrUpdateModal.querySelector("#confirm").addEventListener('click',submitFormMsg)
        }
        return ()=>{
            // 一定要取消监听，否则会重复执行一次
            if(addOrUpdateModal){
                addOrUpdateModal.removeEventListener('show.bs.modal', handleModalClickEvent)
                addOrUpdateModal.querySelector("#confirm").removeEventListener('click',submitFormMsg)
            }
        }
    },[selectNavItemMsg])

    const useNavHandleClick=(event)=>{
        setShowContent(false)
        // 自定义hook必须在hook里边用??
        useSubNavShowOrHide(event)
        //返回导航对应的内容
        if(/nav-link/.test(event.target.className)){
            let [levelFlag,parentId] = event.target.getAttribute('data-nav-index').split('-')
            setSelectNavItemMsg({levelFlag,parentId})
            getNavItemList(levelFlag,parentId).then((res)=>{
                setNavItemList(res)
            })
        }
    }

    const goDetail= async (event)=>{
        let id = event.target.parentNode.getAttribute('data-item-id')
        let content = ''
        let title = ''
        if(selectNavItemMsg.levelFlag == 3){
            setShowContent(true)
            Promise.all([
                baseService.get("/content?id="+id),
                baseService.get("/contentList?id="+id)
            ]).then((res)=>{
                content = res[0].data.content
                title = res[1].data[0].name
                setDetailContent({id,content,title})
            }).catch(err=>{console.log(err)})
        }
    }

    const deleteItem=(event)=>{
        let id = event.target.parentNode.getAttribute('data-item-id')
        let confirm = window.confirm('确定要进行删除吗？')
        if(confirm){
            baseService.delete("/management/managementDelete?id="+id+"&level="+selectNavItemMsg.levelFlag).then((res)=>{
                if(res.data == "cascading"){
                    alert('还有子项未删除，请先删除子项')
                }else if(res.data == "error"){
                    alert('error')
                }else{
                    // 刷新导航 和列表
                    getCurrentMessage().then((res)=>{
                        setNavTree(res)
                    })
                    getNavItemList(selectNavItemMsg.levelFlag,selectNavItemMsg.parentId).then((res)=>{
                        setNavItemList(res)
                    })
                     //提示 删除成功
                     document.getElementById('msgTip').style.display = 'block'
                     setTimeout(()=>{
                         document.getElementById('msgTip').style.display = 'none'
                     },1500)
                }
            })
        }   
    }


    return (
        <>
            {/* 动态提示消息 */}
            <div style={{display:'none'}} id='msgTip' className={"alert alert-warning alert-dismissible fade show " + ' ' +contentManagement.alert_msg} role="alert">
                <strong>success!</strong> 
            </div>
            <div> 
                <div className={contentManagement.user_bar}>
                    <a style={{textDecoration: 'none',color:'#335f5b',marginLeft: '20px',float: 'left'}} href="/">返回</a>
                    <div style={{textAlign:'center'}}><a style={{fontSize:'30px',fontWeight: 'bolder'}}>内容管理</a></div>
                </div>
                <div className={contentManagement.content}>
                    <nav id="nav" className={"navbar ps-2" + " " + contentManagement.navbar } onClick={useNavHandleClick} >
                        <ul className="navbar-nav">
                            {navTree.map((item)=>{
                                if(item.children.length == 0){
                                    return (
                                        <li key={item.level+'-'+item.id} className="nav-item">
                                            <a data-nav-index={item.level+'-'+item.id} className={"nav-link" + customPreNull} aria-current="page" href="#">{item.label}</a>
                                        </li>
                                    )
                                }
                                else{
                                    return ( subNavDomLoop(item) )
                                }
                            })}
                        </ul>
                    </nav>

                    {!showContent && (
                        <div id="box_1" className={contentManagement.box_1}>
                            <div>
                                <button  
                                    type="button" 
                                    className="btn btn-primary" 
                                    data-bs-toggle="modal" 
                                    data-bs-target="#addOrUpdateModal">新增</button>
                            </div>
                            <ul>
                                {navItemList.map((item,index)=>{
                                    return (
                                        <li key={item.id}> 
                                            <span style={{float: 'left'}}>{index+1}. {item.name}</span>
                                            <span style={{float: 'right'}} data-item-id={item.id}>
                                                <a type="button" data-bs-toggle="modal"  data-bs-target="#addOrUpdateModal" style={{color: 'yellowgreen',marginRight: '5px'}}>修改</a>
                                                <a type="button" onClick={deleteItem} style={{color: 'red',marginRight: '5px'}}>删除</a>
                                                {selectNavItemMsg.levelFlag ==3 && (<a onClick={goDetail} type="button" style={{color: 'green'}}>详情</a>)}
                                            </span>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>  
                    )}
                    
                    {showContent && (
                        // <!-- 富文本编辑器 --> */}
                        <div className={contentManagement.box_1}> 
                            <div>
                                <button onClick={saveContent}  className="btn btn-primary" type="button" style={{float: 'right'}}>保存</button>
                            </div>
                            <h3 style={{textAlign: 'center',width: '100%'}}>{detailContent.title}</h3>
                            <div className={contentManagement.app_container} style={{width: '100%',height: '100%'}}>
                                <Editor
                                    apiKey='5b0qvmq9eiiqghh4bfmq810o5v7abhrwz9poujyyqk1bflh8'
                                    onInit={(_evt, editor) => editorRef.current = editor}
                                    initialValue={detailContent.content}
                                    init={{
                                    height: 500,
                                    menubar: false,
                                    plugins: [
                                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                    ],
                                    toolbar: 'undo redo | blocks | ' +
                                        'bold italic forecolor | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'removeformat | help',
                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                    }}
                                />
                            </div>
                        </div> 
                    )}
                </div>            
            </div>

            {/* ---------------------------------------------------------------- */}
            {/* 新增/修改弹窗 */}
            <div  className="modal " id="addOrUpdateModal" tabindex="-1" data-bs-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">新增</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label for="parentName" className="col-form-label">上级标题</label>
                                    <input type="text"  className="form-control" id="parentName"/>
                                </div>
                                <div className="mb-3">
                                    <label for="itemTitle" className="col-form-label">标题</label>
                                    <input type="text" className="form-control" id="itemTitle"/>
                                </div>
                                <div className="mb-3">
                                    <label for="itemUrl" className="col-form-label">路由</label>
                                    <input type="text" className="form-control" id="itemUrl"/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                            <button id="confirm" type="button" className="btn btn-primary">确定</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}