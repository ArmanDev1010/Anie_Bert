/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ffff",
        secondary: "#36454f",
        thirdly: "#334152",
      },
      fontFamily: {
        montserrat: ["Montserrateng", "sans-serif"],
        articulat: ["Articulat", "sans-serif"],
      },
    },
    screens: {
      desktopB: "1920px",
      desktopBM: "1750px",
      desktopM: "1600px",
      desktopS: "1440px",
      desktopSS: "1280px",
      tabletB: "1080px",
      tabletM: "900px",
      tabletS: "700px",
      mobileB: "550px",
      mobileM: "400px",
      mobileS: "360px",
    },
  },
  plugins: [],
};
