/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        ibraine: {
          blue: "#1688D8",
          blueDark: "#0E5E9F",
          orange: "#F7941D",
          navy: "#102A43",

          sky: "#EAF6FF",
          mint: "#EAFBF4",
          amber: "#FFF6DE",
          lavender: "#F2EEFF",
          rose: "#FFF0F2",

          border: "#E6EAF0",
        },
      },
    },
  },

  plugins: [],
};
