module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      animation: {
        float: 'float 2s infinite',
        heartbeat: 'heartbeat 0.5s infinite',
        jiggle: 'jiggle 0.5s',
        shake: 'shake 4s infinite',
        zoom: 'zoom 15s infinite',
      },
      keyframes: {
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
        shake: {
          '0%, 100%': {
            transform: 'translateX(0)',
          },
          '5%, 15%, 25%, 85%, 95%': {
            transform: 'translateY(-10px)',
          },
          '10%, 30%, 50%, 70%, 90%': {
            transform: 'translateX(-8px)',
          },
          '20%, 40%, 60%, 80%': {
            transform: 'translateX(6px)',
          },
          '35%, 45%, 55%, 65%, 75%': {
            transform: 'translateY(7px)',
          },
        },
        zoom: {
          '0%': {
            transform: 'scale(1)',
          },
          '50%': {
            transform: 'scale(1.1)',
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
      },
      colors: {
        'mat-black': '#0F172A',
        'mat-blue': '#0055FF',
        'mat-cream': '#E6D3BE',
        'mat-gray': '#4D4D4D',
        'mat-green': '#54DF0E',
        'mat-red': '#BA1A1A',
        'mat-white': '#FDFCFF',
        'mat-yellow': '#FFC107',
        'neutral-black': '#171C22',
        'neutral-white': '#F8F9FF',
      },
      fontFamily: {
        ink: ['InkFree', 'cursive'],
        inter: ['Inter', 'cursive'],
      },
      scale: {
        175: '1.75',
        200: '2',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
