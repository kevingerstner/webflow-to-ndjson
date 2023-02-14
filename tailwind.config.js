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
			'primary': {
				400: '#87b9ff',
				600: '#6395db',
			},
		},
		extend: {},
	},
	plugins: [],
};
