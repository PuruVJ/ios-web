import { writable } from 'svelte-local-storage-store';

export type Theme = {
	scheme: 'light' | 'dark';
};

export const theme = writable<Theme>('ios:theme-settings', {
	scheme: matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
});

theme.subscribe(({ scheme }) => {
	// Color scheme
	const { classList } = document.body;
	classList.remove('light', 'dark');
	classList.add(scheme);
});
