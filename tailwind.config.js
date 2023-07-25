/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-color': '#050505',
        'text-color': '#AAADA7',
        'secondary-color': '#0C0C0C',
        'whiteish': '#C8C8C8',
      }
    },
  },
  plugins: [],
}