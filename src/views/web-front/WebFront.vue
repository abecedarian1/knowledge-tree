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
                    <li v-for="(item,index) in sideBarList">
                        <router-link :to="item.url">{{item.name}}</router-link>
                    </li>
                </ul>
            </div>
            

            <div id="test" class="box_1">
                
                <router-view></router-view>
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

const goBack=()=>{
    router.go(-1)
}

const goHome=()=>{
    // 以下内容不会刷新页面————所以对于webFron来说，从那里跳转到这里还是onMountedh状态里面
    // router.push("/")
    window.location.replace('/');

}

const isFixed = ref(false)


/**
 * 
侧边栏目的固定需要分条件：

1. 内部 滚动 
      只要滚动就 要固定 
      top = 顶栏距离

2. 外部滚动
     滚动到一定位置才固定 外滚 >= 顶栏距离
     top = 0 

3. 内滚 + 外滚
    固定的位置要根据情况判断
    (1) 当外滚的距离 < 顶栏的距离
         固定位置 = 顶栏距离- 外滚轮尺寸
    (2) 当外滚距离 > 顶栏距离
        固定位置  = 顶栏 top = 0
*/
const handleScroll=()=>{

    // 内部div内容
    let contentSelector =  document.querySelector('.content')
    let optionBarElemnt = document.getElementsByClassName("option_bar")[0]

    //内滚长度
    let contentScroll = contentSelector.scrollTop

    // 相对window窗口滚动的长度 --外滚长度
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    

    //内滚
    if(contentScroll>0){
        isFixed.value = true
        optionBarElemnt.style.width = 19+'%'
        if(scrollTop>0){
            // 既有外滚又有内滚
            if(scrollTop>105){
                optionBarElemnt.style.top = 0+'px'
            }else{
                optionBarElemnt.style.top = (105-scrollTop) +'px'
            }

        }else{
            // 只有内滚
            optionBarElemnt.style.top = 105+'px'
        }
    }else{
        if(scrollTop>105){
            // 只有外滚
            isFixed.value = true
            optionBarElemnt.style.width = 19+'%'
            optionBarElemnt.style.top = 0+'px'
        }else{
            isFixed.value = false
            optionBarElemnt.style.width = 20+'%'
        }
    }


}



watch(()=>{

    
  

})



onMounted(()=>{

    let content = document.querySelector('.content')

    //如果不在首页---执行此操作
    if(route.query.mainId){
        console.log('mainId',route.query.mainId)
        window.addEventListener('scroll', handleScroll)
        content.addEventListener('scroll', handleScroll)
    }
   

    // 通过id调用查询接口
    let parentUrl = ''
    let mainId = route.query.mainId

    // 上级路由
    baseService.get('/getKnowledgeCategory?id='+mainId).then(async(res)=>{
        titleName.value = res.data[0].name
        parentUrl = res.data[0].url

        // 当前内容列表
        await baseService.get('/modelList?parentId='+mainId).then((res)=>{
            let list  = res.data
            list.forEach(item => {
                item.url = '/'+parentUrl+'/'+item.url+'?mainId='+mainId+'&branchId='+item.id
            });
            Object.assign(sideBarList,list)  
        })
      
    })   
})




</script>



<style scoped>

    a{
        cursor:pointer
    }
    .user_bar{
        width:100%;
        height:70px;
        background-color:#D9B2B1;
        line-height: 70px;
    }

    .content{

        width:100%;
        height:540px;
        background-color:white;
        overflow: auto;
        position: relative;
    }

    
    .fixed{
        position: fixed !important;
    }



    .option_bar{
        width: 20%;
        overflow: auto;
        height: 540px;
        background-color:#FBEDF7;
        float:left;
    }


 

    .option_bar>ul{
        margin-top: 10%;
    }

    .option_bar>ul>li{
        height: 50px;
        line-height: 50px;
    }

    .option_bar>ul>li:nth-child(1){
        background-color: pink;
    }

    .box_1{
        width: 80%;
        height: 100%;
        float: right;
        position: relative;
    }
</style>
