<template>
	<view class="search-box " @tap.stop="input_click" :style="{backgroundColor:bgColor}">
		<view v-if="!hiddenSearch" class="iconfont icon-sousuo1 fs-32" style="color:#808288;" @tap.stop="search"></view>
		<input :disabled="disabled" class="fs-26 color-black" confirm-type="search" @confirm="search" @blur="search"
			v-model="password" :placeholder="placeholder" placeholder-style="font-weight:400;color:#8F8F8F;"
			placeholder-class="font" />
		<view v-if="showDel && password" @touchend.prevent="clear_input" class="search-box-del flex flex-x-y">
			<view class="iconfont icon-cuo"></view>

		</view>
	</view>
</template>

<script>
	export default {
		name: "search",
		props: {
			value: {
				type: String,
				default: ''
			},
			placeholder: {
				type: String,
				default: '搜索'
			},
			showDel: {
				type: Boolean,
				default: true,
			},
			disabled: {
				type: Boolean,
				defaule: false,
			},
			bgColor: {
				type: String,
				defaule: '#fff',
			},
			hiddenSearch: {
				type: Boolean,
				default: false,
			},
		},
		watch: {
			password() {
				this.$emit('input', String(this.password).trim());
			},
			value(newV) {
				this.password = newV
			}
		},
		created() {
			this.password = this.value;
		},
		data() {
			return {
				password: '',
			};
		},
		methods: {
			clear_input() {
				this.password = '';
				this.$emit('input', String(this.password).trim());
				this.$emit('clear', String(this.password).trim())
			},
			search() {
				this.$emit('input', String(this.password).trim());
				this.click(() => {
					this.$emit('search', String(this.password).trim());
				});


			},
			input_click() {

				this.disabled && this.$emit('search', String(this.password).trim());
			},
		}
	}
</script>

<style scoped>
	.search-box {
		width: 100%;
		height: 70rpx;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		padding: 0 32rpx;
		padding-left: 24rpx;
		/* box-shadow: 0px 0px 8rpx 0px rgba(68, 68, 68, 0.11); */
		position: relative;
		overflow: hidden;
	}

	.search-box input {
		flex: 1;
		height: 64rpx;
		line-height: 64rpx;
		padding-left: 14rpx;
		font-weight: 400;
	}

	.search-box-del {
		position: absolute;
		right: 20rpx;
		top: 50%;
		transform: translateY(-50%);
		width: 50rpx;
		height: 50rpx;
		background-color: rgba(0, 0, 0, 0);
		z-index: 3;
	}

	.search-box-del view {
		font-size: 38rpx;
		color: #323232;
		animation: delani 0.5s;
	}

	@keyframes delani {
		0% {
			transform: translateX(0rpx) scale(0.5) rotate(-180deg);
			opacity: 0;
		}

		100% {
			transform: translateX(0rpx) scale(1) rotate(0deg);
			opacity: 1;
		}
	}
</style>