<template>
    <div>
        <button ref="button" @click="startGenerateData">开始产生数据</button>
        <button ref="button" @click="stopGenerateData">停止产生数据</button>
        <div class="generateBody" >
            <div class="input">
                <h2>Custom stream input</h2>
                <ul ref="list1"></ul>
            </div>
            <div class="output">
                <h2>Reading custom stream</h2>
                <ul ref="list2"></ul>
            </div>
        </div>
        <hr>
        <h2>最终结果</h2>
        <p ref="finalResult"></p>    
    </div>
</template>

<script setup>
import {onMounted,ref,defineProps,watch} from "vue"
const props  = defineProps(['loaded'])
const list1 = ref()
const list2 = ref()
const finalResult = ref()
const button = ref()
const interval = ref()
const result = ref("");
//自定义的可读流对象
const stream = ref()

let reader ;

//生成8位的随机字符串
const randomChars = ()=>{
    let string = "";
    let choices = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    for (let i = 0; i < 8; i++) {
      string += choices.charAt(Math.floor(Math.random() * choices.length));
    }
    return string;
}

const startGenerateData=()=>{
    //自定义可读流对象
    stream.value = new ReadableStream({
        //执行new操作时立即调用该函数
        start(controller) {
            interval.value = setInterval(() => {
                let string = randomChars();
                // 添加字符串到流
                controller.enqueue(string);
                // 显示在屏幕上
                let listItem = document.createElement("li");
                listItem.textContent = string;
                list1.value.appendChild(listItem);
            }, 1000);
        },
        pull(controller) {
            //此处不需要该函数
        },
        cancel() {
            clearInterval(interval.value);
        },
    });

    // 生成数据的同时开始读取数据
    reader = stream.value.getReader()
    readStream()
}

// 递归读取数据，每次读取后更新界面。
const readStream = () => {
    let charsReceived = 0;

    reader.read().then(function processText({ done, value }) {
      if (done) {
        console.log("数据流读取完成");
        //最终的值
        finalResult.value.textContent = result.value;
        return;
      }

      charsReceived += value.length;
      
      //每一片的值
      const chunk = value;
      let listItem = document.createElement('li');
      listItem.textContent = '累计读取' + charsReceived + '字符，当前字符 = ' + chunk;
      list2.value.appendChild(listItem);

      result.value += chunk;

      //递归读取下一部分数据
      return reader.read().then(processText);
    });
}

const stopGenerateData = () => {
    if (interval.value) {
        clearInterval(interval.value)
    }
    if (reader) {
        // 相当于 ReadableStream中的 controller.close();？？？
        reader.cancel()
    }
}

watch(
    ()=>props.loaded,
    (val)=>{
        if(!val){
            console.log('离开页面停止数据读取和生成')
            stopGenerateData()
        }
    }
)


</script>

<style scoped>
    .input,
    .output{
        border: solid pink 1px; 
        flex:1 1;   
    }

    .generateBody{
        display: flex;
        flex-direction: row;
    }
    
</style>