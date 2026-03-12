/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Syne'", "sans-serif"],
        body: ["'Outfit'", "sans-serif"],
        mono: ["'Space Mono'", "monospace"],
      },
      colors: {
        void: {
          50:  "#f0f4ff",
          100: "#e0e9ff",
          200: "#c3d3ff",
          300: "#9ab3ff",
          400: "#6684ff",
          500: "#3d5aff",
          600: "#2a3ef5",
          700: "#1f2de0",
          800: "#1c27b5",
          900: "#1c258e",
          950: "#0a0b1e",
        },
        neon: {
          400: "#a8ff78",
          500: "#7fff50",
          600: "#5ce632",
        },
        plasma: {
          400: "#ff6b9d",
          500: "#ff3d7a",
          600: "#e0245a",
        },
      },
      animation: {
        "fade-up":   "fadeUp 0.7s cubic-bezier(.16,1,.3,1) forwards",
        "fade-in":   "fadeIn 0.5s ease forwards",
        "glow-pulse":"glowPulse 3s ease-in-out infinite",
        "scan":      "scan 8s linear infinite",
        "float":     "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(32px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        glowPulse: {
          "0%,100%": { boxShadow: "0 0 20px rgba(61,90,255,0.3)" },
          "50%":     { boxShadow: "0 0 60px rgba(61,90,255,0.8)" },
        },
        scan: {
          "0%":   { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%":     { transform: "translateY(-16px)" },
        },
      },
    },
  },
  plugins: [],
};
