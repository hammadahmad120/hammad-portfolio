import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  darkMode: "class",
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        /** Viewports where the hero pins and the bento scrolls over it. */
        pin: { raw: "(min-width: 1024px) and (min-height: 780px)" },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: [
          "var(--font-display)",
          "var(--font-sans)",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "var(--font-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "monospace",
        ],
      },
      colors: {
        accent: colors.teal,
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        orbit: {
          to: { transform: "rotate(360deg)" },
        },
        "marquee-left": {
          from: { transform: "translate3d(0, 0, 0)" },
          to: { transform: "translate3d(-50%, 0, 0)" },
        },
        "marquee-right": {
          from: { transform: "translate3d(-50%, 0, 0)" },
          to: { transform: "translate3d(0, 0, 0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
        orbit: "orbit 48s linear infinite",
        "marquee-left": "marquee-left 60s linear infinite",
        "marquee-right": "marquee-right 60s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
