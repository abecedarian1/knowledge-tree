<template>
    <div class="parent">
        <div ref="full" class="full-screen">
            <button  @click="openFullScreen">{{exitOrFull}}</button>
            <div>全屏模式下的内容</div>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'

const full = ref()
const exitOrFull = ref('全屏')


const openFullScreen=()=>{
    if(!document.fullscreenElement){
        full.value.requestFullscreen()
        exitOrFull.value = '退出全屏'
    }else{
        exitOrFull.value = '全屏'
        document.exitFullscreen()
    }
}

document.addEventListener("fullscreenchange",()=>{
    if(!document.fullscreenElement){
        // console.log('已退出')
        exitOrFull.value = '全屏'
    }
})


</script>

<style>
    .parent{
        position: relative;
        height: 100%;
        background-color: rgb(233, 207, 207);
    }
  
    .full-screen{
        position: relative;
        height: 50%;
        background-color: salmon;
        font-size: 18px;
    }

    .full-screen > button{
        width: 150px;
        font-size: 20px;

    }

    .full-screen > div {
        position: relative;
        top: 40%;
    }

</style>