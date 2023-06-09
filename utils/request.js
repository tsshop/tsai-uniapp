/***
 * http请求
 * @param args
 */

let envInfo = require('../siteinfo.js')
import store from '../store/index.js';

module.exports = function(object) {
	let page = getCurrentPages();
	let route = "";
	if (page.length > 0) {
		let self = page[page.length - 1]
		//#ifdef MP-WEIXIN || APP-PLUS
		self = page[page.length - 1].$vm;
		//#endif
		route = self.route;
		//#ifdef MP-WEIXIN 
		route = self.__route__;
		//#endif
		//#ifdef APP-PLUS
		route = page[page.length - 1].route;
		//#endif
	}

	if (!object.data) {
		object.data = {};
	}
	if (!object.content_type) {
		object.header = {
			'content-type': 'application/json;charset:utf-8;'
		};
	} else {
		object.header = {
			'content-type': 'form-data'
		};
	}
	object.header['Accept'] = 'application/vnd.trading.v1+json';


	// 携带用户信息
	let access_token = uni.getStorageSync('ACCESS_TOKEN');
	if (access_token) {
		object.header['token'] = '' + access_token;
	}

	object.url = object.static ? (object.url) : (envInfo.root + '/api' + object.url);

	if (object.loading) {
		uni.showLoading({
			mask: true,
		});
	}
	return uni.request({
		url: object.url,
		header: object.header,
		data: object.data,
		method: object.method || "GET",
		dataType: object.dataType || "json"
	}).then(res => {

		if (object.loading) {
			uni.hideLoading();
		}
		if (res.length == 1) {
			res[1] = {
				data: {}
			}
		}
		res = res[1].data

		if (res.status == '4006' || res.status == 403 || res.status == 401) {

			if (object.login !== false) {
				uni.setStorageSync('ACCESS_TOKEN', '');
				uni.setStorageSync('user_info', '');
				store.commit('vuexSet', {
					name: 'user_info',
					value: {}
				});
				let pages = getCurrentPages();
				let self = pages[pages.length - 1];
				let router = ''
				//#ifdef MP-WEIXIN || APP-PLUS
				self = pages[pages.length - 1].$vm;

				router = self.__route__;
				//#endif
				router = self.route;
				console.log('router', router);
				if (router != 'pages/login/login') {
					clearTimeout(getApp().globalData.tologintimer);
					getApp().globalData.tologintimer = setTimeout(() => {
						if (router != 'pages/login/login') {
							uni.navigateTo({
								url: '/pages/login/login?guoqi=guoqi'
							})
						}

					}, 200);

				}

			} else {
				return res;
			}
		} else {
			if (res.status != 200 && res.msg && object.toast !== false) {
				// #ifdef APP-PLUS
				plus.nativeUI.toast(res.msg);
				// #endif

				// #ifndef APP-PLUS
				uni.showToast({
					title: res.msg,
					icon: 'none',
					duration: 3000
				});
				// #endif
			}

			return res;
		}

	}).catch(res => {
		if (res.status == '4006' || res.status == 403 || res.status == 401) {

			if (object.login !== false) {
				uni.setStorageSync('ACCESS_TOKEN', '');
				uni.setStorageSync('user_info', '');
				store.commit('vuexSet', {
					name: 'user_info',
					value: {}
				});
				let pages = getCurrentPages();
				let self = pages[pages.length - 1];
				let router = ''
				//#ifdef MP-WEIXIN || APP-PLUS
				self = pages[pages.length - 1].$vm;

				router = self.__route__;
				//#endif
				router = self.route;
				console.log('router', router);
				if (router != 'pages/login/login') {
					clearTimeout(getApp().globalData.tologintimer);
					getApp().globalData.tologintimer = setTimeout(() => {
						if (router != 'pages/login/login') {
							uni.navigateTo({
								url: '/pages/login/login?guoqi=guoqi'
							})
						}
					}, 200);

				}

			} else {
				return {};
			}
		}
		return {};
		uni.hideLoading();
	})

};