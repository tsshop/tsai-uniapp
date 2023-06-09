<template>
	<view>
		<view class="flex" v-if="showContent">
			<view class="flex-content">
				<status-bar></status-bar>

				<image class="login-text-show" src="../../static/ai/robat.png"
					style="margin-top: 140rpx;width: 109rpx;height: 116rpx;"></image>


				<view class="login-text-show-2"
					style="font-size: 56rpx;color:#3E424D;font-weight: 600;line-height: 72rpx;margin-top: 20rpx;">
					<view>用户登录</view>
					<view>欢迎使用AI小助手</view>
				</view>

				<view style="margin-top: 60rpx;" class="login-text-show-3">
					<!-- 电话 -->
					<view class="login-input-box">
						<view class="iconfont icon-a-shoujihaoshouji color-999999 fs-36" style="width:30rpx;"></view>
						<input type="number" maxlength="11" class="login-input" placeholder="请输入手机号"
							placeholder-class="color-999999" v-model="phone" />
					</view>
					<!-- 电话 -->
					<!-- 验证码 -->
					<view class="login-input-box" v-if="login_type == 'code'">
						<view class="iconfont icon-yanzhengma color-999999 fs-32" style="width:30rpx;"></view>
						<input :maxlength="6" type="number" v-model="verify" class="login-input" placeholder="请输入验证码"
							placeholder-class="color-999999" />
						<view class="color fs-26">
							<verify url="/login/getCode" sendMethod="GET" :phone="phone"></verify>
						</view>
					</view>
					<!-- 验证码 -->

					<!-- 密码 -->
					<view class="login-input-box" v-else>
						<view class="iconfont icon-mima1 color-999999 fs-36" style="width:30rpx;"></view>
						<input type="password" v-model="password" class="login-input" placeholder="请输入密码"
							placeholder-class="color-999999" />

					</view>
					<!-- 密码 -->

					<view class="flex flex-x-end" style="margin-top: -20rpx;">
						<view @tap.stop="chooseType" class="fs-26 color-999999">
							{{login_type == 'code'?'密码登录':'验证码登录'}}
						</view>
					</view>


					<!-- 登录 -->
					<view @tap.stop="to_login" hover-class="click-o" hover-start-time="1" class="default-btn"
						style="height: 90rpx;margin-top: 10rpx;transition: all 0.3s;"
						:style="formVerify?'':'background:#ddd;'">
						登录
					</view>
					<!-- 登录 -->


				</view>



			</view>
		</view>
	</view>
</template>

<script>
	import {
		loginRequest
	} from '@/api/index.js';
	export default {
		data() {
			return {
				phone: '',
				verify: '',
				code: '',
				login_type: 'code', // code 验证码登录  password 密码登录
				password: '',
				showContent: false,
			}
		},
		computed: {
			formVerify() {
				if (String(this.phone).trim().length != 11) {
					return false;
				}
				if (!this.verify && this.login_type == 'code') {
					return false;
				}
				if (!this.password && this.login_type == 'password') {
					return false;
				}

				return true;
			}
		},
		onLoad(e) {
			//跳转授权
			let code = uni.getStorageSync('wxCode') || '';
			uni.setStorageSync('wxCode', '');
			if (e.invite) {
				uni.setStorageSync('invite', e.invite);
			}

			// #ifndef H5
			this.showContent = true;
			return;
			// #endif
			if (code) {
				//授权过来的
				this.code = code;
				this.showContent = true;
			} else {

				if (!this.isWeiXin()) {
					this.showContent = true;
					return;
				}

				let dev = this.ROOT.indexOf('192.168') > -1 ? true : false; //开发环境
				if (dev) {
					//关注公众号
					window.location.href =
						"https://open.weixin.qq.com/connect/oauth2/authorize?appid=999&redirect_uri=https://xxx&response_type=code&scope=snsapi_base&state=&connect_redirect=1#wechat_redirect";
				} else {
					window.location.href =
						"https://open.weixin.qq.com/connect/oauth2/authorize?appid=999&redirect_uri=https://xxx&response_type=code&scope=snsapi_base&state=&connect_redirect=1#wechat_redirect";
				}



			}
		},
		methods: {
			to_login() {
				if (String(this.phone).trim().length != 11) {
					this.showToast('请输入正确的11位手机号');
					return;
				}

				if (!this.verify && this.login_type == 'code') {
					this.showToast('请输入验证码');
					return;
				}
				if (!this.password && this.login_type == 'password') {
					this.showToast('请输入密码');
					return;
				}

				this.less(() => {

					console.log('this', this.code);

					loginRequest({
						code: this.verify,
						password: this.password,
						phone: this.phone,
						scenario: this.login_type == 'code' ? 'login_code' : 'login_password',
						avatarUrl: `../../static/ai/avatar${parseInt(Math.random()*6)+1}.jpg`,
						// scenario:'login_password',
						// parentUserId: this.invite,
						wxCode: this.code,
						inviterId: uni.getStorageSync('invite') || '',
					}).then(res => {
						// Authorization
						uni.setStorageSync('ACCESS_TOKEN', res.data.Authorization);
						this.showToast('登录成功');
						if (res.data.user.vipEndTime) {
							if (res.data.user.vipEndTime > new Date().getTime()) {
								res.data.user.vip = true;
								res.data.user.vipEndTimeStr = this.dateFormat('YYYY-mm-dd', new Date(
									res.data.user.vipEndTime));
							}
						}
						this.vuexSet('user_info', res.data.user, true);
						this.toPage('/pages/index/index', 'relaunch');
						this.$store.dispatch('refresh_user');
					});
					return;

				});
			},
			chooseType() {
				this.login_type = this.login_type == 'code' ? 'password' : 'code';
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
		@include createAnimation;
	}

	.login-input-box {
		height: 90rpx;
		background-color: #F2F2F2;
		border-radius: 50rpx;
		margin-bottom: 33rpx;
		display: flex;
		align-items: center;
		padding-left: 34rpx;
		padding-right: 50rpx;
		font-size: 26rpx;
	}

	.login-input {
		height: 100%;
		margin-left: 24rpx;
		font-size: 26rpx;
		color: #333;
		flex: 1;
	}

	.login-text-show {
		animation: login-text-show 0.5s;
	}

	@keyframes login-text-show {
		0% {
			opacity: 0;
			transform: translateY(-50rpx);
		}

		100% {
			opacity: 1;
			transform: translateX(0);
		}
	}

	.login-text-show-2 {
		animation: login-text-show-2 0.5s;
	}

	@keyframes login-text-show-2 {
		0% {
			opacity: 0;
			// transform: translateX(-400rpx);
		}


		100% {
			opacity: 1;
			// transform: translateX(0rpx);
		}
	}

	.login-text-show-3 {
		animation: login-text-show-3 0.6s;
	}

	@keyframes login-text-show-3 {
		0% {
			opacity: 0;
			transform: translateY(100rpx);
		}



		70% {
			opacity: 0.6;
			transform: translateX(0);
		}

		100% {
			opacity: 1;
			transform: translateX(0);
		}
	}
</style>