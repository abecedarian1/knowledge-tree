<template>
    <div class='content-box'>
        <div class="example">
          输入一个父子嵌套的数据模型（数据的层次不定），去除children属性并将其拉平到同一层展示，
          并添加parentId属性描述不同属性之间的父子关系，name值添加person_前缀, 同时最终的结果按照id属性从小到大排列   
        </div>

        <div class="handleBox">
          <textarea  resize="none" v-model="inputObj" :placeholder="inputPlaceholder" @blur="returnResut">
          </textarea>
  
          <textarea disabled v-model="outputObj" :placeholder="outputPlaceholder">
          </textarea>
  
        </div>
       
        
    </div>

</template>

<script setup>

import {ref} from 'vue'

const inputObj = ref();
const outputObj = ref();


const inputPlaceholder = ref(`输入：[   
        {
            id:1,
            name:'小明',
            children:[
                {
                    id:11,
                    name:'小红'
                },
                {
                    id:12,
                    name:'小蓝',
                    children:[
                        {
                            id:121,
                            name:'小白'
                        }
                    ]
                }
            ]
        },
        {
            id:2,
            name:'小胖'
        }
    ]`)
    
const outputPlaceholder = ref(`输出：
[
    {
        id:1,
        name:'person_小明',
        parentId:''
    },
    {
        id:2,
        name:'person_小胖',
        parentId:''
    },
    {
        id:11,
        name:'person_小红',
        parentId:1
    },
    {
        id:12,
        name:'person_小蓝',
        parentId:1
    },
    {
        id:121,
        name:'person_小白',
        parentId:12
    }
]`)




//处理过程

//添加parentId 以及 person 前缀
const handleData=(data,parentId)=>{
    for(let i=0;i<data.length;i++){
        data[i].name = 'person_'+data[i].name
        if(parentId){
            data[i].parentId = parentId
        }else{
            data[i].parentId = ''
        }
        if(data[i].children && data[i].children.length>0){
            let id = data[i].id
            //继续循环
            handleData(data[i].children,id)   
        }
    }
}

//数据平铺，删除children--这个逻辑有错误
const removeChidren = (data)=>{
    for(let i=0;i<data.length;i++){
        if(data[i].children && data[i].children.length>0){
            removeChidren(data[i].children)
            data.push(...(data[i].children))
            delete data[i].children           
        }
    }
}

const returnResut=()=>{
    if(inputObj.value){
        try{
            let obj = eval('('+inputObj.value+')')
            //处理前缀和parentid
            handleData(obj,'')
            // 数据平铺
            removeChidren(obj)
            /**
             *  sort参数函数内部逻辑：
             *  sort((a,b)=>{return 执行语句})
             *  参数（a,b）表示两个被比较的成员：默认a排在b前面
             *  参数函数语句执行结果的返回值大于0,则两个成员要交换位置： 成员a排在 成员b后面
             *  参数函数语句执行结果的返回值小于0或者等于0,则两数组成员（现有位置不变） 
             * 
             * 参数函数语句执行结果的返回值会影响原有数组内部的对应两个成员的位置是否交换：
            */
            //从大到小排
            // obj.sort((a,b)=>{b.id - a.id}) 
            // 从小到大排
            obj.sort((a,b)=>{a.id - b.id})
            outputObj.value = JSON.stringify(obj,null,'\t')

        }catch(e){
            outputObj.value = '请输入正确的格式！！！！'
        }
        
    }else{
        outputObj.value = ''
    }
}


</script>

<style lang="scss" scoped>

.content-box{
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;
        
    .example{
        padding: 10px;
        color:red
    } 

    
    .handleBox{
        flex-grow: 1;
        position:relative;

        display:flex;
        flex-direction: row;
        justify-content: center;
        textarea{
            flex: 1 1 100px ;
            resize:none;
            margin-left: 10px;
        }
    }


}





</style>