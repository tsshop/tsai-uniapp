<template>
	<view>
		<view class="flex" style="margin-bottom: 50rpx;">

			<!-- 头像 -->
			<view class="log-image-box">
				<image :src="info.avatar"></image>
			</view>
			<!-- 头像 -->

			<!-- 内容 -->
			<view class="flex-1" style="margin-left: 28rpx;">
				<view class="log-content-box">
					<view>
						<view v-if="info.loading==1" class="flex flex-x-y">


							<view class="spinner">
								<view></view>
								<view></view>
								<view></view>
								<view></view>
								<view></view>
								<view></view>
							</view>
							<text class="fs-24 color-999999 ml-20">查询中......</text>


							<!-- <view class="border-loading"></view>
							<text class="fs-24 color-999999 ml-10">查询中......</text> -->

						</view>
						<logAnimation :id="info.id" :content="info.content" v-else-if="info.loading==2"></logAnimation>
						<text :selectable="true" class="log-content" v-else>
							{{info.content}}
						</text>
					</view>
					<view class="flex flex-x-b mt-10" v-if="!info.isFromUser && !info.loading">
						<view class="flex-1">
							<zanCai :info="info" v-if="showLike"></zanCai>
						</view>
						<view class="color fs-30" @tap.stop="mycopy(info.content)">
							复制
						</view>
					</view>
				</view>
			</view>
			<!-- 内容 -->


		</view>
	</view>
</template>

<script>
	import zanCai from './zan-cai.vue';
	import logAnimation from './log-animation.vue';
	export default {
		name: 'log',
		components: {
			zanCai,
			logAnimation
		},
		props: {
			info: {
				type: Object,
				default: () => {}
			},
			showLike: {
				type: Boolean,
				default: false,
			}
		},
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.log-image-box {
		width: 78rpx;
		height: 78rpx;
		border-radius: 50%;
		overflow: hidden;


		image {
			width: 100%;
			height: 100%;
		}
	}

	.log-content-box {
		display: inline-block;
		background: #ffffff;
		border-radius: 0px 20rpx 20rpx 20rpx;
		max-width: 90%;
		padding: 26rpx 32rpx 28rpx 32rpx;
		font-size: 30rpx;
		color: #333333;
		line-height: 42rpx;
		letter-spacing: 0.6rpx;
		word-break: break-word;
		// text-align: justify;

	}

	.log-content {
		white-space: pre-line;

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

	.spinner {
		width: 44rpx;
		height: 44rpx;
		animation: spinner-y0fdc1 2s infinite ease;
		transform-style: preserve-3d;

	}

	.spinner>view {
		background-color: rgba(255, 189, 165, 0.2);
		height: 100%;
		position: absolute;
		width: 100%;
		border: 1px solid $color;
	}

	.spinner view:nth-of-type(1) {
		transform: translateZ(-22rpx) rotateY(180deg);
	}

	.spinner view:nth-of-type(2) {
		transform: rotateY(-270deg) translateX(50%);
		transform-origin: top right;
	}

	.spinner view:nth-of-type(3) {
		transform: rotateY(270deg) translateX(-50%);
		transform-origin: center left;
	}

	.spinner view:nth-of-type(4) {
		transform: rotateX(90deg) translateY(-50%);
		transform-origin: top center;
	}

	.spinner view:nth-of-type(5) {
		transform: rotateX(-90deg) translateY(50%);
		transform-origin: bottom center;
	}

	.spinner view:nth-of-type(6) {
		transform: translateZ(22rpx);
	}

	@keyframes spinner-y0fdc1 {
		0% {
			transform: scale(0.7) rotate(45deg) rotateX(-25deg) rotateY(25deg);
		}

		50% {
			transform: scale(0.7) rotate(45deg) rotateX(-385deg) rotateY(25deg);
		}

		100% {
			transform: scale(0.7) rotate(45deg) rotateX(-385deg) rotateY(385deg);
		}
	}
</style>