/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      animation: {
        'fast-pulse': 'pulse 1s infinite',
        float: 'float 1s ease-in-out infinite',
        jiggle: 'jiggle 0.5s',
      },
      keyframes: {
        float: {
          '0%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
          '100%': {
            transform: 'translateY(0)',
          },
        },
        jiggle: {
          '0%': {
            transform: 'rotate(-3deg)',
          },
          '25%': {
            transform: 'rotate(3deg)',
          },
          '50%': {
            transform: 'rotate(-3deg)',
          },
          '75%': {
            transform: 'rotate(3deg)',
          },
          '100%': {
            transform: 'rotate(-3deg)',
          },
        },
      },
    },
  },
  plugins: [],
};
