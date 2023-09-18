/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow:{
        main: '3px 3px 0 white'
      },
      fontFamily:{
        montserrat: 'Montserrat, sans-serif'
      }
    },
  },
  plugins: [],
}
