<template>
    <div> 

        <div class="user_bar">
            <a style="text-decoration: none;color:#335f5b;margin-left: 20px;float: left;" href="#">
                返回
            </a>
            <div><a style="font-size:30px;font-weight: bolder;">内容管理</a></div>
        </div>

        <div class="content">

            <div class="option_bar1">
                <el-tree :data=modelTree :props="defaultProps" @node-click="handleNodeClick">
                </el-tree>
            </div>


            <!-- 列表增删改 -->

            <div v-if="!showContent" id="box_1" class="box_1">
                <div>
                    <el-button type="primary" @click=addOrUpdate style="float: left;">新增</el-button>
                </div>

                <ul>
                    <li v-for="(item,index) in contentList">
                       <span style="float: left;">{{index+1}}. {{item.name}}</span>
                       
                       <span style="float: right;">
                        <a @click="addOrUpdate(item.id)" style="color: yellowgreen;margin-right: 5px;">修改</a>
                        <a @click="deleteItem(item.id)" style="color: red;margin-right: 5px;">删除</a>
                        <a v-if="treeSelect.levelFlag == 3" @click="contentMangement(item.id)" style="color: green;">详情</a>
                       </span>
                       
                    </li>
                </ul>
            </div>


            <!-- 上下两个div用v-if控制 -->
            <!-- 富文本编辑器 -->
            <div v-else  class="box_1"> 
                <div>
                    <el-button @click="saveContent" type="primary" style="float: right;">保存</el-button>
                </div>
                <!-- 标题 -->
                <h3 style="text-align: center;width: 100%;">{{detailContent.title}}</h3>
                <div class="app-container" style="width: 100%;height: 100%;">
                    <editor  id="tinymce" v-model="detailContent.content" :init="init" > </editor>
                </div>
            </div>



        </div>


        <!-- title="新增"  -->
        <el-dialog 
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
                <span class="dialog-footer">
                    <el-button @click="openVisible = false">取消</el-button>
                    <el-button type="primary" @click="submitConfirm">
                      确定
                    </el-button>
                  </span>
            </template>
        </el-dialog>

    </div>
</template>

<script lang="ts" setup>
import baseService from "../../axios/baseService"

import {onMounted,reactive,ref} from 'vue'
import {ElMessage,ElMessageBox} from 'element-plus'

import tinymce from "tinymce/tinymce"
// import "tinymce/models/dom" //注意：tynymce 6.0.0 版本之后，必须引入，否则不显示
import "tinymce/themes/silver/theme"
import Editor from "@tinymce/tinymce-vue"

// 都是富文本插件
import "tinymce/icons/default"
import "tinymce/plugins/image"
import "tinymce/plugins/link"
import "tinymce/plugins/code"
import "tinymce/plugins/table"
import "tinymce/plugins/lists"
import "tinymce/plugins/wordcount"
import "tinymce/plugins/codesample"


const tinymceHtml = ref("请输入内容");

const init = {

    // 初始化数据
    language_url:"/langs/zh-Hans.js", //引入语言包（在public下）
    language:"zh-Hans", //这里名称根据 zh-Hans.js里面写的名称而定
    skin_url:"/skins/ui/oxide", //这里引入的样式
    // height:500,  //限制高度
    height:450,  //限制高度
    plugins:"links lists image code table wordcount codesample",  //富文本插件
    toolbar:"bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat | codesample",
    branding:false,  // // 是否禁用 Powered by TiinyMCE
    menubar:true,  //顶部菜单栏显示
    // paste_convert_word_fake_lists:false, //插入word文档需要该属性
    content_css:"/skins/content/default/content.css", //以css文件方式自定义可编辑区域的css样式，css文件将自己创建并引入
   
    selector:'#tinydemo',


    images_upload_handler: (blobInfo,succes,failure)=>{
        // console.log(blobInfo.blob());
        // 上传图片需要，FormData 格式的文件
        const formDataUp = new FormData();
        // img 是接口不需要的上传的属性名，一般属性名是 file
        formData.append("img",blobInfo.blob());
        // console.log(formDataUp);
        baseService.post("xxxx",formDataUp).then((res)=>{
            success("返回的上传图片后的地址")
        })
    }

}





onMounted(()=>{
    tinymce.init({})  //初始化富文本
    initTreeList();
})

const initTreeList=()=>{
    baseService.get("/getKnowledgeTree").then((res)=>{
        Object.assign(modelTree,res.data)
    })  
}


const modelTree = reactive([])
const contentList = reactive([])
const treeSelect = reactive({
    levelFlag:'',
    id:null
})
const detailContent = reactive({
    id:"",
    content:"",
    title:""
})


const showContent =  ref(false)
const form = reactive({
    id:"",
    parentName:"",
    name:"",
    url:'',
    parentId:treeSelect.id

})

const initSelectList=()=>{
    // 清除缓存
    contentList.length = 0
 
    let params = {
        level:treeSelect.levelFlag,
        parentId:treeSelect.id
    }


    baseService.post("/management/getList",params).then((res)=>{
        console.log('返回的数据内容：',res)
        if(res.data.length>0){
            Object.assign(contentList,res.data)
        }else{
            contentList.length = 0
        }
    })
}

// 选择组件
const handleNodeClick = (data) =>{

    showContent.value = false
      
    treeSelect.levelFlag = data.level
    treeSelect.id = data.id
   
 
    initSelectList()


}

const contentMangement=(id)=>{

   detailContent.id = id
   detailContent.content = ''
   detailContent.title = ''

    if(treeSelect.levelFlag == 3){
        showContent.value = true

        baseService.get("/content?id="+id).then((res)=>{
            detailContent.content = res.data.content
        })           
        baseService.get("/contentList?id="+id).then((res)=>{
            detailContent.title = res.data[0].name
        })   
    }
}

const saveContent=()=>{
    let param = {
        content:detailContent.content,
        parentId:detailContent.id
    }
    //修改
        baseService.put("/content",param).then((res)=>{
            console.log('正文内容',res.data)
            if(res.data == 'success'){
                ElMessage({
                    type:'success',
                    message:'保存成功'
                })
            }
        })    
}

const openVisible = ref(false)

const addOrUpdate =(id)=>{
    openVisible.value =  true
    if(typeof(id) != 'number'){
        id = "";
    }

    form.id = id
    form.name = ""
    form.url = ""
    form.parentName=""


    baseService.post("/management/getManagementContent?level="+treeSelect.levelFlag+'&id='+id+'&parentId='+treeSelect.id).then((res)=>{
        console.log('调用接口回显的数据',res.data)
        let data = res.data
        form.parentName = data.parentName
        form.name = data.name
        form.url = data.url
    })
}

const submitConfirm = () =>{

    let params = {}

    //调用新增接口 提交数据
    // treeSelect  ID  LEVEL 根据这两个确认调用哪个接口
    openVisible.value =  false

    params = {
        level:treeSelect.levelFlag,
        id:form.id,
        name:form.name,
        url:form.url,
        parentId:treeSelect.id
    }


    baseService.post("/management/addOrUpdate",params).then((res)=>{
        if(res.data == 'success'){

             // 更新已选择的数据列表修改内容
             initSelectList();
            // 重新刷新Tree页面
            initTreeList();


    

            ElMessage({
                type:'success',
                message:'成功'
            })


        }
    })

}


/**
 * 父子表要级联删除
*/
//后端要添加删除校验————父子表删除
const deleteItem = (id)=>{

    ElMessageBox.confirm('确定要进行删除吗', '提示', 
        {
            confirmButtonText: '确定',
            cancelButtonText:'取消',
            type:'warning'
        }
    ).then(()=>{
        baseService.delete("/management/managementDelete?id="+id+"&level="+treeSelect.levelFlag).then((res)=>{
            if(res.data == "cascading"){
                alert('还有子项未删除，请先删除子项')
            }else if(res.data == "error"){
                ElMessage({
                    type:'error',
                    message:'error'
                })
            }else{
          
                initSelectList();
                initTreeList();

                ElMessage({
                    type:'success',
                    message:'删除成功'
                })
            }
        })
    })

}



</script>

<style lang="scss" scoped>
@import "../../assets/css/vue.scss";
    
$content-height:calc(100vh - $topBarHeight - $userBarHeight - $footerHeight);

    .user_bar{
        width:100%;
        height:$userBarHeight;
        background-color:#D9B2B1;
        line-height: $userBarHeight;
    }

    .content{
        box-sizing: border-box;
        position: relative;
        display: flex;
        flex-direction: row;
        width:100%;
        min-height: $content-height;
        background-color:white;

        .option_bar1{
            position: relative;
            box-sizing: border-box;
            width:25%;
            overflow: auto;
            background-color:#FBEDF7;        
            .el-tree{
                background-color:#FBEDF7;
            }
        }
            
        .box_1{
            box-sizing: border-box;
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            width:75%;
            padding: 10px;

            ul{
                width: 90%;
                margin-top: 10px;
                display: flex;
                flex-direction: column;

                li {
                    margin: 5px 0;
                    background-color: snow;
                }
            }
        }
    }

</style>