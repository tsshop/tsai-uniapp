<template>
	<view>
		<view style="margin-top: 25rpx;" class="flex flex-y-center pr">
			<textarea v-model="keyword" class="fs-26 search-input" type="text" :auto-height="true"
				placeholder="输入你的问题..." placeholder-class="color-999999"></textarea>
			<view style="width: 72rpx;"></view>
			<!-- 搜索按钮 -->

			<view @tap.stop="search" class="search-btn" hover-class="click-slace" hover-start-time="1"
				hover-stay-time="300">
				<image src="../../static/ai/search.png" style="width: 100%;height: 100%;"></image>
			</view>

			<!-- 搜索按钮 -->
		</view>
		<view style="height: 80rpx;"></view>
	</view>
</template>

<script>
	export default {
		name: "index-search",
		data() {
			return {
				keyword: '',
			};
		},
		methods: {
			search() {
				if (this.login()) return;
				if (String(this.keyword).trim().length == 0) {
					this.showToast('请输入你的问题哦');
					return;
				}



				this.click(() => {
					if (this.user_info.number <= 0 && !this.user_info.vip) {
						this.showToast('请先购买次数或者充值会员');
						this.toPage('/pages/user/user?openNumber=1', '', true);
						return;
					}
					getApp().globalData.searchCode = String(this.keyword).trim();
					this.keyword = '';
					this.toPage('/pages/questions/questions', 'switch');
				});
			}
		}
	}
</script>

<style lang="scss">
	.search-input {

		border-radius: 80rpx;
		background: #F2F2F2;
		margin-left: 28rpx;
		padding-left: 44rpx;
		color: #333333;
		flex: 1;
		padding-right: 90rpx;
		line-height: 34rpx;
		padding-top: 34rpx;
		padding-bottom: 34rpx;
	}

	.search-btn {
		width: 172rpx;
		height: 179rpx;
		position: absolute;
		right: 0rpx;
		top: 50%;
		transform: translateY(-50%);
		transition: all 0.3s;
	}

	.click-slace {
		transform: translateY(-50%) scale(1.1);
	}
</style>