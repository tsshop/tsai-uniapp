<template>
	<view>
		<custom title="购买记录" fixed="fixed"></custom>

		<!-- <view class="bg-FFFFFF" style="padding: 0 80rpx;">
			<tabs :list="tabs_list"></tabs>
		</view> -->

		<view style="padding: 0 28rpx;">



			<view style="border-radius: 30rpx;margin-top: 26rpx;" class="bg-FFFFFF">
				<view v-for="(item,index) in list" :key="index" class="share-item">
					<view style="padding: 44rpx 24rpx 44rpx 42rpx;;line-height: 34rpx;" class="">
						<view class="flex flex-x-b">
							<view class="fs-30 color-333333 bold flex-1">{{item.remark}}</view>
							<view class="over-line1 ml-20 fs-26 color-999999">已完成</view>
							<!-- <view class="over-line1 ml-20 fs-26 color-999999">已取消</view> -->
						</view>
						<view class="fs-26 color-999999 mt-10">2023-03-11 15:12:21</view>
						<view class="flex flex-x-b mt-10">
							<view class="fs-26 color-999999">订单号：{{item.orderNo}}</view>
							<view class="over-line1 ml-20 fs-32 color bold">¥{{item.payAmt}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>



		<qq-footer :show="is_null" :list="list"></qq-footer>
	</view>
</template>

<script>
	import { buyVipHistory} from '@/api/index.js';
	export default {

		data() {
			return {
				statusbar: getApp().globalData.statusBar + 'px',
				tabs_list: [{
						name: '全部记录',
						id: 1
					},
					{
						name: '购买VIP',
						id: 2
					},
					{
						name: '购买条数',
						id: 3
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
					list: [],
					is_null: false,
				})

				this.get_list();
			},
			get_list(page = 1) {
				let data = {
					page: page,
					size: 20,
				};
				if (this.tab_index > -1 && this.tabs_list.length > 0) {
					data.goodsType = this.tabs_list[this.tab_index].id || ''
				}
				buyVipHistory({}).then(res => {
					if (!this.rsuccess(res)) return;
					let list = res.data || [];

					list.forEach(val => {
						val.time = this.dateFormat('YYYY-mm-dd HH:MM:SS', new Date(val.createTime));
					});

					this.list = this.list.concat(list || []);




					if (res.data?.length < 20) {
						this.is_null = true;
					} else {
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