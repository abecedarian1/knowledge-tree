<template>
	<view class="main">
		<view class="bar"></view>
		<view class="main-body">
			<slot>主体内容</slot>
		</view>
		<view class="bottom">
			<p class="copyright">
				版权信息：Copyright&copy;2024
				<br>
				联系邮箱：1584968548@qq.com
			</p>
		</view>
	</view>
</template>

<script>
	export default {
		name:"CommonBar",
		data() {
			return {
			}
		},
		mounted(){
		},
		
	
	}
</script>

<style lang='scss'>

@import "../../static/css/common-bar.scss";

</style>
