const { blogConfig } = require('./config/index.js');
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],

  // enable dark mode
  darkMode: 'class',

  plugins: [
    // used for markdown prose styling; see components/mdx-content.tsx
    require('@tailwindcss/typography'),
  ],

  theme: {
    screens: {
      xs: '475px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        // theme colors; edit in config/index.js
        accent: {
          DEFAULT: blogConfig.theme?.accentColor?.light || colors.rose[700],
          dark: blogConfig.theme?.accentColor?.dark || colors.rose[300],
        },
      },
      fontFamily: {
        // uses @next/font; see app/layout.tsx
        sans: ['var(--font-red-hat)'],
        serif: ['var(--font-newsreader)'],
      },
      gridTemplateRows: {
        // main layout grid rows (header, main, footer)
        // see app/layout.tsx
        layout: '6rem minmax(calc(100vh - 16rem), 1fr) 10rem',
      },
      gridTemplateColumns: {
        // main layout grid columns (left column, main, right column)
        // see app/layout.tsx
        layout: '1fr minmax(640px, 800px) 1fr',
      },
      animation: {
        // border animation used in components/post-card.tsx
        border: 'show-border 0.5s ease-in-out forwards',
        'border-fast': 'show-border 0.25s ease-in-out forwards',
        // wave animation used in components/hero-section.tsx
        wave: 'wave 2.5s ease-in-out forwards',
      },
      keyframes: {
        'show-border': {
          '0%': {
            zIndex: 20,
            width: '1rem',
            height: 'calc(100% - 1rem)',
            borderRadius: '0.4rem 0 0 0.4rem',
          },
          '20%': {
            zIndex: 0,
            width: 0,
            height: '100%',
            borderRadius: '0.4rem 0 0 0.4rem',
          },
          '100%': {
            zIndex: 0,
            width: '100%',
            height: '100%',
            borderRadius: '0.4rem 0.4rem 0.4rem 0.4rem',
          },
        },
        wave: {
          '0%': { transform: 'rotate(0.0deg)' },
          '10%': { transform: 'rotate(-10.0deg)' },
          '20%': { transform: 'rotate( 12.0deg)' },
          '30%': { transform: 'rotate(-10.0deg)' },
          '40%': { transform: 'rotate(9.0deg)' },
          '50%': { transform: 'rotate(0.0deg)' },
          '100%': { transform: 'rotate(0.0deg)' },
        },
      },
    },
  },

  // these classes are added conditinally so they need to be whitelisted
  safelist: [{ pattern: /prose-(sm|base|lg|xl|2xl)/ }],
};
