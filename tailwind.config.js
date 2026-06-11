/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playful: ["var(--font-playful)", "cursive", "sans-serif"],
      },
      colors: {
        sky: {
          light: "#bfe9ff",
          DEFAULT: "#7dd3fc",
          deep: "#38bdf8",
        },
        sunshine: "#ffd93b",
        grass: "#7ed957",
        candy: "#ff7eb6",
      },
      keyframes: {
        drift: {
          "0%": { transform: "translateX(-20vw)" },
          "100%": { transform: "translateX(120vw)" },
        },
        "drift-slow": {
          "0%": { transform: "translateX(-30vw)" },
          "100%": { transform: "translateX(130vw)" },
        },
        "sun-glow": {
          "0%, 100%": {
            boxShadow: "0 0 60px 25px rgba(255, 217, 59, 0.55)",
            transform: "scale(1)",
          },
          "50%": {
            boxShadow: "0 0 90px 45px rgba(255, 217, 59, 0.75)",
            transform: "scale(1.06)",
          },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "bounce-soft": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pop-in": {
          "0%": { opacity: "0", transform: "scale(0.92) translateY(14px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        drift: "drift 45s linear infinite",
        "drift-slow": "drift-slow 70s linear infinite",
        "drift-slower": "drift-slow 95s linear infinite",
        "sun-glow": "sun-glow 4s ease-in-out infinite",
        "spin-slow": "spin-slow 5s linear infinite",
        "bounce-soft": "bounce-soft 2.2s ease-in-out infinite",
        "pop-in": "pop-in 0.5s ease-out both",
        wiggle: "wiggle 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
