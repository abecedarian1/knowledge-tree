<template>
	 <view>
		 <CommonBar>
			   <view class="">
			     <view class="banner">
			         <view class="tittle_bg"> </view>
			         <view class="tittle">线上个人笔记</view>
			
			         <view class="search">
			             <view style="width: 85%;position: relative;">
   							 <input  class="search_content" placeholder="请输入你想查找的内容">
							 <button class="search_button">搜索</button>
			             </view>
			       </view>
			     </view>
			 
			     <view class="content" v-if="categroyList.length>0">
				 
					<view v-for="(item,index) in categroyList" :key="index" >
						
						<!-- //公共组件 -->
						<!-- tabarPage -->
						<navigator v-if="index==9"
							class="navigator-item" 
							url="/pages/component-quick-find/ComponentQuickFind">
							{{item.name}}
						</navigator>
						
						<navigator  v-else
							class="navigator-item" 
							:url="'/components/ModelCategoryShow/ModelCategoryShow?mainId='+item.id">
							{{item.name}}
						</navigator>
						
					</view>
					
					
			     </view>

			   </view>
			 
		 </CommonBar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				// 可使用窗口距离顶部的距离
				usedWindowTop:'0px',
				categroyList: [],
				
			}
		},
		
		onLoad() {
			
			this.usedWindowTop = getApp().globalData.usedWindowTop
						
			let baseURL = getApp().globalData.baseURL
			uni.request({
			    url: baseURL+'/getKnowledgeCategory', 
			    success: (res) => {
			        // console.log('返回的数据信息',res.data);
					let list = res.data
					list.forEach(item => {
						item.url = item.url+"?mainId="+item.id
					});
					Object.assign(this.categroyList,list)
			    }
			});
		},	
		
		onShow(){
			
		},
		
		
		methods: {

		},
		
		computed:{
			
		}
	}
</script>

<style lang='scss'>
$usedWindowTop:v-bind(usedWindowTop);

@import "../../static/css/home-view.scss";
	

.content{
  // 设定一个最小高度
  min-height: calc(100vh - $topBarHeight - $bannerHeight - $footerHeight - $usedWindowTop);
  
  .navigator-wrap,  
  .navigator-item
  {
	  text-align: center;
	  height:400rpx;
	  // 要添加一个最小高度
	  min-height: calc((100vh - $topBarHeight - $bannerHeight - $footerHeight - $usedWindowTop) * 0.3);
	  line-height: 400rpx;
  }
  
}
	
</style>
