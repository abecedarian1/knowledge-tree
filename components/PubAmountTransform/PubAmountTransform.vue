<template>
	<view class="box">
		<view class="single-line">
			<text>转换的数字：</text>
			<input type="text" v-model="inputNum" placeholder="输入的数字" @blur="numTransform()">
		</view>
		<view  class="single-line">
			<text>千分位结果：</text>
			<input type="text" v-model="resultNum" placeholder="返回的值">
		</view>

	</view>
</template>

<script>
	export default {
		name:"PubAmountTransform",
		data() {
			return {
				inputNum:'0',
				resultNum:'0',
			};
		},
		methods:{
			numTransform(){
			    if(this.inputNum){
			        //是数字
			        if(/^[1-9][0-9]*[.]?[0-9]*$/.test(this.inputNum)){
			            let intPartArr =  Array.from(this.inputNum.split('.')[0])
			            let dotPart = this.inputNum.split('.')[1]
			
			            if(intPartArr.length>3){
			                let len = intPartArr.length-1
			                let flag = 1
			                for(let i=len;i>=0;i--){
			                    if(flag % 3 == 0 & i!=0){
			                        intPartArr.splice(i,0,',')
			                    }
			                    flag++
			                }                
			            }
			            let intParStr = intPartArr.join('')
			            if(dotPart){
			                this.resultNum =intParStr+'.'+dotPart
			            }else{
			                this.resultNum =intParStr
			            }
			        
			        }else{
			            //不是数字
			            this.resultNum = '0'
			            this.inputNum = '0'
			        }
			    }else{
					this.inputNum = ''
					this.resultNum = ''
				}
			}
		}
	}
</script>

<style lang="scss">
	  .box{
			position: relative;
			.single-line{
				display: flex;
				flex-direction: row;
				margin: 20rpx;
				font-size: 30rpx;
				text{
					position: relative;
					display: inline-block;
					width: 250rpx;
					text-align: right;
					padding: 10rpx;
				}
				input{
					flex-grow: 1;
					border: solid 1px;
					display: inline-block;
				    font-size: 30rpx;
					padding:10rpx;
				}
			}
	    }
</style>