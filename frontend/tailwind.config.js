/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ffff",
        secondary: "#222",
        thirdly: "#191919",
      },
      fontFamily: {
        montserrat: ["Montserrateng", "sans-serif"],
        articulat: ["Articulat", "sans-serif"],
        sometimestimes: ["Sometimestimes", "sans-serif"],
        montserratarm: ["Montserratarm", "sans-serif"],
      },
    },
    screens: {
      _1920: "1920px",
      _1750: "1750px",
      _1600: "1600px",
      _1440: "1440px",
      _1280: "1280px",
      _1080: "1080px",
      _900: "900px",
      _700: "700px",
      _550: "550px",
      _400: "400px",
      _360: "360px",
      // desktopB: "1920px",
      // desktopBM: "1750px",
      // desktopM: "1600px",
      // desktopS: "1440px",
      // desktopSS: "1280px",
      // tabletB: "1080px",
      // tabletM: "900px",
      // tabletS: "700px",
      // mobileB: "550px",
      // mobileM: "400px",
      // mobileS: "360px",
    },
  },
  plugins: [],
};
