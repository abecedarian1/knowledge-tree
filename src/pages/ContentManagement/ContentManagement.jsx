
import { Modal } from 'bootstrap'; 

import contentManagement from "./ContentManagement.module.scss"
import baseService from "../../axios/baseService"
import { useEffect } from "react"
import { useState } from "react"
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
    const [selectNavItemMsg,setSelectNavItemMsg] = useState({levelFlag:'',parentId:'',itemId:''})

    useEffect(()=>{
        getCurrentMessage().then((res)=>{
            setNavTree(res)
        })
        console.log('selectNavItemMsg',selectNavItemMsg)
        // 放在useEffect（组件挂载）中可以保证在DOM加载完成后获取到元素内容
        const addOrUpdateModal = document.getElementById('addOrUpdateModal')

        
        const modalInstance = addOrUpdateModal && new Modal(addOrUpdateModal);
        


        //弹窗点击显示事件
        const handleModalClickEvent= async (event)=>{
            let id=''
            let levelFlag = selectNavItemMsg.levelFlag
            let parentId  = selectNavItemMsg.parentId
            // 触发弹窗的按钮
            const button = event.relatedTarget
            const modalTitle = addOrUpdateModal.querySelector('.modal-title')
            if(button.innerText === '新增'){
                modalTitle.textContent = '新增'
                setSelectNavItemMsg({...selectNavItemMsg,itemId:''})
            }else if(button.innerText === '修改'){
                modalTitle.textContent = '修改'
                id = button.getAttribute('data-item-id')
                setSelectNavItemMsg({...selectNavItemMsg,itemId:id})
            }
            await baseService.post("/management/getManagementContent?level="+levelFlag+'&id='+id+'&parentId='+parentId).then((res)=>{
                let data = res.data
                addOrUpdateModal.querySelector('#parentName').value = data.parentName
                addOrUpdateModal.querySelector('#itemTitle').value = data.name
                addOrUpdateModal.querySelector('#itemUrl').value = data.url
            }).catch(err=>{console.log(err)})
        }
 
        // 表单提交
        const submitFormMsg =()=>{
            console.log('提交事件-------')

            let inputName = addOrUpdateModal.querySelector('#itemTitle').value
            let inputUrl = addOrUpdateModal.querySelector('#itemUrl').value
            let params = {}
            params = {
                level:selectNavItemMsg.levelFlag,
                id:selectNavItemMsg.itemId,
                name:inputName,
                url:inputUrl,
                parentId:selectNavItemMsg.parentId
            }
        
            // 提交数据
            baseService.post("/management/addOrUpdate",params).then((res)=>{
                if(res.data == 'success'){


                    // ？？？？？？？？？？？？？/
                    // // 更新已选择的数据列表修改内容
                    // initSelectList();
                    // // 重新刷新Tree页面
                    // initTreeList();
    
                    // ElMessage({
                    //     type:'success',
                    //     message:'成功'
                    // })

                        // 取消弹窗  ---没有成功？？？？ 单次可以，可能是 fade类名的原因
                    //  弹窗没了，背景没关 -取消也是————没成功 question
                    modalInstance.hide()
                }
            })  

        }

        const clearFormData=()=>{
            // 取消弹窗的时候移除表单上存储的数据 
            modalInstance.dispose()
        }

       

        if(addOrUpdateModal){

            
            // 保证监听器只能挂载一次————放在useEffect中
            addOrUpdateModal.addEventListener('show.bs.modal',handleModalClickEvent);
            addOrUpdateModal.querySelector("#confirm").addEventListener('click',submitFormMsg)
            
            // 移除表单上的数据————未验证
            addOrUpdateModal.addEventListener('hidde.bs.modal', clearFormData)
        }
        return ()=>{
            // 一定要取消监听，否则会重复执行一次
            if(addOrUpdateModal){
                addOrUpdateModal.removeEventListener('show.bs.modal', handleModalClickEvent)
                addOrUpdateModal.querySelector("#confirm").removeEventListener('click',submitFormMsg)
                addOrUpdateModal.removeEventListener('hidde.bs.modal', clearFormData)
            }
        }
    },[selectNavItemMsg])

    const useNavHandleClick=(event)=>{
        // 自定义hook必须在hook里边用??
        useSubNavShowOrHide(event)
        //返回导航对应的内容
        if(/nav-link/.test(event.target.className)){
            let [levelFlag,parentId] = event.target.getAttribute('data-nav-index').split('-')
            setSelectNavItemMsg({...selectNavItemMsg,levelFlag,parentId})

            //这里边的参数不能使用useState中的值————第一次出不来 ？？
            getNavItemList(levelFlag,parentId).then((res)=>{
                console.log('调用了111')
                setNavItemList(res)
            })
        }
    }

    return (
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


                {/* <!-- 列表增删改 --> */}

                {/* v-if="!showContent"  */}
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
                                    <span style={{float: 'right'}}>
                                        <a type="button" data-item-id={item.id} data-bs-toggle="modal"  data-bs-target="#addOrUpdateModal" style={{color: 'yellowgreen',marginRight: '5px'}}>修改</a>

                                        {/* onClick={deleteItem(item.id)} */}
                                        <a  style={{color: 'red',marginRight: '5px'}}>删除</a>
                                        {/* ??????? */}
                                        {/* onClick={contentManagement(item.id)} */}

                                        {selectNavItemMsg.levelFlag ==3 && (<a style={{color: 'green'}}>详情</a>)}
                                    </span>
                                </li>
                            )
                        })}
                    </ul>
                </div>


                {/* <!-- 上下两个div用v-if控制 -->
                <!-- 富文本编辑器 --> */}
                {/* <div v-else  className={contentManagement.box_1}> 
                    <div>
                        <el-button onClick={saveContent} type="primary" style={{float: 'right'}}>保存</el-button>
                    </div>
                    <!-- 标题 -->
                    <h3 style={{textAlign: 'center',width: '100%'}}>{{detailContent.title}}</h3>
                    <div className={contentManagement.app_container} style={{width: '100%',height: '100%'}}>
                        <editor  id="tinymce" v-model="detailContent.content" :init="init" > </editor>
                    </div>
                </div> */}



            </div>


            {/* ---------------------------------------------------------------- */}

            {/* data-bs-keyboard="false"  是否快捷键退出 */}
            {/* 新增/修改弹窗 */}
            {/* fade */}
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
                            {/* 在这里添加事件 */}
                            {/* data-bs-target="#exampleModalToggle2" 另一个modal上的id */}
                            <button id="confirm" type="button" className="btn btn-primary">确定</button>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    )
}