"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import { useThemeStore } from "@/stores/theme-store";
import shallow from "zustand/shallow";
import clsx from "clsx";

import {
  ArrowLeft,
  PlusSquare,
  MinusSquare,
  Type,
  Sun,
  Moon,
} from "lucide-react";
import Link from "next/link";

export function Header() {
  const isPostPage = useSelectedLayoutSegment() === "blog";

  const {
    dark,
    serif,
    fontSize,
    toggleDark,
    toggleSerif,
    increaseFontSize,
    decreaseFontSize,
  } = useThemeStore(
    (state) => ({
      dark: state.dark,
      serif: state.serif,
      fontSize: state.fontSize,
      toggleDark: state.toggleDark,
      toggleSerif: state.toggleSerif,
      increaseFontSize: state.increaseFontSize,
      decreaseFontSize: state.decreaseFontSize,
    }),
    shallow
  );

  const toggleDarkAndApply = () => {
    toggleDark();
    const html = document.querySelector("html");
    if (html) {
      html.classList.toggle("dark");
    }
  };

  return (
    <header className="h-full flex flex-row space-x-1 items-center p-8 text-slate-700 dark:text-rose-50">
      {isPostPage && (
        <>
          <Link
            href="/"
            className="w-fit h-full mr-auto flex flex-row items-center space-x-1 hover:text-rose-600 dark:hover:text-rose-400"
          >
            <ArrowLeft className="w-8 h-8 sm:w-6 sm:h-6" />
            <label className="cursor-pointer text-xl sm:text-sm">Back</label>
          </Link>
          <button
            onClick={decreaseFontSize}
            disabled={fontSize === "sm"}
            className="group"
          >
            <MinusSquare className="w-8 h-8 sm:w-6 sm:h-6 hover:text-rose-600 dark:hover:text-rose-400 group-disabled:text-rose-600 dark:group-disabled:text-rose-400" />
            <label className="sr-only">Decrease font size</label>
          </button>
          <button
            onClick={increaseFontSize}
            disabled={fontSize === "2xl"}
            className="group"
          >
            <PlusSquare className="w-8 h-8 sm:w-6 sm:h-6 hover:text-rose-600 dark:hover:text-rose-400 group-disabled:text-rose-600 dark:group-disabled:text-rose-400" />
            <label className="sr-only">Increase font size</label>
          </button>
          <button onClick={toggleSerif}>
            <Type
              className={clsx(
                serif
                  ? "text-rose-600 dark:text-rose-400"
                  : "hover:text-rose-600 dark:hover:text-rose-400",
                "w-8 h-8 sm:w-6 sm:h-6"
              )}
            />
            <label className="sr-only">Toggle serif font</label>
          </button>
        </>
      )}

      <button
        onClick={toggleDarkAndApply}
        className="ml-auto hover:text-rose-600 dark:hover:text-rose-400"
      >
        {dark ? (
          <Sun className="w-8 h-8 sm:w-6 sm:h-6" />
        ) : (
          <Moon className="w-8 h-8 sm:w-6 sm:h-6" />
        )}
        <label className="sr-only">Toggle dark mode</label>
      </button>
    </header>
  );
}
