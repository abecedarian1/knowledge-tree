<template>
    <div>
        <div class="title">{{modelTitle}}</div>
        <div>
            <ul>
                <li v-for="(item,index) in contentList">
                    <router-link :to="item.url">{{(index+1)+'. '+item.name}}</router-link>
                </li>              
            </ul>                  
        </div>
    </div>
</template>

<script lang="ts" setup>
import baseService from "../../../../axios/baseService"
import {ref, onMounted,reactive} from 'vue'
import dayjs from 'dayjs'
import {ElMessage} from 'element-plus'

import {useRoute} from 'vue-router'
const route = useRoute()

const contentList = reactive([])
const modelTitle = ref('')

onMounted(()=>{
  
    let parentUrl = ''
    let mainId = route.query.mainId
    let branchId = route.query.branchId
    let branchRightId = route.query.branchRightId


    // 获取上级路由信息
    baseService.get('/modelBranchList?id='+branchRightId).then(async(res)=>{
        parentUrl = res.data[0].url
        modelTitle.value = res.data[0].name
        
        //获取当前路由信息    
        baseService.get('/contentList?parentId='+branchRightId).then((res)=>{
        
            let list = res.data
            list.forEach(item => {
                item.url = parentUrl + '/'+ item.url + '?mainId='+mainId+'&branchId='+branchId+'&branchRightId='+branchRightId+'&id='+ item.id          
            });

            Object.assign(contentList,list)

        })

    })

})



</script>


<style scoped>
    ul{
        text-align: left;
        margin-left: 10px;
    }

    ul>li{
        background-color: snow;
        margin:5px;

    }

    .title{
        font-size: 20px;
        padding: 5px 0;
        background-color: rgb(233, 207, 245);
    }

  

    
</style>