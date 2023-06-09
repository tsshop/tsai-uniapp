<script>
	let objectToUrlParams = (obj, urlencode) => {
		let str = "";
		for (let key in obj) {
			str += "&" + key + "=" + (urlencode ? encodeURIComponent(obj[key]) : obj[key]);
		}
		return str.substr(1);
	}

	export default {
		onLaunch: function(e) {

			console.log('App Launch', e);
			if (e.query.token) {
				uni.setStorageSync('ACCESS_TOKEN', e.query.token);
			}


			


			// #ifdef H5

			//公众号登录
			let url = window.location.href;
			console.log('window.location', window.location.origin);
			if (url.indexOf('code') > -1) {
				//跳转登录页面
				var search = url.split('?')[1] || '';
				let OBJ = {};
				console.log('search', search);
				search = search.replace('#/', '');
				console.log('search', search);
				var arr = search.split('&').map(val => {
					return val.split('=')
				});

				arr.forEach(val => {
					if (val.length == 2) {
						OBJ[val[0]] = val[1]
					}
				})
				if (OBJ.code) {


					uni.setStorageSync('wxCode', OBJ.code);
					window.location.href = '/#/pages/login/login';

				} else {}

			} else {}
			// #endif


		},
		onShow: function(e) {
			uni.hideTabBar();
			uni.getSystemInfo({
				success: e => {
					this.globalData.statusBar = e.statusBarHeight; //状态栏高度
					let custom = {
						width: 0,
						height: 28,
						top: 0,
						left: 0,
						right: 0,
						bottom: 0
					}; //菜单按钮
					//#ifdef MP-WEIXIN || MP-ALIPAY
					custom = uni.getMenuButtonBoundingClientRect(); //菜单按钮
					console.log('custom', custom);
					if (custom.height == 0) {
						custom.height = 40;
						console.log('未获取到custom，手动设置为', custom);
					}
					//#endif
			
			
					this.globalData.custom = custom;
					if (e.safeArea) {
						// #ifdef MP-WEIXIN
						this.globalData.safeArea = e.screenHeight - e.safeArea.bottom
						// #endif
						// #ifndef MP-WEIXIN
						this.globalData.safeArea = e.safeAreaInsets.bottom
						// #endif
					} else {
						this.globalData.safeArea = 0
					}
					this.globalData.customBar = (custom.bottom + custom.top - e.statusBarHeight) > 0 ?
						(custom.bottom + custom.top - e.statusBarHeight) : (custom.height + e
							.statusBarHeight);
					//#ifdef H5 || APP-PLUS
					this.globalData.customBar = 50 + e.statusBarHeight;
					//#endif
			
					// #ifdef H5
			
					let url = window.location.href;
					if (url.indexOf('custom=1') > -1) {
						//苹果加状态栏
						this.globalData.statusBar = 44;
						this.globalData.customBar = 50 + 44;
					}
					// #endif
			
				}
			});

			///打开app携带的参数
			//#ifdef APP-PLUS 
			var args1 = plus.runtime.arguments;
			if (args1) {
				// 处理args参数，如直达到某新页面等  

				let query_str = args1.split('?');
				if (query_str.length == 2) {
					let arr = query_str[1].split('&').map(val => val.split('='));
					let obj = {};
					arr.forEach(val => {
						obj[val[0]] = val[1];
					})
					if (obj.path) {
						// this.globalData.quer = 

						//有token 直接打开页面
						let path = obj.path;
						delete obj.path
						uni.reLaunch({
							url: path + '?' + objectToUrlParams(obj),
						})

					} else {
						this.globalData.path = obj.path;
						delete obj.path;
						this.globalData.query = obj;
					}


				}
				plus.runtime.arguments = ''
			}
			//#endif



			// 更新小程序...........................
			//#ifdef MP-WEIXIN || MP-ALIPAY
			const updateManager = uni.getUpdateManager();

			updateManager.onCheckForUpdate(function(res) {
				// 请求完新版本信息的回调
				if (res.hasUpdate) {
					updateManager.onUpdateReady(function(res) {
						uni.showModal({
							title: '更新提示',
							content: '新版本已经准备好，是否立即体验？',
							success(res) {
								if (res.confirm) {
									updateManager.applyUpdate();
								}
							}
						});

					});

					updateManager.onUpdateFailed(function(res) {
						uni.showModal({
							title: '已经有新版本了哟~',
							content: '新版本已经上线啦~，请您删除当前小程序，重新打开哟~'
						})
					});
				}
			});


			//#endif

		},
		onHide: function() {
			console.log('App Hide');
		}
	}
</script>

<style lang="scss">
	@import "./components/common/common.css";
	@import "./components/common/iconfont.css";

	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';

	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
</style>