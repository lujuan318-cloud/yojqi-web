import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        yojqi: {
          ivory: "#fffdfa",
          soft: "#fffdf9",
          warm: "#fffaf6",
          lift: "#fff8f0",
          sand: "#f8f4ee",
          sandDark: "#eadecf",
          ink: "#15110f",
          inkHeading: "#17120f",
          inkDeep: "#261d18",
          bronze: "#7a5a3a",
          bronzeDeep: "#7a351b",
          bronzeLight: "#a8835d",
          body: "#5f554b",
          bodyStrong: "#4e4339",
          border: "rgba(38, 29, 24, 0.12)",
          borderAccent: "rgba(122, 90, 58, 0.24)",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Noto Serif SC", "Songti SC", "serif"],
        sans: ["var(--font-sans)", "Noto Sans SC", "PingFang SC", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 12px rgba(35, 22, 10, 0.06)",
        cardHover: "0 8px 24px rgba(35, 22, 10, 0.10)",
        cta: "0 4px 16px rgba(21, 17, 15, 0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
