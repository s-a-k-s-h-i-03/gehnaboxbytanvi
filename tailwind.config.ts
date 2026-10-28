import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: "#FBF8F3",
          50: "#FFFFFF",
          100: "#FDFCF9",
          200: "#FBF8F3",
          300: "#F5EFE4",
          400: "#ECE2CF",
          500: "#DFD2B7",
          border: "#E9DFCE",
        },
        emerald: {
          DEFAULT: "#1C3B2B",
          50: "#EEF5F1",
          100: "#D6E7DC",
          200: "#ADCDBA",
          300: "#7CAE92",
          400: "#4D8D6B",
          500: "#2F6B4E",
          600: "#1C3B2B", // Brand Heritage Accent
          700: "#173124",
          800: "#11241A",
          900: "#0B1711",
        },
        gold: {
          DEFAULT: "#C5A059", // Brand Antique Gold
          50: "#FAF7EE",
          100: "#F3ECD7",
          200: "#E6D6AC",
          300: "#D7BD7E",
          400: "#C5A059",
          500: "#AF873B",
          600: "#8C6A2C",
          700: "#6B501F",
          800: "#493614",
          900: "#2A1E09",
        },
        charcoal: {
          DEFAULT: "#2B2625", // Espresso charcoal
          50: "#F6F5F5",
          100: "#ECE9E9",
          200: "#D7D3D2",
          300: "#B8B1B0",
          400: "#8D8381",
          500: "#635A58",
          600: "#473F3E",
          700: "#362F2E",
          800: "#2B2625",
          900: "#1D1918",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-montserrat)", "Montserrat", "Inter", "sans-serif"],
      },
      boxShadow: {
        luxury: "0 10px 30px -10px rgba(43, 38, 37, 0.08), 0 4px 6px -2px rgba(43, 38, 37, 0.03)",
        "luxury-hover": "0 20px 40px -15px rgba(28, 59, 43, 0.15), 0 8px 16px -4px rgba(197, 160, 89, 0.12)",
        "gold-glow": "0 0 25px rgba(197, 160, 89, 0.35)",
        "emerald-glow": "0 0 25px rgba(28, 59, 43, 0.35)",
      },
      animation: {
        "marquee-left": "marqueeLeft 40s linear infinite",
        "marquee-right": "marqueeRight 40s linear infinite",
        "fade-in": "fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "float-gentle": "float 6s ease-in-out infinite",
        "shimmer-gold": "shimmer 3s ease-in-out infinite",
      },
      keyframes: {
        marqueeLeft: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeRight: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        shimmer: {
          "0%, 100%": { opacity: "0.8" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
