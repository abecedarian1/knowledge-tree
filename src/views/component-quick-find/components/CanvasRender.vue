<template>
    <div>
        <div class="save">
            <div><button @click="savePic">保存图片</button></div>
            <div v-if="exportPic"><a  @click="exportPic = ''" :href="exportPic" download="canvas.png">点击下载图片</a></div>
        </div>
        <div class="toolBar">
            <span @click="drawShape = 'move' " :class="drawShape=='move' ? 'draw-shape' : '' ">移动 +</span>
            <span @click="drawShape = 'rect' " :class="drawShape=='rect' ? 'draw-shape' : '' ">矩形◻</span>
            <span @click="drawShape = 'line' "  :class="drawShape=='line' ? 'draw-shape' : '' ">直线 /</span>
            <span >撤销</span>
            <span @click="clearCanvas">清空画布</span>
        </div>
        <canvas ref="canvas2" 
            @mousedown="canvasMousedown" 
            @mouseup="canvasMouseup"
            @mousemove="canvasMousemove"
            @wheel="canvasScroll" id="canvas2" :width="defaultWidth" :height="defaultHeight">
            当前浏览器不支持canvas，请下载最新的浏览器
            <a href="https://www.google.cn/intl/zh-CN/chrome">立即下载</a>
        </canvas>
    </div>
</template>

<script setup>
import {ref,onMounted,reactive} from 'vue'
import canvasDemoJpg from '@/assets/images/canvas-demo.jpg'
//画布内容
const canvas2 = ref()
const canvasCxt = ref()
//元素在画布中渲染的起始点
const startX = ref(0)
const startY = ref(0)
//画布的默认宽高
const defaultWidth = 800
const defaultHeight = 600
//创建的img对象
const imgObj = ref()
//图片的初始宽高 --保持为画布的默认宽高，保证图片占满全屏且避免一些初始临界bug
// 也可以当作当前画布已经放大到多少倍的参照物
const imgWidth = ref(defaultWidth)
const imgHeight = ref(defaultHeight)
//图像的拖拽移动--也可以当作画布的拖拽移动
const startDrag = ref(false)
const moveStartX = ref(0)
const moveStartY = ref(0)
const moveEndX = ref(0)
const moveEndY = ref(0)
//画画或者拖拽过程中移动的距离（x,y）
const xVariance = ref()
const yVariance = ref()
//保存的图片
const exportPic = ref()
//是否开始画图的判断
const startDraw = ref(false)
// 当前画图形状
const drawShape = ref('move')
//初始化形状样式属性
const initDrawOption = reactive({
    fillStyle:'white',
    strokeStyle:'white',
    lineWidth:2
})
//保存的画图记录------如果用到撤销的话，这里可能是一个数组？
const strokePaths = ref(new Path2D())


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

//图像缩放
const canvasScroll=(e)=>{
    // 取消事件对当前元素的默认影响---取消原有的外层滚动
    e.preventDefault()
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
    }else if(wheelDeltaY < 0){

        if((imgWidth.value/scale)>=defaultWidth && 
            (imgHeight.value/scale)>defaultHeight 
        ){
             //缩小
            imgWidth.value /= scale
            imgHeight.value /= scale
            //需要理解一下   question
            startX.value += (x-startX.value) *(1-1/scale)
            startY.value += (y-startY.value) * (1-1/scale)
        }else{
            //处理缩不回来的情况
            imgWidth.value = defaultWidth
            imgHeight.value = defaultHeight
            startX.value = 0
            startY.value = 0
        }
    }
    //处理边界
    canvasVergeHandle()
    //重绘
    redraw()
}

//鼠标按下时触发
const canvasMousedown=(e)=>{
    //记录起始点
    moveStartX.value = e.offsetX
    moveStartY.value = e.offsetY
    if(drawShape.value == 'move'){
        //开始拖拽
        startDrag.value = true
    }else{
        //开始画图
        startDraw.value = true
    }
}

//鼠标抬起时触发
const canvasMouseup=(e)=>{
    if(drawShape.value == 'move'){
        //拖拽结束
        startDrag.value = false
    }else{
        //画图结束
        startDraw.value = false
        if(drawShape.value == 'rect'){
            //画完后，要把画的最终的内容进行记录
            let rectangle = new Path2D()
            rectangle.rect(moveStartX.value,moveStartY.value, xVariance.value, yVariance.value);
            strokePaths.value.addPath(rectangle)
        }else if(drawShape.value == 'line'){
            let linePath = new Path2D()
            linePath.moveTo(moveStartX.value,moveStartY.value)
            linePath.lineTo(moveEndX.value,moveEndY.value);
            strokePaths.value.addPath(linePath)
        }
        //重绘
        redraw()
    }
}

//鼠标移动过程中动态监听
const canvasMousemove=(e)=>{
    let timer = null
    if(startDrag.value){
        timer = setTimeout(()=>{
            //鼠标结束点
            moveEndX.value = e.offsetX
            moveEndY.value = e.offsetY
            //重新计算图片在画布中的起始位置
            xVariance.value = moveEndX.value - moveStartX.value
            yVariance.value = moveEndY.value - moveStartY.value
            startX.value += xVariance.value
            startY.value += yVariance.value 
            //处理边界
            canvasVergeHandle()
            //重绘
            redraw()
            //计时器结束后，重新计算鼠标开始点
            moveStartX.value = e.offsetX
            moveStartY.value = e.offsetY
            //清除定时器
            clearTimeout(timer)
        },5)


    //开始画画
    }else if(startDraw.value){
        //画图
        //渲染正在画的图的同时，还要渲染原有的内容

        timer = setTimeout(()=>{
            //鼠标结束点
            moveEndX.value = e.offsetX
            moveEndY.value = e.offsetY
            //计算移动的距离
            xVariance.value = moveEndX.value - moveStartX.value
            yVariance.value = moveEndY.value - moveStartY.value
            //重绘
            redraw()

            //画矩形
            if(drawShape.value=='rect'){
                canvasCxt.value.beginPath()
                canvasCxt.value.rect(moveStartX.value,moveStartY.value, xVariance.value, yVariance.value);
                canvasCxt.value.stroke()
                //画直线
            }else if(drawShape.value == 'line'){
                canvasCxt.value.beginPath()
                canvasCxt.value.moveTo(moveStartX.value,moveStartY.value)
                canvasCxt.value.lineTo(moveEndX.value,moveEndY.value);
                canvasCxt.value.stroke()
            }
            //清除定时器
            clearTimeout(timer)
        },5)
    }
}

const savePic=()=>{
    // 下面两种方法都可以
    // exportPic.value =  canvas2.value.toDataURL('image/png')
    canvas2.value.toBlob((blob)=>{
        let url = URL.createObjectURL(blob)
        exportPic.value = url
    })
    //blob的value出不来
    // console.log('生成的图片',exportPic)
}


//更新画布--重绘
const redraw = ()=>{
    //清除画布
    canvasCxt.value.clearRect(0,0,defaultWidth,defaultHeight)
    //使用全图进行缩放
    canvasCxt.value.drawImage(imgObj.value,startX.value,startY.value,imgWidth.value,imgHeight.value)
    //重新绘制路径
    canvasCxt.value.stroke(strokePaths.value)
}


//清空画布
const clearCanvas=()=>{
    //清除画布
    canvasCxt.value.clearRect(0,0,defaultWidth,defaultHeight)
    //使用全图进行缩放
    canvasCxt.value.drawImage(imgObj.value,startX.value,startY.value,imgWidth.value,imgHeight.value)
    //清空路径
    strokePaths.value = new Path2D()
}

onMounted(()=>{
    if(!canvas2.value.getContext){
        console.log('当前浏览器不支持canvas，请下载最新的浏览器')
        return
    }
    canvasCxt.value = canvas2.value.getContext('2d')
    //初始化画图设置
    canvasCxt.value.fillStyle = initDrawOption.fillStyle
    canvasCxt.value.strokeStyle = initDrawOption.strokeStyle
    canvasCxt.value.lineWidth = initDrawOption.lineWidth

    imgObj.value = new Image()
    imgObj.value.src = canvasDemoJpg
    imgObj.value.onload = function(){
        //参考链接：https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Using_images
        canvasCxt.value.drawImage(imgObj.value,0,0,defaultWidth,defaultHeight)   
    }
})



</script>

<style scoped lang="scss">

#canvas2{
        background-color: beige;
}

.draw-shape{
    background-color: red;
}

.toolBar{
    background-color: salmon;
    width: 800px;
    height: 40px;
    font-size: 20px;
    line-height: 40px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    
    span{
       padding:0 10px; 
    }
}

.save{
    width: 800px;
    margin: 0 auto;
    text-align: right;
    font-size: 20px;
    button{
        font-size: 20px;
        margin:5px 0;
    }
}
</style>