/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "#1E3A8A",
        accent: "#F59E0B",
        sand: "#F5F3EE",
      },
      fontFamily: {
        heading: ["Fredoka", "ui-sans-serif", "system-ui"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "Segoe UI", "Roboto"],
      },
      boxShadow: {
        card: "0 8px 24px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};
