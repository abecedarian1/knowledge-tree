<template>
  <div class="">
    <div class="banner">
        <div class="tittle_bg"> </div>
        <div class="tittle"><h1>线上个人笔记</h1></div>
        <div class="search">
            <div style="width: 85%;position: relative;">
                <span><input type="text" class="search_content" placeholder="请输入你想查找的内容"></span>
                <span><input type="submit" class="search_button" value="搜索"></span>
            </div>
      </div>
    </div>
    <div class="content">
      <ul  v-if="categroyList.length>0">
          <li v-for="(item,index) in categroyList" :key="index" >
              <router-link v-if="item.name=='内容新增'" to="content-management">{{item.name}}</router-link>
              <router-link v-else-if="item.name=='公共组件'" to="component-quick-find">{{item.name}}</router-link>
              <router-link v-else :to="item.url">{{item.name}}</router-link>
          </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent,reactive,onMounted,onActivated } from 'vue';
import baseService from '../axios/baseService'
import {useRoute} from 'vue-router'

name: 'HomeView';

const route = useRoute()

const categroyList = reactive([])

onMounted(()=>{ 
  Object.assign(categroyList,route.query.list)
})

</script>


<style lang="scss" scoped> 
  /* 放在这里,改样式只在本组件生效 */
  @import '../assets/css/home-view.scss';

</style>


