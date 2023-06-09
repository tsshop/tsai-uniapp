import request from '@/utils/request.js';

//首页列表
export function loginRequest(data) {
	return request({
		url: '/login/loginByScenario',
		method: 'POST',
		data,
		loading: true,
	});
}
// 条数套餐
export function numberList() {
	return request({
		url: '/numberConfig/list',

	});
}
// 下单条数
export function buyNumber(id) {
	return request({
		url: '/orderNumber/buy',
		data: {
			configId: id,
		},
		loading: true,
	});
}
// 购买条数记录
export function buyNumberHistory(data) {
	return request({
		url: '/orderNumber/list',
		data,
	});
}
// vip套餐
export function vipList() {
	return request({
		url: '/vipConfig/list',
	});
}
// 下单vip
export function buyVip(id) {
	return request({
		url: '/orderVip/buy',
		data: {
			configId: id,
		},
		loading: true,
	});
}
// 购买vip记录
export function buyVipHistory(data) {
	return request({
		url: '/orderVip/list',
		data,
	});
}
// 退出
export function loginOutRequest(data) {
	return request({
		url: '/login/out',
		data,
		loading: true,
	});
}
// 发送对话消息
export function sendRootMsg(msg, templateId = 0) {
	return request({
		url: '/ai/sendMsg',
		data: {
			templateId: templateId,
			sessionMsg: {
				content: String(msg).trim(),
			}
		},
		method: 'POST',
	});
}
// 创建新会话
export function createNewMessage() {
	return request({
		url: '/ai/create',
		data: {
			templateId: 0,
		},
		method: 'POST',
		loading: true,
	});
}
// 创建新会话
export function getMessageList(templateId = 0) {
	return request({
		url: '/ai/getMsg',
		data: {
			templateId: templateId,
		}
	});
}
// 模板列表
export function templateList() {
	return request({
		url: '/template/list',
		login: false,
	});
}
// 模板点赞
export function templateChangeLike(id, score) {
	return request({
		url: '/ai/score',
		data: {
			id,
			score
		}
	});
}
// 模板详情
export function templateDetail(id) {
	return request({
		url: '/template/view',
		data: {
			id,
		}
	});
}
// 反馈
export function feedBackAdd(content) {
	return request({
		url: '/feedback/create',
		data: {
			content,
		},
		method: 'POST',
		loading: true,
	});
}
// 获取二维码
export function getQrCode(content, loading = true) {
	return request({
		url: '/user/getQrCode',
		data: {
			content,
		},
		method: 'POST',
		loading
	});
}
// 分享记录
export function inviteList() {
	return request({
		url: '/orderNumber/inviteList',
	});
}
// 获取邀请人数套餐
export function inviteProgress() {
	return request({
		url: '/numberConfig/inviteProgress',
		login: false,
	});
}
// 获取微信群二维码
export function groupQrCode(loading) {
	return request({
		url: '/groupQrCode',
		loading,
	});
}
// 首页推荐
export function indexListRequest() {
	return request({
		url: '/template/indexList',
	});
}