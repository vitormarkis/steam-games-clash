import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "skeleton-to-right": "skeleton-to-right 1s infinite linear",
      },
      keyframes: {
        "skeleton-to-right": {
          "0%": {
            transform: "translateX(-500%) scaleY(500%) rotate(40deg)",
            filter: "blur(20px)",
          },
          "100%": {
            transform: "translateX(800%) scaleY(500%) rotate(40deg)",
            filter: "blur(20px)",
          },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
}
export default config
