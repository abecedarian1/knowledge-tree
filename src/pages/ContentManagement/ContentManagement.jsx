import contentMangement from "./ContentManagement.module.scss"
import baseService from "../../axios/baseService"
import { useEffect } from "react"
import { useState } from "react"


//获取导航列表
const getCurrentMessage = async () => {
    let list = []
    await baseService.get("/getKnowledgeTree").then((res)=>{
        list = res.data
    })  
    return list
}


//选择的导航所包含的内容
const initSelectList= async (levelFlag,id) => {
     let contentList = []
     let params = {
         level:levelFlag,
         parentId:id
     }
     await baseService.post("/management/getList",params).then((res)=>{
         if(res.data.length>0){
            contentList = res.data
         }else{
            contentList.length = 0
         }
     })
     return contentList
}


export default function ContentMangement(){

    // 自定义 标签空前缀 类样式
    const customPreNull  = " " + contentMangement.pre_null
    //自定义 标签前缀下拉三角🔻 类样式
    const customPreDropDownToggle  = " " +  contentMangement.dropdown_toggle
    //自定义 标签前缀右指向三角▶ 类样式
    const customPreDropEndToggle  = " " +  contentMangement.dropend_toggle

    //需要添加一个条件判断————question 
    const customPreToggle = customPreDropEndToggle
    
    const [modelTree,setModelTree] = useState([])
    const [contentList,setContentList] = useState([])



    useEffect(()=>{
        getCurrentMessage().then((res)=>{
            setModelTree(res)
        })
    },[])

    //这个目前只能放在函数体内——用到了useState
    const handleClick=(event)=>{
        //覆盖bootstrap的下拉菜单显示
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
    
        //返回导航对应的内容
        if(/nav-link/.test(event.target.className)){
            let [levelFlag,id] = event.target.getAttribute('data-nav-index').split('-')
            initSelectList(levelFlag,id).then((res)=>{
                setContentList(res)
            })
        }
    }
    

    return (
        <div> 
            <div className={contentMangement.user_bar}>
                <a style={{textDecoration: 'none',color:'#335f5b',marginLeft: '20px',float: 'left'}} href="/">
                    返回
                </a>
                <div style={{textAlign:'center'}}><a style={{fontSize:'30px',fontWeight: 'bolder'}}>内容管理</a></div>
            </div>

            <div className={contentMangement.content}>
                {/* 导航 */}
                <nav className={"navbar ps-2" + " " + contentMangement.navbar }  onClick={handleClick}>
                    <ul className="navbar-nav">
                        {modelTree.map((item)=>{
                            if(item.children.length == 0){
                                return (
                                    <li key={item.level+'-'+item.id} className="nav-item">
                                        <a data-nav-index={item.level+'-'+item.id} className={"nav-link" + customPreNull} aria-current="page" href="#">{item.label}</a>
                                    </li>
                                )
                            }
                            else{
                                return (
                                    <li key={item.level+'-'+item.id} className="nav-item dropdown">
                                        <a data-nav-index={item.level+'-'+item.id} className={"nav-link"+customPreToggle } href="#" role="button" aria-pressed="false" aria-expanded="false" data-bs-toggle="dropdown" >
                                            {item.label}
                                        </a>
                                        <ul className={"dropdown-menu" + " " + contentMangement.dropdown_menu}>
                                            {item.children.map((item)=>{
                                                if(item.children.length == 0){
                                                    return (<li key={item.level+'-'+item.id}><a data-nav-index={item.level+'-'+item.id} className={"dropdown-item nav-link"+ customPreNull} href="#">{item.label}</a></li>)     
                                                }
                                                else{
                                                    return (
                                                        <li key={item.level+'-'+item.id} className="nav-item dropdown">
                                                            <a className={"nav-link"+ customPreToggle} href="#" role="button" aria-pressed="false" aria-expanded="false" data-nav-index={item.level+'-'+item.id} data-bs-toggle="dropdown" >
                                                                {item.label}
                                                            </a>
                                                            <ul className={"dropdown-menu" + " " + contentMangement.dropdown_menu}>
                                                                {item.children.map((item)=>{
                                                                    return(
                                                                        <li key={item.level+'-'+item.id}><a className={"dropdown-item nav-link" + customPreNull} href="#" data-nav-index={item.level+'-'+item.id}>{item.label}</a></li>
                                                                    )  
                                                                })}
                                                            </ul>
                                                        </li>
                                                    )
                                                }
                                            })}
                                        </ul>
                                    </li>
                                )
                            }
                        })}
                    </ul>
                </nav>


                {/* <!-- 列表增删改 --> */}

                {/* v-if="!showContent"  */}
                <div id="box_1" className={contentMangement.box_1}>
                    <div>
                        {/* onClick={addOrUpdate} */}
                        <button type="button" className="btn btn-primary">新增</button>            
                    </div>

                    <ul>
                        {contentList.map((item,index)=>{
                            return (
                                <li> 
                                    <span style={{float: 'left'}}>{index+1}. {item.name}</span>
                                    <span style={{float: 'right'}}>

                                        {/* onClick={addOrUpdate(item.id)} */}
                                        <a  style={{color: 'yellowgreen',marginRight: '5px'}}>修改</a>
                                        {/* onClick={deleteItem(item.id)} */}
                                        <a  style={{color: 'red',marginRight: '5px'}}>删除</a>
                                        {/* ??????? */}
                                        {/* onClick={contentMangement(item.id)} */}
                                        {/* <a v-if="treeSelect.levelFlag == 3"  style={{color: 'green'}}>详情</a> */}
                                    </span>
                                </li>
                            )
                        })}
                    </ul>
                </div>


                {/* <!-- 上下两个div用v-if控制 -->
                <!-- 富文本编辑器 --> */}
                {/* <div v-else  className={contentMangement.box_1}> 
                    <div>
                        <el-button onClick={saveContent} type="primary" style={{float: 'right'}}>保存</el-button>
                    </div>
                    <!-- 标题 -->
                    <h3 style={{textAlign: 'center',width: '100%'}}>{{detailContent.title}}</h3>
                    <div className={contentMangement.app_container} style={{width: '100%',height: '100%'}}>
                        <editor  id="tinymce" v-model="detailContent.content" :init="init" > </editor>
                    </div>
                </div> */}



            </div>


        {/* <!-- title="新增"  --> */}
        {/* <el-dialog 
            v-model="openVisible" 
            :title="form.id ? '修改' : '新增'" 
            width="55%" 
        >
            <el-form :model="form">
                <el-form-item label="上级标题">
                    <el-input disabled v-model="form.parentName" placeholder="上级标题"></el-input>
                </el-form-item>
                
                <el-form-item label="标题">
                    <el-input v-model="form.name" placeholder="标题"></el-input>
                </el-form-item>
                
                <el-form-item label="路由">
                    <el-input v-model="form.url" placeholder="路由"></el-input>
                </el-form-item>
            </el-form>

            <template #footer>
                <span className={contentMangement.dialog_footer}>
                    <el-button onClick={openVisible = false}>取消</el-button>
                    <el-button type="primary" onClick={submitConfirm}>
                      确定
                    </el-button>
                  </span>
            </template>
        </el-dialog> */}

    </div>
    )
}