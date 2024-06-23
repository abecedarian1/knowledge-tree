<template>
    <!-- 事件委托 -->
    <div class="container" 
        @drop="drop" 
        @dragstart="dragstart"  
        @dragend="dragend" 
        @dragenter="dragenter" 
        @dragleave="dragleave"
        @dragover="dragover"
    >
        <div class="dropzone origin">
            <div class="drag-box" draggable="true">
                <span class="delete-icon" @click="deleteNode(false)">X</span>
                可拖拽框
            </div>
        </div>
        <div class="dropzone"></div>
        <div class="dropzone"></div>
        <div class="dropzone"> </div>
        <div class="dropzone"></div>
    </div>
</template>



<script setup>
    import {ref} from 'vue'
    const drag = ref();
    const dragCopy = ref();

    //开始移动了
    const dragstart=(e)=>{
        if(e.target.className == 'drag-box'){
            //源节点
            if(e.target.parentNode.className.includes('origin')){
                drag.value = e.target
            }else{
                dragCopy.value = e.target
            }
            //拖拉过程中，被拖拉元素的状态
            e.target.style.backgroundColor='rgb(152, 166, 226,0.5)';
        }
    }
    
    //拖拉结束了
    const dragend=(e)=>{
        //允许被拖拉元素拖拉结束后，给被拖拉的这个元素背景设为蓝色
        if(e.target.className=='drag-box'){
            e.target.style.backgroundColor='rgb(152, 166, 226)';
        }
        //放置完成后，清空拖拉数据
        drag.value = ''
        dragCopy.value = ''
    }

    //连续触发
    //设置允许放置到当前节点的条件--使得drop事件起作用；同时防止拖拉效果被重置
    const dragover=(e)=>{
        //源上不放
        if(!e.target.className.includes('origin') && e.target.className=='dropzone'){
            if((drag.value|| dragCopy.value) && e.target.childNodes.length==0){
                e.preventDefault();
            }
        }
    }

    //进入当前节点了
    const dragenter=(e)=>{
        //只有拖动允许拖拉的元素才会触发
        if(e.target.className=='dropzone' && (drag.value || dragCopy.value)){
            e.target.style.backgroundColor = 'rgb(128, 128, 128,0.2)'
        }
    }

    //从当前节点离开了
    const dragleave=(e)=>{
        if(e.target.className == 'dropzone'){
            //只有允许拖拉的元素离开才会触发
            if(drag.value || dragCopy.value){
                e.target.style.backgroundColor = ''
            }
        }
    }

    //向当前节点放拖拉对象
    const drop=(e)=>{
        if(e.target.className == 'dropzone'){
            if(e.target.childNodes.length==0){
                if(drag.value){
                    let cloneNode = drag.value.cloneNode(true)
                    let eventNode = cloneNode.children[0]
                    eventNode.style.display = 'inline'
                    eventNode.addEventListener('click',()=>{deleteNode(true)},false);
                    e.target.appendChild(cloneNode)
                    cloneNode.style.backgroundColor='rgb(152, 166, 226)';     
                }else if(dragCopy.value){
                    dragCopy.value.parentNode.removeChild(dragCopy.value);
                    e.target.appendChild(dragCopy.value)
                    dragCopy.value.style.backgroundColor='rgb(152, 166, 226)';     
                }
                e.target.style.backgroundColor = ''
            }
        }
    }


    //删除放置的元素
    const deleteNode=(boolean)=>{
        if(boolean){
            let deleteEle = event.target.parentNode
            let parent = event.target.parentNode.parentNode
            parent.removeChild(deleteEle)
        }
    }


</script>

<style scoped lang="scss">
    .container{
        position: relative;
        box-sizing: border-box;
        height: 100%;
    }
    .dropzone{
        position: relative;
        border: solid blue 1px;
        height: 100px;
    }
    .drag-box{
        background-color: rgb(152, 166, 226);
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .delete-icon{
            position:absolute;
            top:10px;
            right:10px;
            &:hover{
                cursor: pointer;
            }
            &:nth-child(1){
                display: none;
            }
        }
    }
    
</style>