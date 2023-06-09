<template>
	<view>
		<view :style="{height:safeAreaBar}"></view>
	</view>
</template>

<script>
	export default {
		name: "safearea-bar",
		data() {
			return {
				safeAreaBar: getApp().globalData.safeArea + 'px',
			};
		}
	}
</script>

<style>

</style>