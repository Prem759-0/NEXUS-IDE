import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        nexus: {
          bg: "#0a0a0f",
          surface: "#12121a",
          elevated: "#1a1a25",
          border: "#2a2a3a",
          primary: "#00f0ff",
          secondary: "#7000ff",
          accent: "#ff0080",
          success: "#00ff88",
          warning: "#ffcc00",
          error: "#ff3366",
          cyan: "#00f0ff",
          purple: "#b829dd",
          yellow: "#f7df1e",
          muted: "#6b7280",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
        geist: ["Geist", "Inter", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "matrix": "matrix 20s linear infinite",
        "typing": "typing 3.5s steps(40, end)",
        "blink": "blink 1s step-end infinite",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 5px #00f0ff, 0 0 10px #00f0ff" },
          "100%": { boxShadow: "0 0 20px #00f0ff, 0 0 30px #00f0ff" },
        },
        matrix: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        typing: {
          "from": { width: "0" },
          "to": { width: "100%" },
        },
        blink: {
          "50%": { borderColor: "transparent" },
        },
      },
    },
  },
  plugins: [],
};

export default config;