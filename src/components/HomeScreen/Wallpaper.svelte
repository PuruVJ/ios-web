<script lang="ts">
	import { theme } from '🪆/stores/theme.store';
	import { UIElevation } from '🪆/types';
</script>

<div
	class="background-cover"
	style:background-image="url(/wallpapers/1-{$theme.scheme === 'dark' ? 1 : 2}.webp)"
	style:z-index={UIElevation.WALLPAPER}
/>

<style lang="scss">
	.background-cover {
		height: 100%;
		width: 100%;

		position: absolute;
		top: 0;
		left: 0;

		border-radius: inherit;

		will-change: background-image;

		transition: background-image 150ms ease-in;

		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
		background-image: url(/wallpapers/1-2.webp);
	}
</style>
