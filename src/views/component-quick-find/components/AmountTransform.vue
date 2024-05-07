<template>
    <div class="box">
        <input type="text" v-model="inputNum" placeholder="输入的数字" @blur="numTransform()">
        <input type="text" v-model="resultNum" placeholder="返回的值">
    </div>   
</template>


<script setup>
import {ref} from 'vue'

const inputNum=ref('')
const resultNum=ref('')
const numTransform=()=>{
    if(inputNum.value){
        //是数字
        if(/^[1-9][0-9]*[.]?[0-9]*$/.test(inputNum.value)){
            let intPartArr =  Array.from(inputNum.value.split('.')[0])
            let dotPart = inputNum.value.split('.')[1]

            if(intPartArr.length>3){
                let len = intPartArr.length-1
                let flag = 1
                for(let i=len;i>=0;i--){
                    if(flag % 3 == 0 & i!=0){
                        intPartArr.splice(i,0,',')
                    }
                    flag++
                }                
            }
            let intParStr = intPartArr.join('')
            if(dotPart){
                resultNum.value =intParStr+'.'+dotPart
            }else{
                resultNum.value =intParStr
            }
        }else{
            //不是数字
            resultNum.value = '0'
            inputNum.value = '0'
        }
    }else{
        inputNum.value = ''
        resultNum.value = ''
    }
}
</script>

<style lang="scss">
    .box{
        padding: 10px;
        input{
            height: 25px;
            font-size: 20px;
        }
    }
</style>
