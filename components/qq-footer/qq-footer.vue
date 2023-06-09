<template>
	<view>

		<view v-if="!show" class="flex flex-x-y" :class="list_length == 0 ?'loading-box-2':'loading-box'">
			<view class="border-loading"></view>
			<text class="fs-24 color-999999 ml-10">查询中......</text>
		</view>

		<block v-if="show && list_length > 0 && text">
			<view style="line-height: 100rpx;text-align: center;" class="fs-30 color-999999">{{ text  }}
			</view>
		</block>
		<block v-if="show && list_length == 0">
			<view class="flex flex-x-center flex-y flex-y-center ">
				<image class="show-animation"
					style="width: 391rpx;height:253rpx;margin: 0rpx auto 0 auto;margin-bottom: 40rpx;"
					:style="{'margin-top':top?top:'120rpx'}" src="../../static/images/null.png">
				</image>
				<view class="fs-24 color-333333" style="color: #666666;margin-top: 0rpx;margin-bottom: 100rpx;">
					没有数据哦
				</view>
			</view>
			<view v-if="footer" style="line-height: 100rpx;text-align: center;" class="fs-24 color-999999">
				{{ footer }}
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		name: "qq-footer",
		data() {
			return {

			};
		},
		computed: {
			list_length() {
				return Object.keys(this.list).length;
			},
		},
		props: {
			show: {
				type: Boolean,
				default: false,
			},
			text: {
				type: String,
				default: '已加载全部',
			},
			list: {
				type: [Object, Array],
				default: () => []
			},
			top: {
				type: String,
				default: ''
			},
			footer: ''
		}
	}
</script>

<style lang="scss">
	.show-animation {
		animation: show-animation 0.7s;
	}

	@keyframes show-animation {
		0% {
			opacity: 0;
			transform: translate(10rpx, -10rpx);
		}

		100% {
			opacity: 1;
			transform: translate(0rpx, 0rpx);
		}
	}

	.border-loading {
		width: 30rpx;
		height: 30rpx;
		border-radius: 50%;
		border: 4rpx solid;
		border-top-color: #FD7747;
		border-right-color: #fd5f10;
		border-bottom-color: #fd835d;
		border-left-color: #fda571;
		animation: robat-loading 1s linear infinite;
		display: inline-block;
	}

	@keyframes robat-loading {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}

	.loading-box {
		margin-top: 400rpx;
		position: fixed;
		z-index: 9;
		width: 100%;
		top: 0;
	}

	.loading-box-2 {
		margin-top: 120rpx;
		position: relative;
	}
</style>