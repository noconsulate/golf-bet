module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Montserrat"],
    },
    extend: {
      gridTemplateRows: {
        "9-static": "repeat(9, 1fr)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
