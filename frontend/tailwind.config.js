/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bone: "#F3EBD8",
        cream: "#FAF5E8",
        sand: "#E3D7BC",
        charcoal: "#2A2420",
        ink: "#1A1714",
        paddle: "#C8312B",
        petroleum: "#1F4E5F",
        mustard: "#E08A1E",
        forest: "#3A7D55",
        muted: "#8C8070",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Arial", "sans-serif"],
        display: ["var(--font-barlow)", "Impact", "sans-serif"],
      },
    },
  },
  plugins: [],
};
