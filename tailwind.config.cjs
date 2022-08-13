/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: "#6633F2",
      secondary: "#000000",
      light: "#939393",
      sidebar: "#DEF0F2",
      error: "red",
    },
    extend: {
      borderRadius: {
        DEFAULT: "0.4rem",
      },
    },
  },
  plugins: [],
};
