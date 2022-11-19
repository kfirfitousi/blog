import create from "zustand";
import { devtools } from "zustand/middleware";

const fontSizes = ["sm", "base", "lg", "xl", "2xl"] as const;

type FontSize = typeof fontSizes[number];

interface ThemeState {
  dark: boolean;
  serif: boolean;
  fontSize: FontSize;
  toggleTheme: () => void;
  toggleSerif: () => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
}

export const useThemeStore = create<ThemeState>()(
  devtools((set) => ({
    dark: false,
    serif: false,
    fontSize: "lg",
    toggleTheme: () =>
      set((themeState) => ({
        dark: !themeState.dark,
      })),
    toggleSerif: () =>
      set((themeState) => ({
        serif: !themeState.serif,
      })),
    increaseFontSize: () =>
      set((state) => {
        const index = fontSizes.indexOf(state.fontSize);
        return {
          fontSize: fontSizes[index + 1] ?? state.fontSize,
        };
      }),
    decreaseFontSize: () =>
      set((state) => {
        const index = fontSizes.indexOf(state.fontSize);
        return {
          fontSize: fontSizes[index - 1] ?? state.fontSize,
        };
      }),
  }))
);
