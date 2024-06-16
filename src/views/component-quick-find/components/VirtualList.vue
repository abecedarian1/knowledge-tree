<template>
    <div class="container" 
        :style="{height:containerHeight}" 
        @scroll="handleScroll" 
        ref="container"
    >
        <!-- 数据列表 -->
        <div class="list" :style="{top:listTop}">
            <!-- 列表项 -->
            <div v-for="item in showData" 
                :key="item.id" 
                :style="{height:lineSize+'px',lineHeight:lineSize+'px'}"
            >
                {{item.content}}
            </div>
        </div>

        <!-- 用于撑开高度的元素 -->
        <div class="bar" :style="{height:barHeight}"></div> 


    </div>
</template>

<script setup>
import {ref,defineProps,computed,onMounted} from 'vue'

const props = defineProps({
    // 要渲染的数据
    items:{
        type:Array,
        required:true
    },
    // 每条数据渲染节点的高度
    lineSize:{
        type:Number,
        required:true
    },
    // 每次渲染的DOM节点个数
    showNumber:{
        type:Number,
        required:true
    }
})

const container = ref()
//要展示数据的起始下标
const start = ref(0)
// 要展示数据的结束下标
const end = ref(props.showNumber)

// 最终筛选出要展示的数据
const showData = computed(()=>{
    return props.items.slice(start.value,end.value)
})
// 容器的高度
const containerHeight=computed(()=>{
    return (props.lineSize * props.showNumber) + 'px'
})
// 撑开容器内容高度的元素高度
const barHeight = computed(()=>{
    return (props.lineSize * props.items.length) + 'px'
})
// 鼠标滚动的同时改变top的值，保证显示的内容在视口中
const listTop = computed(()=>{
    return (start.value * props.lineSize) + 'px'
})


// 容器滚动事件------------
const handleScroll=()=>{
    //获取容器顶部滚动的距离
    const scrollTop  = container.value.scrollTop
    // 计算已经滚动上去的数据条数,用计算结果作为获取数据的起始和结束下标
    start.value = Math.floor(scrollTop / props.lineSize)
    end.value = start.value + props.showNumber
}

</script>

<style scoped>
    .container{
        position: relative;
        width: 100%;
        overflow-y: scroll;
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        background-color: rgb(150,150,150,0.5);
    }

    .list{
        position: relative;
        width: 100%;
    }
</style>