"use client";

import { useEffect, useRef, useState } from "react";
import { useSelectedLayoutSegments } from "next/navigation";
import { useThemeStore } from "@/stores/theme-store";
import { useSearchStore } from "@/stores/search-store";
import shallow from "zustand/shallow";
import clsx from "clsx";

import Link from "next/link";
import { BlogTitle } from "./blog-title";
import { PlusSquare, MinusSquare, Type, Sun, Moon, Search } from "lucide-react";

export function Header() {
  const layoutSegment = useSelectedLayoutSegments();
  const isPostPage = layoutSegment[0] === "posts" && layoutSegment[1];
  const [scrollTop, setScrollTop] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const toggleSearch = useSearchStore((state) => state.toggleSearch);

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
          ? "border-b border-b-slate-400 py-2 dark:border-b-slate-500"
          : "py-8",
        "flex flex-row items-center justify-between px-4 sm:px-8",
        "transition-[padding,background-color] duration-300 ease-in-out",
        "bg-transparent text-slate-700 backdrop-blur dark:text-rose-50"
      )}
    >
      <nav
        className={clsx(
          isSerif && "font-serif",
          "flex flex-grow flex-row items-center space-x-4 xs:ml-[136px] xs:justify-center"
        )}
      >
        <Link
          href="/posts"
          className="order-2 font-semibold hover:text-rose-600 dark:hover:text-rose-400 xs:order-1"
        >
          Posts
        </Link>
        <Link href="/" className="order-1 max-xs:!ml-0 max-xs:!mr-2 xs:order-2">
          <BlogTitle small title="Kfir's Blog" />
        </Link>
        <Link
          href="#"
          className="order-3 font-semibold hover:text-rose-600 dark:hover:text-rose-400"
        >
          About
        </Link>
      </nav>

      <div className="ml-auto flex w-fit flex-row items-center justify-end space-x-1">
        <button
          onClick={toggleSearch}
          className="hover:text-rose-600 dark:hover:text-rose-400"
        >
          <Search className="h-6 w-6" aria-label="Search Posts" />
        </button>

        {isPostPage && (
          <>
            <button
              onClick={decreaseFontSize}
              disabled={isFontSizeMin}
              className="hover:text-rose-600 disabled:text-rose-600 dark:hover:text-rose-400 dark:disabled:text-rose-400"
            >
              <MinusSquare
                className="h-6 w-6"
                aria-label="Decrease font size"
              />
            </button>
            <button
              onClick={increaseFontSize}
              disabled={isFontSizeMax}
              className="hover:text-rose-600 disabled:text-rose-600 dark:hover:text-rose-400 dark:disabled:text-rose-400"
            >
              <PlusSquare className="h-6 w-6" aria-label="Increase font size" />
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
          <Type className="h-6 w-6" aria-label="Toggle serif font" />
        </button>
        <button
          onClick={toggleDarkAndApply}
          className="hover:text-rose-600 dark:hover:text-rose-400"
        >
          {isDark ? (
            <Sun className="h-6 w-6" aria-label="Switch to light mode" />
          ) : (
            <Moon className="h-6 w-6" aria-label="Switch to dark mode" />
          )}
        </button>
      </div>
    </header>
  );
}
