/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        castas: {
          orange: '#ff9000',
          'orange-light': '#ffb84d',
          'orange-dark': '#cc7300',
          dark: '#1f1f1f',
          'darker': '#0a0a0a',
          'darker-alt': '#111111',
        }
      },
      fontFamily: {
        sans: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 40px 5px rgba(255, 255, 255, 0.15)',
        'glow-orange': '0 0 20px 5px rgba(255, 144, 0, 0.3)',
      },
    },
  },
  plugins: [],
};
