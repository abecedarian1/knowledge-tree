<template>
    <div>
        <!-- 重连功能还需要完善 -->
        <!-- 参考链接http://www.websocket-test.com/ -->
        <!-- 输入相同的密钥，进入同一聊天界面(退出聊天，记录将不再) -->
        <!-- <button @click="openWebsocket">开始连接</button>
        <button @click="closeWebsocket">中断连接</button> -->

        <div style="margin: 10px;"class="messageBox" >
            <ul ref="messageBody" >
               
            </ul>
        </div>

        <div class="sendBox">
            <div contenteditable="true" ref="readySendMessage" class="messageInput"></div>
            <button @click="sendWebsocketMessage">发送消息</button>
        </div>
    </div>
</template>

<script setup>
import {ref,defineProps,watch} from 'vue'
const messageBody = ref()
const readySendMessage = ref('')
const props = defineProps(['loaded'])

const ws = ref()

//添加聊天记录功能
const addChatRecord = (chatRecord,person)=>{
    let date = new Date().toLocaleString()
    let listItem = document.createElement("li");

    let timtDesription = document.createElement("div")
    timtDesription.textContent = date
    timtDesription.style.color = 'blue'
    timtDesription.style.padding = '5px'
    listItem.appendChild(timtDesription)

    let detailMessage = document.createElement("div")
    detailMessage.innerHTML = chatRecord
    // 处理远程返回的文本中的点击函数
    const button = detailMessage.querySelector('.btn'); 
    try{
        button.onclick = (event) => {
            console.log('1')
        };
    }catch{}
    
    listItem.appendChild(detailMessage)
    

    if(person == 'sender'){
        listItem.style.textAlign = 'right'
        listItem.style.backgroundColor = 'rgb(174, 211, 193)'
        

    }else if(person == 'receiver'){
        listItem.style.textAlign = 'left'
        listItem.style.backgroundColor = 'rgb(241, 248, 245)'
    }

    messageBody.value.appendChild(listItem)
}

// 重新连接中
const openWebsocket = ()=>{
    ws.value.onopen()
}

// 发送消息
const sendWebsocketMessage = ()=>{
    if(readySendMessage.value.innerHTML){
        // 向聊天记录中添加一条数据
        addChatRecord(readySendMessage.value.innerHTML,'sender')
        ws.value.send(readySendMessage.value.innerHTML)
        readySendMessage.value.innerHTML = ''
    }
}

// 和中断重连不一样
// 关闭连接
const closeWebsocket = ()=>{
    ws.value.onclose()
}

watch(
    ()=>props.loaded,
    (val)=>{
        if(val){ 
            ws.value = new WebSocket('ws://124.222.224.186:8800')

            ws.value.onopen = ()=>{
                console.log('打开连接中')
            }
            ws.value.onmessage = (message)=>{
                // console.log('接收消息中')
                addChatRecord(message.data,'receiver')
            }
            ws.value.onerror = (err)=>{
                console.log('连接出错了！！')    
            }
            ws.value.onclose = () => {
                console.log('关闭连接')
            }
        }

    }
)

</script>

<style scoped lang="scss">
    .messageBox{
        display: flow-root;
        ul {
            border-bottom: solid 1px;
            :deep() {
                li{
                    padding: 10px 5px;
                }
            }
        }
    }

    .sendBox{
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        background-color: rgb(224, 219, 219);
        padding: 10px;

        .messageInput{
            box-sizing: border-box;
            width: 75%;
            max-height:200px;
            border-radius:5px;
            text-align:left;
            line-height:20px;
            padding:5px;
            overflow-y:auto;
            flex-grow: 1 1;
           
            background-color:white;

            &::-webkit-scrollbar{
                display: none;
            }
            &:focus{
                outline: none;
            }
        }

        button{
            flex-grow: 1 1;
            box-sizing: border-box;
            border-radius:5px;

            width: 25%;
            height: 30px;
            border: none;
            background-color: rgb(173, 173, 247);
        }
    }

</style>

