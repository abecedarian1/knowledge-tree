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
import dayjs from 'dayjs'
import {ElMessage} from 'element-plus'

const emit = defineEmits(['emitData'])

const startDate = ref()
const endDate = ref()
const startTime = ref()
const endTime = ref()




// 将时分秒转换为时间戳
const timeToSec = (time) =>{
    if(time !== null){
        let s = "";
        let hour = time.split(":")[0];
        let min = time.split(":")[1];
        let sec = time.split(":")[2];
        s = Number(hour*3600) + Number(min*60) + Number(sec)
        return s
    }
}

const compareTime = (time1,time2) => {
    if(timeToSec(time1)-timeToSec(time2)>0){
        return true;
    }
    return false
}


//====================开始时间禁选内容=============
//日期范围函数
// endTime
const getStartDateRange = (val) => {
    let startTimer = dayjs().startOf('day').valueOf();
    let endTimer = 0;
    if(val){
        let dateChuo = new Date(val)*1;
        endTimer = dateChuo
    }
    if(endTimer){
        return [startTimer,endTimer]
    }else{
        return startTimer
    }
}



//日期禁选时间段
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
    emit('emitData',{startDate,endDate,startTime,endTime})
    if(!val){
        startTime.value = ''
    }
}



//时间范围函数
const startTimeChange = (val) => {
    emit('emitData',{startDate,endDate,startTime,endTime})
    if(!startDate.value){
        startTime.value = ''
        ElMessage({
            message: '请先输入日期',
            type: 'warning',
        })
    }else{
        let nowDate = dayjs().startOf('day').format('YYYY-MM-DD')
        // 如果选择的开始日期是今天
        if(new Date(startDate.value)*1 == new Date(nowDate)*1){
            let date = new Date()
            let nowTime = date.toString().split(" ")[4]
            // 选择的时间小于等于当前时间
            if(!compareTime(val,nowTime)){
                startTime.value = ''
                ElMessage({
                    message: '所选时间不得小于当前时间',
                    type: 'warning',
                })
            }else if(endDate.value){   // 如果结束日期选择的也是今天
                if(new Date(endDate.value)*1 == new Date(nowDate)*1){
                    if(endTime.value){
                        // 选择的时间不能大于结束时间
                        if(compareTime(val,endTime.value)){
                            startTime.value = ''
                            ElMessage({
                                message: '所选时间不得大于结束时间',
                                type: 'warning',
                            })
                        }                        
                    }
                }
            }
        }else{
            // 判断选择的开始日期是否和结束日期相同，
            // 如果相同，则开始时间要小于结束时间
            // 否则 不需要添加时间限制
            if(endDate.value){
                if(new Date(endDate.value)*1 == new Date(startDate.value)*1){
                    if(endTime.value){
                        // 选择的时间不能大于结束时间
                        if(compareTime(val,endTime.value)){
                            startTime.value = ''
                            ElMessage({
                                message: '所选时间不得大于结束时间',
                                type: 'warning',
                            })
                        }                        
                    }
                }
            }
        }
    }
}





// ========================结束时间禁选内容================
// 范围函数
const getEndDateRange = (val) => {
    emit('emitData',{startDate,endDate,startTime,endTime})

    let startTimer = 0;
    if(val){
        let dateChuo = new Date(val)*1;
        startTimer = dateChuo - 24*60*60*1000;
    }else{
        startTimer = dayjs().startOf('day').valueOf();
    }
    return startTimer;
}

// 日期禁选时间段
const disabledEndDate = (time) => {
    emit('emitData',{startDate,endDate,startTime,endTime})
    const startTimer = getEndDateRange(startDate.value);
    return time.getTime() < startTimer
}



const endDateChange =(val)=>{
    if(!val){
        endTime.value = ''
    }
}

// 时间范围函数
const endTimeChange =  (val) => {
    if(!endDate.value){
        endTime.value = ''
        ElMessage({
            message: '请先输入日期',
            type: 'warning',
        })
    }else{

        //控制截止时间的范围
        // 1 如果没有开始时间
        if(!startTime.value){
            let nowDate = dayjs().startOf('day').format('YYYY-MM-DD')
            // 如果选择的开始日期是今天
            if(new Date(endDate.value)*1 == new Date(nowDate)*1){
                let date = new Date()
                let nowTime = date.toString().split(" ")[4]
                // 选择的时间小于等于当前时间
                if(!compareTime(val,nowTime)){
                    startTime.value = ''
                    ElMessage({
                        message: '所选时间不得小于当前时间',
                        type: 'warning',
                    })
                }
            }
        }else{
            // 如果有开始时间,
            // 1 如果 开始日期和结束日期相同，时间要小于开始时间
            if(startDate.value == endDate.value){
                if(!compareTime(val,startTime.value)){
                    endTime.value = ''
                    ElMessage({
                        message: '所选时间不得小于结束时间',
                        type: 'warning',
                    })

                }
            }
            // 2 如果 不相同，则不需要判断  ——日期选择已做判断
        }
    }
}
 


</script>