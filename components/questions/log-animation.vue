<template>
	<text style="display: inline-block;
		font-size: 30rpx;
		color: #333333;
		line-height: 42rpx;
		letter-spacing: 0.6rpx;
		word-break: break-word;" class="fs-26">
		{{text}}
	</text>
</template>

<script>
	export default {
		name: 'log-animation',
		props: {
			content: {
				type: [String, Number],
				default: '',
			},
			id: {
				type: [String, Number],
				default: '',
			}
		},
		data() {
			return {
				text: '',
			}
		},
		created() {
			if (!this.content) {
				uni.$emit('stopAnimation', this.id);
				return;
			}
			this.startAni();
		},
		methods: {
			startAni() {
				this.timterPage = setInterval(()=>{
					uni.$emit('toLate');
				},200);
				clearTimeout(this.timerAni);
				let run_ = () => {
					if (this.text.length >= this.content.length) {
						this.stopAni();
						return;
					}
					let i = this.text.length;

					this.text += this.content.substr(i, 1);
					this.timerAni = setTimeout(() => {
						run_();
					}, 40);
				}
				run_();
			},
			stopAni() {
				clearInterval(this.timterPage);
				clearTimeout(this.timerAni);
				uni.$emit('stopAnimation', this.id);
				console.log('动画结束');
			},
		},

	}
</script>

<style>
	
</style>