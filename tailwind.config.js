/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./html/**/*.html', './public/js/**/*.js'],
	theme: {
		extend: {
			colors: {
				skyblue: '#87ceeb'
			}
		}
	},
	plugins: [require('@tailwindcss/forms')]
};
