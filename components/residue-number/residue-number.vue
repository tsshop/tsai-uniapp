<template>
	<view v-if="!showClear && user_info.vip"></view>
	<view v-else class="fixed" :style="{top:customBar}" style="margin-top: 40rpx;">
		<view class="fs-26 color-999999 flex flex-y-center flex-x-b"
			style="background-color: #F6F6F6;padding-bottom: 10rpx;padding-left: 28rpx;padding-right: 28rpx;">
			<view style="opacity: 0;" showClear>清除聊天</view>
			<view class="flex-1 flex flex-y-center flex-x-center over-line1">
				<template v-if="!user_info.vip">
					<view>剩余条数:{{user_info.number}}条</view>
					<view class="" @tap.stop="toPage('/pages/user/user?openNumber=1','',true)"
						style="margin-left: 24rpx;white-space: nowrap;">
						购买条数获取额度
					</view>

				</template>
			</view>
			<view class="color" v-if="showClear" @tap.stop="clear_number">清除聊天</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "residue-number",
		props: {
			showClear: {
				type: Boolean,
				default: true,
			}
		},
		data() {
			return {
				customBar: getApp().globalData.customBar + 'px',
			};
		},
		methods: {
			clear_number() {
				this.$emit('clear');
			},
		}
	}
</script>

<style>

</style>