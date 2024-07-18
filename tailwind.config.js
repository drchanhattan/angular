/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      animation: {
        jiggle: 'jiggle 0.5s infinite',
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
        primary: '#FFC107',
      },
      fontFamily: {
        ink: ['InkFree', 'cursive'],
      },
    },
  },
  plugins: [],
};
