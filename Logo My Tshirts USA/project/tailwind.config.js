/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#eef6ff',
          100: '#d9ecff',
          200: '#bcdcff',
          300: '#8ec6ff',
          400: '#59a6ff',
          500: '#3385fc',
          600: '#1d66f0',
          700: '#1550dd',
          800: '#1842b3',
          900: '#1a3c8d',
          950: '#142556',
        },
        accent: {
          50: '#fffbeb',
          100: '#fff4c6',
          200: '#ffe888',
          300: '#ffd84d',
          400: '#ffc91f',
          500: '#f9b004',
          600: '#dd8a02',
          700: '#b76406',
          800: '#944d0c',
          900: '#7a3e0d',
        },
        ink: {
          50: '#f6f7f9',
          100: '#eceef2',
          200: '#d5d9e2',
          300: '#b0b8c9',
          400: '#8590aa',
          500: '#67738d',
          600: '#525c73',
          700: '#434b5e',
          800: '#3a4051',
          900: '#343846',
          950: '#22252e',
        },
      },
      boxShadow: {
        soft: '0 2px 8px -2px rgba(16, 24, 40, 0.08), 0 4px 16px -4px rgba(16, 24, 40, 0.06)',
        card: '0 1px 2px rgba(16, 24, 40, 0.04), 0 8px 24px -8px rgba(16, 24, 40, 0.12)',
        glow: '0 0 0 1px rgba(51, 133, 252, 0.18), 0 12px 40px -12px rgba(29, 102, 240, 0.45)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        'fade-in': 'fade-in 0.8s ease-out both',
        'slide-in-right': 'slide-in-right 0.3s ease-out both',
        float: 'float 6s ease-in-out infinite',
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [],
};
