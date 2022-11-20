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
            <ArrowLeft className="w-8 h-8 sm:w-6 sm:h-6" aria-label="Back" />
            <label className="cursor-pointer text-xl sm:text-sm">Back</label>
          </Link>
          <button
            onClick={decreaseFontSize}
            disabled={fontSize === "sm"}
            className="hover:text-rose-600 dark:hover:text-rose-400 disabled:text-rose-600 dark:disabled:text-rose-400"
          >
            <MinusSquare
              className="w-8 h-8 sm:w-6 sm:h-6"
              aria-label="Decrease font size"
            />
          </button>
          <button
            onClick={increaseFontSize}
            disabled={fontSize === "2xl"}
            className="hover:text-rose-600 dark:hover:text-rose-400 disabled:text-rose-600 dark:disabled:text-rose-400"
          >
            <PlusSquare
              className="w-8 h-8 sm:w-6 sm:h-6"
              aria-label="Increase font size"
            />
          </button>
        </>
      )}

      <button
        onClick={toggleSerif}
        className={clsx(
          serif
            ? "text-rose-600 dark:text-rose-400"
            : "hover:text-rose-600 dark:hover:text-rose-400",
          "ml-auto"
        )}
      >
        <Type
          className="w-8 h-8 sm:w-6 sm:h-6"
          aria-label="Toggle serif font"
        />
      </button>
      <button
        onClick={toggleDarkAndApply}
        className="hover:text-rose-600 dark:hover:text-rose-400"
      >
        {dark ? (
          <Sun
            className="w-8 h-8 sm:w-6 sm:h-6"
            aria-label="Switch to light mode"
          />
        ) : (
          <Moon
            className="w-8 h-8 sm:w-6 sm:h-6"
            aria-label="Switch to dark mode"
          />
        )}
      </button>
    </header>
  );
}
