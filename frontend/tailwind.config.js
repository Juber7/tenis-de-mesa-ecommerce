/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bone: "#F4F8FC",
        electric: "#1E4BFF",
        banner: "#0A1F44",
        cream: "#FFFFFF",
        sand: "#DCE6F2",
        charcoal: "#0A1F44",
        ink: "#0A1F44",
        paddle: "#1E4BFF",
        petroleum: "#285486",
        mustard: "#A9CFFF",
        forest: "#3A7D55",
        muted: "#60718A",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Arial", "sans-serif"],
        display: ["var(--font-barlow)", "Impact", "sans-serif"],
      },
    },
  },
  plugins: [],
};
