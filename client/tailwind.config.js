/** @type {import('tailwindcss').Config} */
module.exports = {
  // important: false,
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'Gorditas': ['Gorditas'],
        'mons': ['Montserrat', 'sans-serif'],
        'Inter': ['Inter', 'sans-serif'],
        'outfit': ['Outfit'],
      },
    },
    screens: {
      'xsm': { 'min': '300px', 'max': '720px' },
      'sm': { 'min': '721px', 'max': '767px' },
      'md': { 'min': '768px', 'max': '1023px' },
      'lg': { 'min': '1024px', 'max': '1279px' },
      'xl': { 'min': '1280px', 'max': '1535px' },
      '2xl': { 'min': '1536px' },
    },
  },
  plugins: [],
}

