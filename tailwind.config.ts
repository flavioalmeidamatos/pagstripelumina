import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1240px"
      }
    },
    extend: {
      colors: {
        background: "#fffaf7",
        foreground: "#2f2331",
        primary: {
          DEFAULT: "#a24d6b",
          foreground: "#fff7fb"
        },
        secondary: {
          DEFAULT: "#f6e6df",
          foreground: "#5f4454"
        },
        accent: {
          DEFAULT: "#f1d6c8",
          foreground: "#6e4c3d"
        },
        card: "#fffdfb",
        border: "#eddcd3",
        muted: "#8a7482",
        success: "#236c50",
        warning: "#9a6336",
        danger: "#9b3f51"
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem"
      },
      boxShadow: {
        glow: "0 18px 60px rgba(162, 77, 107, 0.16)",
        soft: "0 10px 30px rgba(75, 48, 69, 0.08)"
      },
      backgroundImage: {
        hero: "radial-gradient(circle at top, rgba(255,255,255,0.95), rgba(255,247,243,0.82) 45%, rgba(245,228,221,0.7) 100%)"
      }
    }
  },
  plugins: []
};

export default config;
