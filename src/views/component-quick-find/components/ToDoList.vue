<template>
    <div class="box">

        <div class="addTool">
            <input type="text" class="add-input" @keyup="addItem" v-model=currenTask placeholder="请输入要添加的任务"/>
        </div>

        <ul>
            <li class="item" v-for="(item,index) in toDoList" :class="item.hidden ? 'hidden' : '' " :key=index>
                <span class="toDoName"  :class="item.select ? 'deleteItemLine' : '' ">
                    <input type="checkbox" name="toDoName" v-model="item.select"  :id=index>
                    <label :for=index>
                        {{item.listName}}
                    </label>
                </span>
                <span class="operation" >
                    <span class="edit" @click="editItem(index,item)" > 编辑</span>
                    <span class="delete" @click="deleteItem(index)">删除</span>
                </span>
            </li>

            <li class="fixed-bar">
                <span class="sum"> 
                    <input type="checkbox" name="toDoName" v-model="selectAll">
                    已完成{{selectTotal}} /总任务{{toDoList.length}}
                </span>
                <span class="clearButton" @click="clear">清除已完成任务</span>
                <span class="hiddenButton"  @click="hidden">隐藏已完成任务</span>
            </li>
        </ul>


        <!-- 编辑盒子 -->
        <div class="overlay" v-if="openEdit">
            <div class="dialog">
                <div class="dialog-bar">
                    <div class="title">编辑</div>
                    <div class="top-cancel" @click="cancleEdit">X</div>
                </div>
                <div class="dialog-content">
                   <label for="taskName">任务名称：</label>
                    <input id="taskName" type="text" v-model="itemMessage.itemName">
                </div>
                <div class="footer">
                    <span class="footer-cancel" @click="cancleEdit">取消</span>
                    <span class="confirm" @click="confirmEdit">确定</span>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
    import {reactive,ref,computed,watch} from 'vue'

    const openEdit = ref(false)
    const itemMessage = reactive({
        index:0,
        itemName:''
    })
    const toDoList = reactive([
        {select:false,hidden:false,listName:'任务1'},  
    ])
    const currenTask = ref("")

    //新增
    const addItem =(event:any)=>{
        if(event.key=='Enter'){
            if(currenTask.value){
                toDoList.unshift({select:false,hidden:false,listName:currenTask.value})
                currenTask.value = ''
            }
        }
    }

    //删除
    const deleteItem = (index:any)=>{
        toDoList.splice(index,1)
    }

    //编辑
    const editItem = (index:any,item:any)=>{
        openEdit.value = true
        itemMessage.itemName = item.listName
        itemMessage.index = index
    }

    //取消
    const cancleEdit=()=>{
        openEdit.value = false
    }

    //确认提交 
    const confirmEdit=()=>{
        toDoList[itemMessage.index].listName = itemMessage.itemName
        openEdit.value = false
    }

    //选中总数
    const selectTotal = computed(()=>{
        let total = 0
        toDoList.forEach(item => {
            if(item.select){
                total+=1
            }
        });
        return total
    })
   
    //清除
    const clear=()=>{
        for(let i=toDoList.length-1;i>=0;i--){
            if(toDoList[i].select == true){
                toDoList.splice(i,1)
            }
        }
    }
    //全选
    const selectAll = computed({
        get(){
            let flag = true
            if(toDoList.length>0){
                 //只要有没有选中的item, 勾选全部的框就不会checked
                toDoList.forEach((item)=>{
                    if(item.select ==  false){
                        flag = false
                    }
                })
            }
            //全部清除完毕之后，勾选框没有取消
            else{
                selectAll.value = false
                return false 
            }
            return flag
        },
        set(val){
            toDoList.forEach((item:any)=>{
                item.select = val
            })
        }
    })

    //隐藏
    const hidden=()=>{
        toDoList.forEach((item,index)=>{
            if(item.select == true){
                item.hidden = true
            }
        })
    }
  
   


</script>


<style lang="scss" scoped>

 
    .addTool{
        font-size: 22px;
        padding-top: 10px;
    }
    .add-input{
        box-sizing: border-box;
        margin:0 5%;
        width:90%;
        font-size: 22px;
    }

    .box{
        position: relative;
        box-sizing:border-box;
        width: 100%;
        height: 100%;
        background-color: rgb(235, 242, 247,0.6);
        font-size: 22px;
        padding:0;
    }

    ul{
        position:relative;
        display: flex;
        flex-direction: column;
        height: calc(100% - 42px);
        overflow: auto;
    }
    ul::-webkit-scrollbar{
        display: none;
    }

    li {
        padding: 10px;
        list-style: none;
        border-bottom:solid rgb(142,159,170,0.2) 1px ;
    }

    .fixed-bar{
        position: sticky;
        bottom: 0px;
        background-color: rgb(203 212 218);
    }
    
    .hidden{
        display: none;
    }

    .operation,
    .clearButton,
    .hiddenButton{
        float: right;
        margin:0 10px;

        &:hover{
            cursor: pointer;
        }
    }
    .edit,.delete{
        margin: 0 10px;
    }

    .toDoName,.sum{
        float: left;
    }
    .deleteItemLine{
        text-decoration: line-through;
    }
    .operation{
        display: none;
    }
    .item:hover {
        background-color: rgb(184, 170, 180,0.2);
        border-bottom: none;

    }
    .item:hover .operation{
            display: block;
    }

    .overlay{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgb(117, 115, 115,0.4);
        z-index: 100;

        .dialog{
            position: relative;
            width:40%;
            height:30%;
            top:20%;
            left: 30%;
            background-color:white;
            font-size: 18px;
            .dialog-bar{
                display:flow-root;
                background-color: rgb(186, 211, 225);

                .title{
                    position: relative;
                    float: left;
                    margin: 10px;
                }
                .top-cancel{
                    float: right;
                    margin: 10px;
                    color: rgb(65, 61, 61);
                    &:hover{
                        cursor: pointer;
                    }
                }
            }
            .dialog-content{
                position: relative;
                width: 100%;
                padding: 20px 0;
                font-size: 18px;
                input{
                    position: relative;
                    width:50%;
                    height: 30px;
                    font-size: 18px;
                }
            }
            .footer{
                position: absolute;
                bottom: 0;
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                width: 100%;
                span{
                    margin: 10px;
                    border: solid rgb(186, 211, 225) 1px;
                    padding: 5px;
                    box-sizing: content-box;
                }
                .footer-cancel{
                    background-color: rgb(184, 170, 180,0.3);
                    &:hover{
                        background-color: rgb(167, 192, 224,0.4);
                    }
                }
                .confirm{
                    color: white;
                    background-color: rgb(167, 192, 224);
                    &:hover{
                        background-color: rgb(186, 211, 225);
                    }
                }
            }
        }
    }
</style>