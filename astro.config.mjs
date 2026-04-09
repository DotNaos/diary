// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

export default defineConfig({
	site: 'https://dotnaos.github.io',
	base: process.env.NODE_ENV === 'production' ? '/diary' : '/',
	integrations: [react()],
	vite: {
		plugins: [tailwindcss()],
	},
});
