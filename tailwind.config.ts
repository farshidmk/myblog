import type { Config } from "tailwindcss";
import daisyui from "daisyui";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#006d77",
        secondary: "#83c5be",
        mainBg: "#edf6f9",
        lightBg: "#ffddd2",
        accent: "#e29578",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#006d77",
          secondary: "#83c5be",
          accent: "#e29578",
        },
      },
    ],
  },
} satisfies Config;
