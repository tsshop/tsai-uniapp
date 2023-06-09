<template>
	<view>
		<uni-popup ref="group" type="bottom">
			<view style="width: 100vw;height: 100vh;" class="flex flex-x-center" @tap.stop="close">
				<view @tap.stop="clear"
					style="width: 618rpx;height: 808rpx;background-color: #FFFFFF;border-radius: 20rpx;margin-top: 340rpx;background: #FFFFFF url(../../static/ai/wechat.jpg) left top / 100% 100% no-repeat;"
					class="pr">



					<!-- 图片 -->
					<view class="flex flex-x-y"
						style="position: absolute;left:50%;transform: translateX(-50%);top:252rpx;background-color: rgba(0,0,0,0.1);width: 360rpx;height: 360rpx;">
						<image :src="groupCode" style="width: 100%;height: 100%;"></image>
						
					</view>
					<!-- 图片 -->


				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		groupQrCode
	} from '@/api/index.js';
	export default {
		name: "add-group",
		data() {
			return {
				groupCode: '',
			};
		},

		methods: {
			open() {
				this.groupCode = uni.getStorageSync('groupCode');
				this.get_code();
				this.$refs.group.open();

			},
			close() {
				this.$refs.group.close();
			},
			get_code() {
				groupQrCode(this.groupCode ? false : true).then(res => {
					if (!this.rsuccess(res)) return;
					this.groupCode = res.data.code;
					uni.setStorageSync('groupCode', this.groupCode);
				});
			},

		},
	}
</script>

<style lang="scss">

</style>