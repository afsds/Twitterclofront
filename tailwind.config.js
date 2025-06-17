/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,tsx,jsx,css}",
  ],
  theme: {
    extend: {
      colors: {
        'twitter-blue': '#1da1f2',
        'twitter-black': '#14171a',
        'twitter-dark-grey': '#657786',
        'twitter-light-grey': '#aab8c2',
        'twitter-extra-light-gray': '#e1e8ed',
        'twitter-background': '#15202b',
      }
    },
    fontFamily: {
      'Comfortaa': ['Comfortaa', 'sans-serif'],
    },
  },
  plugins: [],
}

