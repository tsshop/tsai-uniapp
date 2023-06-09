<template>
	<view>
		<uni-popup ref="vip" type="bottom">
			<view class="bg-FFFFFF hidden" style="border-radius: 24rpx 24rpx 0 0;padding: 48rpx 28rpx 0 28rpx;">


				<!-- 标题 -->
				<view class="flex flex-y-center fs-32 bold">
					<image src="../../static/ai/v1.png" style="width: 44rpx;height: 33rpx;"></image>
					<view style="color: #C2915A;padding-left: 11rpx;">开通会员享不限次数AI服务</view>
				</view>
				<!-- 标题 -->


				<!-- 套餐列表 -->
				<view style="margin-top: 48rpx;">
					<view @tap.stop="choose_one(item,index)" :style="{animationDuration:0.3 + 0.14 * index + 's' }"
						v-for="(item,index) in list" :key="index" class="vip-item" :class="item.checked?'active':''">
						<view>
							<view class="fs-32 color-333333 bold" style="line-height: 32rpx;">{{item.name}}</view>
							<view class="fs-26 color-999999 mt-10" style="line-height: 26rpx;">立减¥{{item.jian}}</view>
						</view>
						<view class="flex flex-y flex-x-y">
							<view class="flex flex-y-end color-vip-price">
								<view class="fs-30" style="line-height: 20rpx;">¥</view>
								<view class="bold " style="font-size: 46rpx;line-height: 32rpx;">{{item.amt}}</view>
							</view>
							<view class="fs-26 color-999999 mt-10"
								style="line-height: 26rpx;text-decoration: line-through;">¥{{item.originalAmt}}</view>
						</view>
					</view>
				</view>
				<!-- 套餐列表 -->


				<!-- 购买 -->
				<view style="margin-bottom: 50rpx;" class="buy-vip-bar">
					<view style="padding-left: 60rpx;height: 100%;" class="flex-1 flex flex-y-center">
						{{checkedItem?(`${checkedItem.amt}元${checkedItem.time}天`):''}}
					</view>
					<view @tap.stop="less(buy_now)" hover-class="buy-vip-btn-width" hover-start-time="1"
						hover-stay-time="300" class="bold fs-28 flex flex-x-y bg-all buy-vip-btn">立即开通</view>
				</view>
				<!-- 购买 -->



				<safearea-bar></safearea-bar>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		vipList,
		buyVip
	} from '@/api/index.js';
	export default {
		name: "buy-vip",
		data() {
			return {
				list: []
			};
		},
		created() {
			this.get_list();
		},
		computed: {
			checkedItem() {
				let arr = this.list.filter(val => val.checked);
				if (arr.length > 0) {
					return arr[0];
				}
				return null;
			},
		},
		methods: {
			open() {
				this.$refs.vip.open();
			},
			close() {
				this.$refs.vip.close();
			},
			get_list() {
				vipList().then(res => {
					if (res.status != 200) return;
					let data = res.data || [];
					if (data.length >= 1) {
						data[0].checked = true;
					}
					data.forEach(val => {
						val.jian = Number(this.xs(val.originalAmt - val.amt, 2));
					});
					this.list = data;

				});
			},
			choose_one(item, index) {
				this.list.forEach((val, index1) => {
					if (index1 == index) {
						val.checked = true;
					} else {
						val.checked = false;
					}
				});
				this.list = this.clone(this.list);
			},
			buy_now() {
				if (this.list.length == 0) return;
				if (!this.isWeiXin()) {
					this.showToast('用微信打开小助手才能购买哦');
					return;
				}
				let configId = this.list.filter(val => val.checked)[0].id;
				buyVip(configId).then(res => {
					if (res.status != 200) return;

					if (!res.data) return;

					////////////////

					WeixinJSBridge.invoke(
						'getBrandWCPayRequest', {
							...JSON.parse(res.data),
						},
						(res1) => {
							// console.log('JSON.parse(res.data)',JSON.parse(res.data));
							// console.log('pay------------------res',res1);
							if (res.err_msg == "get_brand_wcpay_request:ok") {
								this.showToast('购买成功');
								this.$store.dispatch('refresh_user');
								this.close();
							} else {
								this.showToast('购买失败');
							}
						});
					///////////////

				});

			},
		}
	}
</script>

<style lang="scss">
	.buy-vip-bar {
		height: 90rpx;
		border-radius: 50rpx;
		background-color: #3F454F;
		margin-top: 122rpx;
		font-size: 30rpx;
		color: #FFFFFF;
		display: flex;
		align-items: center;
	}

	.buy-vip-btn {
		height: 100%;
		width: 240rpx;
		border-radius: 50rpx;
		transition: width 0.3s;
	}

	.buy-vip-btn-width {
		width: 260rpx;
	}

	.vip-item {
		margin-top: 20rpx;
		padding: 30rpx 50rpx 30rpx 39rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border: 1rpx solid #c6c6c6;
		border-radius: 20rpx;
		animation: vip-list-show 0.6s;
	}

	.vip-item.active {
		background: #fdf6f4;
		border: 1rpx solid #ff7a4b;
		border-radius: 20rpx;
	}

	.color-vip-price {
		color: #333333;
	}

	.vip-item.active .color-vip-price {
		color: #FD7747;
	}

	@keyframes vip-list-show {
		0% {
			transform: translateY(50%);
			opacity: 0;
		}

		30% {
			transform: translateY(50%);
			opacity: 0;
		}

		100% {
			transform: translateY(0);
			opacity: 1;
		}
	}
</style>