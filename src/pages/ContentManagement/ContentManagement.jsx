import contentMangement from "./ContentManagement.module.scss"

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
                </div>


                {/* <!-- 列表增删改 --> */}

                {/* v-if="!showContent"  */}
                <div id="box_1" className={contentMangement.box_1}>
                    <div>
                    {/* onClick={addOrUpdate} */}
                        <el-button type="primary"  style={{float: 'left'}}>新增</el-button>
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