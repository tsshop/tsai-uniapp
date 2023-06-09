<template>
	<view class="cell-item" hover-class="cell-item-click" hover-start-time="1" hover-stay-time="300">
		<template>
			<view class="cell-bar" style="margin-left: 30rpx;margin-right: 30rpx;" :style="{borderColor:borderColor}">
			</view>
		</template>
		<view class="flex flex-y-center" :style="{padding}" @tap.stop="clickOne">
			<view class="flex-1 hidden">
				<view class="  flex flex-y-center" :style="{color:titleColor}">
					<slot name="titleLeft"></slot>
					<image class="over-line1 fs-28 mr-20" :src="image" :style="{width:imageWidth,height:imageHeight}"
						v-if="image"></image>
					<view class="over-line1 fs-28">{{title}}</view>
					<slot name="titleRight"></slot>
				</view>
				<slot name="desc"></slot>
			</view>
			<view class="color-666666 fs-28 flex flex-x-y" :style="type == 'none'?'':'ml-20'">
				<slot name="right"></slot>
				<view v-if="type == 'right'" class="iconfont icon-jinru fs-40 w-30 color-666666"
					style="font-size: 30rpx;"></view>
				<view v-else-if="type == 'none'"></view>
				<view v-else-if="type == 'switch'" style="height: 40rpx;">
					<switch @tap.stop="clear" class="switch-cell" @change="switchChange" color="#F4944E"
						:checked="value"></switch>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "cell",
		props: {
			//左侧标题
			title: {
				type: [String, Number],
				default: '',
			},
			//分割线颜色
			borderColor: {
				type: [String, Number],
				default: '#F3F3F3',
			},
			//padding
			padding: {
				type: String,
				default: '36rpx 30rpx',
			},
			type: {
				type: String,
				default: "right"
			},
			//switch 绑定的值
			value: {
				type: [Boolean, String, Number],
				default: false,
			},
			//分割线 样式
			barMargin: {
				type: [String, Number],
				default: '0'
			},
			titleColor: {
				type: String,
				default: '#333333'
			},
			image: {
				type: String,
				default: '',
			},
			imageWidth: {
				type: String,
				type: '',
			},
			imageHeight: {
				type: String,
				type: '',
			},

		},
		data() {
			return {

			};
		},
		created() {

		},
		methods: {
			switchChange(e) {

				this.$emit('input', e.detail.value);
				this.$emit('change', e.detail.value);
			},
			clickOne() {
				this.$emit('click');
			}
		}
	}
</script>

<style lang="scss">
	.cell-item+.cell-item {
		.cell-bar {
			border-top-style: solid;
			border-top-width: 1px;
		}
	}

	.switch-cell {
		transform: scale(0.76) translateX(26rpx) translateY(-10rpx);
	}

	.cell-item-click {
		animation: cell-an 0.7s linear;
	}

	@keyframes cell-an {
		0% {
			background: rgba(0, 0, 0, 0.1);
		}

		100% {
			background: rgba(0, 0, 0, 0);
		}
	}
</style>