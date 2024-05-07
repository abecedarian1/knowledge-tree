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

        <div class="tab">
            <table v-if="categroyList.length>0" cellspacing="0px" style="border-spacing:0px" width="100%" height="100%">
                <tr>
                    <td class="main_pic main_pic_1" rowspan="2" width="30%">
                        <div><ul>
                            <li>
                                <router-link :to="categroyList[0].url">{{categroyList[0].name}}</router-link>
                            </li>
                            <li>
                                <router-link :to="categroyList[3].url">{{categroyList[3].name}}</router-link>
                            </li>
                            <li>
                                <router-link :to="categroyList[6].url">{{categroyList[6].name}}</router-link>
                            </li>
                        </ul></div>
                    </td>

                    <td class="main_pic main_pic_2" colspan="2">
                        <div><ul>
                            <li>
                                <router-link :to="categroyList[1].url">{{categroyList[1].name}}</router-link>
                            </li>
                            <li>
                                <router-link :to="categroyList[2].url">{{categroyList[2].name}}</router-link>
                            </li>
                        </ul></div>
                    </td>

                </tr>
                <tr>
                    <td class="main_pic main_pic_3" width="27%" valign="top">

                        <div><ul>
                            <li>
                                <router-link :to="categroyList[4].url">{{categroyList[4].name}}</router-link>
                            </li>
                            <li>
                                <router-link :to="categroyList[8].url">{{categroyList[8].name}}</router-link>
                            </li>
                        </ul></div>
                        
                    </td>
                    <td class="main_pic main_pic_4" valign="top">
                        <div>
                            <ul>
                                <li>
                                    <router-link :to="categroyList[5].url">{{categroyList[5].name}}</router-link>
                                </li>
                                <li>
                                    <!-- <router-link :to="categroyList[7].url">{{categroyList[7].name}}</router-link> -->
                                    <router-link to="content-management">内容管理</router-link>
                                </li>
                            </ul>
                        </div>
                       
                    </td>
                </tr>
                <tr>
                    <td class="main_pic main_pic_5"  colspan="3" width="100%">
                        <div>
                            <ul>
                                <li>
                                    <router-link to="component-quick-find">公共组件</router-link>
                                </li>
                            </ul>
                        </div>
                    </td>
                </tr>

            </table>
        </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import   '../assets/css/home-view.css'
import { defineComponent,reactive,onMounted,onActivated } from 'vue';
import baseService from '../axios/baseService'

name: 'HomeView';
component:{
};


const categroyList = reactive([])

onMounted(()=>{ 
    baseService.get('/getKnowledgeCategory').then((res)=>{
    // console.log('返回的数据信息',res.data)
        let list = res.data
        list.forEach(item => {
            item.url = item.url+"?mainId="+item.id
        });
        Object.assign(categroyList,res.data)
    })
})



</script>




<style scoped> 
ul li{
  display: flex;
  justify-content: center;
  align-items: center;
  font-size:20px;
  font-weight: 600;
}



.content{
  width:100%;

  height: 900px;
  background-color:#eae6e2;
  position:relative;
}

  
</style>


