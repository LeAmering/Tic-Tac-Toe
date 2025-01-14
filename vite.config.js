import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		fs: {
			allow: ['C:/codingBeispiele/Tic-Tac-Toe/assets'] // Allow access to the assets folder
		}
	}
});
