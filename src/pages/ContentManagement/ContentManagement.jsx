import contentMangement from "./ContentManagement.module.scss"

//覆盖bootstrap的下拉菜单显示
const handleClick=(event)=>{
    if(/dropdown-toggle/.test(event.target.className)){
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


export default function ContentMangement(){

    return (
        <div> 
            <div className={contentMangement.user_bar}>
                <a style={{textDecoration: 'none',color:'#335f5b',marginLeft: '20px',float: 'left'}} href="/">
                    返回
                </a>
                <div style={{textAlign:'center'}}><a style={{fontSize:'30px',fontWeight: 'bolder'}}>内容管理</a></div>
            </div>

            <div className={contentMangement.content}>
                <div className={contentMangement.option_bar1}>
                    {/* <el-tree :data=modelTree :props="defaultProps" @node-click="handleNodeClick">
                        </el-tree> */}



                    {/* 测试区 */}
                    {/* 竖排 */}
                    {/*类中的 navbar-expand-lg 控制横竖 */}
                    <nav class="navbar  bg-body-tertiary" id='nav_bar' onClick={handleClick}>
                        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#">一级A</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">一级B</a>
                            </li>
                            {/* 第一个 */}
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" role="button" aria-pressed="false" aria-expanded="false" data-bs-toggle="dropdown" >
                                一级C
                                </a>
                                {/* dropdown-menu-dark */}
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#">二级c-1</a></li>
                                    <li><a class="dropdown-item" href="#">二级c-2</a></li>
                                   
                                    <li><a class="dropdown-item" href="#">二级c-3</a></li>
                                </ul>
                            </li>


                            {/* 第二个 */}
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                一级D
                                </a>
                                {/* dropdown-menu-dark */}
                                <ul class="dropdown-menu ">
                                    <li><a class="dropdown-item" href="#">二级d-1</a></li>

                                    <li class="nav-item dropdown">
                                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"  aria-pressed="false" aria-expanded="false">
                                        二级d-2
                                        </a>
                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="#">三级d-2-1</a></li>
                                            <li><a class="dropdown-item" href="#">三级d-2-2</a></li>
                                            
                                            <li><a class="dropdown-item" href="#">三级d-2-3</a></li>
                                        </ul>

                                    </li>

                                    <li><a class="dropdown-item" href="#">二级d-3</a></li>
                                </ul>
                            </li>

                        </ul>

                   </nav>
                </div>


                {/* <!-- 列表增删改 --> */}

                {/* v-if="!showContent"  */}
                <div id="box_1" className={contentMangement.box_1}>
                    <div>
                        {/* onClick={addOrUpdate} */}

                        <button type="button" class="btn btn-primary">新增</button>            
                    </div>


                    <ul>
                        {/* <li v-for="(item,index) in contentList">
                            <span style="float: left;">{{index+1}}. {{item.name}}</span>
                            
                            <span style="float: right;">
                                <a @click="addOrUpdate(item.id)" style="color: yellowgreen;margin-right: 5px;">修改</a>
                                <a @click="deleteItem(item.id)" style="color: red;margin-right: 5px;">删除</a>
                                <a v-if="treeSelect.levelFlag == 3" @click="contentMangement(item.id)" style="color: green;">详情</a>
                            </span>
                        
                        </li> */}
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