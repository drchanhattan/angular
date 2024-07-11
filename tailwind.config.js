/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      animation: {
        'fast-pulse': 'pulse 1s infinite',
        float: 'float 1s ease-in-out infinite',
        jiggle: 'jiggle 0.45s',
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
