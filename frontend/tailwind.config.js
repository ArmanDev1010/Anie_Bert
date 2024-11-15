/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "",
        secondary: "",
        thirdly: "",
      },
      fontFamily: {
        montserrat: ["Montserrateng", "sans-serif"],
      },
    },
    screens: {
      desktopB: "1920px",
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
