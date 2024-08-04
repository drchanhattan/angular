module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      animation: {
        jiggle: 'jiggle 0.5s',
        float: 'float 2s infinite',
        heartbeat: 'heartbeat 0.5s infinite',
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
        float: {
          '0%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-0.5rem)',
          },
          '100%': {
            transform: 'translateY(0)',
          },
        },
        heartbeat: {
          '0%': {
            transform: 'scale(1)',
          },
          '50%': {
            transform: 'scale(1.02)',
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
      },
      colors: {
        'game-black': '#0F172A',
        'game-blue': '#0055FF',
        'game-gray': '#4D4D4D',
        'game-green': '#54DF0E',
        'game-red': '#BA1A1A',
        'game-white': '#E6D3BE',
        'game-yellow': '#FFC107',
      },
      fontFamily: {
        ink: ['InkFree', 'cursive'],
        inter: ['Inter', 'cursive'],
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
