import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background-rgb) / <alpha-value>)",
        foreground: "rgb(var(--foreground-rgb) / <alpha-value>)",
        surface: "rgb(var(--surface-rgb) / <alpha-value>)",
        "surface-2": "rgb(var(--surface-2-rgb) / <alpha-value>)",
        border: "rgb(var(--border-rgb) / <alpha-value>)",
        muted: "rgb(var(--muted-rgb) / <alpha-value>)",
        accent: "rgb(var(--accent-rgb) / <alpha-value>)",
        "accent-foreground": "rgb(var(--accent-foreground-rgb) / <alpha-value>)",
        "accent-warm": "rgb(var(--accent-warm-rgb) / <alpha-value>)",
      },
      fontSize: {
        xs: ["0.9167rem", { lineHeight: "1.3333rem" }],
        sm: ["1.0417rem", { lineHeight: "1.5rem" }],
        base: ["1.1667rem", { lineHeight: "1.75rem" }],
        lg: ["1.2917rem", { lineHeight: "1.9167rem" }],
        xl: ["1.4167rem", { lineHeight: "1.9167rem" }],
        "2xl": ["1.6667rem", { lineHeight: "2.1667rem" }],
        "3xl": ["2.0417rem", { lineHeight: "2.4167rem" }],
        "4xl": ["2.4167rem", { lineHeight: "2.6667rem" }],
        "5xl": ["3.1667rem", { lineHeight: "1" }],
        "6xl": ["3.9167rem", { lineHeight: "1" }],
      },
      fontFamily: {
        display: ['"Helvetica Neue"', "Helvetica", "Arial", "sans-serif"],
        sans: ['"Helvetica Neue"', "Helvetica", "Arial", "sans-serif"],
        script: ["var(--font-script)", "cursive"],
      },
    },
  },
  plugins: [],
};

export default config;
