<template>
    <div>
        <canvas ref="canvas1"  id="canvas1" width="600px" height="400px">
            当前浏览器不支持canvas，请下载最新的浏览器
            <a href="https://www.google.cn/intl/zh-CN/chrome">立即下载</a>
        </canvas>
    </div>
</template>

<script setup>
import {ref,onMounted} from 'vue'

const canvas1 = ref()

// 初始化小球位置
const tList = ref([0,0.2,0.4,0.6,0.8,1]);
const ballColor = ref([
                    'rgb(95, 158, 160)',
                    'rgb(172, 138, 169)',
                    'rgb(233, 217, 125)',
                    'rgb(189, 245, 151)',
                    'rgb(137, 138, 216)',
                    'rgb(75, 97, 61)' 
                    ])

// Cubic Bezier 函数---计算贝塞尔曲线上的点的坐标值
const cubicBezier=(p0, p1, p2, p3, t)=> {
    return Math.pow(1 - t, 3) * p0 +
        3 * Math.pow(1 - t, 2) * t * p1 +
        3 * (1 - t) * Math.pow(t, 2) * p2 +
        Math.pow(t, 3) * p3;
}

onMounted(()=>{
    var raf;
    if(!canvas1.value.getContext){
        console.log('当前浏览器不支持canvas，请下载最新的浏览器')
    }
    //获取画笔上下文对象
    let ctx = canvas1.value.getContext('2d')
    // console.log('获取到的内容：',ctx)

    function loadingItemDraw(init){
        // 绘制贝塞尔曲线--可以没有-
        // ctx.beginPath();
        // ctx.moveTo(start.x, start.y); // 起始点
        // ctx.bezierCurveTo(control1.x, control1.y,control2.x,control2.y,end.x,end.y); // 控制点1，控制点2，结束点
        // ctx.strokeStyle = 'black';
        // ctx.stroke();

        //循环
        for(let i=0;i<tList.value.length;i++){
             // 计算小球位置
            const x = cubicBezier(start.x, control1.x, control2.x, end.x, tList.value[i]);
            const y = cubicBezier(start.y, control1.y, control2.y, end.y, init ? 0 : tList.value[i]);

            // 绘制小球
            ctx.beginPath();
            ctx.arc(x, y, 10, 0, Math.PI * 2);
            ctx.fillStyle = ballColor.value[i];
            ctx.fill();

            // 更新参数t
            tList.value[i] += 0.005;
            if (tList.value[i] > 1) {
                tList.value[i] = 0;
            }
        }
    }

    const start = { x: 50, y: 150 }; // 贝塞尔曲线起始点
    const control1 = { x: 110, y: 50 }; // 控制点1
    const control2 = { x: 170, y: 250 }; // 控制点2
    const end = { x: 230, y: 140 }; // 贝塞尔曲线结束点


    // 动画循环
    function animate() {
        ctx.clearRect(0, 0, 600, 400);
        loadingItemDraw(false);
        raf = requestAnimationFrame(animate);
    }
    

    canvas1.value.addEventListener("mouseover", (e) => {
        raf = requestAnimationFrame(animate);
    });

    canvas1.value.addEventListener("mouseout", (e) => {
        cancelAnimationFrame(raf);
        ctx.clearRect(0, 0, 600, 400);
        loadingItemDraw(true);
    });

    loadingItemDraw(true);

    // 三次贝塞尔曲线
    // bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x,y)
    // 二次贝塞尔曲线
    // quadraticCurveTo(cp1x,cp1y,x,y)    
})

</script>

<style>
    #canvas1{
        background-color: beige;
    }
</style>