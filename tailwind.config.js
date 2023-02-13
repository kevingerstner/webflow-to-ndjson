/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		container: {
			center: true,
		},
		fontFamily: {
			sans: ["myriad-pro", "sans-serif"],
			display: ["antonia-variable", "sans-serif"],
			mono: ["PT Mono", "monospace"],
		},
		colors: {
			'transparent': "transparent",
			'white': colors.white,
			'gray': colors.gray,
			'beryl': '#c5d6d9',
			'purple': {
				400: '#656ee6',
				600: '#4850c2',
			},
		},
		extend: {},
	},
	plugins: [],
};
