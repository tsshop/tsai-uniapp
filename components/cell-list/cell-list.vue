<template>
	<view class="cell-list br-20 hidden" :style="{background}">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name: "cell-list",
		props: {
			background: {
				type: String,
				default: '#FFFFFF'
			},
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">

</style>
