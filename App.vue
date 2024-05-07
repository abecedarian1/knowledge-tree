<script>
	export default {
		globalData:{
			//平台类型：app web  (其他：大多数是小程序)
			platformType:'',
			// 可使用窗口距离顶部的距离
			usedWindowTop:'',
			// 后端地址----本地配置
			// baseURL:'http://localhost:8081/knowledge_tree/swagger',
			//服务端地址 
			baseURL:'http://39.105.220.189:8081/knowledge_tree/swagger'
			
			
		},
		onLaunch: function() {
			let this_ = this
			console.log('App Launch')
			uni.getSystemInfo({
				success:function(res){	
					// 下面这个 APP加载 和 页面加载获取到的值不一样 -_- -_- 
					// this_.globalData.usedWindowTop = String(res.windowTop)+'px';
					this_.globalData.platformType = String(res.uniPlatform) 
					
					if(res.uniPlatform == 'app' || res.uniPlatform == 'web'){
						this_.globalData.usedWindowTop = '44px';
					}else {
						this_.globalData.usedWindowTop = '0px';
						
					}
				}
			})
			
		},
		onShow: function() {
			console.log('App Show')
			
		},
		onHide: function() {
			console.log('App Hide')
			
		},
	}
</script>

<style>
	/*每个页面公共css */
</style>
