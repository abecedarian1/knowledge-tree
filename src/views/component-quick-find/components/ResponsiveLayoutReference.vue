<template>
    <div class="page">
        <div class="list-title">Latest Upadte Apps</div>
        
        <ul>
            <li class="apps" v-for="(item,index) in list">
                <img class="app-img" :src=editor alt="">               
                <div class="description">
                    <div class="app-title">
                        Messenger - Text and Video Chat for Free
                    </div>
                    <div class="category">Simulation</div>
                    <div class="score">4.6 <img class="score-icon" :src=star></div>
                </div>
                <button class="download">Download</button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import editor from '../../../assets/images/com.cartoon.photomaker.editor.jpg'
import star from '../../../assets/images/star_full.svg'
const list = ref([1,2,3,4,5,6])
</script>


<style scoped>

@font-face {
    font-family: "ProductSans";
    src: url(../../../assets/fonts/ProductSans-Bold.ttf);
}

@font-face {
    font-family: "Roboto";
    src: url(../../../assets/fonts/Roboto-Regular.ttf);
}

.page{
    position: relative;
    box-sizing: border-box;
    width: 100%;
    /* width: 360px; */
    padding:0 16px;
    overflow: auto;
}

.list-title{
    font-family: "ProductSans";
    font-size: 18px;
    font-weight: bold;
    color:#333;
    padding: 32px 0 20px 0;
}

/* 清除默认样式 */
ul{
    padding:0;
    margin:0;
    display: grid;
    column-gap: 24px;
    /* display: flex;
    flex-direction: row;
    flex-wrap: wrap; */
}
@media screen and (min-width:768px){
    ul{
        grid-template-columns: 1fr 1fr;
    }   
}
@media screen and (min-width:1024px){
    ul{
        grid-template-columns: 1fr 1fr 1fr;
    }   
}


ul>li{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    list-style: none;
    /* flex:1 1 360px; */
    margin-bottom: 18px;
    font-family: "Roboto";
    font-size: 14px;
}

.app-img{
    width: 72px;
    height: 72px;
    border-radius: 16px;
}
.description{
    margin-left:12px;
    flex-grow: 1;
    flex-shrink: 1;
    text-align: left;
}

.app-title{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    color:#333;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
} 

.category{
    color:#999;
    margin: 9px 0;
}

.score{
    color:#333;
}
.score-icon{
    width: 10px;
    height: 10px;
}
.download{
    margin-left:24px;
    width: 88px;
    height: 32px;
    color:#56b3fa;
    background-color: #eef2fe;
    border-radius: 16px;
    border:none;
}

</style>