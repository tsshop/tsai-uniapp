<template>
	<view>
		<custom title="设置密码"></custom>

		<view class="flex">
			<view class="flex-content bg-FFFFFF br-20 mt-20" style="padding:0 30rpx;">

				<view class="item-list-box-box">
					<view class="item-list-box">
						<view class="item-text-left">手机号码</view>
						<view class="color-999999">{{user_info.phone}}</view>
					</view>
				</view>

				<view class="item-list-box-box">
					<view class="item-list-box">
						<view class="item-text-left">密码</view>
						<input v-model="password" type="password" class="flex-1 color-333333 fs-28"
							placeholder-class="color-999999 font" placeholder="以字母和数字符号组合6-15位密码">
					</view>
				</view>

				<view class="item-list-box-box">
					<view class="item-list-box">
						<view class="item-text-left">确认密码</view>
						<input v-model="password2" type="password" class="flex-1 color-333333 fs-28"
							placeholder-class="color-999999 font" placeholder="请再次输入新密码">
					</view>
				</view>

				<view class="item-list-box-box">
					<view class="item-list-box">
						<view class="item-text-left">验证码</view>
						<input v-model="verify" type="number" maxlength="10" class="flex-1 color-333333 fs-28"
							placeholder-class="color-999999 font" placeholder="请输入短信验证码">
						<view @click="sendRegistCode">{{time}}</view>
					</view>
				</view>




			</view>
		</view>

		<view class="flex flex-x-y">
			<view class="default-btn" style="width: 680rpx;height: 92rpx;margin-top: 30rpx;" @tap.stop="logIn"
				:class="get_pass()?'':'hui'">确认
			</view>
		</view>

	</view>

</template>

<script>
	export default {
		data() {
			return {

				currentTime: 60,
				time: "获取验证码",
				disabled: "",
				phoneNum: "",
				verify: '',
				password: '',
				password2: '',

				img: "", //验证码图片
				uuid: '',
				imgcode: '',
			};
		},
		mounted() {
			if (this.user_info && this.user_info.phone) {
				this.phoneNum = this.user_info.phone;
			}
		},
		onLoad() {

		},
		methods: {

			authCode() {
				this.type = 2

			},
			cipher() {
				this.type = 1
			},
			//value为1为选中协议
			radioChange: function(e) {
				console.log(e)
				this.value = 1 + '';
			},
			//验证手机号码
			inputPhone: function(e) {
				console.log(e)
				this.phoneNum = e.detail.value
				if (!(/^1[3456789]\d{9}$/.test(this
						.phoneNum))) {
					if (this.phoneNum.length >= 11) {
						uni.showToast({
							title: '手机号有误',
							icon: 'none',
							duration: 2000
						})
					}
				}

				console.log(this.phoneNum, typeof(this.phoneNum))
			},

			//获取验证码
			sendRegistCode(e) {
				// if (this.imgcode == '') {
				// 	this.showToast('请输入图片验证码');
				// 	return;
				// }

				if (this.time != '获取验证码') {
					this.showToast('请稍等');
					return;
				}

				this.less(() => {


					let that = this;
					console.log(that.phoneNum, "111")
					var reg =
						/^1[3456789]\d{9}$/; //11位手机号码正则
					if (that.phoneNum.length == 0) {
						uni.showToast({
							title: '请输入手机号',
							icon: "none"
						})
					} else if (reg.test(that.phoneNum) == true) {
						// let currentTime = that.currentTime;
						let interval;
						this.request({
							url: '/user/getCode',
							data: {
								phone: this.phoneNum,
								uuid: this.uuid,
								code: this.imgcode
							},
							loading: true,
						}).then(res => {
							if (res.status == 200) {
								this.showToast('验证码已发送', 3000);
								that.time = that.currentTime + 's后重新获取';
								that.disabled = true;
								interval = setInterval(function() {
									that.time = that.currentTime - 1 + 's后重新获取';
									that.currentTime--;
									if (that.currentTime <= 0) {
										clearInterval(interval)
										that.time = '获取验证码',
											that.currentTime = 60,
											that.disabled = false
									}
								}, 1000)
							}
						})
					} else {
						uni.showToast({
							title: '请输入正确的手机号',
							icon: "none"
						})
					}


				})
			},

			//密码登录
			logIn(e) {

				let that = this;


				if (this.phoneNum == "") {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none',
					})
					return;
				}
				if (this.verify == "") {
					uni.showToast({
						title: '请输入验证码',
						icon: 'none',
					})
					return;
				}


				if (this.password == "") {
					uni.showToast({
						title: '请输入密码',
						icon: 'none',
					})
					return;
				}
				const regPwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
				let regPwdRes = regPwd.test(this.password);
				if (!regPwdRes) {
					this.showToast('密码格式为6~20位数字和字母组合');
					return;
				}
				if (this.password != this.password2) {
					this.showToast('两次密码不一致');
					return;
				}


				this.less(() => {
					this.request({
						url: '/user/updatePassword',
						method: 'POST',
						data: {
							code: this.verify,
							password: this.password,
							phone: this.phoneNum
						},
						loading: true,
					}).then(res => {
						if (res.status == 200) {
							this.showToast('修改成功');

							setTimeout(() => {
								this.uniBack();
							}, 500);
						} else {
							this.get_code();
						}
					});
				})


			},

			close_toast() {
				this.$refs.popup.close();
			},
			open_toast() {
				this.$refs.popup.open();
			},
			get_pass() {

				if (!(/^1[3456789]\d{9}$/.test(this
						.phoneNum))) {
					return false;
				}
				if (this.verify == "") {
					return false;
				}
				if (this.password == "") {
					return false;
				}
				return true;
			},

		}
	}
</script>

<style lang="scss">
	page {
		// background: #191a1b url(../../static/erqi/logo-bg2.png) left top / 100% 100% no-repeat;
		overflow-y: hidden;
		height: 100vh;
		background-color: $pageColor;
	}

	.item-list-box {
		height: 110rpx;

		color: #333333;
		font-size: 28rpx;
		display: flex;
		align-items: center;
	}

	.item-list-box-box+.item-list-box-box {
		border-top: 2rpx solid #eeeeee;
	}

	.item-text-left {
		width: 164rpx;
	}

	.body {
		padding: 140rpx 40rpx;
		box-sizing: border-box;



		.title {
			font-size: 48rpx;
			font-weight: 500;
			color: #ffffff;
			line-height: 66rpx;
		}

		.subhead {
			margin-top: 20rpx;
			font-size: 28rpx;
			font-weight: 400;
			// text-align: right;
			color: #EBD448;
			line-height: 28rpx;
			margin-bottom: 14rpx;
		}

		.loginModule {
			display: flex;
			border-bottom: 2rpx solid #eeeeee;
			align-items: center;
			padding-bottom: 18rpx;
			margin-top: 52rpx;

			.loginkey {
				width: 90rpx;
				height: 42rpx;
				font-size: 30rpx;
				font-weight: 400;
				text-align: left;
				color: #ffffff;
				line-height: 42rpx;
			}

			.separation {
				// width: 1px;
				height: 16rpx;
				width: 2rpx;
				background-color: #a9a9a9;
				margin: 0 18rpx;
			}

			input {
				flex: 1;
				color: #fff;
			}

			.placeholderClass {
				color: rgba(255, 255, 255, 0.65);
			}

			.more {
				font-size: 30rpx;
				font-weight: 400;
				text-align: left;
				color: #57B2DA;
				line-height: 42rpx;
			}
		}

		.agreement {
			display: flex;
			align-items: center;
			margin-top: 64rpx;

			image {
				width: 26rpx;
				height: 26rpx;
				background: #ffffff;
				margin-right: 8rpx;
			}

			.agreementview {
				font-size: 26rpx;
				font-weight: 400;
				text-align: center;
				color: #888888;
				line-height: 36rpx;

				.color {
					color: #ebd448;
				}
			}

		}

		.login {
			height: 96rpx;
			background: #FFFFFF;
			border-radius: 44rpx;
			text-align: center;
			line-height: 96rpx;
			font-size: 36rpx;
			font-weight: 500;
			text-align: center;
			color: #333333;
			margin-top: 40rpx;
		}

		.mode {
			margin-top: 44rpx;
			display: flex;
			justify-content: space-between;
			font-size: 26rpx;
			font-weight: 400;
			text-align: center;
			color: #999999;
			line-height: 36rpx;
		}
	}

	.hui {
		opacity: 0.6;
	}
</style>