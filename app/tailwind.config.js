module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Montserrat"],
    },
    scale: {
      "10": ".10",
    },
    extend: {
      gridTemplateRows: {
        "9-static": "repeat(9, 1fr)",
        "12-static": "repeat(12, 1fr)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
