<template>

    <div>
        <ul v-if="modelList.length>0">
            <li v-for="(item,index) in modelList">
                <!-- 路由前缀不加‘/’ -->
                <router-link :to="item.url">{{item.name}}</router-link>
            </li>           
         
        </ul>
    </div>

</template>


<script lang="ts" setup>
import {onMounted,reactive,watch} from 'vue'
import {useRoute,useRouter} from 'vue-router'
import baseService from "../../../axios/baseService"


const route = useRoute()
const router = useRouter()
const modelList = reactive([])



// 此处要监听路由的变化
watch(()=> router.currentRoute.value.path,
    (newValue)=>{

        let mainId = route.query.mainId
        let branchId = route.query.branchId

        if(mainId && branchId){
            let parentUrl = ''
            // 获取上级路由信息
            baseService.get('/modelList?id='+branchId).then(async(res)=>{
                parentUrl = res.data[0].url
                //获取当前路由信息
                await baseService.get('/modelBranchList?parentId='+branchId).then(async(res)=>{
                    let list = res.data
                    if(list.length>0){
                        list.forEach(item => {
                            item.url = parentUrl+'/'+item.url+'?mainId='+mainId+'&branchId='+branchId+'&branchRightId='+item.id
                        });
                        Object.assign(modelList,list)
                    }else{
                        modelList.length = 0
                    }              
                })
            })
        }

       
    },
    {
        immediate:true
    }
)




</script>


<style lang="scss" scoped>

    ul{
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;

        li{
            position: relative;            
            margin: 5px;
            flex:1 1 28%;
            background-color: powderblue;
            line-height:150px;
        }

    }

    

</style>