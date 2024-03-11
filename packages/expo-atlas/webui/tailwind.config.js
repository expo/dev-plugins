const expoTheme = require('@expo/styleguide/tailwind');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...expoTheme,
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
};
