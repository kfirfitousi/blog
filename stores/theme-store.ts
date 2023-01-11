import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const fontSizes = ['sm', 'base', 'lg', 'xl', '2xl'] as const;

type FontSize = (typeof fontSizes)[number];

interface ThemeState {
  isDark: boolean;
  isSerif: boolean;
  fontSize: FontSize;
  isFontSizeMin: boolean;
  isFontSizeMax: boolean;
  toggleDark: () => void;
  toggleSerif: () => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
}

export const useThemeStore = create<ThemeState>()(
  devtools((set) => ({
    isDark: false,
    isSerif: false,
    fontSize: 'lg',
    isFontSizeMin: false,
    isFontSizeMax: false,
    toggleDark: () => set((state) => ({ isDark: !state.isDark })),
    toggleSerif: () => set((state) => ({ isSerif: !state.isSerif })),
    increaseFontSize: () =>
      set((state) => {
        if (state.isFontSizeMax) return state;

        const index = fontSizes.indexOf(state.fontSize);

        return {
          fontSize: fontSizes[index + 1],
          isFontSizeMax: index === fontSizes.length - 2,
          isFontSizeMin: false,
        };
      }),
    decreaseFontSize: () =>
      set((state) => {
        if (state.isFontSizeMin) return state;

        const index = fontSizes.indexOf(state.fontSize);

        return {
          fontSize: fontSizes[index - 1],
          isFontSizeMin: index === 1,
          isFontSizeMax: false,
        };
      }),
  })),
);
