/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        islamic: {
          green: {
            50:  '#f0faf4',
            100: '#d9f2e6',
            200: '#b0e4cc',
            300: '#7dcfab',
            400: '#47b484',
            500: '#259a67',
            600: '#177c52',
            700: '#136342',
            800: '#104f35',
            900: '#0c3d28',
            950: '#061f13',
          },
          gold: {
            100: '#fdf3d0',
            200: '#fae4a0',
            300: '#f5ce66',
            400: '#efb63c',
            500: '#d99a22',
            600: '#c27c18',
            700: '#9e5e14',
            800: '#7a4512',
            900: '#4d2b0b',
          },
          cream: {
            50:  '#fdf9ef',
            100: '#f9f0d9',
            200: '#f1e0b5',
            300: '#e6ca88',
          },
          dark: {
            900: '#06190f',
            800: '#0a2618',
            700: '#0f3422',
            600: '#154d32',
          },
        },
        light: {
          body: '#f7f3e9',
          card: '#eee8d5',
          text: '#1a3a26',
        },
        dark: {
          body: '#0a2618',
          card: '#0f3422',
          text: '#e8dfc8',
          border: '#1e5c3a',
        },
      },
      backgroundImage: {
        'islamic-pattern': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z' fill='none' stroke='rgba(255,255,255,0.06)' stroke-width='1'/%3E%3Ccircle cx='30' cy='30' r='12' fill='none' stroke='rgba(255,255,255,0.06)' stroke-width='1'/%3E%3C/svg%3E\")",
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};