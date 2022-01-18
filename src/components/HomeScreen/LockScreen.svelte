<script lang="ts">
	import { createTimerStore } from '🪆/stores/time.store';
	import { format } from 'date-fns';
	import UnlockedIcon from '~icons/bi/unlock-fill';
	import FlashLightIcon from '~icons/ion/ios-flashlight';
	import CameraIcon from '~icons/ion/ios-camera';

	const time = createTimerStore(1000);

	$: formattedTime = format($time, 'h:mm');
	$: secondaryTime = format($time, 'EEEE, MMMM d');
</script>

<section class="lock-screen">
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
		height: 100%;
		width: 100%;

		padding: 4rem 2rem 2rem 2rem;

		display: grid;
		grid-template-rows: auto auto 1fr auto;
		justify-items: center;
		gap: 2rem;

		color: white;
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
