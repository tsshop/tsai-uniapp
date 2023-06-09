<template>
	<view>
		<custom fixed="fixed" :title="info.name || ''" background="#F6F6F6"></custom>


		<!-- 剩余条数 -->
		<residue-number :showClear="false" @clear="clear_questions"></residue-number>
		<!-- 剩余条数 -->
		<view class="flex">
			<view class="flex-content">




				<!-- 内容 -->
				<view style="margin-top: 28rpx;">
					<template>
						<view v-if="defaultLog">
							<qlog :info="defaultLog"></qlog>
						</view>
					</template>

					<template>
						<view v-for="(item,index) in list" :key="item.id">
							<template>
								<qlog :showLike="true" :info="item"></qlog>
							</template>
						</view>
					</template>

				</view>
				<!-- 内容 -->

			</view>
		</view>

		<view :style="{height:input_height+'px'}"></view>
		<view id="lastId"></view>


		<bottomInput styleInput="min-height:60rpx;" styleOther="border-radius:20rpx;" :placeholder="'例：'+(info.example || '')" @send="add" ref="bottomInput"
			@heightChange="bottomInputChange"></bottomInput>

		<toast ref="toast"></toast>
	</view>
</template>

<script>
	import qlog from '@/components/questions/log.vue';
	import bottomInput from '@/components/questions/bottom-input.vue';
	import {
		sendRootMsg,
		createNewMessage,
		getMessageList,
		templateDetail
	} from '@/api/index.js';
	export default {
		components: {
			qlog,
			bottomInput,
		},
		data() {
			return {
				input_height: 0,

				list: [
					//
					// {
					// 	avatar: '../../static/ai/avatar.jpg',
					// 	id: 1,
					// 	content: 'Hi，我是您的AI小助手，有各种问题我都能解答哦~',
					// },
					// {
					// 	avatar: '../../static/ai/avatar1.jpg',
					// 	id: 2,
					// 	content: '是谁创造了你',
					// },
					// {
					// 	avatar: '../../static/ai/avatar.jpg',
					// 	id: 3,
					// 	content: '是你，我的爸爸！',
					// 	robat: true,
					// },

				],
				info: {},
			}
		},
		computed: {
			defaultLog() {
				if (this.list.length > 0) return null;
				if (!this.info.name) return null;
				return {
					avatar: '../../static/ai/avatar.jpg',
					id: 1,
					content: this.info.illustrate,
					isFromUser: true,
				}
			},
		},
		onLoad(e) {
			if (e.id) {
				this.templateId = e.id;
				this.get_detail();
			} else {
				this.uniBack();
				return;
			}
			uni.hideTabBar();
			this.get_list();
			uni.$on('stopAnimation', this.stopAnimation);
			uni.$on('toLate', this.to_last_page);
		},
		onUnload() {
			uni.$off('stopAnimation');
			uni.$off('toLate');
		},

		methods: {
			clear_questions() {

				this.$refs.toast.open({
					desc: `是否清除聊天？\n （清除后将清空聊天历史）`,
					right: '确认清除',
					success: () => {
						createNewMessage().then(res => {
							if (!this.rsuccess(res)) return;
							this.showToast('清除成功');
							this.list = [];
							this.setDefaultLog();

						})
					}
				});
			},
			bottomInputChange(h) {
				this.input_height = h;
				this.to_last_page();
			},
			to_last_page(duration = 0) {
				if (duration > 0) {
					clearInterval(this.timer1);
					uni.pageScrollTo({
						selector: '#lastId',
						duration: duration,
					});
					return;
				}
				clearInterval(this.timer1);
				this.number1 = 0;
				this.timer1 = setInterval(() => {
					this.number1++;
					if (this.number1 >= 10) {
						clearInterval(this.timer1);
						return;
					}
					uni.pageScrollTo({
						selector: '#lastId',
						duration: duration,
					});
				}, 50);
			},
			add({
				text,
				h
			}) {
				this.input_height = h;
				this.list.push({
					id: new Date().getTime(),
					// content: this.info.content.replace('$$$$',text),
					content: text,
					avatar: this.user_info.avatarUrl,
					isFromUser: true,
				});
				this.$nextTick(() => {
					this.to_last_page(250);
				}, 100);
				this.to_send_root(text);
			},
			to_send_root(text) {
				let id = new Date().getTime() + '1';
				this.list.push({
					id: id,
					content: '',
					avatar: '../../static/ai/avatar.jpg',
					isFromUser: false,
					loading: 1,
				});
				// text = this.info.content.replace('$$$$',text);
				sendRootMsg(text, this.templateId).then(res => {

					if (!this.rsuccess(res)) {
						this.showToast('请稍后重试');
						this.delONE(id);
						return;
					};
					this.$store.dispatch('refresh_user');
					this.updateList(res.data.content, id, res.data.id);
					this.$nextTick(() => {
						this.to_last_page(250);
					});
				});
			},
			updateList(content, id, rid) {
				this.list.some(val => {
					if (val.id == id) {
						val.loading = 2;
						val.content = content;
						val.rid = rid;
						this.list = this.clone(this.list);

						return true;
					}
					return false;
				});
			},
			delONE(id) {
				this.list = this.list.filter(val => val.id != id);
			},
			stopAnimation(id) {
				this.list.some(val => {
					if (val.id == id) {
						val.loading = null;
						this.list = this.clone(this.list);
						this.$nextTick(() => {
							this.to_last_page();
						});
						return true;
					}
					return false;
				});
			},
			get_list() {
				getMessageList(this.templateId).then(res => {
					if (!this.rsuccess(res)) return;
					let avatar1 = this.user_info.avatarUrl;
					let avatar2 = '../../static/ai/avatar.jpg';
					let data = res.data || [];
					data.forEach(val => {
						val.avatar = val.isFromUser ? avatar1 : avatar2;
					});
					this.list = data;
					this.is_null = true;



					// this.getLastSerach();
				});
			},
			setDefaultLog() {
				this.defaultLog = {
					avatar: '../../static/ai/avatar.jpg',
					id: 1,
					content: 'Hi，我是您的AI小助手，有各种问题我都能解答哦~',
					isFromUser: true,
				};
			},
			getLastSerach() {
				let keyword = getApp().globalData.searchCode;
				if (keyword) {
					setTimeout(() => {
						getApp().globalData.searchCode = '';
						this.add({
							text: keyword,
							h: this.input_height,
						});
					}, 200);
				}
			},
			get_detail() {
				templateDetail(this.templateId).then(res => {
					if (!this.rsuccess(res) || !res.data) {
						this.uniBack();
						return;
					};
					this.info = res.data;
				});
			},

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F6F6F6;
	}
</style>