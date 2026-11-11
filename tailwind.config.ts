import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        pine: { 50: "#eef5f1", 100: "#d7e8de", 600: "#1d5c44", 700: "#164a37", 800: "#123f31", 900: "#0f3d2e", 950: "#0a2a20" },
        cream: "#faf6ee",
        burgundy: "#7a1e2b",
        gold: "#c9a227",
      },
      fontFamily: {
        serif: ["'Playfair Display'", "Georgia", "'Times New Roman'", "serif"],
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
