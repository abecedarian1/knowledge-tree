<template>

    <div >
        <div><h3>{{title}}</h3></div>
        <div class="content" v-html="detailContent"></div>
    </div>
</template>


<script lang="ts" setup>
import {onMounted,ref} from 'vue'
import {useRoute} from 'vue-router'
import baseService from "../../../../axios/baseService"

// 用来格式化页面上的code文本
import Prism from "../../../../assets/markdown/prism.js"
import "../../../../assets/markdown/prism.css"

const route = useRoute()
const detailContent = ref('')
const title = ref('')

onMounted(()=>{
    // 通过id查找对应的内容
    baseService.get('/content?id='+route.query.id).then((res)=>{
        // console.log('res=====',res)
        detailContent.value = res.data.content
    })

    // 通过id查找name
    baseService.get('/contentList?id='+route.query.id).then((res)=>{
        console.log('res==+++++===',res.data[0].name)

        title.value = res.data[0].name
        // detailContent.value = res.data.content
    })

})



</script>

<style scoped>
    .content{
        padding: 10px 10px;

    }
</style>