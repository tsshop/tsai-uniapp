<template>
	<view>
		<custom title="个人信息" fixed="fixed"></custom>
		<view class="flex">
			<view class="flex-content" style="">
				<view class="color-333333" style="font-size: 42rpx;line-height: 40rpx;margin-top: 40rpx;">编辑个人信息</view>

				<!-- 头像 -->
				<view class="flex flex-y flex-x-y" style="margin-top: 48rpx;">
					<view class="pr" style="height: 164rpx;width: 164rpx;">
						<qq-image :url="form.avatarUrl"
							imageStyle="background:#f4f5f6;;width:164rpx;height:164rpx;border-radius:50%;">
						</qq-image>

					</view>
					<view class="mt-20 fs-26 color-999999">选择头像</view>
				</view>
				<!-- 头像 -->

				<!-- 选择头像 -->
				<view class="flex flex-y-center flex-x-b" style="padding: 50rpx 0rpx 30rpx 0;">
					<view v-for="(item,index) in 6" :key="index"
						@touchstart="choose_local_avatar('../../static/ai/avatar'+item+'.jpg')">
						<image :src="'../../static/ai/avatar'+item+'.jpg'" class="choose-item-image"
							:class="('../../static/ai/avatar'+item+'.jpg' == form.avatarUrl)?'active-image':''"></image>
					</view>
				</view>
				<!-- 选择头像 -->

				<view class="userinfo-item flex-y-center">
					<view class="userinfo-title">昵 称</view>
					<input maxlength="12" :adjust-position="false" placeholder="请输入昵称" type="text" v-model="form.name">
				</view>





			</view>
		</view>

		<fixed-bottom height="200rpx" v-if="show_save">
			<view class="flex flex-x-y" style="padding-top: 20rpx;padding-bottom: 50rpx;">
				<view class="default-btn" style="width: 550rpx;" @tap.stop="save">保存</view>
			</view>
		</fixed-bottom>

		<!-- <powers ref="powers"></powers> -->
	</view>
</template>

<script>
	let utils = require('../../utils/util');
	export default {
		data() {
			return {
				form: {
					avatarUrl: '',
					name: '',
				},
				old_form: {},
			}
		},
		computed: {
			show_save() {
				return JSON.stringify(this.form) != JSON.stringify(this.old_form);
			},
		},
		onLoad() {
			let {
				name,
				avatarUrl,
			} = this.user_info;
			this.form = {
				name,
				avatarUrl,
			};
			this.old_form = this.clone(this.form);
		},
		methods: {
			
			choose_local_avatar(avatar) {
				this.form.avatarUrl = avatar;
			},
			save() {
				let name = String(this.form.name);
				if (name.length == 0) {
					this.showToast('昵称不能为空');
					return;
				}
				if (name.length > 12) {
					this.showToast('昵称长度不能超过12');
					return;
				}
				this.request({
					url: '/user/updateInfo',
					method: 'POST',
					data: {
						...this.form,
					}
				}).then(res => {
					if (res.status != 200) return;
					this.showToast('修改成功');
					this.$store.dispatch('refresh_user');
					this.old_form = this.clone(this.form);
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
		@include createAnimation;
	}

	.userinfo-item {
		display: flex;
		/* align-items: center; */
		padding: 32rpx 0;
		border-bottom: 1px solid #E6E6E6;
		overflow: hidden;
		/* width: 100%; */
		/* width:400rpx; */
		width: 690rpx;
	}

	.userinfo-item+.userinfo-item {}

	.userinfo-title {
		font-size: 28rpx;
		font-weight: bold;
		color: #333333;
		width: 150rpx;
	}

	.userinfo-item input {
		flex: 1;
		font-size: 28rpx;
		color: #333333;
	}

	.userinfo-item textarea {
		flex: 1;
		font-size: 28rpx;
		color: #333333;
	}

	.gender {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 168rpx;
		height: 72rpx;
		border-radius: 10rpx;
		border: 1px solid #999999;
		border-color: #999999;
		font-size: 28rpx;
		color: #333333;
		margin-right: 24rpx;
		transition: all 0.2s;

	}

	.active-gender {
		background-color: $bgColor;
		color: #FFFFFF;
		border-color: $bgColor;
	}

	.choose-item-image {
		width: 96rpx;
		height: 96rpx;
		border-radius: 50%;
		background-color: #f4f4f4;
		transition: all 0.3s;
		opacity: 0.86;
		border: 1rpx solid #FFFFFF;
	}

	.choose-item-image.active-image {
		transform: translateY(-4rpx) scale(1.1);
		opacity: 1;
		box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.1);
		border: 1rpx solid $bgColor;
		-webkit-box-reflect: below 6rpx -webkit-linear-gradient(top, rgba(255, 0, 0, 0), rgba(255, 0, 0, 0), rgba(255, 0, 0, 0), rgba(255, 0, 0, 0.2));

	}
</style>