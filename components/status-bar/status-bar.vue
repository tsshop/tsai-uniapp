<template>
	<view>
		<view :style="{height:statusBar}"></view>
	</view>
</template>

<script>
	export default {
		name: "status-bar",
		data() {
			return {
				statusBar: getApp().globalData.statusBar + 'px',
			};
		}
	}
</script>

<style>

</style>