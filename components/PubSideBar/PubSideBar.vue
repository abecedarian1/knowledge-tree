<template>
	<view style="position: relative;height: 100%;">
	        <view class="nav-bar expand"  v-if="expandOrNot">
				<view class="check-button" 
						:class="selectItem == item ? 'select' : '' "
						@click="$emit('changeItem',item)"
						v-for="(item,index) in navList" :key="index"
					>
						{{item}}
				</view>
				<!-- 适配小程序 -->
	            <text @click="$emit('changeStatus','close')" class="control-flag">{{'<'}}</text>
	        </view>
	        <view class="nav-bar shrink"  v-else>
				<text @click="$emit('changeStatus','close')" class="control-flag">&gt;</text>
			</view> 
	        <slot>操作控件</slot>
	</view>
</template>

<script>
	export default {
		name:"PubSideBar",
		data() {
			return {
			};
		},
		props:[
			'expandOrNot',
			'navList',
			'selectItem', 
			'firstLoad',
		],
		emits:[
			'changeStatus',
			'changeItem',
		],
		mounted() {
			//如果初次打开，导航栏默认是展开状态：发送事件获取数据
			if(this.expandOrNot){
				this.$emit('changeStatus','open')
			}
		}
	}
</script>

<style lang="scss">
  .nav-bar{
		position: relative;
		height: 100%;
		box-shadow: rgb(169,169,174,0.5) 15rpx 0 10rpx;
		background-color: aquamarine;
		
		.control-flag{
			position: absolute;
			width: 60rpx;
			height: 200rpx;
			line-height: 200rpx;
			color: white;
			font-size: 48rpx;
			background-color: #a1a99e;
			top: calc(50% - 100rpx);
			right: -40rpx;
			text-align: center;
		}
	}
	
	.expand{
		width: 150rpx;
		.check-button{
			text-align: center;
			&:hover{
				background-color: rgb(169,169,174,0.5)
			}	
		}
		.select{
			background-color: red;
		}
	}
	
	
	.shrink{
		width: 40rpx;
	}
</style>