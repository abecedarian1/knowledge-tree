<template>
    <div>
        <div class="save">
            <div><button @click="savePic">保存图片</button></div>
            <div v-if="exportPic">
                <a  @click="exportPic = ''" :href="exportPic" download="canvas.png">点击下载图片</a>
                <a @click="exportPic = ''" style="font-size: 24px;color: red;padding-left: 5px;">X</a></div>
        </div>
        <div class="toolBar">
            <span @click="drawShape = 'move' " :class="drawShape=='move' ? 'draw-shape' : '' ">移动 +</span>
            <span @click="drawShape = 'rect' " :class="drawShape=='rect' ? 'draw-shape' : '' ">矩形◻</span>
            <span @click="drawShape = 'line' "  :class="drawShape=='line' ? 'draw-shape' : '' ">直线 /</span>
            <span @click="drawShape = 'curve' "  :class="drawShape=='curve' ? 'draw-shape' : '' ">曲线 S</span>
            <span @click="drawShape = 'eraser' "  :class="drawShape=='eraser' ? 'draw-shape' : '' ">橡皮擦</span>
            <span @click="undo">撤销</span>
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


/**
 * 画布图层分层（绘制）管理还没搞定  ————应该是有一个函数
 * 边界条件限制  question
*/


/**
 *(1) 鼠标滚动 连带画布移动的原理
      以左上角为坐标原点（Ox,Oy）（0，0）

      画布缩放前大小 width 200 * height 300
      鼠标在画布上有目标点（x，y），需要保存该点不动
      当画布放大1.5（或缩小0.8）倍时， canvas中的该点坐标相对画布没变，但是人看到是变了；
      要想相对人不动，需要移动坐标

      画布放大 1.5（缩小0.8）倍，画布整体像素不变， 人看到的画布整体尺寸会变为 1.5*width（0.8*width）,
      整体变大  expAdd (1.5width-width) ==（1.5-1）* width
      整体缩小  shrAdd (width-0.8width) ==（1-0.8）* width

	  对于目标点来说他所增加的为（x-Ox）/ width * expAdd == (x-Ox) * (1.5-1)    ，
      对于目标点来说他所减少的为（x-Ox）/ width * shrAdd == (x-Ox) * (1-0.8)    ，

      需要缩回（或增加）这么多，才能保持原位置不变
      对应到画布中，它的减少长度对应画布长度为  (x-Ox) * (1.5-1)  / realScale
 	  对应到画布中，它的增加长度对应画布长度为  (x-Ox) * (1-0.8)  / realScale    ，

        =======================
    translate 会更改缩放原点，默认是左上角（0.0），translate移动到哪里，缩放原点就是哪里    

（2）画布纯移动的原理
    当前 实际放大倍数 realScale = 2
    鼠标移 var = 3px， 对应画布实际移动 canvasVar =  var / realScale px
    在画布上渲染移动translate 数值，应该用canvasVar
 * 
*/


//画布内容
const canvas2 = ref()
const canvasCxt = ref()

//实际缩放比--相比原有
const realScale = ref(1)

//元素在画布中渲染的起始点
//人可见的*相对原始*的移动距离————要和画布中的相对原始移动距离区分开，不能混在一起！！！
const realTranslateX = ref(0)
const realTranslateY = ref(0)
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
//人眼可见的移动起始/结束点
const moveStartX = ref(0)
const moveStartY = ref(0)
const moveEndX = ref(0)
const moveEndY = ref(0)
//相对画布的移动起始/结束点
const canvaMoveStartX = ref(0)
const canvaMoveStartY = ref(0)
const canvaMoveEndX = ref(0)
const canvaMoveEndY = ref(0)
//画线或者拖拽过程中移动的距离（x,y）--相对画布
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
    fillStyle:'red',
    strokeStyle:'blue',
    lineWidth:2
})

//保存的画图记录
const drawRecords = ref([])
//保存的曲线路径
const curvePath = ref(new Path2D())
const eraserPath = ref(new Path2D())

//图片边界处理
const canvasVergeHandle=()=>{
    // // 限制图片的左、上边界不为空白
  
    // //限制右边不会留有空白
  
    // //限制下边不会留有空白
 
}


const canvasScroll=(e)=>{
    // 取消事件对当前元素的默认影响---取消原有的外层滚动
    e.preventDefault()
    let wheelDeltaY = e.wheelDeltaY || -e.deltaY
    let scale = 1.25
    // 鼠标相对于目标节点(当前节点)左上角的距离
    let x = Math.floor(e.offsetX)
    let y = Math.floor(e.offsetY)

    //必须要在下一帧绘制前清空一遍！！！
    canvasCxt.value.clearRect(0, 0, defaultWidth, defaultHeight)

    //每次缩放时，都要重新更新画布上图片的相对坐标,以及显示在画布上的图片的实际宽高
    if(wheelDeltaY >0){
        // 放大
        imgWidth.value *= scale
        imgHeight.value *= scale
        //相比原有放大的比例
        realScale.value = imgWidth.value / defaultWidth
        canvasCxt.value.scale(1.25,1.25)

        //人眼可见实际—— 相对局部放大
        let expandSizeX =(x-realTranslateX.value) *(scale-1) 
        let expandSizeY =(y-realTranslateY.value) *(scale-1)      
       
        //相对画布——  相对局部放大
        xVariance.value = -expandSizeX  / realScale.value  
        yVariance.value = -expandSizeY / realScale.value  

        canvasCxt.value.translate(xVariance.value,yVariance.value)
        realTranslateX.value -= expandSizeX
        realTranslateY.value -= expandSizeY
    
        
    }else if(wheelDeltaY < 0){

            canvasCxt.value.scale(0.8,0.8)
            //缩小
            imgWidth.value /= scale
            imgHeight.value /= scale
            //相比原有缩小比例
            realScale.value = imgWidth.value / defaultWidth

            //人眼可见实际—— 相对局部缩小
            let shrinkSizeX = (x-realTranslateX.value) *(1-1/scale) 
            let shrinkSizeY = (y-realTranslateY.value) * (1-1/scale) 
            //相对画布——  相对局部缩小
            xVariance.value = shrinkSizeX / realScale.value
            yVariance.value = shrinkSizeY / realScale.value
            canvasCxt.value.translate(xVariance.value,yVariance.value)
            realTranslateX.value += shrinkSizeX
            realTranslateY.value += shrinkSizeY



    }

    //处理边界
    // canvasVergeHandle()
  
                    
    //重绘
    redraw()
}

//鼠标按下时触发
const canvasMousedown=(e)=>{
    //记录起始点
    moveStartX.value = Math.floor(e.offsetX)
    moveStartY.value = Math.floor(e.offsetY)
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
        const record = {
            /*以下涉及到坐标的和变量的，都是相对画布的移动坐标和变量*/
            shape: drawShape.value,
            startX: canvaMoveStartX.value,
            startY: canvaMoveStartY.value,
            endX: canvaMoveEndX.value,
            endY: canvaMoveEndY.value,
            xVariance: xVariance.value,
            yVariance: yVariance.value,
            fillStyle: initDrawOption.fillStyle,
            strokeStyle: initDrawOption.strokeStyle,
            lineWidth: initDrawOption.lineWidth,
            curvePath:curvePath.value || undefined,
            eraserPath:eraserPath.value || undefined
        }
        // 画完后，把画的最终的内容进行记录
        drawRecords.value.push(record)
        curvePath.value = new Path2D()
        eraserPath.value = new Path2D()
    }
}

//鼠标移动过程中动态监听
const canvasMousemove=(e)=>{
    let timer = null
    if(startDrag.value){

        timer = setTimeout(()=>{

            //必须要在下一帧绘制前清空一遍
            canvasCxt.value.clearRect(0, 0, defaultWidth, defaultHeight)

            //鼠标结束点
            moveEndX.value = Math.floor(e.offsetX) 
            moveEndY.value = Math.floor(e.offsetY)
            //人眼可见实际—— 移动距离
            let moveSizeX = (moveEndX.value - moveStartX.value)
            let moveSizeY = (moveEndY.value - moveStartY.value)
            
            //相对画布——  相对移动距离
            xVariance.value = moveSizeX / realScale.value
            yVariance.value = moveSizeY / realScale.value

            canvasCxt.value.translate(xVariance.value,yVariance.value)
            //重新计算图片在画布中的起始位置
            realTranslateX.value += moveSizeX
            realTranslateY.value += moveSizeY
        
            //处理边界
            canvasVergeHandle()

            //重绘
            redraw()
            //计时器结束后，重新计算鼠标开始点
            moveStartX.value = Math.floor(e.offsetX)
            moveStartY.value = Math.floor(e.offsetY)
            //清除定时器
            clearTimeout(timer)
        },5)


    //开始画画
    }else if(startDraw.value){
        //画图
        //渲染正在画的图的同时，还要渲染原有的内容
        timer = setTimeout(()=>{
            //鼠标结束点
            moveEndX.value = Math.floor(e.offsetX)
            moveEndY.value = Math.floor(e.offsetY)
            //计算移动的距离
            xVariance.value = (moveEndX.value - moveStartX.value) / realScale.value
            yVariance.value = (moveEndY.value - moveStartY.value)  / realScale.value
            //相对画布的实际坐标点--后面画图要用
            canvaMoveStartX.value = (moveStartX.value-realTranslateX.value)/realScale.value
            canvaMoveStartY.value = (moveStartY.value - realTranslateY.value)/realScale.value
            canvaMoveEndX.value = (moveEndX.value - realTranslateX.value)/realScale.value
            canvaMoveEndY.value = (moveEndY.value - realTranslateY.value)/realScale.value

            //重绘
            redraw()
            //画矩形
            if(drawShape.value=='rect'){
                canvasCxt.value.beginPath()
                canvasCxt.value.rect(canvaMoveStartX.value,canvaMoveStartY.value, xVariance.value, yVariance.value);
                canvasCxt.value.stroke()
            //画直线
            }else if(drawShape.value == 'line'){
                canvasCxt.value.beginPath()
                canvasCxt.value.moveTo(canvaMoveStartX.value,canvaMoveStartY.value)
                canvasCxt.value.lineTo(canvaMoveEndX.value,canvaMoveEndY.value);
                canvasCxt.value.stroke()
            //曲线
            }else if(drawShape.value == 'curve'){
                let curve = new Path2D()
                curve.moveTo(canvaMoveStartX.value,canvaMoveStartY.value)
                curve.lineTo(canvaMoveEndX.value,canvaMoveEndY.value)
                curvePath.value.addPath(curve)    
                //计时器结束后，重新计算鼠标开始点
                moveStartX.value = Math.floor(e.offsetX)
                moveStartY.value = Math.floor(e.offsetY)
                //画曲线的过程需要展示
                canvasCxt.value.stroke(curvePath.value)

            //橡皮擦效果
            }else if(drawShape.value == 'eraser'){
                canvasCxt.value.globalCompositeOperation = 'destination-out'
                let eraserCurve = new Path2D()
                eraserCurve.moveTo(canvaMoveStartX.value,canvaMoveStartY.value)
                eraserCurve.lineTo(canvaMoveEndX.value,canvaMoveEndY.value)
                eraserPath.value.addPath(eraserCurve)    
                //计时器结束后，重新计算鼠标开始点
                moveStartX.value = Math.floor(e.offsetX)
                moveStartY.value = Math.floor(e.offsetY)
                //画曲线的过程需要展示
                canvasCxt.value.stroke(eraserPath.value)
                canvasCxt.value.globalCompositeOperation = 'source-over'
            }
            //清除定时器
            clearTimeout(timer)
        },10)
    }
}


// 撤销最后一次绘图操作
const undo = () => {
    drawRecords.value.pop()
    redraw()
}


//保存图片
const savePic=()=>{
    // 下面两种方法都可以————   blob的value出不来
    // exportPic.value =  canvas2.value.toDataURL('image/png')
    canvas2.value.toBlob((blob)=>{
        let url = URL.createObjectURL(blob)
        exportPic.value = url
    })
}


// 更新画布--重绘
const redraw = () => {
    
    //清除画布---如何在这里统一清空
    // canvasCxt.value.clearRect(-xVariance.value, -yVariance.value, defaultWidth/realScale.value, defaultHeight/realScale.value)

    //由于移动和缩放造成的画布改变，清空上一帧的内容已经在对应位置单独设置
    //统一清空处理没有找到方法
    canvasCxt.value.clearRect(0,0, defaultWidth, defaultHeight)

    //使用全图进行缩放
    canvasCxt.value.drawImage(imgObj.value,0,0,defaultWidth,defaultHeight)   
    //重新绘制历史记录里边的内容
    drawRecords.value.forEach(record => {
        canvasCxt.value.fillStyle = record.fillStyle
        canvasCxt.value.strokeStyle = record.strokeStyle
        canvasCxt.value.lineWidth = record.lineWidth
        if (record.shape === 'rect') {
            canvasCxt.value.beginPath()
            canvasCxt.value.rect(record.startX, record.startY, record.xVariance, record.yVariance)
            canvasCxt.value.stroke()
        } else if (record.shape === 'line') {
            canvasCxt.value.beginPath()
            canvasCxt.value.moveTo(record.startX, record.startY)
            canvasCxt.value.lineTo(record.endX, record.endY)
            canvasCxt.value.stroke()
        } else if (record.shape === 'curve') {
            canvasCxt.value.stroke(record.curvePath)
        } else if (record.shape === 'eraser') {
            canvasCxt.value.globalCompositeOperation = 'destination-out'
            canvasCxt.value.stroke(record.eraserPath)
            canvasCxt.value.globalCompositeOperation = 'source-over'
        }
    })
}


//清空画布
const clearCanvas=()=>{
    //清除画布
    canvasCxt.value.clearRect(0,0,defaultWidth,defaultHeight)
    //使用全图进行缩放
    canvasCxt.value.drawImage(imgObj.value,0,0,defaultWidth,defaultHeight)   
    drawRecords.value = []
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
        /* background-color: red; */
}
.draw-shape{
    color:rgb(250, 227, 213);
}

.save{
    width: 800px;
    margin: 0 auto;
    text-align: right;
    font-size: 20px;
    button{
        font-size: 20px;
        margin:5px 0;
        background-color: rgb(223, 218, 209);
    }

    a:hover{
        cursor: pointer;
    }
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
    
    &>span{
       padding:0 10px; 

       &:hover{
           color:rgb(250, 227, 213);
           cursor:pointer;
       }
    }
}

</style>