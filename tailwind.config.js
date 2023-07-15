/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  theme: {
    extend: {
      boxShadow: {
        customShadow: "0 2px 8px rgba(0, 0, 0, 0.10)",
        customShadowHover: "0 2px 8px rgba(0, 0, 0, 0.5)",
      },
    },
  },
};
