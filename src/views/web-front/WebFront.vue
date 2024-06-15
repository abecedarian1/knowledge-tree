<template>

    <div class="">
        <div class="user_bar">
            <a @click="goHome()" style="text-decoration: none;color:#335f5b;margin-left: 20px;float: left;">
                回到首页
            </a>

            <a @click="goBack()" style="text-decoration: none;color:#335f5b;margin-right: 20px;float: right;">
                返回
            </a>            
            <div><a style="font-size:30px;font-weight: bolder;">{{titleName}}</a></div>
        </div>

        <div class="content">
            <div class="option_bar" :class="{fixed:isFixed}">
                <ul>
                    <li v-for="(item,index) in sideBarList" :class="selectId==item.id ? 'select-option' : '' " @click="selectOption(item.id)">
                        <router-link class="bg" :to="item.url">{{item.name}}</router-link>
                    </li>
                </ul>
            </div>
            
            <div id="test" class="box_1">
                <div v-if="selectId==null" style="text-align: left;font-size: 20px;padding: 10px">请选择~~~</div>
                <div v-else>
                    <router-view></router-view>
                </div>
            </div>
        </div>
      
    </div>
</template>



<script lang="ts" setup>
import {onMounted,onActivated,ref,reactive,watch,created} from 'vue';
import {useRouter,useRoute} from 'vue-router';
import baseService from "../../axios/baseService"


//向前推进路由的
const router = useRouter()
//获取路由参数的
const route = useRoute()
const titleName = ref('')
const sideBarList = reactive([])

//选择的模块
const selectId = ref()

const goBack=()=>{
    router.go(-1)
}

const goHome=()=>{
    // 以下内容不会刷新页面————所以对于webFron来说，从那里跳转到这里还是onMountedh状态里面
    // router.push("/")
    window.location.replace('/');

}

const isFixed = ref(false)

const selectOption = (id)=>{
    selectId.value =id
}

onMounted(()=>{
    // console.log('加载到的数据',route)
    //从路由独享守卫传过来的
    // 通过id调用查询接口
    let parentUrl = route.query.parentUrl
    let mainId = route.query.mainId
    titleName.value = route.query.title
    // 当前内容列表
        baseService.get('/modelList?parentId='+mainId).then((res)=>{
        let list  = res.data
        list.forEach(item => {
            item.url = '/'+parentUrl+'/'+item.url+'?mainId='+mainId+'&branchId='+item.id
        });
        Object.assign(sideBarList,list)  
    })
})


</script>



<style lang="scss" scoped>

@import "../../assets/css/vue.scss";

.user_bar{
    width:100%;
    height:$userBarHeight;
    background-color:#D9B2B1;
    line-height: $userBarHeight;
}


.content{
    position: relative;
    display: flex;
    flex-direction: row;

    width:100%;
    min-height: calc(100vh - $topBarHeight - $footerHeight - $userBarHeight);
    background-color:white;
    
    .option_bar{
        width: 15%;
        overflow-y: auto;
        min-height: calc(100vh - $topBarHeight - $footerHeight - $userBarHeight);
        background-color:#FBEDF7;

        &>ul{
            margin-top: 10%;

            
            .select-option{
                background-color: pink;
            }

            &>li{
                display: flex;
                flex-direction:column;
                justify-content:center;
                height: $sideBarItemHeight;
                a{
                    cursor:pointer
                }
            }
        }
    }
        
    .box_1{
        width: 85%;
        position: relative;
    }

}

</style>
