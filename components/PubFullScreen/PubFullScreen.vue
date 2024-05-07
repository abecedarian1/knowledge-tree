<template>
	<view class="parent">
		<view class="full-screen">
			<cover-view :class="exitOrFull=='退出全屏' ? 'full-demo' : '' ">
				<button class="button" @click="openFullScreen">{{exitOrFull}}</button>
				<cover-view class="cover-view">全屏模式下的内容</cover-view>
			</cover-view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"PubFullScreen",
		data() {
			return {
				exitOrFull:'全屏',
			};
		},
		methods:{
			openFullScreen(){
				if(this.exitOrFull=='全屏'){
				        this.exitOrFull = '退出全屏'
				    }else{
				        this.exitOrFull = '全屏'
				    }
			}
		}
	}
</script>

<style lang="scss">

 .parent{
	position: relative;
	height: 100%;
	background-color: rgb(233, 207, 207);
	.full-screen{
	    position: relative;
	    height: 50%;
	    background-color: salmon;
	    font-size: 30rpx;
		
		
		uni-button{
			width: 300rpx !important;
			font-size: 40rpx !important;
		}
		
		.full-demo{
			position: fixed;
			width: 100%;
			height: 100%;
			top:0;
			left:0;
			z-index: 1000;
			background-color: salmon;
		}
		.cover-view{
			position: relative;
			margin-top: 10px;
			text-align: center;
			font-size: 38rpx;
		}
	}
}


</style>