const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // see app/layout.tsx
      fontFamily: {
        sans: ["var(--font-red-hat)"],
        serif: ["var(--font-newsreader)"],
      },
      keyframes: {
        "show-border": {
          "0%": {
            zIndex: 20,
            width: "1rem",
            height: "calc(100%-4px)",
            borderRadius: "0.4rem 0 0 0.4rem",
          },
          "20%": {
            zIndex: 0,
            width: 0,
            height: "100%",
            borderRadius: "0.4rem 0 0 0.4rem",
          },
          "100%": {
            zIndex: 0,
            width: "100%",
            height: "100%",
            borderRadius: "0.4rem 0.4rem 0.4rem 0.4rem",
          },
        },
      },
      animation: {
        border: "show-border 0.5s ease-in-out forwards",
        "border-fast": "show-border 0.25s ease-in-out forwards",
      },
    },
    screens: {
      xs: "475px",
      ...defaultTheme.screens,
    },
  },
  // used for markdown styling
  plugins: [require("@tailwindcss/typography")],

  // enables dark mode
  darkMode: "class",

  // these classes are added conditionally so we don't want to purge them
  safelist: [
    "prose-sm",
    "prose-base",
    "prose-lg",
    "prose-xl",
    "prose-2xl",
    "font-serif",
  ],
};
