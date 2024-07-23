/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      animation: {
        jiggle: 'jiggle 0.5s',
      },
      keyframes: {
        jiggle: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '20%': {
            transform: 'rotate(3deg)',
          },
          '40%': {
            transform: 'rotate(-3deg)',
          },
          '60%': {
            transform: 'rotate(3deg)',
          },
          '80%': {
            transform: 'rotate(-3deg)',
          },
          '100%': {
            transform: 'rotate(0deg)',
          },
        },
      },
      colors: {
        primary: '#E9E1D8',
        'game-yellow': '#FFC107',
        'game-black': '#0F172A',
        'game-white': '#F5F5F5',
        'game-gray': '#4D4D4D',
        'game-red': '#BA1A1A',
        'game-green': '#54DF0E',
        'game-blue': '#0055FF',
      },
      fontFamily: {
        ink: ['InkFree', 'cursive'],
      },
    },
  },
  plugins: [],
};
