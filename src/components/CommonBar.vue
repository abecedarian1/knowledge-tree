<template>

    <div class="main">
        <div class="bar"></div>
        <div>
            <router-view></router-view>
        </div>
      
        <div class="bottom">
            <p class="copyright">
                版权信息：Copyright&copy;2021
                <br>
                联系邮箱：1584968548@qq.com
            </p>
        </div>
    </div>
    

</template>



<script lang="ts">
</script>


<style scoped>
  
    .main{
        position: relative;
        /* width:1200px; */
        width:95%;
        margin:0 auto;
    }

    

    .bar{
        width:100%;
        height:28px;
        background-color:#596370;
    }
  
    .bottom{
        width:100%;
        height:10%;
        height:70px;
        background-color:#292e34;
        position:absolute;
    }

    .copyright{
        color:white;
        font-family:楷体;
        text-align:center;
    }
  
</style>
