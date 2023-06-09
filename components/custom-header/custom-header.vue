<template>
	<view>
		<custom :doubleClick="false" fixed="fixed" title="" mode="2" :background="background" :hiddenBtn="true">

			<view style="overflow: visible;" slot="left">
				<image @tap.stop="toPage('/pages/user/user')" :src="user_info.avatarUrl || '../../static/ai/avatar6.jpg'" class="header-image">
				</image>
			</view>


			<!-- tab -->
			<view slot="center">
				<view style="width: 200rpx;">
					<qq-tabs :index="tabsIndex" @change="change" :disabled="true" :list="tabs_list"></qq-tabs>
				</view>
			</view>
			<!-- tab -->

		</custom>
	</view>
</template>

<script>
	export default {
		name: "custom-header",
		props: {
			tabsIndex: {
				type: Number,
				default: 0
			},
			background: {
				type: String,
				default: "#FFFFFF"
			}

		},
		data() {
			return {
				tabs_list: [
					//
					{
						name: '发现',
						id: 1,
						path: '/pages/index/index'
					},
					{
						name: '对话',
						id: 2,
						path: '/pages/questions/questions'
					}
				],
			};
		},
		methods: {
			change(index) {
				this.toPage(this.tabs_list[index].path, 'switch', true);
			}
		}
	}
</script>

<style lang="scss">
	.header-image {
		width: 76rpx;
		height: 76rpx;
		border-radius: 50%;
		background-color: #f1f1f1;
		margin-left: 10rpx;
	}
</style>