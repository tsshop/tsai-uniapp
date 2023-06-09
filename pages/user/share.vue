<template>
	<view>
		<custom title="分享用户" background="rgba(0,0,0,0)" height="0" titleColor="#FFFFFF" backColor="#FFFFFF"
			fixed="fixed"></custom>


		<view class="flex flex-y flex-y-center pr"
			style="position: absolute;left: 50%;width: 560rpx;transform: translateX(-50%);top:320rpx;">

			<view style="width: 134rpx;height: 134rpx;border-radius: 50%;overflow: hidden;margin-top: 0rpx;">
				<qq-image :url="user_info.avatarUrl" imageStyle="width:100%;height:100%;"></qq-image>
			</view>

			<view style="margin-top: 30rpx;">
				<view class="fs-36 color-333333 bold center">
					{{user_info.name}}
				</view>
				<view class="fs-26 color-999999 mt-10">
					邀请您使用AI小助手
				</view>
			</view>



			<view style="width: 280rpx;height: 280rpx;margin-top: 70rpx;overflow: hidden;">
				<qq-image :url="qrcode" imageStyle="width:100%;height:100%;"></qq-image>
			</view>

			<view class="fs-26 color-999999" style="margin-top: 60rpx;">
				长按此图即可保存图片到相册
			</view>





		</view>



	</view>
</template>

<script>
	import {
		getQrCode
	} from '@/api/index.js';
	export default {

		data() {
			return {
				statusbar: getApp().globalData.statusBar + 'px',
				qrcode: '',

			};
		},




		onLoad() {

			this.qrcode = uni.getStorageSync('qrcode') || '';

			this.get_info();



		},


		methods: {
			get_info() {
				let content = this.CONFIG.H5_ROOT + '/#/pages/login/login?invite=' + this.user_info.id;
				let loading = this.qrcode ? false : true;
				getQrCode(content, loading).then(res => {
					if (res.status != 200) return;
					if (res.data) {
						this.qrcode = 'data:image/png;base64,' + res.data;
						uni.setStorageSync('qrcode', this.qrcode);
					}
				});
			}
		},
	}
</script>

<style lang="scss">
	page {
		background: #FD7747 url(../../static/ai/share.jpg) left top / 100% auto no-repeat;
		height: 100vh;
		@include createAnimation;
	}
</style>