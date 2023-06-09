<template>
	<view class="flex flex-x-y pr" @tap.stop="to_cai">
		<image src="../../static/ai/cai1.png" v-if="!cai" style="width: 30rpx;height: 31rpx;"></image>
		<image src="../../static/ai/cai2.png" v-else style="width: 30rpx;height: 31rpx;" :class="image_parent"></image>
		<view class="color-999999 fs-30 ml-10">踩</view>

		<view class="image-like-box">
			<view class="pr">
				<!-- 图片 -->
				<image src="../../static/ai/cai2.png" class="image-default-style" :class="image_class"></image>
				<!-- 图片 -->
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		name: 'cai',
		props: {
			score: {
				type: [String, Number],
				default: 1
			}
		},
		data() {
			return {
				// image_class:'image-animation',
				image_class: '',
				image_parent: '',
				cai: false,
			}
		},
		created() {
			if (this.score == 3) {
				this.cai = true;
			}
		},
		methods: {
			to_cai() {
				this.cai = !this.cai;
				if (this.cai) {
					this.start();
					this.image_parent = 'image-parent';
				} else {
					this.image_parent = '';
				}
				this.$emit('change',this.cai?3:1);
			},
			start() {
				this.stop();
				clearTimeout(this.timer1);
				this.$nextTick(() => {
					this.timer1 = setTimeout(() => {
						this.image_class = 'image-animation';
					});
				}, 20);

			},
			stop() {
				this.image_class = '';
			}
		}
	}
</script>

<style lang="scss">
	.image-like-box {
		position: absolute;
		top: 0;
		left: 0;
	}

	.image-default-style {
		width: 30rpx;
		height: 31rpx;
		opacity: 0;
	}

	.image-animation {

		animation: image-animation 0.7s;
	}

	@keyframes image-animation {
		0% {
			display: block;
			opacity: 1;
			transform: translateY(0) scale(0.8);
		}

		100% {
			display: block;
			opacity: 0;
			transform: translateY(40rpx) scale(0.8);
		}
	}

	.image-parent {
		animation: image-parent 0.3s linear;
	}

	@keyframes image-parent {
		0% {

			transform: translateY(0rpx) scale(1.1);
		}



		50% {

			transform: translateY(0rpx) scale(1.05);
		}



		100% {

			transform: translateY(0rpx) scale(1);
		}
	}
</style>