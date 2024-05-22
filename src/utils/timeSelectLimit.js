import dayjs from 'dayjs'
import {ElMessage} from 'element-plus'


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

//返回 时间 的比较结果
const compareTime = (time1,time2) => {
    if(timeToSec(time1)-timeToSec(time2)>0){
        return true;
    }
    return false
}


/**
 * 返回 “开始日期” 选择范围的 时间戳
 * 如果有结束日期，返回[startTimer,endTimer]；否则，返回 startTimer
 */
const getStartDateRange = (endDate) => {
    let startTimer = dayjs().startOf('day').valueOf();
    let endTimer = 0;
    if(endDate){
        let dateChuo = new Date(endDate)*1;
        endTimer = dateChuo
    }
    if(endTimer){
        return [startTimer,endTimer]
    }else{
        return startTimer
    }
}


/**
 * 返回 “结束日期” 选择范围的 时间戳
 */
const getEndDateRange = (startDate) => {
    let startTimer = 0;
    if(startDate){
        let dateChuo = new Date(startDate)*1;
        startTimer = dateChuo - 24*60*60*1000;
    }else{
        startTimer = dayjs().startOf('day').valueOf();
    }
    return startTimer;
}


// 选择的 “结束时间” 是否超出范围，是否需要清空
const clearEndTimeOrNot = (startDate,startTime,endDate,selectedEndTime)=>{
    //是否清空的标识
    let flag = false

    if(!endDate){
        //对应 endTime.value = ''
        flag = true
        ElMessage({
            message: '请先输入日期',
            type: 'warning',
        })
    }else{
        // 如果没有开始时间,则可选结束时间只与结束日期有关
        if(!startTime){
            let nowDate = dayjs().startOf('day').format('YYYY-MM-DD')
            // 如果选择的结束日期是今天
            if(new Date(endDate)*1 == new Date(nowDate)*1){
                let date = new Date()
                let nowTime = date.toString().split(" ")[4]
                
                // 选择的结束时间只能大于当前时间
                if(!compareTime(selectedEndTime,nowTime)){
                    // 对应 endTime.value = ''
                    flag = true
                    ElMessage({
                        message: '所选时间不得小于当前时间',
                        type: 'warning',
                    })
                }
            }
        }else{

            //少了一个 有开始时间 且 开始日期和结束日期是同一天的情况
            // 结束时间 只与 开始时间有关  和是否是当前没关系，只要同一天就行
            
            // 如果有开始时间,
            // 1 如果 开始日期和结束日期相同（开始时间已选-if条件1已过滤），时间要大于开始时间
            if(startDate == endDate){            
                if(!compareTime(selectedEndTime,startTime)){
                    //对应 endTime.value = ''
                    flag = true
                    ElMessage({
                        message: '所选时间不得小于开始时间',
                        type: 'warning',
                    })
                }
            }
            // 2 如果 不相同，则不需要判断————可选时间结束时间只与结束日期(当日否)有关--条件1
        }
    }
    return flag
}


// 选择的 “开始时间” 是否超出范围，是否需要清空
const clearStartTimeOrNot = (startDate,selectedStartTime,endDate,endTime)=>{
    //是否清空的标识
    let flag = false
    if(!startDate){
        // startTime.value = ''
        flag = true
        ElMessage({
            message: '请先输入日期',
            type: 'warning',
        })
    }else{
        let nowDate = dayjs().startOf('day').format('YYYY-MM-DD')
        // 如果选择的开始日期是今天
        // 选择的开始时间要比当前时间大
        // 同时，如果结束日期选择的也是今天，选择的开始时间还要比结束时间小
        if(new Date(startDate)*1 == new Date(nowDate)*1){
            let date = new Date()
            let nowTime = date.toString().split(" ")[4]
            // 选择的时间要大于当前时间
            if(!compareTime(selectedStartTime,nowTime)){
                // startTime.value = ''
                flag = true
                ElMessage({
                    message: '所选时间不得小于当前时间',
                    type: 'warning',
                })
            }
            else if(endDate){   
                // 如果结束日期选择的也是今天
                if(new Date(endDate)*1 == new Date(nowDate)*1){
                    if(endTime){
                        // 选择的时间不能大于结束时间
                        if(compareTime(selectedStartTime,endTime)){
                            // startTime.value = ''
                            flag = true
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
            if(endDate){
                if(new Date(endDate)*1 == new Date(startDate)*1){
                    if(endTime){
                        // 选择的时间不能大于结束时间
                        if(compareTime(selectedStartTime,endTime)){
                            // startTime.value = ''
                            flag = true
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
    return flag
}




export {
    getStartDateRange, 
    getEndDateRange, 
    clearEndTimeOrNot, 
    clearStartTimeOrNot
}