"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useThemeStore } from "@/stores/theme-store";
import shallow from "zustand/shallow";
import clsx from "clsx";

import Link from "next/link";
import { BlogTitle } from "./blog-title";
import {
  ArrowLeft,
  PlusSquare,
  MinusSquare,
  Type,
  Sun,
  Moon,
} from "lucide-react";

export function Header() {
  const isPostPage = usePathname() !== "/";
  const headerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);

  const {
    isDark,
    isSerif,
    isFontSizeMin,
    isFontSizeMax,
    toggleDark,
    toggleSerif,
    increaseFontSize,
    decreaseFontSize,
  } = useThemeStore(
    (state) => ({
      isDark: state.isDark,
      isSerif: state.isSerif,
      fontSize: state.fontSize,
      isFontSizeMin: state.isFontSizeMin,
      isFontSizeMax: state.isFontSizeMax,
      toggleDark: state.toggleDark,
      toggleSerif: state.toggleSerif,
      increaseFontSize: state.increaseFontSize,
      decreaseFontSize: state.decreaseFontSize,
    }),
    shallow
  );

  const toggleDarkAndApply = () => {
    toggleDark();
    document.querySelector("html")?.classList.toggle("dark");
  };

  useEffect(() => {
    // sync scroll position with state
    setScrollTop(document.documentElement.scrollTop || document.body.scrollTop);

    // add event listener to update state on scroll
    document.addEventListener("scroll", () =>
      setScrollTop(
        document.documentElement.scrollTop || document.body.scrollTop
      )
    );
  }, []);

  return (
    <header
      ref={headerRef}
      className={clsx(
        headerRef.current && scrollTop > headerRef.current.clientHeight
          ? "py-2 border-b border-b-slate-300 dark:border-b-slate-500"
          : "py-8",
        "px-8 flex flex-row items-center justify-between",
        "transition-[padding,background-color] duration-300 ease-in-out",
        "backdrop-blur bg-transparent text-slate-700 dark:text-rose-50"
      )}
    >
      {isPostPage && (
        <>
          <Link
            href="/"
            className="w-28 h-full flex flex-row items-center space-x-1 hover:text-rose-600 dark:hover:text-rose-400"
          >
            <ArrowLeft className="w-6 sm:h-6" aria-label="Back" />
            <label className="cursor-pointer text-sm">Back</label>
          </Link>

          <Link href="/" className="hidden sm:block flex-grow">
            <BlogTitle small title="Kfir's Blog" />
          </Link>
        </>
      )}

      <div className="ml-auto w-28 flex flex-row items-center justify-end space-x-1">
        {isPostPage && (
          <>
            <button
              onClick={decreaseFontSize}
              disabled={isFontSizeMin}
              className="hover:text-rose-600 dark:hover:text-rose-400 disabled:text-rose-600 dark:disabled:text-rose-400"
            >
              <MinusSquare
                className="w-6 sm:h-6"
                aria-label="Decrease font size"
              />
            </button>
            <button
              onClick={increaseFontSize}
              disabled={isFontSizeMax}
              className="hover:text-rose-600 dark:hover:text-rose-400 disabled:text-rose-600 dark:disabled:text-rose-400"
            >
              <PlusSquare
                className="w-6 sm:h-6"
                aria-label="Increase font size"
              />
            </button>
          </>
        )}

        <button
          onClick={toggleSerif}
          className={clsx(
            isSerif
              ? "text-rose-600 dark:text-rose-400"
              : "hover:text-rose-600 dark:hover:text-rose-400",
            "ml-auto"
          )}
        >
          <Type className="w-6 sm:h-6" aria-label="Toggle serif font" />
        </button>
        <button
          onClick={toggleDarkAndApply}
          className="hover:text-rose-600 dark:hover:text-rose-400"
        >
          {isDark ? (
            <Sun className="w-6 sm:h-6" aria-label="Switch to light mode" />
          ) : (
            <Moon className="w-6 sm:h-6" aria-label="Switch to dark mode" />
          )}
        </button>
      </div>
    </header>
  );
}
