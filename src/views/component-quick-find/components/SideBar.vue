<template>
    <div style="position: relative;height: 100%;">
        <div class="nav-bar expand"  v-if="shrinkOrNot">
            <div class="check-button" 
                :class="selectItem == item ? 'select' : '' "
                @click="$emit('changeItem',item)"
                v-for="(item,index) in navList" :key="index"
            >
                {{item}}
            </div>
            <span @click="$emit('changeStatus')" class="control-flag"> &lt; </span>
        </div>
        <div class="nav-bar shrink"  v-else>
            <span @click="$emit('changeStatus')" class="control-flag"> &gt;</span>
        </div>
        <slot>操作控件</slot>
    </div>
</template>


<script setup>
    import {ref,onMounted,defineEmits,defineModel} from 'vue'
    import axios from 'axios'
    const emit = defineEmits(["changeStatus","changeItem"])
    const shrinkOrNot = defineModel('shrinkOrNot')
    const navList = defineModel('navList')
    const selectItem = defineModel('selectItem')
    const firstLoad = defineModel('firstLoad')
</script>

<style scoped>
    .nav-bar{
        position: relative;
        height: 100%;

        box-shadow: rgb(169,169,174,0.5) 10px 0 5px;
        background-color: aquamarine;
    }
    .expand{
        width: 150px;
    }
    .shrink{
        width: 30px;
        
    }
    .control-flag{
        position: absolute;
        width: 30px;
        height: 100px;
        line-height: 100px;
        color: white;
        font-size: 24px;
        background-color: #a1a99e;
        top: calc(50% - 50px);
        right: -20px;
    }

    .check-button:hover{
        background-color: rgb(169,169,174,0.5)
    }
    .select{
        background-color: red;
    }

</style>