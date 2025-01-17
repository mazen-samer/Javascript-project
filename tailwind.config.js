/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./client/script/*.js", "./client/*.html"],
  theme: {
    extend: {
      backgroundImage: {
        img: "url('./imgs/bg.jpg')",
      },
      fontFamily: {
        sans: ['"Satoshi"', "sans-serif"],
        integral: ['"Integral CF Regular"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
