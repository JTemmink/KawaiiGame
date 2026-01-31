/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        pink: {
          light: '#FFE5E5',
          primary: '#FF69B4',
          dark: '#FF1493',
        },
        blue: {
          light: '#E5F3FF',
        },
        gold: {
          DEFAULT: '#FFD700',
          glow: 'rgba(255, 215, 0, 0.4)',
        },
      },
      fontFamily: {
        kawaii: ['Nunito', 'sans-serif'],
      },
      animation: {
        'shake': 'shake 0.1s ease-in-out infinite',
        'pulse-fast': 'pulse-fast 0.2s ease-in-out infinite',
        'float-up': 'float-up 0.8s ease-out forwards',
        'particle': 'particle 0.6s ease-out forwards',
        'glow-pulse': 'glow-pulse 1s ease-in-out infinite',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0) rotate(0deg)' },
          '25%': { transform: 'translateX(-3px) rotate(-1deg)' },
          '75%': { transform: 'translateX(3px) rotate(1deg)' },
        },
        'pulse-fast': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.08)' },
        },
        'float-up': {
          '0%': { opacity: '1', transform: 'translateY(0) scale(1)' },
          '100%': { opacity: '0', transform: 'translateY(-60px) scale(0.5)' },
        },
        'particle': {
          '0%': { opacity: '1', transform: 'translate(0, 0) scale(1)' },
          '100%': { opacity: '0', transform: 'translate(var(--tx), var(--ty)) scale(0)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
