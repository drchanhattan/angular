/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      animation: {
        'fast-pulse': 'pulse 1s infinite',
        corn: 'corn 5s infinite',
        jiggle: 'jiggle 0.5s infinite',
      },
      keyframes: {
        corn: {
          '0%': {
            transform: 'rotate(0deg) translateY(0)',
          },
          '20%': {
            transform: 'rotate(0deg) translateY(-8px)',
          },
          '44%': {
            transform: 'rotate(0deg) translateY(0)',
          },
          '46%': {
            transform: 'rotate(2deg)',
          },
          '48%': {
            transform: 'rotate(-2deg)',
          },
          '50%': {
            transform: 'rotate(2deg)',
          },
          '52%': {
            transform: 'rotate(-2deg)',
          },
          '54%': {
            transform: 'rotate(0deg) translateY(0)',
          },
          '80%': {
            transform: 'rotate(0deg) translateY(-8px)',
          },
          '100%': {
            transform: 'rotate(0deg) translateY(0)',
          },
        },
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
    },
  },
  plugins: [],
};
