<template>
	<view>
		<custom title="分享记录" fixed="fixed"></custom>



		<view style="padding: 0 28rpx;">

			<!-- 头部 -->
			<view class="flex flex-x-y" style="margin-top: 26rpx;">
				<view
					style="width: 694rpx;height: 207rpx;border-radius: 24rpx;background: url(../../static/ai/money.jpg) left top / 100% 100% no-repeat;padding-left: 100rpx;padding-right: 84rpx;line-height: 34rpx;"
					class="flex-1 flex flex-y-center color-ffffff flex-x-b">

					<!-- 内容 -->
					<view>
						<view class="fs-30">分享人数</view>
						<view class="flex flex-y-end mt-30">
							<view class="bold" style="font-size: 56rpx;line-height: 50rpx;">
								{{totalNumberPeople}}
							</view>
							<view class="fs-26 ml-10">(人)</view>
						</view>
					</view>
					<view>
						<view class="fs-30">获取奖励条数</view>
						<view class="flex flex-y-end mt-30">
							<view class="bold" style="font-size: 56rpx;line-height: 50rpx;">
								{{allNumber}}
							</view>
							<view class="fs-26 ml-10">(条)</view>
						</view>
					</view>
					<!-- 内容 -->

				</view>
			</view>
			<!-- 头部 -->

			<view style="border-radius: 30rpx;margin-top: 26rpx;" class="bg-FFFFFF">
				<view v-for="(item,index) in list" :key="index" class="share-item">
					<view style="padding: 44rpx;line-height: 40rpx;" class="flex flex-y-center">
						<view class="flex-1 mr-20">
							<view class="fs-30 color-333333 bold">{{item.sourceUserName}}</view>
							<view class="fs-26 color-999999 mt-10">邀请时间：{{item.time}}</view>
						</view>
						<view class="flex flex-y-end color">
							<text class="bold fs-40" style="line-height: 32rpx;margin-right: 6rpx;">+</text>
							<text class="bold fs-40">{{item.allNumber}}</text>
							<text class="fs-26" style="line-height: 32rpx;margin-left: 10rpx;">(条)</text>
						</view>
					</view>
				</view>
			</view>
		</view>



		<qq-footer :show="is_null" :list="list"></qq-footer>
	</view>
</template>

<script>
	import {
		inviteList
	} from '@/api/index.js';
	export default {

		data() {
			return {
				statusbar: getApp().globalData.statusBar + 'px',
				tabs_list: [
					// {
					// 	name: '全部'
					// },
					// {
					// 	name: '全部'
					// },
					// {
					// 	name: '全部'
					// },
					// {
					// 	name: '全部'
					// },
					// {
					// 	name: '全部'
					// },
					// {
					// 	name: '全部'
					// },
					// {
					// 	name: '全部'
					// },
					// {
					// 	name: '全部'
					// },
					// {
					// 	name: '全部'
					// }
				],
				tab_index: 0,
				list: [],
				page: 1,
				is_null: false,
				allNumber: 0,
				totalNumberPeople: 0
			};
		},
		mounted() {


		},
		created() {


		},
		onShow() {


		},
		computed: {
			get_left() {
				if (this.tab_index > 3) {
					return 35 * this.tab_index;
				}
				return 0;
			},
		},
		onLoad() {


			this.init();


		},
		onReachBottom() {
			// this.get_list(this.page);
		},
		onPullDownRefresh() {


			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 200);
			this.init();

		},
		methods: {
			tab_change(index) {
				this.tab_index = index;
				this.init();
			},


			init() {
				this.setData({
					page: 1,
					list: [],
					is_null: false,
				})

				this.get_list();
			},
			get_list(page = 1) {
				// let data = {
				// 	page: page,
				// 	size: 20,
				// };
				// if (this.tab_index > -1 && this.tabs_list.length > 0) {
				// 	data.goodsType = this.tabs_list[this.tab_index].id || ''
				// }
				inviteList().then(res => {
					if (!this.rsuccess(res)) return;
					let list = res.data?.list || [];

					list.forEach(val => {
						val.time = this.dateFormat('YYYY-mm-dd HH:MM:SS', new Date(val.createTime));
					});


					this.setData({
						list: this.list.concat(list || []),
						allNumber: res.data.allNumber,
						totalNumberPeople: res.data.totalNumberPeople
					});



					this.is_null = true;
					if (res.data?.list?.length < 20) {} else {
						this.page++;
					}

				});
			}
		},
	}
</script>

<style lang="scss">
	page {
		background-color: $pageColor;
		@include createAnimation;
	}

	.share-item+.share-item {
		border-top: 1rpx solid #EFEFEF;
	}
</style>