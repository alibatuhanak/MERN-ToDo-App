/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js}"],
	theme: {
		extend: {},
	},
	variants: {
		extend: {
			display: ["group-focus"],
		},
	},
	plugins: [],
};
