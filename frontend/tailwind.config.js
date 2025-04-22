/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#009688"
      },
      gridTemplateColumns: {
        "auto": "repeat(auto-fill, minmax(150px, 1fr))",
        "auto-item": "repeat(auto-fill, minmax(220px, 1fr))",
      }
    },
  },
  plugins: [],
};