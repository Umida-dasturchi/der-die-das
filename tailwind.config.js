/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        orangeBrand: "#f75c03",
        pinkBrand: "#d90368",
        purpleBrand: "#820263",
        darkBrand: "#291720",
        tealBrand: "#04a777",
      },
    },
  },
  plugins: [],
};