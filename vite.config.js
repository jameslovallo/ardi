// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

const root = '/docs/'

export default defineConfig({
	root: root,
	build: {
		rollupOptions: {
			input: {
				main: resolve(root, 'index.html'),
				nested: resolve(root, 'playground/index.html'),
			},
		},
	},
})
