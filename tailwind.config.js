/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'harvest-gold': '#EAA620',
        'naples-yellow': '#F3CE4D',
        'black-2': '#030402',
        'snow': '#FCF8F8',
      },
      fontFamily: {
        'oswald': ['Oswald', 'sans-serif'],
        'open-sans': ['Open Sans', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(45deg, #EAA620, #F3CE4D)',
        'gradient-dark': 'linear-gradient(135deg, #000000, #030402)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [],
}