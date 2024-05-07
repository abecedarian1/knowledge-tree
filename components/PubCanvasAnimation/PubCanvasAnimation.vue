<template>
	<view>
		<canvas class="canvas" @click="startOrEndAnimation" type="2d" 
				style="width: 580rpx;height: 200px" canvas-id="canvas1" 
				width="600px" height="400px">
		</canvas>
	</view>
</template>

<script>
	export default {
		name:"PubCanvasAnimation",
		data() {
			return {
				tList:[0,0.2,0.4,0.6,0.8,1],
				ballColor: [
							'rgb(95, 158, 160)',
							'rgb(172, 138, 169)',
							'rgb(233, 217, 125)',
							'rgb(189, 245, 151)',
							'rgb(137, 138, 216)',
							'rgb(75, 97, 61)' 
						],
				raf:null,
			};
		},
		methods:{
			// Cubic Bezier 函数---计算贝塞尔曲线上的点的坐标值
			cubicBezier(p0, p1, p2, p3, t){
			    return Math.pow(1 - t, 3) * p0 +
			        3 * Math.pow(1 - t, 2) * t * p1 +
			        3 * (1 - t) * Math.pow(t, 2) * p2 +
			        Math.pow(t, 3) * p3;
			},
			//图像绘制
			loadingItemDraw(ctx,init){
				const start = { x: 50, y: 100 }; // 贝塞尔曲线起始点
				const control1 = { x: 110, y: 0 }; // 控制点1
				const control2 = { x: 170, y: 200 }; // 控制点2
				const end = { x: 230, y: 90 }; // 贝塞尔曲线结束点
				
				// 绘制贝塞尔曲线--可以没有-
				/*
				ctx.beginPath();
				ctx.moveTo(start.x, start.y); // 起始点
				ctx.bezierCurveTo(control1.x, control1.y,control2.x,control2.y,end.x,end.y); // 控制点1，控制点2，结束点
				ctx.setStrokeStyle('black');
				ctx.setFillStyle('red')
				ctx.stroke();
				ctx.closePath();
				ctx.draw(true);
				*/
			
				//循环
				for(let i=0;i<this.tList.length;i++){
					 // 计算小球位置
					const x = this.cubicBezier(start.x, control1.x, control2.x, end.x, this.tList[i]);
					const y = this.cubicBezier(start.y, control1.y, control2.y, end.y, init ? 0 : this.tList[i]);
					// 绘制小球
					ctx.beginPath();
					ctx.arc(x, y, 10, 0, Math.PI * 2);
					ctx.setFillStyle(this.ballColor[i]);
					ctx.fill();
					ctx.draw(true);
					// 更新参数t
					this.tList[i] += 0.005;
					if (this.tList[i] > 1) {
						this.tList[i] = 0;
					}
				}
			},
			
			//自定义动画循环机制——适配小程序
			requestAnimationFrame(callback){
				let interval = null
				interval = setTimeout(()=>{
					callback()
				},10)
				return interval
			},
			//自定义取消动画循环——适配小程序
			cancelAnimationFrame(interval){
				clearTimeout(interval)
			},
			
			
			// 动画循环
			animate(ctx) {
				ctx.clearRect(0, 0, 600, 200);
				this.loadingItemDraw.call(this,ctx,false);
				this.raf = this.requestAnimationFrame(this.animate.bind(this,ctx));		
				// console.log('执行中',this.raf)
			},
			//监听动画的打开关闭
			startOrEndAnimation(){
				//获取画笔上下文对象
				let ctx = uni.createCanvasContext('canvas1');
				if(this.raf){
					//动画已经开启 --点击完后关闭
					this.cancelAnimationFrame(this.raf);
					ctx.clearRect(0, 0, 600, 200);
					this.loadingItemDraw.call(this,ctx,true);
					this.raf = null
				}else{
					//动画是关闭状态 --- 点击开启
					this.raf = this.requestAnimationFrame(this.animate.bind(this,ctx));	
				}
			}
		},
		mounted() {
			//获取画笔上下文对象
			// let ctx = uni.createCanvasContext('canvas1',this);
			let ctx = uni.createCanvasContext('canvas1',this);
			//直接动起来
			// this.animate.call(this,ctx);
			this.loadingItemDraw.call(this,ctx,true);
		},
		//手动处理忘记关闭动画的情况
		beforeUnmount(){
			this.cancelAnimationFrame(this.raf);
		}
	}
</script>

<style lang="scss">
 .canvas{
        background-color: beige;
    }
</style>