/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#cc785c",
        secondary: "#bd5d3a",
        accent: "#8a7d65",
        background: "#faf9f5",
        surface: "#f5f4ee",
        sand: "#ece2cd",
        ink: "#3d3929",
        muted: "#6b6657",
        border: "#e8e6dc",
        white: '#ffffff',
      },
      fontFamily: {
        serif: ['"Fraunces"', '"Tiempos Headline"', 'Georgia', 'serif'],
        sans: ['"Inter"', '"Poppins"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #cc785c 0%, #bd5d3a 100%)',
        'gradient-warm': 'linear-gradient(135deg, #e7c8a8 0%, #cc785c 100%)',
      },
      boxShadow: {
        'soft': '0 10px 30px -12px rgba(61, 57, 41, 0.08)',
        'card': '0 18px 45px -20px rgba(204, 120, 92, 0.25)',
      },
    },
  },
  plugins: [],
}
