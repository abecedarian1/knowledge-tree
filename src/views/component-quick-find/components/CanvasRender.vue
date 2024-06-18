<template>
    <div>
        <canvas ref="canvas2" 
            @mousedown="canvasMousedown" 
            @mouseup="canvasMouseup"
            @wheel="canvasScroll" id="canvas2" width="600px" height="400px">
            当前浏览器不支持canvas，请下载最新的浏览器
            <a href="https://www.google.cn/intl/zh-CN/chrome">立即下载</a>
        </canvas>
    </div>
</template>

<script setup>
import {ref,onMounted} from 'vue'
import canvasDemoJpg from '@/assets/images/canvas-demo.jpg'

const canvas2 = ref()
//画布操作区
const canvasCxt = ref()
//创建的img对象
const imgObj = ref()
const startX = ref(0)
const startY = ref(0)
const imgWidth = ref(600)
const imgHeight = ref(400)
const defaultWidth = 600
const defaultHeight = 400

//图像的移动
const moveStartX = ref(0)
const moveStartY = ref(0)
const moveEndX = ref(0)
const moveEndY = ref(0)


//图片边界处理
const canvasVergeHandle=()=>{
    // 限制图片的左、上边界不为空白
    if (startX.value > 0) startX.value = 0
    if (startY.value > 0) startY.value = 0
    //限制右边不会留有空白
    if (startX.value + imgWidth.value < defaultWidth) startX.value = defaultWidth - imgWidth.value
    //限制下边不会留有空白
    if (startY.value + imgHeight.value < defaultHeight) startY.value = defaultHeight - imgHeight.value
}

const canvasScroll=(e)=>{
    // 取消事件对当前元素的默认影响---取消原有的外层滚动
    e.preventDefault()

    let ctx = canvasCxt.value
    let img = imgObj.value
    let wheelDeltaY = e.wheelDeltaY || -e.deltaY
    let scale = 1.1
    
    // 鼠标相对于目标节点(当前节点)左上角的距离
    let x = e.offsetX
    let y = e.offsetY

    //每次缩放时，都要重新更新画布上图片的相对坐标,以及显示在画布上的图片的实际宽高
    if(wheelDeltaY >0){
        // 放大
        imgWidth.value *= scale
        imgHeight.value *= scale
        // 需要理解一下  question
        startX.value -= (x-startX.value)*(scale-1)
        startY.value -= (y-startY.value) *(scale-1)
    }else{
        if((imgWidth.value/scale)>=defaultWidth && 
            (imgHeight.value/scale)>defaultHeight 
        ){
             //缩小
            imgWidth.value /= scale
            imgHeight.value /= scale
            //需要理解一下   question
            startX.value += (x-startX.value) *(1-1/scale)
            startY.value += (y-startY.value) * (1-1/scale)
        }
    }
    //处理边界
    canvasVergeHandle()
    
    
    //清除画布并重绘制
    ctx.clearRect(0,0,600,400)

    // 使用裁切的方式进行缩放————对于大型图，这种效果可能会更好一点（不确定）---缩放和下面的方式相反
    // ctx.drawImage(img,startX.value,startY.value,imgWidth.value,imgHeight.value,0,0,600,400)
    //使用全图进行缩放
    ctx.drawImage(img,startX.value,startY.value,imgWidth.value,imgHeight.value)
}

/**
 * 拖拽不流畅--完善中
*/
//鼠标按下时触发
const canvasMousedown=(e)=>{
    // 记录按下点
    moveStartX.value = e.offsetX
    moveStartY.value = e.offsetY
}

//鼠标抬起时触发
const canvasMouseup=(e)=>{
    //鼠标结束点
    moveEndX.value = e.offsetX
    moveEndY.value = e.offsetY

    let ctx = canvasCxt.value
    let img = imgObj.value
    let xVariance = moveEndX.value - moveStartX.value
    let yVariance = moveEndY.value - moveStartY.value

    startX.value += xVariance
    startY.value += yVariance

    //处理边界
    canvasVergeHandle()

    //清除画布并重绘制
    ctx.clearRect(0,0,600,400)
    ctx.drawImage(img,startX.value,startY.value,imgWidth.value,imgHeight.value)
}


onMounted(()=>{
    if(!canvas2.value.getContext){
        console.log('当前浏览器不支持canvas，请下载最新的浏览器')
        return
    }
    canvasCxt.value = canvas2.value.getContext('2d')
    imgObj.value = new Image()
    imgObj.value.src = canvasDemoJpg
    let ctx = canvasCxt.value
    let img = imgObj.value

    img.onload = function(){
        //参考链接：https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Using_images
        ctx.drawImage(img,0,0,600,400)   
    }
})



</script>

<style scoped>

#canvas2{
        background-color: beige;
        margin:10px;
    }

</style>