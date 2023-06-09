<template>
	<view>
		<custom title="条数记录" fixed="fixed"></custom>

		<view class="bg-FFFFFF" style="padding: 0 146rpx;">
			<tabs @change="tab_change" :list="tabs_list"></tabs>
		</view>

		<view style="padding: 0 28rpx;">



			<view style="border-radius: 30rpx;margin-top: 26rpx;" class="bg-FFFFFF">
				<view v-for="(item,index) in list" :key="index" class="share-item">
					<view style="padding: 44rpx 24rpx 44rpx 42rpx;;line-height: 34rpx;" class="flex flex-y-center">
						<view class="flex-1">
							<view class="fs-30 color-333333 bold flex-1">
								{{item.title}}
							</view>
							<!-- <view class="over-line1  fs-26 color-999999 mt-10">到期时间:2023-04-01</view>
							<view class="over-line1  fs-26 color mt-10">到期时间:2023-04-01</view> -->
							<view class="over-line1  fs-26 color-999999 mt-10" :class="item.color?'color':''">
								到期时间:{{item.time}}</view>
						</view>
						<view class="fs-26 ml-20 flex flex-y-center">
							<view>已用</view>
							<view style="padding: 0 6rpx;">:</view>
							<view class="fs-30 color bold">{{item.number}}/{{item.allNumber}}</view>
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
		buyNumberHistory
	} from '@/api/index.js';
	export default {

		data() {
			return {
				statusbar: getApp().globalData.statusBar + 'px',
				tabs_list: [{
						name: '全部记录',
						id: 1
					},
					{
						name: '即将过期',
						id: 2
					},

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
					// list: [],
					is_null: false,
				})

				this.get_list();
			},
			get_list(page = 1) {
				let data = {};
				if (this.tab_index == 1) {
					data.isExpire = true;
				}
				let tiemNow = new Date().getTime();
				buyNumberHistory(data).then(res => {
					if (!this.rsuccess(res)) return;
					let list = res.data || [];
					let remarkArr = ['', '购买条数', '新用户赠送', '分享奖励'];
					list.forEach(val => {
						if (val.validEndTime != 253402271999000) {

							val.time = this.dateFormat('YYYY-mm-dd', new Date(val.validEndTime));
						} else {
							val.time = '-----------------';
						}
						if (val.validEndTime - (259200000) < tiemNow) {
							val.color = true;
						}

						val.title = `${remarkArr[val.type] || ''} ${val.allNumber}条`;
						val.number = val.allNumber - val.residueNumber;
					});

					this.list = list;

					this.is_null = true;


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