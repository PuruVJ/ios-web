<script lang="ts">
	import { format } from 'date-fns';
	import { draggable } from 'svelte-drag';
	import { bounceOut, sineOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import UnlockedIcon from '~icons/bi/unlock-fill';
	import CameraIcon from '~icons/ion/ios-camera';
	import FlashLightIcon from '~icons/ion/ios-flashlight';
	import { createTimerStore } from '🪆/stores/time.store';
	import { throttle } from '🪆/utils/throttle';

	const bodyHeight = document.body.offsetHeight;

	const time = createTimerStore(1000);

	const backdropOpacity = tweened(0, { duration: 300 });
	const swipeProgress = tweened(0, { easing: bounceOut, duration: 600 });

	$: formattedTime = format($time, 'h:mm');
	$: secondaryTime = format($time, 'EEEE, MMMM d');

	function onSwipe({ offsetY }: { offsetY: number }) {
		const distanceSwiped = -offsetY;
		const ratio = distanceSwiped / bodyHeight;

		swipeProgress.set(offsetY, { duration: 0 });
		backdropOpacity.set(Math.min(1, Math.max(0, ratio)), { duration: 0 });
	}

	function onSwipeEnd({ offsetY }: { offsetY: number }) {
		const distanceSwiped = -offsetY;
		const ratio = distanceSwiped / bodyHeight;

		if (ratio < 1 / 4) {
			$swipeProgress = 0;
			$backdropOpacity = 0;
		} else {
			swipeProgress.set(-bodyHeight, { easing: sineOut, duration: 300 });
			$backdropOpacity = 1;
		}
	}
</script>

<section
	class="lock-screen"
	style:--opacity={$backdropOpacity + ''}
	use:draggable={{
		axis: 'y',
		position: { y: $swipeProgress, x: 0 },
		bounds: { top: -1000 },
		onDrag: throttle(onSwipe, 50),
		onDragEnd: onSwipeEnd,
	}}
>
	<div class="lock-icon">
		<UnlockedIcon />
	</div>

	<section class="clock">
		<h1>
			{formattedTime}
		</h1>
		<h2>{secondaryTime}</h2>
	</section>

	<span class="spacer" />

	<sectin class="actions">
		<button>
			<FlashLightIcon />
		</button>

		<button>
			<CameraIcon />
		</button>
	</sectin>
</section>

<style lang="scss">
	.lock-screen {
		--opacity: 0;

		position: relative;

		height: 100%;
		width: 100%;

		padding: 4rem 2rem 2rem 2rem;

		display: grid;
		grid-template-rows: auto auto 1fr auto;
		justify-items: center;
		gap: 2rem;

		color: white;

		&::before {
			content: '';

			position: absolute;
			inset: 0;
			z-index: -1;

			width: 100.1%;
			height: 100%;

			backdrop-filter: blur(calc(100px * var(--opacity)));

			backface-visibility: hidden;
			perspective: 1000;
			transform: translate3d(0, 0, 0);
			transform: translateZ(0);
		}
	}

	.lock-icon {
		font-size: 2rem;
	}

	.clock {
		width: 100%;

		display: grid;
		gap: 0.75rem;
	}

	h1 {
		font-size: 5rem;
		font-weight: 200;
		line-height: 0.9;
		text-align: center;

		user-select: none;
	}

	h2 {
		font-size: 1.6rem;
		font-weight: 400;
		text-align: center;
	}

	.actions {
		width: 100%;
		display: flex;
		justify-content: space-between;

		padding: 2rem 2rem;

		button {
			--size: 3rem;

			height: var(--size);
			width: var(--size);

			border-radius: 50%;

			font-size: 1.5rem;

			background-image: linear-gradient(
				20deg,
				hsla(var(--system-color-grey-600-hsl), 0.4),
				hsla(var(--system-color-grey-800-hsl), 0.4)
			);
			backdrop-filter: blur(10px) contrast(0.8);
		}
	}
</style>
