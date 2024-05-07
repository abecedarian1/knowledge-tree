<template>
	<view>
		<CommonBar>
			<view class="user_bar">
				<navigator 
					open-type="reLaunch"
					url="/pages/index/index"
				>回到首页</navigator>
				<text class="title">
					封装组件
				</text>
			</view>
			<view class="content">
				<view class="tab_bar" >
					<view 
						v-for="(item) in tabList"  :key="item.id"
						:class="selectTabIndex==item.id ? 'active' : ''" 
						@click="selectTab(item.id)" 
					>
						{{item.name}}
					</view>
				</view>
				<view id="test" class="tab_content">
					<PubTimeSelectLimit v-if="selectTabIndex==0"></PubTimeSelectLimit>
					<PubToDoList v-else-if="selectTabIndex==1"></PubToDoList>
					
					<PubSideBar  
						v-else-if="selectTabIndex==2" 
						@changeStatus="changeStatus"
						@changeItem="changeItem"
						:expandOrNot="expandOrNot"
						:selectItem="selectItem"
						:navList="navList"
						:firstLoad="firstLoad"
						 ref="sideBarRef">
						 <view class="contorl-btn">
							 <view>
								<switch 
								@change="changeStatus"
								:checked="expandOrNot"
								 style="transform:scale(0.8)"
								 color="#b0e0e6"/> 
							 </view>
							 
							 <view class="nav-position">
								 <text class="title">导航定位:</text>
								 <input class="nav-name" id="index" type="number" v-model="selectItem">
							 </view>
						 </view>
					</PubSideBar>
					
					<PubDiagram v-else-if="selectTabIndex==3"></PubDiagram>
					<PubDeepCopy v-else-if="selectTabIndex==4"></PubDeepCopy>
					<PubFullScreen v-else-if="selectTabIndex==5"></PubFullScreen>
					<PubCanvasAnimation v-else-if="selectTabIndex==6"></PubCanvasAnimation>
					<PubAmountTransform v-else-if="selectTabIndex==7"></PubAmountTransform>
				</view>
			</view>
		</CommonBar>
	</view>
</template>

<script>
	export default{
		name:'ComponentQuickFind',
		data() {
			return {
				// 可使用窗口距离顶部的距离
				usedWindowTop:'0px',
				active:'2',
				tabList:[
					{id:0,name:'时间选择器'},
					{id:1,name:'ToDoList'},
					{id:2,name:'导航栏'},
					{id:3,name:'图表'},
					{id:4,name:'深度遍历'},
					{id:5,name:'全屏'},
					{id:6,name:'canvas小动画'},
					{id:7,name:'金额格式化(千分位)'},
					{id:8,name:'可拖拽移动框(new)'},
				],
				selectTabIndex:'0',
				
				/*
				//SideBar组件的内容：
				*/
				expandOrNot:false,  
				firstLoad:true,   //组件封装的时候这个怎么让它默认值不允许修改
				navList:[],   
				selectItem:null, 
				
				
			}
		},
		methods:{
			//选择组件Tab
			selectTab(index){
				this.selectTabIndex = index
			},
			
			/*
			*SideBar相关内容
			* */
			//生成随机导航数组  并排序 去重
			getRandomDataList(){
			    console.log('初次打开导航时调用')
			    let list = []
			    for(let i=0;i<9;i++){
			        let item = Math.floor(Math.random()*10) 
			        list.push(item)
			    }
			    let len = list.length
			    // 排序
			    for(let i=0;i<len;i++){
			        for(let j=0;j<len-i;j++){
			            if(list[j]>list[j+1]){
			                let tmp = list[j]
			                list[j] = list[j+1]
			                list[j+1] = tmp
			            }
			        }
			    }
			    //去重
			    for(let i=len-1;i>=0;i--){
			        if(list[i]==list[i-1]){
			            list.splice(i,1)
			        }
			    }
			    this.navList = [...list]
			},
			
			//修改SideBar导航栏的展开/收缩状态
			changeStatus(...args){
				//默认是打开状态的时候
				if(args[0]=='open'){
					if( this.expandOrNot && this.firstLoad){
					    this.getRandomDataList();
						this.firstLoad = false
					}
				
				//默认是关闭状态的时候
				}else{
					//目前没啥用
					// console.log('子组件内容',this.$refs.sideBarRef)
					if( !this.expandOrNot && this.firstLoad){
					    this.getRandomDataList();
						//赋值给子组件
						this.firstLoad = false
					}
					this.expandOrNot = !this.expandOrNot
				}
			},
			//修改导航栏的选中内容
			changeItem(val){
			    this.selectItem = val
			}
		},
		onLoad(option){
			this.usedWindowTop = getApp().globalData.usedWindowTop		
		},
		mounted() {
			// console.log('父页面加载了')
		},
		
		
	}
</script>

<style lang="scss">
$usedWindowTop:v-bind(usedWindowTop);

.user_bar{
	width:100%;
	height:$userBarHeight;
	background-color:#D9B2B1;
	color:#335f5b;
	line-height: $userBarHeight;
	text-align: center;
	
	navigator {
		display: inline-block;
		float: left;
		font-size: 28rpx;
		padding-left: 15rpx;
	}
	.title {
		text-align: center;
		font-size:40rpx;
		font-weight: bolder;
	}
}
	
.content{
	position: relative;
	display: flex;
	flex-direction: row;
	width:100%;
	background-color:white;
	min-height: calc(100vh - $userBarHeight - $topBarHeight - $footerHeight - $usedWindowTop); 
	max-height: calc(100vh - $userBarHeight - $topBarHeight - $footerHeight - $usedWindowTop); 
}

.tab_bar{
	width: 20%;
	font-size: 29rpx;
	text-align:center;
	background-color: rgb(234, 192, 217,0.2);
	border: solid #b8cbc9 1px;
	border-top:none;
	border-bottom:none;
	overflow: auto;
	&::-webkit-scrollbar{
		display: none;
	}
	
	&>view{
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: $sideBarItemHeight;
		color: #869593;
	}
	
	.active{
		background-color: white;
		color: #16b5f7;
		border-top: solid  #b8cbc9 1px ;
		border-bottom: solid  #b8cbc9 1px ;
		border-right:none;
	}
}
	
.tab_content{
	box-sizing: border-box;
	width: 80%;
	padding: 10rpx;
}	


// SideBar的内容
.contorl-btn{
	position: absolute;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	top:0px;
	left: 175rpx;
	
	.nav-position{
		// border: solid yellowgreen 1px;
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		
		.title{
			// border: solid red 1px;
			position: relative;
			font-size: 30rpx;
			width: 40%;
			
		}
		// uni-input,
		.nav-name{
			position: relative;
			// height: 50%;
			width: 55%;
			display: inline-block;
			font-size: 30rpx;
			border: solid 1px;
		}
	}
}

</style>