<template>
	<view>
		<custom title="模板中心" fixed="fixed"></custom>

		<view class="bg-FFFFFF" style="padding: 22rpx 28rpx;">
			<search v-model="keyword" placeholder="请输入模板关键词" bgColor="#F6F6F6"></search>
		</view>

		<view :style="'height: calc(100vh - '+customBar+' - 114rpx)'" class="flex">


			<!-- 左侧分类 -->
			<scroll-view :scroll-y="true" class="left-scroll">
				<view class="pr">
					<view @tap.stop="tab_change(index)" class="tpl-item"
						:class="tab_index == index?'tpl-item-active':''" v-for="(item,index) in get_key_list"
						:key="index">
						<text class="over-line1">{{item.name}}</text>
					</view>
					<!-- 滑块 -->
					<view class="scroll-solid" v-if="get_key_list.length>0" :style="{top:(tab_index*90)+'rpx'}">
						<view class="pr">
							<view class="scroll-solid-bg"></view>
						</view>
					</view>
					<!-- 滑块 -->
				</view>
			</scroll-view>
			<!-- 左侧分类 -->

			<!-- 右侧 -->
			<view class="flex-1 flex">
				<scroll-view :scroll-into-view="scrollTopId" :scroll-y="true" class="ml-20 mr-20">
					<view id="scrollTopId" style="height: 1rpx;"></view>
					<view @tap.stop="toPage('/pages/questions/template?id='+item.id,'',true)" hover-class="click-bg"
						hover-start-time="1" hover-stay-time="200" v-for="(item,index) in get_check_list()" :key="index"
						class="bg-FFFFFF mt-20 br-20" style="padding: 28rpx;transition: all 0.3s;">
						<view class="tpl-title">{{item.name}}</view>
						<view class="tpl-desc">
							{{item.blurb}}
						</view>
					</view>
					<view style="height: 20rpx;"></view>
					<qq-footer text="" footer="" :show="is_null" :list="get_check_list()"></qq-footer>
				</scroll-view>
			</view>
			<!-- 右侧 -->


		</view>




		<!-- <qq-footer :show="is_null" :list="list"></qq-footer> -->
	</view>
</template>

<script>
	import {
		templateList,
	} from '@/api/index.js';
	export default {

		data() {
			return {
				customBar: getApp().globalData.customBar + 'px',
				tabs_list: [
					//
					{
						name: '写作辅助'
					},
					{
						name: '故事/文章'
					},
					{
						name: '发散思维'
					},
					{
						name: '编程开发'
					},
					{
						name: '点评/评鉴'
					},
					{
						name: '知识百科'
					},
					{
						name: '语言翻译'
					}
				],
				tab_index: 0,
				list: [],
				page: 1,
				is_null: false,
				scrollTopId: '',
				keyword: '',
			};
		},

		computed: {
			get_left() {
				if (this.tab_index > 3) {
					return 35 * this.tab_index;
				}
				return 0;
			},
			get_key_list() {
				this.tab_index = 0;
				return this.list.filter(val => {
					return !this.keyword || val.templateList.filter(val2 => {
						return  JSON.stringify(val2).indexOf(this.keyword) > -1;
					}).length > 0;
				});
			},
		},
		onLoad() {


			this.getTemplateList();


		},

		methods: {
			tab_change(index) {
				this.tab_index = index;
				this.scrollTopId = '';
				this.$nextTick(() => {
					this.scrollTopId = 'scrollTopId';
				});
				// this.init();
			},
			getTemplateList() {

				if (this.login()) {
					return;
				}
				templateList().then(res => {
					if (!this.rsuccess(res)) return;

					this.list = res.data || [];
					this.is_null = true;
				});
			},
			get_check_list() {
				if (this.get_key_list.length == 0) return [];
				if (this.tab_index < this.get_key_list.length) {
					return this.get_key_list[this.tab_index].templateList.filter(val => {
						return !this.keyword || JSON.stringify(val).indexOf(this.keyword) > -1;
					});
				}
				return this.list[0].templateList.filter(val => {
					return !this.keyword || JSON.stringify(val).indexOf(this.keyword) > -1;
				});;
			},


		},
	}
</script>

<style lang="scss">
	page {
		background-color: $pageColor;
		@include createAnimation;
	}

	.left-scroll {
		width: 200rpx;
		background-color: #FFF;
		padding-top: 20rpx;
	}

	.tpl-item {
		height: 90rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 28rpx;
		color: #333333;
		padding: 0 10rpx;
		position: relative;
		z-index: 10;
		transition: all 0.2s;

	}

	.tpl-item.tpl-item-active {
		// font-weight: bold;
		color: $color;
	}

	.scroll-solid {
		position: absolute;
		width: 200rpx;
		height: 90rpx;
		background-color: rgba(253, 119, 71, 0.06);
		left: 0;
		top: 0;
		transition: all 0.3s;
	}

	.scroll-solid-bg::after {
		content: '';
		position: absolute;
		height: 90rpx;
		width: 8rpx;
		border-radius: 0 6rpx 6rpx 0;
		background-color: $bgColor;
	}

	.tpl-title {
		font-size: 30rpx;
		color: #333;
		font-weight: 700;
		line-height: 40rpx;
	}

	.tpl-desc {
		font-size: 28rpx;
		color: #999999;
		line-height: 40rpx;
		margin-top: 12rpx;
	}

	.click-bg {
		background-color: #f9f9f9;
	}
</style>