
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
    const [globalLevelFlag,setGlobalLevelFlag] = useState('')
    const [globalParentId,setGlobalParentId] = useState('')
    const [globalItemId,setGlobalItemId] = useState('')


    useEffect(()=>{
        getCurrentMessage().then((res)=>{
            setNavTree(res)
        })
    },[])

    const useNavHandleClick=(event)=>{
        // 自定义hook必须在hook里边用??
        useSubNavShowOrHide(event)
        //返回导航对应的内容
        if(/nav-link/.test(event.target.className)){

            console.log('调用了')
            let [levelFlag,parentId] = event.target.getAttribute('data-nav-index').split('-')
            setGlobalLevelFlag(levelFlag)
            setGlobalParentId(parentId)

            //这里边的参数不能使用useState中的值————第一次出不来
            getNavItemList(levelFlag,parentId).then((res)=>{
                setNavItemList(res)
            })
        }
    }


    // window.onload = function(){  //不能加这个，表单数据出不来？？？
        // ------------弹窗监听事件————只能这样写
        const addOrUpdateModal = document.getElementById('addOrUpdateModal')
        // const addOrUpdateModal = $('#addOrUpdateModal')
        addOrUpdateModal && addOrUpdateModal.addEventListener('show.bs.modal',  (event) => {
            
            console.log('event---------弹窗',event)
            // addOrUpdateModal.dispose()

            let id=''
            let levelFlag = globalLevelFlag
            let parentId  = globalParentId


            // 触发弹窗的按钮
            const button = event.relatedTarget
            const modalTitle = addOrUpdateModal.querySelector('.modal-title')
            if(button.innerText === '新增'){
                modalTitle.textContent = '新增'
                id=''
                setGlobalItemId(id)
            }else if(button.innerText === '修改'){
                modalTitle.textContent = '修改'
                id = button.getAttribute('data-item-id')
                setGlobalItemId(id)
            }

            // modalTitle.textContent = `New message to ${recipient}`
            


            // 为什么会触发8次 甚至16次  ：4次失败，4次成功  ？？question！！！！
            // 选择的导航元素 子层级越高，调用次数越多
            // 而且state中的状态会回滚一下 ？？？？？？？？？？？ //-_-\\
            console.log('leve---id',levelFlag,parentId)
            // 接口调用里边也不能直接使用useState的内容
            baseService.post("/management/getManagementContent?level="+levelFlag+'&id='+id+'&parentId='+parentId).then((res)=>{
                console.log('调用接口回显的数据',res.data)
                let data = res.data
                

                addOrUpdateModal.querySelector('#parentName').value = data.parentName
                addOrUpdateModal.querySelector('#itemTitle').value = data.name
                addOrUpdateModal.querySelector('#itemUrl').value = data.url
            }).catch(err=>{
                console.log('err--------',err)
            })

        })

        // 提交事件
        if(addOrUpdateModal){  //这个条件必须加 否则报错
            const modalInstance = new Modal(addOrUpdateModal);

            addOrUpdateModal.addEventListener('hidde.bs.modal',  (event) => {
                // 取消弹窗的时候移除表单上存储的数据
                modalInstance.dispose()
            })

            // 监听表单提交事件 新增/修改 ————修改新增的时候一次性添加了好多数据————question__相当于重复执行了好多次
            // 因该是setState()重新更新dom的原因 ？？？？？
            addOrUpdateModal.querySelector("#confirm").addEventListener('click',()=>{
                console.log('提交事件-------')

                let inputName = addOrUpdateModal.querySelector('#itemTitle').value
                let inputUrl = addOrUpdateModal.querySelector('#itemUrl').value

                // 提交数据
                let params = {}
                // treeSelect  ID  LEVEL 根据这两个确认调用哪个接口
                params = {
                    level:globalLevelFlag,
                    id:globalItemId,
                    name:inputName,
                    url:inputUrl,
                    parentId:globalParentId
                }
            
                baseService.post("/management/addOrUpdate",params).then((res)=>{
                    if(res.data == 'success'){
                        // // 更新已选择的数据列表修改内容
                        // initSelectList();
                        // // 重新刷新Tree页面
                        // initTreeList();
        
                        // ElMessage({
                        //     type:'success',
                        //     message:'成功'
                        // })

                         // 取消弹窗  ---没有成功？？？？ 单次可以，可能是 fade类名的原因
                        //  弹窗没了，背景没关 -取消也是
                        modalInstance.hide()
                    }
                })               
            })
        }
    // }


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
                                return (
                                    subNavDomLoop(item)
                                )
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


                                        {globalLevelFlag ==3 && (<a style={{color: 'green'}}>详情</a>)}
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
            <div  className="modal fade" id="addOrUpdateModal" tabindex="-1" data-bs-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
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