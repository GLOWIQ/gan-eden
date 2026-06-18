/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        canvas:       '#081008',
        forest:       '#152A15',
        moss:         '#2D5A2D',
        sage:         '#7A9E7A',
        cream:        '#F2EDE4',
        'warm-white': '#FAF8F4',
        terracotta:   '#B85C35',
        gold:         '#C9A84C',
        'text-dark':  '#E8E2D6',
        'text-light': '#1A1A14',
      },
      fontFamily: {
        fraunces: ['Fraunces', 'serif'],
        frank:    ['"Frank Ruhl Libre"', 'serif'],
        heebo:    ['Heebo', 'sans-serif'],
        dmsans:   ['"DM Sans"', 'sans-serif'],
      },
      keyframes: {
        checkDraw: {
          '0%':   { 'stroke-dashoffset': '120' },
          '100%': { 'stroke-dashoffset': '0' },
        },
        scrollBounce: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.6' },
          '50%':       { transform: 'translateY(8px)', opacity: '0.2' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '15%':  { transform: 'translateX(-8px)' },
          '30%':  { transform: 'translateX(8px)' },
          '45%':  { transform: 'translateX(-6px)' },
          '60%':  { transform: 'translateX(6px)' },
          '75%':  { transform: 'translateX(-3px)' },
          '90%':  { transform: 'translateX(3px)' },
        },
        leafSpin: {
          '0%':   { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        checkDraw:    'checkDraw 1.2s ease forwards',
        scrollBounce: 'scrollBounce 2s ease-in-out infinite',
        shake:        'shake 0.5s ease',
        leafSpin:     'leafSpin 1.2s linear infinite',
      },
    },
  },
  plugins: [],
}
