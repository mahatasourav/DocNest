/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#5f6FFF", // Example primary colo
      },
      gridTemplateColumns: {
        auto: "repeat(auto-fill, minmax(200px, 1fr))", // Responsive grid columns
      },
    },
  },
  plugins: [],
};
