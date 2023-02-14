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
			'red': colors.red,
			'primary': {
				400: '#9dcfaa',
				600: '#52805e',
			},
		},
		extend: {},
	},
	plugins: [],
};
