import { readable } from 'svelte/store';

export const createTimerStore = (duration: number) =>
	readable(new Date(), (set) => {
		const timer = setInterval(() => set(new Date()), duration);

		return () => clearInterval(timer);
	});
