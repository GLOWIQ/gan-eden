/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#F7F4EF',
        primary: '#2D5A27',
        accent: '#C0622F',
        muted: '#8B9E7A',
        ink: '#1A1A1A',
        light: '#6B7280',
      },
      fontFamily: {
        display: ['"Frank Ruhl Libre"', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeSlideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        toastIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '15%': { opacity: '1', transform: 'translateY(0)' },
          '80%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        checkmark: {
          '0%': { 'stroke-dashoffset': '100' },
          '100%': { 'stroke-dashoffset': '0' },
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        fadeSlideUp: 'fadeSlideUp 0.8s ease forwards',
        fadeIn: 'fadeIn 0.6s ease forwards',
        slideInRight: 'slideInRight 0.3s ease forwards',
        toast: 'toastIn 2.5s ease forwards',
      },
    },
  },
  plugins: [],
}
