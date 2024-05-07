<template>
	<view>
		<CommonBar>
			<view class="user_bar">
				<navigator 
					open-type="reLaunch"
					url="/pages/index/index"
				>
					回到首页
				</navigator>
				
				<text class="title">
					<slot name="title">
					{{titleName}}
					</slot>
				</text>
			</view>
			
			<view class="content">
				<view class="option_bar" >
					<slot name="optionBar">
						<navigator
							v-for="(item,index) in sideBarList"
							:key="index"
							:url="'/components/ModelCategoryShow/ModelCategoryShow?'+item.url.split('?')[1]" 
							open-type="redirect" 
							:class="item.id == branchId ? 'active' : 'deactive'" 
						>
							{{item.name}}
						</navigator>
					</slot>
				</view>
				
				<view id="test" class="box_1">
					
					<slot name="barContent">
						<ViceRightModel v-if="branchId" :mainId='mainId' :branchId='branchId'></ViceRightModel>
						
						<text v-else>请选择</text>
						
					</slot>
					
				</view>
			</view>
		</CommonBar>
		
	</view>
</template>

<script>
	export default {
		name:"ModelCategoryShow",
		
		data() {
			return {
				// 可使用窗口距离顶部的距离
				usedWindowTop:'0px',
				// 标题名称
				titleName:'',
				// 侧边栏 列表
				sideBarList:[],
				branchId:'',
				mainId:'',
			}
		},
		
		
		onLoad(option) {
			this.usedWindowTop = getApp().globalData.usedWindowTop
			let baseURL = getApp().globalData.baseURL
			
			// 从上级路由获取
			this.mainId = option.mainId
			this.branchId = option.branchId
			let parentUrl = ''
			
		
			uni.request({
			    url: baseURL+'/getKnowledgeCategory?id='+this.mainId, 
			    success: (res) => {
					// console.log('当前路由下的内容',res)
				    this.titleName = res.data[0].name
					parentUrl = res.data[0].url
					// 当前内容列表
					uni.request({
						url: baseURL+'/modelList?parentId='+this.mainId,
						success: (res) => {
							let list  = res.data
							list.forEach(item => {
								item.url = '/'+parentUrl+'/'+item.url+'?mainId='+this.mainId+'&branchId='+item.id
							});
							
							// console.log('list',list)
							Object.assign(this.sideBarList,list)
							
						}
					})
			    }
			});
		},
		
		methods:{
		}
		
		
	}
</script>

<style lang="scss">

@import "../../static/css/web-front.scss";

$usedWindowTop:v-bind(usedWindowTop);

.content{
	min-height: calc(100vh - $userBarHeight - $topBarHeight - $footerHeight - $usedWindowTop);
}



</style>