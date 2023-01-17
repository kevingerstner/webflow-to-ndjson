/** @type {import('tailwindcss').Config} */
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
			sans: ["Sofia Sans", "sans-serif"],
			display: ['Fredoka One', "cursive"],
			mono: ["PT Mono", "monospace"],
		},
		extend: {},
	},
	plugins: [],
};
