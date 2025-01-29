import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				bgBlue: '#192A32',
				lgBlue: '#1F3540',
				grBlue: '#34C1C0',
				shadowBlue: '#102129',
				grayTie: '#A8BEC9'
			},
			boxShadow: {
				'custom-shadowBlue': '0 4px 0 rgba(16, 33, 41, 0.8), 0 1px 0 rgba(16, 33, 41, 0.6)'
			}
		}
	},
	plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms'), require('daisyui')]
};
