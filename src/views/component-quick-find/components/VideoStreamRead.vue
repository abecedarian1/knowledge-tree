<template>
    <div class="playBox">
        <div class="videoStream">
            <p>通过视频流的形式分段获取<button @click="getVideo">获取视频</button>  </p>
            <video ref="videoElement" controls>
                你的浏览器不支持HTML视频
            </video>
        </div>
        <div class="videoUrl">
            <p>直接通过链接地址获取</p>
            <video controls>
                <source :src="flowerVideoSrc"  type="video/mp4">
                <source :src="flowerVideoSrc"  type="video/webm">            
                你的浏览器不支持HTML视频
            </video> 
        </div>
    </div>
</template>

<script setup>
import {ref} from "vue"
const flowerVideoSrc = ref("/demoviedo/media/cc0-videos/flower.webm")
const videoElement=ref()


const getVideo = () =>{    
    // MediaSource API 允许我们通过 JavaScript 动态创建媒体流，并将它们附加到 HTML5 <video> 元素中。
    const mediaSource = new MediaSource();   // 初始化 MediaSource
    //设置video路径地址
    videoElement.value.src = URL.createObjectURL(mediaSource);

    mediaSource.addEventListener('sourceopen', async () => {
        //视频数据缓存区
        let sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8, vorbis"');

        try{
            const response = await fetch(flowerVideoSrc.value);
            //response.body 返回的是ReadableStream对象
            const reader = response.body.getReader();

            const readStream = async () => {
                const { done, value } = await reader.read();
                if (done) {
                    // 通知媒体流结束
                    mediaSource.endOfStream();
                    return;
                }
                // 追加数据到缓冲区中')
                sourceBuffer.appendBuffer(value);
            };
            //递归读取--上一次数据追加完成后,进行下一次读取和追加
            sourceBuffer.addEventListener('updateend', () => {
                readStream();
            });
            //开始读取数据流
            readStream();
             // 让视频自动播放
             videoElement.value.play();
        }catch(err){
            console.log('请求出错',err)
        }
    });
}

</script>

<style scoped>
    .playBox{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .videoStream,
    .videoUrl{
        flex: 1 1 300px;


    }
    video{
        width: 100%;
    }

</style>