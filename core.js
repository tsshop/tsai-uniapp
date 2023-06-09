import store from './store'
import common from './components/common/common.vue'
import custom from './components/custom/custom.vue'


const {
	dev,
	root: ROOT,
} = require('./siteinfo.js');
const {
	version
} = require('./version.js');
export default {
	init: (Vue) => {

		//混入公共方法属性
		Vue.mixin({
			methods: {
				setData: function(obj, callback) {
					let that = this;
					const handleData = (tepData, tepKey, afterKey) => {
						tepKey = tepKey.split('.');
						tepKey.forEach(item => {
							if (tepData[item] === null || tepData[item] === undefined) {
								let reg = /^[0-9]+$/;
								tepData[item] = reg.test(afterKey) ? [] : {};
								tepData = tepData[item];
							} else {
								tepData = tepData[item];
							}
						});
						return tepData;
					};
					const isFn = function(value) {
						return typeof value == 'function' || false;
					};
					Object.keys(obj).forEach(function(key) {
						let val = obj[key];
						key = key.replace(/\]/g, '').replace(/\[/g, '.');
						let front, after;
						let index_after = key.lastIndexOf('.');
						if (index_after != -1) {
							after = key.slice(index_after + 1);
							front = handleData(that, key.slice(0, index_after), after);
						} else {
							after = key;
							front = that;
						}
						if (front.$data && front.$data[after] === undefined) {
							Object.defineProperty(front, after, {
								get() {
									return front.$data[after];
								},
								set(newValue) {
									front.$data[after] = newValue;
									that.$forceUpdate();
								},
								enumerable: true,
								configurable: true
							});
							front[after] = val;
						} else {
							that.$set(front, after, val);
						}
					});
					// this.$forceUpdate();
					isFn(callback) && this.$nextTick(callback);
				},
				vuexSet(key, data, state = false) {
					console.log('......chagne store......');
					console.log(key, data, state);
					console.log('......chagne store......');
					store.commit('vuexSet', {
						name: key,
						value: data
					});
					if (state) {
						//自动设置缓存
						uni.setStorageSync(key, data);
					}
				},
				changeValue(obj) {

					if (obj.key) {
						this[obj.key] = obj.value;
					}
					return this;
				},


			},
			computed: {
				//获取用户信息
				user_info: function() {
					let that = this;
					return that.$store.state.user_info
				},
				dev: function() {
					return dev;
				},
				//接口根路径
				ROOT: function() {
					return ROOT;
				},
				//后端返回的配置文件
				CONFIG: function() {
					let that = this;
					return that.$store.state.CONFIG;
				},
				//版本号
				VERSION: function() {
					return version;
				},
			},
			onLoad(e) {
				let that = this;
				console.log("我是混入的onLoad", e);
			},
		});

		Vue.prototype.$store = store;

		//获取用户信息
		if (uni.getStorageSync('ACCESS_TOKEN')) {
			setTimeout(() => {
				store.dispatch('refresh_user');
			}, 200);
		}
		setTimeout(() => {
			// 获取配置文件
			store.dispatch('refresh');
		}, 200);



		
		///////////////////////////////////////////////////////////////////////////////////////////

		//挂在公共组件
		Vue.component('common', common)
		Vue.component('custom', custom)

		///////////////////////////////////////////////////////////////////////////////////////////

		//返回上一页
		Vue.prototype.uniBack = () => {
			let page = getCurrentPages();
			if (page.length > 1) {
				uni.navigateBack({
					delta: 1
				});
				return;
			}
			uni.reLaunch({
				url: "/pages/index/index",
			})

		}

		//事先登录  未登录返回true 同时显示登录弹窗
		Vue.prototype.login = (type = true) => {
			if (type == false) {
				if (!uni.getStorageSync('ACCESS_TOKEN'))
					return true;
				else return false;
				return false;
			}

			if (!uni.getStorageSync('ACCESS_TOKEN')) {

				Vue.prototype.toPage("/pages/login/login");
				return true;
			}
			return false;
		}




		//公共复制方法  str：复制内容  notic：成功后提示消息 tiem：消息显示时间
		Vue.prototype.mycopy = (str = "", notice = "", time = 2500, clear = true) => {
			if (!str)
				str = "";
			str = str.replace(/<(p|div)[^>]*>/gi, '\n').replace(/<br\/?>/gi, '\n').replace(/<[^>/]+>/g, '')
				.replace(
					/(\n)?<\/([^>]+)>/g, '').replace(/\u00a0/g, ' ').replace(/&nbsp;/g, ' ').replace(
					/<\/?(img)[^>]*>/gi, '').replace(
					/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#39;/g, "\'").replace(
					/&quot;/g, "\"").replace(
					/<\/?.+?>/g, "")
			str = str.trim() || '';
			uni.setClipboardData({
				data: str,
				success: () => {

					uni.hideToast();


					uni.showToast({
						title: notice || '复制成功',
						duration: time,
						icon: 'none'
					})


				}
			});
		}


		//公共节流方法
		let onoff = '';
		Vue.prototype.less = (fn, ...params) => {
			let newTime = new Date().getTime();
			if ((!onoff || (newTime - onoff > 1500)) && fn) {
				onoff = newTime;
				fn(...params);
			} else {
				console.log("请稍后点击")
			}
		}
		let onoff1 = '';
		Vue.prototype.click = (fn, ...params) => {
			let newTime = new Date().getTime();
			if ((!onoff1 || (newTime - onoff1 > 500)) && fn) {
				onoff1 = newTime;
				fn(...params);
			} else {
				console.log("请稍后点击")
			}
		}

		//取小数点，不四舍五入
		Vue.prototype.xs = (value, lang, type = 3) => {
			let a = parseFloat(value).toString();

			if (a == '0' || a == 'NaN') a = '0.00000000000';
			if (a.indexOf('.') == -1) a += '.';
			let index = a.indexOf('.');
			a += '00000000000';
			if (type == 3) {
				return a.substr(0, index + 1 + lang);
			} else if (type == 0) {
				return a.substr(0, index + 1 + lang).split('.')[0];
			} else {
				return a.substr(0, index + 1 + lang).split('.')[1];
			}
		}
		
		
		//页面跳转
		Vue.prototype.toPage = (url, type = 'to', login = false) => {
			// #ifdef APP-PLUS
			plus.screen.lockOrientation("portrait-primary");
			// #endif
			console.log('type', type);
			console.log('url', url);
			if (login) {
				if (!uni.getStorageSync('ACCESS_TOKEN')) {
					uni.navigateTo({
						url: '/pages/login/login'
					});
					return;
				}
			}!type && (type = 'to');
			switch (type) {
				case 'to':
					return uni.navigateTo({
						url: url
					});
				case 'back':
					return uni.navigateBack({
						delta: 1
					});

				case 'redirect':
					return uni.redirectTo({
						url: url
					})
				case '3':
					return uni.redirectTo({
						url: url
					})
				case 'relaunch':
					return uni.reLaunch({
						url: url
					})
				case 'switch':
					return uni.switchTab({
						url: url
					})
				case '4':
					return uni.switchTab({
						url: url
					})
			}

		}



		//uni.showToast 方法重写  （弹窗内容，显示时间，icon）
		Vue.prototype.showToast = (title = "", duration = 2000, icon = "none") => {
			// #ifdef APP-PLUS
			plus.nativeUI.toast(title);
			// #endif

			// #ifndef APP-PLUS
			uni.showToast({
				title,
				icon,
				duration
			})
			// #endif
		}
		//延时触发函数timeOut
		Vue.prototype.timeOut = (fn, duration = 500, icon = "none") => {
			if (typeof fn == 'function') {
				setTimeout(fn, duration)
			}
		}



		//绑定request
		let request = require('./utils/request.js');
		Vue.prototype.request = request;
		Vue.prototype.clear = () => {};
		Vue.prototype.get_options = (e) => {
			if (e && e.target && e.target.dataset) {
				return e.target.dataset || {};
			}
			return {};
		};

		Vue.prototype.has = (obj = {}, key = '', is_null = false) => {
			//is_null 允许值为 “” null undfind
			if (key) {
				let have = false;
				let arr = key.split('.');
				let obj_new = obj;
				arr.some((val, index) => {
					if (is_null) {
						if (obj_new && obj_new.hasOwnProperty(val)) {
							obj_new = obj_new[val];
							if ((index + 1) == arr.length) {
								have = true;

							}
							return false;
						}
					} else {
						if (obj_new && obj_new.hasOwnProperty(val) && obj_new[val]) {
							obj_new = obj_new[val];
							if ((index + 1) == arr.length) {
								have = true;

							}
							return false;
						}
					}
					return true;
				});
				return have;
			} else {
				return false;
			}
		};
		
		//拷贝对象或数组
		Vue.prototype.clone = (obj) => {
			return JSON.parse(JSON.stringify(obj));
		}
		
		//video全屏
		Vue.prototype.requestFullScreen = (id) => {
			let video = uni.createVideoContext(id);
			video.requestFullScreen();
			console.log('video', video, 'id', id);
		}
		
		
		//处理时间
		Vue.prototype.dateFormat = (fmt, date) => {
			let ret;
			let opt = {
				"Y+": date.getFullYear().toString(), // 年
				"m+": (date.getMonth() + 1).toString(), // 月
				"d+": date.getDate().toString(), // 日
				"H+": date.getHours().toString(), // 时
				"M+": date.getMinutes().toString(), // 分
				"S+": date.getSeconds().toString() // 秒
				// 有其他格式化字符需求可以继续添加，必须转化成字符串
			};
			for (let k in opt) {
				ret = new RegExp("(" + k + ")").exec(fmt);
				if (ret) {
					fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length,
						"0")))
				};
			};
			return fmt;
		}

		//判断清泉是否成功
		Vue.prototype.rsuccess = (res, type = false) => {
			if (res && type === false && res.status == 200) return true;
			if (res && type === true && res.status == 200 && res.data) return true;
		}
		
		//分享
		Vue.prototype.share = (url, obj = {}, title = "", imageUrl = "") => {

			obj = {
				...obj
			}
			let path = "";
			path = url + '?';
			if (typeof obj == 'object') {
				for (let i in obj) {
					path += (i + '=' + obj[i] + '&');
				}
			}

			let share = {};
			path = path.substring(0, path.length - 1);
			share.path = path;
			if (title) {
				share.title = title;
			}
			if (imageUrl) {
				share.imageUrl = imageUrl;
			}
			console.log('分享链接', share);
			return share;
		}
		
		//判断是否是微信浏览器
		Vue.prototype.isWeiXin = () => {
			// #ifdef H5
			var ua = window.navigator.userAgent.toLowerCase();
			if (ua.match(/MicroMessenger/i) == 'micromessenger') {

				return true; //是微信浏览器
			} else {
				return false; //其他设备
			}

			// #endif

			// #ifndef H5
			return false;
			// #endif
		}


	},

}