<template>
	<view>
		<ModelCategoryShow>
			<template #title>
				{{titleName}}
			</template>
			
			<template #optionBar>
				
				<!--  此处跳转要全部关闭 因为页面跳转层数有限制 -->
				<navigator
					v-for="(item,index) in sideBarList"
					:key="index"
					open-type="reLaunch"
					:url="'/components/ModelCategoryShow/ModelCategoryShow?'+item.url.split('?')[1]" 
					:class="item.id == branchId ? 'active' : 'deactive'" 
					class="left-nav"
				>
					{{item.name}}
				</navigator>
				
			</template>
		
			<template #barContent>
								
				<view class="modelTitle">{{modelTitle}}</view>
				<!-- 详细内容展示区 -->
				<view v-if="id">
					<text class="contentTitle">{{contentTitle}}</text>
					<view  class="content" v-html="detailContent"></view>
				</view>
				<!-- 内容列表展示区 -->
				<view v-else>
					<navigator
						:url="'/pages/web-front/detail-content/ContentList?'+item.url.split('?')[1]"
						class="right-nav" 
						v-for="(item,index) in contentList" 
						:key="index"
					>
						{{(Number(index)+1)+'. '+item.name}}
					</navigator>
				</view>
				
			</template>
		</ModelCategoryShow>
	</view>
</template>

<script>
	
	export default{
		name:'ContentList',
		data() {
			return {
				contentList:[],
				titleName:'',
				modelTitle:'',
				sideBarList:[],
				// 文本内容唯一id
				id:'',
				detailContent:'',
				contentTitle:'',
				branchId:'',
			}
		},
		
		onLoad(option){
			
			let baseURL = getApp().globalData.baseURL
			let	{mainId ,branchId,branchRightId,id} = {...option}
			let parentUrl = ''
			
			this.id = id
			this.branchId = branchId
			
			uni.request({
			    url: baseURL+'/getKnowledgeCategory?id='+mainId, 
			    success: (res) => {
					// console.log('当前路由下的内容',res)
				    this.titleName = res.data[0].name
					
					// 主体模块  -----  url值 是自己重新改写的,和原有版不一样  v1.1 (原始版 是v1.0)
					uni.request({
						url: baseURL+'/modelList?parentId='+mainId,
						success: (res) => {
							let list  = res.data
							list.forEach(item => {
								item.url = '/'+item.url+'?mainId='+mainId+'&branchId='+item.id
							});
							// console.log('list----[]',list)
							this.sideBarList = Object.assign({},list)  
						}
					})
					
				}
			})
			
			
			
			
			uni.request({
				url:baseURL+'/modelBranchList?id='+branchRightId,
				success:(res)=>{
					parentUrl = res.data[0].url
					
					this.modelTitle = res.data[0].name
					
					//获取当前路由信息   
					uni.request({
						url:baseURL+'/contentList?parentId='+branchRightId,
						success:(res)=>{
							let list = []
							if(res.data){
								list = res.data
							}
							list.forEach(item => {
								item.url = parentUrl + '/'+ item.url + '?mainId='+mainId+'&branchId='+branchId+'&branchRightId='+branchRightId+'&id='+ item.id          
							});
							this.contentList = Object.assign({},list)
						}
					})
				}
			})
	
		
			if(id){
				uni.request({
					url:baseURL+'/content?id='+id,
					success:(res)=>{
						this.detailContent = res.data.content
					}
				})
				uni.request({
					url:baseURL+'/contentList?id='+id,
					success:(res)=>{
						// console.log('res==+++++===',res.data[0].name)
										
						this.contentTitle = res.data[0].name
					}
				})
			}
		},
		mounted(){
			
		}
	}
</script>

<style lang="scss">


@import "../../../static/css/content-list.scss"
	
</style>