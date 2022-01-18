import { svelte } from '@sveltejs/vite-plugin-svelte';
import unpluginIcons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';
import { prefetch } from './plugins/prefetch';

export default defineConfig({
	plugins: [svelte(), prefetch(), unpluginIcons({ autoInstall: true, compiler: 'svelte' })],
	resolve: {
		alias: {
			'🪆': new URL('./src/', import.meta.url).pathname,
		},
	},
	build: {
		minify: 'terser',
	},
});
