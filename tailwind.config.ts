/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        light: {
          body: '#F5F5F5',    // Light mode body background
          card: '#E5E7EB',    // Light mode card background
          text: '#1F2937',    // Light mode text
        },
        dark: {
          body: '#0F172A',    // Dark mode body background
          card: '#1E293B',    // Dark mode card background
          text: '#E2E8F0',    // Dark mode text
          border: '#334155',  // Dark mode border
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};