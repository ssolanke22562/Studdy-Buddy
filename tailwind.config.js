/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#7C3AED',
          DEFAULT: '#4F46E5',
          dark: '#3730A3',
        },
        accent: {
          DEFAULT: '#06B6D4',
          dark: '#0891B2',
        },
        darkBg: '#0F0F1A',
        darkSurface: '#1A1A2E',
        lightBg: '#F8F7FF',
        lightSurface: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
