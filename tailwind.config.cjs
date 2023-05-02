/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      gray: '#D9D9D9',
      'dark-gray': '#393939',
      'light-gray': '#F9F9F9',
      'middle-gray': '#818080',
      blue: '#0A66C2',
      white: '#FFFFFF',
      alarm: '#BD0909',
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      'open-sans': ['Open Sans', 'sans-serif'],
    },
  },
  plugins: [],
};
