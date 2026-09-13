/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "sans-serif"]
      },
      colors: {
        ink: "#111315",
        navy: "#16212b",
        copper: "#c66b35",
        paper: "#f5f3ee"
      }
    }
  },
  plugins: []
};