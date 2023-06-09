import Vue from 'vue'
import Vuex from 'vuex'
let myRequest = require('../utils/request');
let {
	version
} = require('../version');
Vue.use(Vuex)
let {
	dateFormat
} = require('../utils/util');
const store = new Vuex.Store({
	state: {
		query: {}, //页面查询参数


		options: {}, // page.onLoad(options)  option参数
		user_info: uni.getStorageSync('user_info') || {}, //用户shuj

		CONFIG: uni.getStorageSync('CONFIG') || {},


	},
	mutations: {
		// 通用赋值
		vuexSet(state, data) {
			state[data.name] = data.value;
		},

	},
	getters: {

	},
	actions: {

		//更新全局数据
		refresh({
			commit,
			state
		}, obj) {

			myRequest({
				url: '/config/list',
			}).then(res => {
				if (res.status == 200) {
					console.log('version', version);
					commit('vuexSet', {
						name: 'CONFIG',
						value: res.data || {}
					})
					uni.setStorage({
						key: 'CONFIG',
						data: res.data || {}
					});

					// #ifdef H5
					//检测更新 H5
					if (res.data.H5_VERSION) {
						if (checkVersion(version, res.data.H5_VERSION)) {
							console.log('xxxxxxxxxxxxx需要更新xxxxxxxxxxxxxxx');
							window.location.reload();
						}
					}

					// #endif
				}
			})

		},
		//更新用户身份
		refresh_user({
			commit,
			state
		}, obj) {
			if (!uni.getStorageSync('ACCESS_TOKEN')) {
				//未登录 不连接
				return;
			}

			myRequest({
				url: '/user/info',
				toast: false,
			}).then(res => {
				if (res && res.status == 200) {
					if (res.data.vipEndTime) {
						if (res.data.vipEndTime > new Date().getTime()) {
							res.data.vipEndTimeStr = dateFormat('YYYY-mm-dd', new Date(
								res.data.vipEndTime));
							res.data.vip = true;
						}
					}
					commit('vuexSet', {
						name: 'user_info',
						value: res.data
					});
					uni.setStorage({
						key: 'user_info',
						data: res.data || {}
					});

				}
			})
		}

	}

});

function checkVersion(v1, v2) {
	let update = false;
	v1 = v1.replace('v', '').split('.');
	v2 = v2.replace('v', '').split('.');
	console.log(v1, v2);
	let arrNum = [100000, 1000, 1];
	let v1Num = 0;
	let v2Num = 0;

	v1.forEach((val, index) => {
		v1Num += Number(val) * arrNum[index];
	});
	v2.forEach((val, index) => {
		v2Num += Number(val) * arrNum[index];
	});
	if (v1Num < v2Num) {
		update = true;
	}
	console.log(v1Num, v2Num);
	console.log('update.............', update);
	return update;
};
export default store