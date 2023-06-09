<template>
	<view :style="{background,height:height+'px',transition,'max-height':maxHeight + 'px'}" class="flex flex-x-y"
		style="overflow: hidden;">
		<view v-if="text != '刷新中'" class="flex flex-x-y color-333333 fs-26">{{text}}</view>
		<!-- <image class="image-show" v-else src="../../static/images/light.jpg"
			:style="{width:maxHeight + 'px',height:maxHeight+'px'}"></image> -->
		<view style="transform: scale(0.7);" v-else>
			<light></light>
		</view>
	</view>
</template>

<script>
	export default {
		name: "refresh-line",
		props: {
			background: {
				type: String,
				default: '#FFFFFF'
			}
		},
		data() {
			return {
				height: 0,
				maxHeight: 80,
				salceY: 1,
				transition: 'none',
				text: '下拉刷新',
			};
		},
		methods: {
			refresh(e) {
				if (e.type == 'start') {
					this.text = '下拉刷新';
					this.transition = 'height 0.24s';
					return;
				}
				if (e.type == 'change') {
					this.height = e.height / this.salceY;
					if (e.height <= this.maxHeight) {
						this.text = '下拉刷新';
					} else {

						this.text = '松开刷新'
					}
					if (e.height <= 0) {
						this.height = 0;
					}
					return;
				}
				if (e.type == 'end') {

					if (this.height < this.maxHeight - 4) {
						this.transition = 'height 0.2s';
						setTimeout(() => {
							this.height = 0;
						}, 50);
						return;
					}

					this.text = '刷新中'
					this.transition = 'height 0.6s';
					setTimeout(()=>{this.$emit('refresh');},500);
					setTimeout(() => {
						this.height = 0;
					}, 2000);
					return;
				}
			}
		}
	}
</script>

<style lang="scss">
	.image-show {
		animation: image-show 0.4s;
		transform: scale(0.8);
	}

	@keyframes image-show {
		0% {
			opacity: 0;
			transform: scale(0.3);
		}

		100% {
			opacity: 1;
			transform: scale(0.8);
		}
	}
</style>