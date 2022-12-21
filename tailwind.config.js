const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],

  plugins: [
    // used for markdown prose styling; see components/mdx-content.tsx
    require('@tailwindcss/typography'),
  ],

  // enables dark mode
  darkMode: 'class',

  theme: {
    extend: {
      fontFamily: {
        // uses @next/font/google; see app/layout.tsx
        sans: ['var(--font-red-hat)'],
        serif: ['var(--font-newsreader)'],
      },
      keyframes: {
        'show-border': {
          '0%': {
            zIndex: 20,
            width: '1rem',
            height: 'calc(100%-4px)',
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
      animation: {
        // border animation used in components/post-card.tsx
        border: 'show-border 0.5s ease-in-out forwards',
        'border-fast': 'show-border 0.25s ease-in-out forwards',
        // wave animation used in components/hero-section.tsx
        wave: 'wave 2.5s ease-in-out forwards',
      },
    },
    screens: {
      xs: '475px',
      ...defaultTheme.screens,
    },
  },

  // these classes are added conditinally so they need to be whitelisted
  safelist: ['prose-sm', 'prose-base', 'prose-lg', 'prose-xl', 'prose-2xl'],
};
