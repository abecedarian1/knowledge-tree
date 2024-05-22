<template>
    <div>
        <el-date-picker
        :disabled-date="disabledStartDate"
        @change="startDateChange"
         placeholder="开始日期"
         v-model="startDate"
         value-format="YYYY-MM-DD"
       >
       </el-date-picker>

       <el-time-picker
           v-model="startTime"
           @change="startTimeChange"
           value-format="HH:mm:ss"
           placeholder="开始时间">
       </el-time-picker>

       <el-date-picker
        :disabled-date="disabledEndDate"
         @change="endDateChange"
         placeholder="截至日期"
         v-model="endDate"
         value-format="YYYY-MM-DD"
       >
       </el-date-picker>

       <el-time-picker
           v-model="endTime"
           @change="endTimeChange"
           value-format="HH:mm:ss"
           placeholder="结束时间">
      </el-time-picker>
   
    </div>

</template>  

<script lang="ts" setup>
import {ref} from 'vue'
import {
    getStartDateRange, 
    getEndDateRange, 
    clearEndTimeOrNot, 
    clearStartTimeOrNot 
} from '@/utils/timeSelectLimit.js'

const emit = defineEmits(['emitData'])
const startDate = ref()
const endDate = ref()
const startTime = ref()
const endTime = ref()

//====================开始日期 禁选内容=============
const disabledStartDate = (time) => {
    if(endDate.value){
        const [startTimer,endTimer] = getStartDateRange(endDate.value);
        return time.getTime() < startTimer || time.getTime() > endTimer;
    }else{
        const startTimer = getStartDateRange(endDate.value);
        return time.getTime() < startTimer
    }
}

const startDateChange = (val)=>{
    startTime.value = ''
}

const startTimeChange = (val) => {
    //只在时间上添加触发
    emit('emitData',{startDate,endDate,startTime,endTime})
    let flag = clearStartTimeOrNot(startDate.value,val,endDate.value,endTime.value)
    if(flag){
        startTime.value = ''
    }
}

// ========================结束日期 禁选内容================
const disabledEndDate = (time) => {
    const startTimer = getEndDateRange(startDate.value);
    return time.getTime() < startTimer
}

const endDateChange =(val)=>{
    endTime.value = ''
}

const endTimeChange =  (val) => {
    //只在时间上添加触发
    emit('emitData',{startDate,endDate,startTime,endTime})
    let flag = clearEndTimeOrNot(startDate.value,startTime.value,endDate.value,val)
    if(flag){
        endTime.value = ''
    }
}
</script>