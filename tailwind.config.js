/** @type {import('tailwindcss').Config } */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#9B86A7",
        secondary: "#746885",
        accent: "#FFB6B9",
        highlight: "#B5F8FE",
        neutral: "#F0F0F0",
        text: "#333333",
        content: "#FAFAFA",
        lightcontent: "#F5D5EA",
        mutedcontent: "#D6D3E0",
      },
    },
    },
  plugins: [],
}