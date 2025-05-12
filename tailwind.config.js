/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7f4',
          100: '#d8ebe2',
          200: '#b5d7c8',
          300: '#8abca6',
          400: '#5e9c82',
          500: '#3c7d63',
          600: '#2c644d',
          700: '#235040',
          800: '#1d4032',
          900: '#193429',
          950: '#0c1d16',
        },
        secondary: {
          50: '#fcf5ee',
          100: '#f8e8d6',
          200: '#f1ceae',
          300: '#e9b27d',
          400: '#e2934d',
          500: '#dc782f',
          600: '#cb5d25',
          700: '#a94521',
          800: '#8a3a22',
          900: '#71321e',
          950: '#3d190f',
        },
        accent: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },
        success: '#16a34a',
        warning: '#eab308',
        error: '#dc2626',
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
        slideIn: 'slideIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideIn: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};