/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['poppins'],
    },
    extend: {},
  },
  plugins: [require('daisyui', '@tailwindcss/line-clamp')],
  daisyui: {
    themes: ['bumblebee', 'luxury'],
  },
};
