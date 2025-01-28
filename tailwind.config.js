/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customBlue: "#1E40AF",
        customGreen: "#10B981",
      },
    },
  },
  plugins: [],
};
