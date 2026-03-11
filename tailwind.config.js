/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dpupr-blue': '#2C3E7D',
        'dpupr-blue-dark': '#1a2557',
        'dpupr-yellow': '#FDD835',
        'dpupr-yellow-dark': '#F4C430',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.8s ease-out both',
        fadeInLeft: 'fadeInLeft 0.8s ease-out both',
        fadeInRight: 'fadeInRight 0.8s ease-out both',
        fadeInUp: 'fadeInUp 0.8s ease-out both',
        scaleIn: 'scaleIn 0.7s ease-out both',
        fadeInSlow: 'fadeIn 1.2s ease-out both',
        fadeInDelay: 'fadeIn 1s ease-out 0.3s both',
      },
    },
  },
  plugins: [],
}

