/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      'gray': '#D9D9D9',
      'dark-gray': '#393939',
      'light-gray': '#F9F9F9'
    },
    fontFamily: {
      'sans': ['Inter', 'sans-serif']
    },
  },
  plugins: [],
};
