/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#111111',
        'secondary': '#D4AF37',
        'dark': '#0A0A0A',
        'light': '#F5F5F5',
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        fadeInScale: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-out forwards',
        fadeInRight: 'fadeInRight 1s ease-out forwards',
        fadeInScale: 'fadeInScale 0.7s ease-out forwards',
        fadeInUp: 'fadeInUp 1s ease-out forwards',
        fadeInDown: 'fadeInDown 1s ease-out forwards'
      }
    },
  },
  plugins: [],
}

