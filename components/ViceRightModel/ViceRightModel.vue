<template>
	 <view v-if="modelList.length>0" class="right-model">
		<navigator class="model"  
			v-for="(item,index) in modelList"
			:key="index"
			:url="'/pages/web-front/detail-content/ContentList?'+item.url.split('?')[1]"
		>
			{{item.name}}
		</navigator>
	</view>
</template>

<script>
	export default {
		name:"ViceRightModel",
		props:['mainId','branchId'],
		
		data() {
			return {
				modelList:[],
			};
		},
		mounted(){
			let baseURL = getApp().globalData.baseURL
			
			if(this.mainId && this.branchId){
				let parentUrl = ''
				// 获取上级路由信息
				uni.request({
					url:baseURL+'/modelList?id='+this.branchId,
					success: (res) => {
						
						parentUrl = res.data[0].url
						//获取当前路由信息
						uni.request({
							url:baseURL+'/modelBranchList?parentId='+this.branchId,
							success:(res)=>{
								let list = res.data
								if(list.length>0){
									list.forEach(item => {
										item.url = parentUrl+'/'+item.url+'?mainId='+this.mainId+'&branchId='+this.branchId+'&branchRightId='+item.id
									});
									Object.assign(this.modelList,list)
									
								}else{
									this.modelList.length = 0
								}  
							}
						})
					}
				})
			}
		},
		created(){
			
		}
	}
</script>

<style lang="scss">
.right-model{
	position: relative;
	display: flex;
	flex-wrap: wrap;
		
	// 下面两个合并为了兼容 app和小程序 ————
	.navigator-wrap{  //app起作用，小程序不起  --小程序好像没有这个class名
		flex: 1 1 29%;
	}
	.model{  //小程序起作用--APP不起
		flex: 1 1 29%;
		height: 270rpx;
		margin: 10rpx;
		text-align: center;
		line-height: 270rpx;
		background-color: powderblue;
	}
	
}

</style>