<template>
    <div class="content-box">
        <div class="example">
          将给定的JSON中所有带“_”的key转为驼峰写法（如果“_”出现在key的开头或结尾，直接删除），并输出最终的结果        
        </div>

        <div class="handleBox">
          <textarea  v-model="inputObj" :placeholder="inputPlaceholder" @blur="returnResut">
          </textarea>
  

        
  
          <textarea disabled v-model="outputObj" :placeholder="outputPlaceholder">
          </textarea>
  
        </div>
       
        
    </div>

</template>

<script setup>

import {ref} from 'vue'

const inputObj = ref();
const outputObj = ref();

const inputPlaceholder = ref(`输入：{
        name: 'Persons List',
        total_count: 2,
        persons_list: [
          {
            person_name: 'Tom',
            _gender: '1',
            age_: 37
          },
          {
            person_name: 'Rose',
            _gender: '0',
            age_: 18
          }
        ]
      }`)
    
const outputPlaceholder = ref(`输出：
	{
    name: 'Persons List',
    totalCount: 2,
    personsList: [
      {
        personName: 'Tom',
        gender: '1',
        age: 37
      },
      {
        personName: 'Rose',
        gender: '0',
        age: 18
      }
    ]
  }`)



const returnResut=()=>{
  if(inputObj.value){

    try{
      let obj = eval('('+inputObj.value+')');
      loopBody(obj)
      outputObj.value = JSON.stringify(obj,null,'\t')

    }catch(e){
      outputObj.value = '请输入正确的格式！！！！'
    }
    
  }else{
    outputObj.value = ''
  }
}


//判断'_'的个数，并依次转换
const transformToUpcase=(arrList)=>{
  let targetIndex = arrList.indexOf('_');
  let lastIndex = arrList.lastIndexOf('_');
  let len = arrList.length-1
  if(targetIndex !== -1){
    if(targetIndex == 0){
      arrList.shift()
    }else if(targetIndex == len){
      arrList.pop()
    }else{
    arrList[targetIndex+1] = arrList[targetIndex+1].toUpperCase()
    arrList.splice(targetIndex,1)  
    }
    //有多个 '_'
    if(targetIndex !== lastIndex){
      //继续处理
      return transformToUpcase(arrList)
    }else{
      //最后的处理结果
      let result = arrList.join('')
      return result
    }
  }else{
    return ''
  }
}


const loopBody = function(obj){

  Object.keys(obj).forEach((item)=>{    
    
    //临时存储变量--代表当前值的最终修改结果
    let current = item
    let strItem = Array.from(item)

    let result = transformToUpcase(strItem)
    if(result){
      current = result
      obj[result] = obj[item]
      delete obj[item]
    }
		
    // console.log('类型是否正确',typeof(obj[current]))
    
    if(typeof(obj[current])=='object'){
      //递归函数
      loopBody(obj[current])
    }
  })
}

</script>

<style lang="scss" scoped>


.content-box{
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;
        
    .example{
        padding: 10px;
        color:red
    } 

    
    .handleBox{
        flex-grow: 1;
        position:relative;

        display:flex;
        flex-direction: row;
        justify-content: center;
        textarea{
            flex: 1 1 100px ;
            resize:none;
            margin-left: 10px;
        }
    }


}


// .handleBox{
//   display:flex;
//   flex-direction: row;
//   justify-content: center;
//   textarea{
//     margin-left: 10px;
//   }
// }

// .example{
//   margin: 10px;
//   color:red

// }

</style>