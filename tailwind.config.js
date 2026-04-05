/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        blueprint: {
          blue: "#2f6df6",
          ink: "#101114",
          soft: "#eef4ff",
          mist: "#f6f8fc",
          line: "rgba(16,17,20,0.10)",
        },
      },
      fontFamily: {
        sans: ["Manrope", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Cormorant Garamond", "Georgia", "serif"],
      },
      boxShadow: {
        panel: "0 30px 90px rgba(19, 28, 53, 0.08)",
        soft: "0 18px 50px rgba(47, 109, 246, 0.10)",
      },
      keyframes: {
        "intro-fade": {
          "0%, 72%": { opacity: "1", visibility: "visible" },
          "100%": { opacity: "0", visibility: "hidden" },
        },
        "intro-rise": {
          "0%": { opacity: "0", transform: "translateY(32px) scale(1.06)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -12px, 0)" },
        },
        pulsegrid: {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "0.8" },
        },
      },
      animation: {
        "intro-fade": "intro-fade 1.9s cubic-bezier(0.77, 0, 0.18, 1) forwards",
        "intro-rise": "intro-rise 1.35s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        float: "float 7s ease-in-out infinite",
        pulsegrid: "pulsegrid 8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
