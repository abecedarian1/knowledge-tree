<template>
	<view class="container">
		<view class="example">
		  将给定的JSON中所有带“_”的key转为驼峰写法（如果“_”出现在key的开头或结尾，直接删除），并输出最终的结果        
		</view>

		<view class="handleBox">
		  <textarea maxlength="-1" v-model="inputObj" 
					:placeholder="inputPlaceholder" 
					@blur="returnResut">
		  </textarea>
		  
		  <textarea maxlength="-1" disabled v-model="outputObj"  
					:placeholder="outputPlaceholder">
		  </textarea>
  
		</view>
	</view>
</template>

<script>
	export default {
		name:"PubDeepCopy",
		data() {
			return {
				inputObj:'',
				outputObj:'',
				inputPlaceholder:`输入：{
					name: 'Persons List',
					total_count: 2,
					persons_list: [
					  {
						person_name: 'Tom',
						_gender: '1',
						age_: 37
					  },
					  {
						person_name: 'Rose',
						_gender: '0',
						age_: 18
					  }
					]
				 }`,
			    outputPlaceholder:`输出：{
					name: 'Persons List',
					totalCount: 2,
					personsList: [
					  {
						personName: 'Tom',
						gender: '1',
						age: 37
					  },
					  {
						personName: 'Rose',
						gender: '0',
						age: 18
					  }
					]
				}`,
			};
		},
		methods:{
			
			returnResut(){
			  if(this.inputObj){
				  try{
				   let obj = eval('('+this.inputObj+')');
				   this.loopBody(obj)
				   this.outputObj = JSON.stringify(obj,null,'\t')
				  }catch(e){
					this.outputObj = '请输入正确的格式！！！！'
				  }
			  }else{
			    this.outputObj = ''
			  }
			},
			
			//判断'_'的个数，并依次转换
			transformToUpcase(arrList){
				let targetIndex = arrList.indexOf('_');
				let lastIndex = arrList.lastIndexOf('_');
				let len = arrList.length-1
				if(targetIndex !== -1){
				  if(targetIndex == 0){
					  arrList.shift()
				  }else if(targetIndex == len){
					  arrList.pop()
				  }else{
					arrList[targetIndex+1] = arrList[targetIndex+1].toUpperCase()
					arrList.splice(targetIndex,1)  
				  }
				  //有多个 '_'
				  if(targetIndex !== lastIndex){
					  //继续处理
					  return this.transformToUpcase(arrList)
				  }else{
					  //最后的处理结果
					  let result = arrList.join('')
					  return result
				  }
				}else{
					return ''
				}
			},
			
			//处理数据内容
			loopBody(obj){
				Object.keys(obj).forEach((item)=>{ 
					//临时存储变量--代表当前值的最终修改结果
					let current = item
					let strItem = Array.from(item)
					let result = this.transformToUpcase(strItem)
					if(result){
						current = result
						obj[result] = obj[item]
						delete obj[item]
					}
					// console.log('类型是否正确',typeof(obj[current]))
					if(typeof(obj[current])=='object'){
					  //递归函数
					  this.loopBody(obj[current])
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	
	.container{
		position: relative;
		display: flex;
		flex-direction: column;
		height: 100%;
		box-sizing: border-box;
		
		.example{
			margin: 10rpx;
			color:rgb(219,112,85);
		}
		.handleBox{
			flex-grow: 1;
			position: relative;
			box-sizing: border-box;
			border: solid rgb(219,188,148) 1px;
			overflow: auto;
			&::-webkit-scrollbar{
				display: none;
			}
			display:flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: center;
			
			textarea{
				position: relative;
				flex: 1 1 750rpx;
				box-sizing: border-box;
				height: 100%;
				border: solid rgb(219,188,148) 1px;
				padding:10rpx;
				&:nth-child(2){
					background-color: rgb(219,188,148,0.2);
				}
			}
		}
	}

</style>