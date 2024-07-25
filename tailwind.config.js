module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      animation: {
        jiggle: 'jiggle 0.5s',
        float: 'float 2s infinite',
        heartbeat: 'heartbeat 1.5s infinite',
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
            transform: 'scale(1) translateY(0)',
          },
          '50%': {
            transform: 'scale(1.025) translateY(-0.25rem)',
          },
          '100%': {
            transform: 'scale(1) translateY(0)',
          },
        },
      },
      colors: {
        'game-black': '#0F172A',
        'game-blue': '#0055FF',
        'game-cream': '#E9E1D8',
        'game-gray': '#4D4D4D',
        'game-green': '#54DF0E',
        'game-red': '#BA1A1A',
        'game-white': '#F5F5F5',
        'game-yellow': '#FFC107',
      },
      fontFamily: {
        ink: ['InkFree', 'cursive'],
      },
    },
  },
  plugins: [],
};
