<template>
	<view>
		<custom title="设置" fixed="fixed"></custom>


		<view class="flex">
			<view class="flex-content">


				<cell-list class="mt-20">
					<cell @click="toPage('/pages/user/userinfo-edit','',true)" title="用户信息"></cell>
					<cell title="手机号" type="none">
						<view slot="right" class="color-999999 fs-26">
							{{user_info.phone}}
						</view>
					</cell>
					<cell @click="toPage('/pages/user/password','',true)" title="修改密码"></cell>
				</cell-list>


				<cell-list class="mt-20">
					<cell @click="login_out" title="" type="none">
						<view class="flex-1 flex flex-x-y color fs-30" slot="titleRight">退出登录</view>
					</cell>

				</cell-list>


			</view>
		</view>



		<toast ref="toast"></toast>


	</view>
</template>

<script>
	import {
		loginOutRequest
	} from '@/api/index.js';
	export default {

		data() {
			return {


			};
		},



		methods: {
			login_out() {
				this.$refs.toast.open({
					title: '',
					desc: '确认退出登录',
					right: '确认',
					success: () => {
						this.less(this.to_out());
					}
				});
			},
			to_out() {
				loginOutRequest().then(() => {
					uni.setStorageSync('invite', '');
					uni.setStorageSync('ACCESS_TOKEN', '');
					this.vuexSet('user_info', {}, true);
					this.toPage('/pages/login/login','relaunch');
				});
			},
		},
	}
</script>

<style lang="scss">
	page {
		background-color: $pageColor;
	}
</style>