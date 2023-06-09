<template>
	<view>
		<!-- 头部 -->
		<view class="bg-all hidden">
			<custom title="个人中心" backColor="#FFFFFF" titleColor="#FFFFFF" background="rgba(0,0,0,0)"></custom>



			<view class="flex flex-y-center color-ffffff" @tap.stop="login"
				style="padding: 0 28rpx;margin-top: 80rpx;margin-bottom: 50rpx;">
				<image @tap="toPage('/pages/user/userinfo-edit','',true)" :src="user_info.avatarUrl" mode="aspectFill"
					style="width: 110rpx;height: 110rpx;border-radius: 50%;background-color: #f4f4f4;"></image>
				<view class="flex-1 mr-20 ml-30 hidden" v-if="user_info.id">
					<view @tap="toPage('/pages/user/userinfo-edit','',true)" class="fs-40 over-line1">{{user_info.name}}
					</view>
					<view style="margin-top: 20rpx;line-height: 30rpx;" class="fs-26" v-if="user_info.vip">
						VIP不限制
					</view>
					<view style="margin-top: 20rpx;line-height: 30rpx;" class="fs-26" v-else>
						剩余条数:{{user_info.number}}条
					</view>
				</view>
				<view v-else class="flex-1">
					<view class="color-ffffff fs-32 bold ml-30">点我登录</view>
				</view>
				<view>
					<view v-if="!user_info.vip" @tap.stop="buy_number" class="buy-num flex flex-x-y color-all fs-26"
						hover-class="click-o">
						购买条数
					</view>
				</view>
			</view>


			<!-- vip -->
			<view class="flex flex-y-center color-ffffff"
				style="height: 125rpx;background: url(../../static/ai/mine-bg.png) left top / 100% 100% no-repeat;padding-left: 68rpx;padding-right: 60rpx;">
				<view class="flex-1">
					<view class="flex flex-y-center">
						<image src="../../static/ai/v1.png" style="width: 40rpx;height: 30rpx;"></image>
						<view class="fs-30 blod" style="font-style: italic;margin-left: 14rpx;line-height: 34rpx;">
							升级VIP
						</view>
					</view>
					<view class="fs-26" style="color:#D9D9D9;margin-top: 10rpx;line-height: 34rpx;"
						v-if="!user_info.vip">开通会员享不限次数AI服务
					</view>
					<view class="fs-26" style="color:#D9D9D9;margin-top: 10rpx;line-height: 34rpx;" v-else>
						VIP到期时间：{{user_info.vipEndTimeStr}}
					</view>
				</view>
				<view class="flex flex-x-y" style="color:#FFE8BC;">
					<view class="fs-26" hover-start-time="1" @tap.stop="buy_vip" v-if="!user_info.vip">立即开通</view>
					<view class="iconfont icon-youjiantou-tianchong fs-26" style="margin-left: 8rpx;"
						v-if="!user_info.vip"></view>
					<view class="fs-26" hover-start-time="1" v-if="user_info.vip">您已是VIP会员</view>
				</view>
			</view>
			<!-- vip -->




		</view>

		<!-- 头部 -->


		<view class="flex">
			<view class="flex-1" style="margin: 0 28rpx;">
				<!-- 分享 -->
				<view v-if="inviteInfo" class="bg-FFFFFF br-24 mt-24 flex flex-y-center"
					style="padding: 36rpx 20rpx 32rpx 34rpx;line-height: 34rpx;">
					<view class="flex-1">
						<view class="flex flex-y-center color-333333">
							<view class="fs-30">分享新用户</view>
							<view class="fs-26" style="margin-left: 40rpx;">
								进度: {{inviteInfo.inviteNumber}}/{{CONFIG.INVITE_MAX_NUMBER}}
							</view>
						</view>
						<view class="fs-28 mt-20">
							<text>成功分享一人奖励</text>
							<text class="color">{{inviteInfo.number}}</text>
							<text>条，每天限</text>
							<text class="color">{{CONFIG.INVITE_MAX_NUMBER}}</text>
							<text>人</text>
						</view>
					</view>
					<view>
						<view @tap.stop="toPage('/pages/user/share','',true)" hover-class="click-o" hover-start-time="1"
							class="bg-all flex flex-x-y color-ffffff fs-26 share-mine-btn">分享好友</view>
						<!-- <view hover-class="click-o" hover-start-time="1"
							class="flex flex-x-y color-ffffff fs-26 share-mine-btn" style="background-color: #B3B3B3;">已到上限</view> -->
					</view>
				</view>
				<!-- 分享 -->

				<!-- 更多功能 -->
				<view class="mt-24">
					<cell-list class="bg-FFFFFF br-24">
						<cell @click="toPage('/pages/user/share-list','',true)" title="分享记录"
							image="../../static/ai/mine-3.png" imageWidth="29rpx" imageHeight="28rpx"></cell>
						<cell @click="toPage('/pages/user/history','',true)" title="条数记录"
							image="../../static/ai/mine-4.png" imageWidth="25rpx" imageHeight="32rpx"></cell>
						<cell @click="toPage('/pages/user/buy-list','',true)" title="购买记录"
							image="../../static/ai/mine-2.png" imageWidth="29rpx" imageHeight="31rpx"></cell>
						<cell @click="to_add_group" title="加群交流" image="../../static/ai/mine-1.png" imageWidth="31rpx"
							imageHeight="30rpx"></cell>
						<cell @click="toPage('/pages/user/feedback','',true)" title="意见反馈"
							image="../../static/ai/mine-5.png" imageWidth="31rpx" imageHeight="31rpx"></cell>
						<cell @click="toPage('/pages/user/setting','',true)" title="设置"
							image="../../static/ai/mine-7.png" imageWidth="31rpx" imageHeight="31rpx"></cell>

					</cell-list>
				</view>
				<!-- 更多功能 -->

			</view>
		</view>

		<view style="height:40rpx"></view>

		<add-group ref="addGroup"></add-group>
		<buy-vip ref="buyVip"></buy-vip>
		<buy-number ref="buyNumber"></buy-number>
	</view>
</template>

<script>
	import {
		inviteProgress
	} from '@/api/index.js';
	export default {
		data() {
			return {
				inviteInfo: null,
			}
		},
		onShow() {
			this.$store.dispatch('refresh_user');
			this.get_invite();
		},
		onLoad(e) {
			if (e.openNumber) {
				this.$nextTick(() => {
					this.buy_number();
				});
			}
			this.inviteInfo = uni.getStorageSync('inviteInfo');
		},
		methods: {
			to_add_group() {
				this.$refs.addGroup.open();
			},
			buy_vip() {
				if (this.login()) return;
				this.$refs.buyVip.open();
			},
			buy_number() {
				if (this.login()) return;
				this.$refs.buyNumber.open();
			},
			get_invite() {
				inviteProgress().then(res => {
					if (!this.rsuccess(res)) return;
					if (res.data) {
						uni.setStorageSync('inviteInfo', res.data);
						this.inviteInfo = res.data;
					} else {
						uni.setStorageSync('inviteInfo', '');
					}
				});
			},
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #F6F9FA;
		@include createAnimation;
	}

	.buy-num {
		width: 158rpx;
		height: 54rpx;
		background-color: #FFFFFF;
		border-radius: 27rpx;
		margin-right: 18rpx;
		line-height: 26rpx;
	}

	.share-mine-btn {
		width: 158rpx;
		height: 54rpx;
		border-radius: 27rpx;
	}
</style>