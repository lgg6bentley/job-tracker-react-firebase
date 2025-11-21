// tailwind.config.js

// Import defaultTheme and standard colors
const defaultTheme = require('tailwindcss/defaultTheme'); 
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  darkMode: 'media', 
  theme: {
    extend: {
      // Define a custom font family for a slightly polished look (e.g., Poppins)
      fontFamily: {
        'sans-alt': ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      
      // Define the Starbucks Palette
      colors: {
        // Use a creamy off-white for backgrounds
        background: colors.neutral[50],
        // The iconic forest green (Primary brand color)
        primary: {
          DEFAULT: '#006241', // Starbucks Green
          '500': '#00704A',
          '600': '#004D31',
        },
        // A rich, dark brown/black for text and deep elements
        secondary: colors.neutral[800], 
        // Use the standard neutral grays for everything else
        gray: colors.neutral,
      }
    },
  },
  plugins: [],
}
