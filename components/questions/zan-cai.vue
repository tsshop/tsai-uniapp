<template>
	<view class="flex flex-y-center" style="min-width: 280rpx;">
		<view class="flex-1 flex flex-y-center">
			<like ref="likeC" @change="change_like" :score="info.score" :id="info.id"></like>
			<view style="margin-left: 40rpx;">
				<cai ref="caiC" :score="info.score" @change="change_like" :id="info.id"></cai>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		templateChangeLike
	} from '@/api/index.js';
	import like from './like.vue';
	import cai from './cai.vue';
	export default {
		name: 'zan-cai',
		props: {
			info: {
				type: Object,
				default: () => {}
			}
		},
		components: {
			like,
			cai
		},
		data() {
			return {
				score: 1,
			}
		},
		created() {
			//初始化状态
			this.score = this.info.score || 1;
		},

		methods: {
			change_like(score) {
				console.log('ss', score)


				if (score == 1) {
					this.$refs.likeC.like = false;
					this.$refs.caiC.cai = false;
				}
				if (score == 2) {
					this.$refs.caiC.cai = false;
				}
				if (score == 3) {
					this.$refs.likeC.like = false;
				}
				templateChangeLike(this.info.rid || this.info.id, score);
			},
		}
	}
</script>

<style>
</style>