import type { Config } from "tailwindcss";

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
        primaryGreen: "#01E651",
      },
      fontFamily: {
        sans: ["var(--font-inter-sans)"],
        feather: ["var(--font-feather)"]
      }
    },
  },
  plugins: [
    require("@tailwindcss/typography")
  ],
} satisfies Config;
