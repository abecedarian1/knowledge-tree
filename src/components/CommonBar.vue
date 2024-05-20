<template>

    <div class="box11">
        <div class="bar"></div>
        <div class="">
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


<style lang="scss" scoped>
  @import "../assets/css/vue.scss";

    .box{
        position: relative;
        width:95%;
        margin:0 auto;
    }

    .bar{
        width:100%;
        height: $topBarHeight;
        background-color:#596370;
    }
  
    .bottom{
        width:100%;
        height:$footerHeight;
        background-color:#292e34;

        display: flex;
        flex-direction: column;

        .copyright{
            color:white;
            font-family:楷体;
            text-align:center;
        }
    }

   
  
</style>
