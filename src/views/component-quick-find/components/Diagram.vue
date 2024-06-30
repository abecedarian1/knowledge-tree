<template>
    <div>
        <div ref="echartsShow" id='echartsShow' >
        </div>
        <button ref="controlBtn" class="contol-get-data" @click="getDynamicData">{{operationTitle}}</button>
    </div>
</template>

<script  setup>
    import {ref,onMounted,reactive,defineProps,watch} from 'vue'
    // import * as echarts from 'echarts';
    import { init } from 'echarts';

    const props = defineProps(['loaded'])

    // const dataList = ref([5, 20, 36, 10, 8, 20])
    const dataList = reactive([5, 20, 36, 10, 8, 20])
    const echartsShow =ref()
    const controlBtn = ref()
    const myChart = ref()
    const dynamicOrNot = ref(false)
    const dataInterval = ref(null)
    const operationTitle = ref('开始动态获取数据')

    //动态更新数据    
    const getDynamicData=()=>{
        dynamicOrNot.value = !dynamicOrNot.value
        if(dynamicOrNot.value){
            operationTitle.value = '停止动态获取数据'
            changeButtonColor(true)
            dataInterval.value = setInterval(() => {
                //实际开发中是要调用接口，
                for(let i=0;i<6;i++){
                //循环添加随机数
                    dataList[i] = Math.floor(Math.random()*100)
                }
                myChart.value.setOption({
                    series: [
                        {
                            name: '销量',
                            type: 'bar',
                            // data: [5, 20, 36, 10, 10, 20]
                            data: dataList
                        }
                    ]
                })                
            }, 500);

        }else{
            clearInterval(dataInterval.value)
            operationTitle.value = '开始动态获取数据'
            changeButtonColor(false)
        }
    }

    const changeButtonColor=(boolen)=>{
        if(boolen){
            //粉红色
            controlBtn.value.style.backgroundColor = 'rgb(226, 102, 102)';
        }else{
            //黄色
            controlBtn.value.style.backgroundColor = 'rgb(226, 224, 102)';
        }
    }

    onMounted(()=>{
        const main =  echartsShow.value
        // 基于准备好的dom，初始化echarts实例
        // myChart.value = echarts.init(main);
        myChart.value = init(main);
        // 绘制图表
        myChart.value.setOption({
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            series: [
                {
                    name: '销量',
                    type: 'bar',
                    // data: [5, 20, 36, 10, 10, 20]
                    data: dataList
                }
            ]
        });
    })


    //监听是否离开页面，对数据更新操作进行销毁
    watch(
        ()=>props.loaded,
        (val)=>{
            if(!val && dynamicOrNot.value){
                clearInterval(dataInterval.value)  
                //按钮要变过来
                dynamicOrNot.value = !dynamicOrNot.value
                // dynamicOrNot.value = false  //上下两个都可
                operationTitle.value = '开始动态获取数据'
                changeButtonColor(false)
            }
        }
    )

</script>

<style>
    #echartsShow{
        width: 300px;
        height: 300px;
    }
    .contol-get-data{
        border: solid rgb(134, 169, 245) 1px;
        font-size: 19px;
        float: left;
        background-color: rgb(226, 224, 102);
    }

    .contol-get-data:hover{
        background-color: rgb(168, 226, 102);
    }

</style>