<template>
	<view>
		<view class="q-input-box hidden aaaaaaaa">
			<view class="q-input-line">

				<view class="flex-1 flex input-box-all" :style="styleOther">
					<textarea v-model="keyword" :focus="focus" @focus="input_focus" @blur="input_blur"
						@linechange="linechange" :adjust-position="false" :hold-keyboard="true" maxlength="600"
						:placeholder="placeholder" placeholder-class="fs-26 color-999999" class="q-input"
						:auto-height="true" :style="styleInput"></textarea>
				</view>
				<view @tap.prevent="send" @touchend.prevent="send" hover-class="click-slace" hover-start-time="1" style="width: 140rpx;"
					class="pr">

					<view style="position: absolute;top:-38rpx;left:-12rpx;">
						<image src="../../static/ai/search.png" style="width: 154rpx;height: 162rpx;user-select: none;">
						</image>
					</view>

				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		name: 'bottom-input',
		data() {
			return {
				focus: false,
				inputBarHeight: 0,
				keyword: '',
				disabledLast: true,
				defaultHiehgt: 0,
			}
		},
		props: {
			placeholder: {
				type: String,
				default: '输入你的问题...'
			},
			styleOther: {
				type: String,
				default: ''
			},
			styleInput: {
				type: String,
				default: ''
			},
		},
		mounted() {
			this.get_bar_height();
		},
		methods: {
			input_focus() {

				this.focus = true;


				// #ifdef H5 || APP-PLUS
				this.$emit('heightChange', this.inputBarHeight);
				// #endif
			},
			input_blur() {
				this.focus = false;
			},
			linechange() {
				// 行高发生改变
				this.$nextTick(() => {
					this.get_bar_height();
				});
			},
			get_bar_height() {
				uni.createSelectorQuery().in(this).select('.aaaaaaaa').boundingClientRect(data => {
					console.log('aaaaaaaa', data);
					this.inputBarHeight = data.height;
					if (this.defaultHiehgt == 0) {
						this.defaultHiehgt = data.height;
					}
					if (this.disabledLast) {
						this.$emit('heightChange', this.inputBarHeight);
					}
				}).exec();
			},
			send() {
				if (this.user_info.number <= 0 && !this.user_info.vip) {
					
					this.toPage('/pages/user/user?openNumber=1', '', true);
					return;
				}
				if (String(this.keyword).trim().length == 0) {
					return;
				}
				this.$emit('send', {
					text: String(this.keyword).trim(),
					h: this.defaultHiehgt
				});
				this.disabledLast = false;
				setTimeout(() => {
					this.disabledLast = true;
				}, 150);
				this.keyword = '';

			}
		}
	}
</script>

<style>
	.q-input-box {
		background-color: #FFFFFF;
		position: fixed;
		bottom: 0;
		padding-left: 28rpx;
		width: 100vw;
	}

	.q-input-line {
		margin-top: 24rpx;
		margin-bottom: 24rpx;
		display: flex;
	}

	.input-box-all {
		background-color: #F6F6F6;
		border-radius: 45rpx;
		padding: 20rpx 0;
		width: 400rpx;
	}

	.q-input {

		padding: 12rpx 40rpx;
		font-size: 26rpx;
		line-height: 30rpx;
		flex: 1;
		height: auto;
		max-height: 400rpx;
		overflow-y: scroll;
	}

	.click-slace {
		image {

			transform: translateY(-50%) scale(1.1);
		}
	}
</style>