<template>
    <div>
        <div class="user_bar">
            <a style="text-decoration: none;color:#335f5b;margin-left: 20px;float: left;" href="/">
                返回
            </a>
            <a style="font-size:30px;font-weight: bolder;">封装组件</a>
        </div>

        
        <!-- 组件内容 -->
        <div class="content" >   
            <el-tabs v-model="activeName" type="border-card"  tab-position="left" class="demo-tabs">
                <el-tab-pane label="时间选择器" name='TimeSelectLimit'>
                    <!-- 如果想要封装成组件的话，需要 子传父 直接获取最终值 emit，
                        也可以 :ref="(el)=>{child = el}" 
                    -->
                    <time-select-limit @emitData="emitTimeData"></time-select-limit>
                </el-tab-pane>

                <el-tab-pane label="ToDoList" name="ToDoList">
                    <to-do-list></to-do-list>
                </el-tab-pane>

                <el-tab-pane label="导航栏" name="SideBar"> 
                    <side-bar 
                        @changeStatus="changeStatus" 
                        v-model:shrinkOrNot="shrinkOrNot"
                        v-model:navList="navList"
                        v-model:selectItem="selectItem"
                        v-model:firstLoad="firstLoad"
                        @changeItem="changeItem"
                    >
                        <div class="contorl-btn">
                            <span>
                                <el-switch 
                                v-model="shrinkOrNot" 
                                size="large"
                                style="--el-switch-on-color: #b0e0e6; --el-switch-off-color: #d5d8d6"
                                inline-prompt
                                active-text="展开"
                                inactive-text="折叠"/>
                            </span>
                            <span>
                                <label for="index">导航定位：</label>
                                <input id="index" type="number" v-model="selectItem">
                            </span>
                        </div>
                    </side-bar>
                </el-tab-pane>

                <el-tab-pane label="图表" name="Diagram">
                    <Diagram></Diagram>
                </el-tab-pane>

                <el-tab-pane label="深度遍历" name="DeepCopy">
                    <deep-copy></deep-copy>
                </el-tab-pane>

                <el-tab-pane label="全屏" name="FullScreen">
                    <full-screen></full-screen>
                </el-tab-pane>
                <el-tab-pane label="canvas小动画" name="CanvasAnimation">
                    <canvas-animation></canvas-animation>
                </el-tab-pane>

                <el-tab-pane label="金额格式化(千分位)" name="AmountTransform">
                    <amount-transform></amount-transform> 
                </el-tab-pane>
                <el-tab-pane label="可拖拽移动框" name="DraggableBox">
                     <draggable-box></draggable-box>
                </el-tab-pane>
              
                <el-tab-pane label="数据嵌套平铺" name="DataFlat">
                    <data-flat></data-flat>
                </el-tab-pane>

                <el-tab-pane label="响应式布局参考" name="ResponsiveLayoutReference">
                    <responsive-layout-reference></responsive-layout-reference>
                </el-tab-pane>

                <el-tab-pane label="fetch实现在线视频流读取" name="VideoStreamRead">
                    <video-stream-read></video-stream-read>
                </el-tab-pane>

                <el-tab-pane label="数据流的生成和读取" name="DataStreamGenerateRead">
                    <data-stream-generate-read></data-stream-generate-read>
                </el-tab-pane>

                <el-tab-pane label="webSocket一对一随机聊天框" name="RandomChatBox">
                    <random-chat-box></random-chat-box>
                </el-tab-pane>
            </el-tabs>
        </div>

    </div>
</template>

<script lang="ts" setup>
import { ref,watch } from "vue";
import TimeSelectLimit from './components/TimeSelectLimit.vue'
import Diagram from './components/Diagram.vue'
import ToDoList from './components/ToDoList.vue'
import SideBar from './components/SideBar.vue'
import DeepCopy from './components/DeepCopy.vue'
import FullScreen from './components/FullScreen.vue'
import CanvasAnimation from './components/CanvasAnimation.vue'
import AmountTransform from './components/AmountTransform.vue'
import DraggableBox from './components/DraggableBox.vue'
import DataFlat from './components/DataFlat.vue'
import ResponsiveLayoutReference from './components/ResponsiveLayoutReference.vue'
import VideoStreamRead from './components/VideoStreamRead.vue'
import DataStreamGenerateRead from './components/DataStreamGenerateRead.vue'
import RandomChatBox from './components/RandomChatBox.vue'

//默认折叠
const shrinkOrNot = ref(false)
const navList = ref([])
const firstLoad = ref(true)
const selectItem = ref()
const activeName = ref('RandomChatBox')

//生成随机导航数组  并排序 去重
const getRandomDataList=()=>{
    console.log('初次打开导航时调用')
    let list = []
    for(let i=0;i<9;i++){
        let item = Math.floor(Math.random()*10) 
        list.push(item)
    }
    let len = list.length
    // 排序
    for(let i=0;i<len;i++){
        for(let j=0;j<len-i;j++){
            if(list[j]>list[j+1]){
                let tmp = list[j]
                list[j] = list[j+1]
                list[j+1] = tmp
            }
        }
    }
    //去重
    for(let i=len-1;i>=0;i--){
        if(list[i]==list[i-1]){
            list.splice(i,1)
        }
    }
    navList.value = [...list]
}

const changeStatus=()=>{
    if( !shrinkOrNot.value && firstLoad.value){
        getRandomDataList()
        firstLoad.value = false            
    }
    shrinkOrNot.value = !shrinkOrNot.value
}

const changeItem=(val)=>{
    selectItem.value = val    
}

watch(shrinkOrNot,(oldVal,newVal)=>{
    if( !newVal && firstLoad.value){
        getRandomDataList()
        firstLoad.value = false            
    }
})


const emitTimeData =(val)=>{
    // 子组件传递过来的数据 val
    // console.log('emit------',val)
    const {startDate} = val
    // console.log('解构后的值',startDate)
    if(startDate){
        // console.log('解构后的值',startDate._rawValue)
        // console.log('解构后的值',startDate.value)
        // console.log('解构后的值',val.startDate.value)
    }

}
 
</script>

<style scoped lang="scss">
@import  '../../assets/css/vue.scss';

$content-height:calc(100vh - $topBarHeight - $userBarHeight - $footerHeight);

    .user_bar{
        width:100%;
        height:$userBarHeight;
        background-color:#D9B2B1;
        line-height:$userBarHeight;
    }


    .content{
        box-sizing: border-box;
        position: relative;
        width:100%;
        min-height: $content-height;
        background-color:white;
        /*
            *该父元素没有height,只有min-height，
            *子元素在继承父元素高度的时候，是按照height:0继承的
            *使用 display:flex 可以形成BFC,让系统重新计算整个内容（父元素）的高度 
        */
        display:flex;
        flex-direction:row;
        
        /* 整个tab组件 */
        .demo-tabs{
            box-sizing: border-box;
            position: relative;
            display: flex;
            flex-direction: row;
            width: 100%; /* 覆盖组件默认的宽度计算 */
            min-height:100%;  /*继承父元素高度*/
            
            :deep() {
                .el-tabs__header{
                    height: unset !important;  /*取消tab的默认的高度100%，跟随flex布局自适应*/
                }
                /* 和 nav-bar模块 侧边栏的高度有关 */
                .el-tabs__content{
                    position: relative;
                    padding: 0;
                    flex-grow: 1;
                    /* 每个tab页面的内容 */
                    .el-tab-pane{
                        position: relative;
                        height: 100%;
                        padding: 0;
                    }
                }
            }
        }
    }
    
   
    .contorl-btn{
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        top:0px;
        left: 160px;
        font-size: 18px;
        
    }
     /* 修改tab背景色 */
    .el-tabs {
        :deep() {
            .el-tabs__header.is-left {
                background-color: #fbedf7;
            }
        }
    }
</style>