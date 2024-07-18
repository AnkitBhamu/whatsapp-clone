/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        myfont: ["SF Pro Display", "sans-serif"],
      },
      screens: {
        sm: "750px",
      },
    },
  },
  plugins: [],
};
