import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "clamp(20px, 4vw, 48px)",
      screens: { "2xl": "1200px" },
    },
    extend: {
      screens: {
        // Breakpoints from the design handoff
        nav: "720px",
        feature: "760px",
        aside: "1100px",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        // Brand tokens (design handoff)
        butter: "#FBF3E4",
        paper: "#FFFFFF",
        terracotta: { DEFAULT: "#C0623A", hover: "#A8522E" },
        mango: "#F2C66D",
        leaf: { DEFAULT: "#5F8A62", hover: "#4E7651" },
        teak: "#3A2618",
        bark: "#7A5A44",
        cream: { DEFAULT: "#E6D6BF", light: "#F3E6D2" },
        "muted-dark": "#CDB99E",
        placeholder: "#E9DCC4",
        cal: { free: "#E3EDE1", few: "#FBE3A8", full: "#EFE6D8" },
        line: "rgba(58,38,24,.12)",
      },
      fontFamily: {
        serif: ["Petrona", "Georgia", "serif"],
        sans: ['"Nunito Sans"', "system-ui", "sans-serif"],
      },
      fontSize: {
        hero: ["clamp(46px, 6.4vw, 80px)", { lineHeight: "1", letterSpacing: "-.01em" }],
        h2: ["clamp(36px, 4.4vw, 54px)", { lineHeight: "1.05" }],
        "h2-sm": ["clamp(30px, 3.4vw, 40px)", { lineHeight: "1.1" }],
        "h2-md": ["clamp(32px, 3.6vw, 44px)", { lineHeight: "1.1" }],
      },
      spacing: {
        gutter: "clamp(20px, 4vw, 48px)",
        section: "clamp(80px, 10vw, 128px)",
        band: "clamp(56px, 8vw, 96px)",
      },
      maxWidth: { content: "1200px" },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        frame: "0 10px 28px rgba(58,38,24,.2)",
        card: "0 6px 20px rgba(58,38,24,.12)",
        booking: "0 10px 30px rgba(58,38,24,.08)",
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [animate],
} satisfies Config;
