<template>
	<view class="gggg">
		<custom title="意见反馈" fixed="fixed">


		</custom>

		<view class="flex">
			<view class="flex-content">


				<view class="bg-FFFFFF mt-20 br-20">
					<view class="pr">
						<textarea placeholder="输入投诉说明......" v-model="remark" :maxlength="200"
							class="remark-box"></textarea>

						<view class="remark-num">
							{{get_num()}}/200
						</view>
					</view>
				</view>




				<!-- <view class="mt-20 bg-FFFFFF br-20" style="padding: 6rpx 0 20rpx 20rpx;">
					<upload desc="图片" @change="chang_image" ref="upload" marginRight="16rpx" marginTop="14rpx"
						:length="8" width="150rpx" height="150rpx"></upload>
				</view>
 -->
				<view style="height: 50rpx;"></view>


			</view>


		</view>

		<fixed-bottom>
			<view class="flex flex-x-y create-hidden" style="padding-bottom: 50rpx;">
				<view hover-class="click-o" class="default-btn" @tap.stop="submit" style="width: 550rpx;">
					发送
				</view>
			</view>
		</fixed-bottom>
		<toast ref="toast"></toast>
	</view>
</template>

<script>
	import {feedBackAdd} from '@/api/index.js';
	export default {
		data() {
			return {
				feedback_type: {
					'friend': '单聊投诉',
					'group': '群聊投诉',
					'app': '反馈建议'
				},
				feedback_index: 'app',
				remark: '',
				mobile: '',
				img_list: [],
				name: '',
				reportedId: '',
			}
		},
		onLoad(e) {
			if (e.type) {
				this.feedback_index = e.type;
			}
			if (e.reportedId) {
				this.reportedId = e.reportedId;
			}
		},
		methods: {
			change_type(index) {
				this.feedback_index = index;
			},
			get_num() {
				let num = String(this.remark).trim().length;
				return num >= 200 ? 200 : num;
			},
			chang_image(list) {
				console.log('ssss', list);
				this.img_list = list.filter(val => val.id).map(val => val.src);
			},
			get_feedback_type(type) {
				switch (type) {
					case 'app':
						return 1;
					case 'group':
						return 3;
					case 'friend':
						return 2;
				}
			},
			submit() {

				this.click(() => {
					if (this.remark.trim().length == 0) {
						this.showToast('请输入投诉说明哦');
						return;
					}

					// if (!(/^1[3456789]\d{9}$/.test(this.mobile))) {
					// 	this.showToast("请输入正确的联系方式");
					// 	return;
					// }
					feedBackAdd(this.remark.trim()).then(res => {
						if (!this.rsuccess(res)) return;
						this.$refs.toast.open({
							left: '',
							desc: '反馈成功',
							success: () => {
								this.uniBack();
							}
						});
					});
				});

			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $pageColor;
		@include createAnimation;
	}

	.type-item {
		width: 180rpx;
		height: 60rpx;
		border-radius: 36rpx;
		background-color: rgba(109, 158, 251, 0.4);
		margin-right: 32rpx;
		font-size: 26rpx;
	}

	.remark-box {
		font-size: 28rpx;
		color: #333;
		width: 100%;
		min-height: 218rpx;

		border-radius: 8rpx;
		padding: 24rpx;
	}

	.remark-num {
		position: absolute;
		z-index: 3;
		right: 32rpx;
		bottom: 24rpx;
		font-size: 28rpx;
		color: #999;
	}
</style>