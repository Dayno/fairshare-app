/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    colors: {
      primary: "#446622",
      secondary: "#99BB44",
      tertiary: "#1E212B",
      danger: "#FB5F5F",
      medium: "#BEBEB9",
      fill: "#F2F1F0",
      light: "#FFFDFD",
    },
    extend: {
      fontFamily: {
        "fira-sans": ["Fira Sans", "sans-serif"],
        londrina: ["Londrina Solid", "sans-serif"],
      },
    },
    fontWeight: {
      thin: "100",
      extralight: "200",
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
      black: "900",
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
