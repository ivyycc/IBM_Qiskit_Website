/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
 module.exports = { 
  content: ["./src/**/*.{js,jsx,ts,tsx}"], 
  theme: {
    extend: {
      fontFamily: {
        // Add 'Inter' as the first font in the sans-serif stack
        mono: ['"Fira Code"', ...defaultTheme.fontFamily.mono],
      },
    },
  }, 
  plugins: [], 
};