<template>
	<view>
		<view class="pr bg-FFFFFF" style="z-index: 3;">
			<custom-header></custom-header>


			<!-- 标题 搜索 -->
			<view>
				<view
					style="height: 380rpx;background:url(../../static/ai/index-bg.jpg) right top / 235rpx 100% no-repeat">

					<view class="index-title-box">
						<view>AI小助手</view>
						<view>提出你想问的问题</view>
					</view>

				</view>

				<index-search></index-search>

			</view>
			<!-- 标题 搜索 -->


		</view>



		<!-- 模板标题 -->
		<view class="bg-FFFFFF fixed" :style="{top:customBar}" style="padding-top: 50rpx;">
			<view @tap.stop="toPage('/pages/template-list/template-list','',true)"
				style="height: 130rpx;background-color: #F2F2F2;border-radius: 40rpx 40rpx 0 0;padding: 0 28rpx;padding-top: 0rpx;"
				class="flex flex-y-center flex-x-b">
				<view class="index-title">你可以问它</view>
				<view class="flex flex-x-y color fs-26 more-btn-index">
					<view>更多内容</view>
					<view class="iconfont icon-jinru w-20"></view>
				</view>
			</view>
		</view>
		<!-- 模板标题 -->


		<view class="flex">
			<view class="flex-content">
				<view v-for="(item,index) in list" :key="index"
					@tap.stop="toPage('/pages/questions/template?id='+item.id,'',true)"
					style="margin-bottom: 24rpx;background-color: #FFF;border-radius: 20rpx;padding: 30rpx 28rpx;line-height: 40rpx;"
					:style="index==0?'background-color:#FD7747':''">

					<view class="fs-28 color-333333 blod" style="margin-bottom: 0rpx;"
						:style="index==0?'color:#FFF;':''">{{item.name}}</view>
					<view class="color-999999 fs-26" :style="index==0?'color:#FFF;':''">
						{{item.blurb}}
					</view>
				</view>
				<qq-footer :show="is_null" text="" :list="list"></qq-footer>
			</view>

		</view>
	</view>
</template>

<script>
	import {
		indexListRequest
	} from '@/api/index.js';
	export default {
		data() {
			return {
				customBar: getApp().globalData.customBar + 'px',
				list: [],
				is_null: false,
			}
		},
		onLoad() {
			uni.hideTabBar();
			this.getTemplateList();
			getApp().globalData.searchCode = '';
		},
		methods: {
			getTemplateList() {

				if (this.login()) {
					return;
				}
				indexListRequest().then(res => {
					if (!this.rsuccess(res)) return;

					this.list = res.data || [];
					this.is_null = true;
				});
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F2F2F2;
	}

	.index-title {
		font-size: 34rpx;
		font-weight: bold;
		position: relative;
		padding-left: 18rpx;
	}

	.index-title-box {
		padding-top: 170rpx;
		color: #3E424D;
		font-size: 56rpx;
		line-height: 72rpx;
		padding-left: 40rpx;
		font-weight: bold;

	}

	.index-title::after {
		content: '';
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		background-color: $bgColor;
		width: 8rpx;
		height: 32rpx;
		border-radius: 3rpx;
		left: 0rpx;
	}

	.more-btn-index {
		height: 60rpx;
		border-radius: 20rpx;
		background-color: #FFFFFF;
		padding: 0 24rpx;
	}
</style>