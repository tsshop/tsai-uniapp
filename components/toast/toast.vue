<template>
	<view>
		<uni-popup ref="toast" type="bottom">
			<view style="width: 100vw;background-color: #FFFFFF;border-radius: 0px;">
				<view v-if="config.title"
					style="padding-top: 46rpx;text-align: center;font-size: 32rpx;padding-bottom: 20rpx;color: #1F1F1F;">
					{{config.title}}
				</view>

				<view class="flex flex-y fs-30" style="padding: 45rpx 0;padding-left: 50rpx;padding-right: 50rpx;">
					<view class="center" style="word-break: break-all;color:#999;white-space: pre-line;">
						{{config.desc}}
					</view>
					<view v-if="config.remark" class="color-333333 fs-24 center">
						{{config.remark}}
					</view>
				</view>

				<slot name="center"></slot>

				<view style="padding-top:0rpx;padding-bottom: 0rpx;" v-if="showBtn">

					<view>
						<view @tap.stop="close_toast(true)" style="height: 98rpx;border-top: 1rpx solid #E0E0E0;"
							class="flex-1 flex flex-x-y fs-30 bold" :style="{color:config.rightColor}">
							{{config.right}}
						</view>
						<view style="height: 5rpx;background-color: #F0F0F0;">

						</view>

						<view v-if="config.left" @tap.stop="close_toast(false)" style="height: 98rpx;"
							class="flex-1 flex flex-x-y fs-30 bold" :style="{color:config.leftColor}">
							{{config.left}}
						</view>
					</view>
					<safearea-bar></safearea-bar>
				</view>
				<view style="background-color: #F3F3F3;" :style="{height:safeArea}"></view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		name: "toast",
		data() {
			return {
				safeArea: getApp().globalData.safeArea + 'px',
				old_config: {
					title: '',
					left: '取消', //左侧文本 不屑就隐藏
					right: '确定', //右侧文本
					success: null,
					fail: null,
					desc: '', //提示内容
					rightColor: '#E64747',
					leftColor: '#333333',
				},
				config: {},
			};
		},
		props: {
			close: {
				type: Boolean,
				default: false,
			},
			showBtn: {
				type: Boolean,
				default: true,
			}
		},
		methods: {

			open(config = {}) {

				this.config = {
					...this.old_config,
					...config
				};
				this.$refs.toast.open();
			},
			close_toast(status) {
				this.$refs.toast.close();
				if (status) {
					this.config.success?.();
				} else {
					this.config.fail?.();
				}
			}
		}
	}
</script>

<style lang="scss">

</style>