<template>
	
	<view class="box">
		<view class="addTool">
			<input type="text" class="add-input" @confirm="addItem" v-model=currenTask placeholder="请输入要添加的任务"/>
		</view>

		<checkbox-group class="todo-item-box" @change="checkboxChange">
			<view class="single-line-item" :class="item.hidden?'hidden':''"  v-for="(item,index) in toDoList" :key="index">
				<label class="toDoName"  :class="item.select ? 'deleteItemLine' : '' ">
					<checkbox :value="item.id" :checked="item.select" />
					<text>{{item.listName}}</text>
				</label>
				<view class="operation" >
					<text class="edit" @click="editItem(index,item)" > 编辑</text>
					<text class="delete" @click="deleteItem(index)">删除</text>
				</view>
			</view>
		</checkbox-group>
		
		
		<checkbox-group class="fixed-bar"  @change="checkAllChange">
			<view>
				<label class="sum"> 
					<checkbox value="all" :checked="selectAll" />
					已完成{{selectTotal}} /总任务{{toDoList.length}}
				</label>
				<text class="clearButton" @click="clear">清除已完成任务</text>
				<text class="hiddenButton"  @click="hidden">隐藏已完成任务</text>
			</view>
		</checkbox-group>
	
	
		<!-- 编辑盒子 -->
		<view class="overlay" v-if="openEdit">
			<view class="dialog">
				<view class="dialog-bar">
					<view class="title">编辑</view>
					<view class="top-cancel" @click="cancleEdit">X</view>
				</view>
				<view class="dialog-content">
				   <text>任务名称：</text>
					<input id="taskName" type="text" v-model="itemMessage.itemName">
				</view>
				<view class="footer">
					<text class="footer-cancel span" @click="cancleEdit">取消</text>
					<text class="confirm span" @click="confirmEdit">确定</text>
				</view>
			</view>
		</view>
	</view>
	
	
	
</template>

<script>
	export default {
		name:"PubToDoList",
		data() {
			return {
				openEdit:false,
				currenTask:'',
				toDoList:[
					{id:'0',select:false,hidden:false,listName:'任务1'},  
				],
				itemMessage:{
					index:0,
					itemName:''
				},
				selectAll:false,
				itemId:1,
				
				
			};
		},
		methods:{
			//新增
			addItem(){
				if(this.currenTask){
					this.toDoList.unshift({id:String(this.itemId++),select:false,hidden:false,listName:this.currenTask})
					this.currenTask = ''
				}
			},
			 //删除
			deleteItem(index){
				this.toDoList.splice(index,1)
			},
			//编辑
			editItem(index,item){
				this.openEdit = true
				this.itemMessage.itemName = item.listName
				this.itemMessage.index = index
			},
			//取消
			cancleEdit(){
				this.openEdit = false
			},
			//确认提交 
			confirmEdit(){
				this.toDoList[this.itemMessage.index].listName = this.itemMessage.itemName
				this.openEdit = false
			},
			 //清除
			clear(){
				if(this.toDoList.length>0){
					for(let i=this.toDoList.length-1;i>=0;i--){
						if(this.toDoList[i].select == true){
							this.toDoList.splice(i,1)
						}
					}	
				}
			},
			//隐藏
			hidden(){
				if(this.toDoList.length>0){
					this.toDoList.forEach((item,index)=>{
						if(item.select == true){
							item.hidden = true
						}
					})
				}
			},
			
			//uni-app的checkBox 需要通过 @change 手动更新“绑定变量”的选中状态————否则数据是否更新监听不到
			//——目前还没有发现其他方法
			checkboxChange(e){
				let selectValues = e.detail.value,
					toDoList = this.toDoList
				for(let i=0;i<toDoList.length;i++){
					let item = toDoList[i]
					if(selectValues.includes(item.id)){
						//  小程序不起作用
						//法一
						// this.$set(item,'select',true)
						//法二
						this.toDoList[i].select = true
					}else{
						this.toDoList[i].select = false
					}
				}
			},
			//手动更新“绑定变量”的选中状态 this.selectAll
			checkAllChange(e){
				let selectValues = e.detail.value
				if(selectValues.includes('all')){
					this.selectAll = true
					this.toDoList.forEach((item)=>{
						// this.$set(item,'select',true)
						item.select = true
					})
				}else{
					this.selectAll = false
					this.toDoList.forEach((item)=>{
						// this.$set(item,'select',false)
						item.select = false
					})
				}
			}
		},
		
		computed:{
			selectTotal(){
				let total = 0
				let len = this.toDoList.length
				this.toDoList.forEach(item => {
					if(item.select){
						total+=1
					}
				});
				return total
			},
		},
		
		watch:{
			//修改selectAll 对照 checkAllChange()
			toDoList:{
				handler(newVal,old){
					let flag = false
					if(newVal.length>0){ 
						 //只要有没有选中的item, 勾选全部的框就不会checked
						for(let item of newVal){
							if(item.select ==  false){
								flag = false
								break;
							}else{
								flag = true
							}
						}
					}else{  //全部清除完毕之后，取消勾选框
						flag = false
					}
					this.selectAll = flag
				},
				deep:true
			}
		}
	}
</script>

<style lang="scss">
	
	.box{
	    position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	    width: 100%;
	    height: 100%;
	    background-color: rgb(235, 242, 247,0.6);
	    font-size: 22px;
	}
		
		
	.addTool{
		font-size: 22px;
		padding-top: 10px;
		
		.add-input{
			background-color: white;
			border: solid 1px;
			box-sizing: border-box;
			margin:0 5%;
			width:90%;
			font-size: 44rpx;
		}
	}
	

	
	//任务列表盒子
	.todo-item-box{
		position: relative;
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		overflow: auto;
		//不显示滚动条
		&::-webkit-scrollbar{
			display: none;
		}
		.single-line-item{
			padding: 10px;
			font-size: 44rpx;
			border-bottom:solid rgb(142,159,170,0.2) 1px ;
			.operation{
				display: none;
				.edit,
				.delete{
					margin: 0 10px;
				}
			}
			
			&:hover {
				background-color: rgb(184, 170, 180,0.2);
				display: block;
				border-bottom: none;
				.operation{
						display: block;
				}
			}
			.toDoName{
				float: left;
			}
			.deleteItemLine{
				text-decoration: line-through;
			}
			
		}
		.hidden{
			display: none;
		}
	}

	
	//固定底栏
	.fixed-bar{
		position: relative;
		box-sizing: border-box;
		width: 100%;
		padding: 10px;
		font-size: 44rpx;
		background-color: rgb(142, 159, 170,0.4);
		
		.sum{
			float: left;
		}
	}
	
	
	.operation,
	.clearButton,
	.hiddenButton{
		float: right;
		margin:0 10px;
		&:hover{
			cursor: pointer;
		}
	}
	

	
	
	//弹窗
	.overlay{
		position: fixed;
		display: flex;
		flex-direction: column;
		align-items: center;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgb(117, 115, 115,0.4);
		z-index: 100;

		.dialog{
			position: relative;
			width:700rpx;
			height: 350rpx;
			top:300rpx;
			background-color:white;
			font-size: 36rpx;
			
			.dialog-bar{
				display:flow-root;
				background-color: rgb(186, 211, 225);
				.title{
					position: relative;
					float: left;
					margin: 15rpx;
				}
				.top-cancel{
					float: right;
					margin: 15rpx;
					color: rgb(65, 61, 61);
					&:hover{
						cursor: pointer;
					}
				}
			}
			
			.dialog-content{
				position: relative;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				width: 100%;
				padding: 40rpx 0;
				input{
					position: relative;
					width:50%;
					height: 50rpx;
					border: solid 1px;
					padding:0 10rpx;
					font-size: 36rpx;
				}
			}
			.footer{
				position: absolute;
				bottom: 0;
				display: flex;
				flex-direction: row;
				justify-content: flex-end;
				width: 100%;
				.span{
					margin: 20rpx;
					border: solid rgb(186, 211, 225) 1px;
					
					padding: 10rpx;
					box-sizing: content-box;
				}
				.footer-cancel{
					background-color: rgb(184, 170, 180,0.3);
					&:hover{
						background-color: rgb(167, 192, 224,0.4);
					}
				}
				.confirm{
					color: white;
					background-color: rgb(167, 192, 224);
					&:hover{
						background-color: rgb(186, 211, 225);
					}
				}
			}
		}
	}

</style>