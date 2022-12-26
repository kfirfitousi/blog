'use client';

import { useEffect, useRef, useState } from 'react';
import { useSelectedLayoutSegments } from 'next/navigation';
import { useThemeStore } from '@/stores/theme-store';
import { useSearchStore } from '@/stores/search-store';
import shallow from 'zustand/shallow';
import clsx from 'clsx';
import Link from 'next/link';
import { BlogTitle } from '@/components/blog-title';
import { Tooltip } from '@/components/tooltip';
import { PlusSquare, MinusSquare, Type, Sun, Moon, Search } from 'lucide-react';

export function Header() {
  const layoutSegment = useSelectedLayoutSegments();
  const isPostPage = layoutSegment[0] === 'posts' && layoutSegment[1];
  const [scrollTop, setScrollTop] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const toggleSearch = useSearchStore((state) => state.toggleSearch);
  const isSearching = useSearchStore((state) => state.isSearching);

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
    shallow,
  );

  const toggleDarkAndApply = () => {
    toggleDark();
    // toggle class on html
    document.querySelector('html')?.classList.toggle('dark');
    // toggle utterances comment section theme
    document
      .querySelector<HTMLIFrameElement>('.utterances-frame')
      ?.contentWindow?.postMessage(
        {
          type: 'set-theme',
          theme: isDark ? 'github-light' : 'photon-dark',
        },
        '*',
      );
  };

  useEffect(() => {
    // sync scroll position with state
    setScrollTop(document.documentElement.scrollTop || document.body.scrollTop);

    // update state on scroll
    const handleScroll = () => {
      setScrollTop(
        document.documentElement.scrollTop || document.body.scrollTop,
      );
    };
    document.addEventListener('scroll', handleScroll);

    return () => document.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className={clsx(
        headerRef.current && scrollTop > headerRef.current.clientHeight
          ? 'border-b border-b-slate-300 bg-slate-500 bg-opacity-10 py-2 dark:border-b-slate-500'
          : 'bg-transparent py-8',
        'flex flex-row items-center justify-between px-4 xs:px-8',
        'transition-[padding,background-color] duration-300 ease-in-out',
        'text-slate-700 backdrop-blur dark:text-rose-50',
      )}
    >
      <nav
        className={clsx(
          isSerif && 'font-serif',
          isPostPage ? 'sm:ml-[136px]' : 'sm:ml-20',
          'flex h-8 flex-grow flex-row items-center justify-start mix-blend-color-dodge max-xs:mr-2 max-xs:text-sm sm:justify-center',
        )}
      >
        <Link
          href="/posts"
          className="order-2 mr-2 font-semibold hover:text-rose-600 dark:hover:text-rose-400 xs:mr-4 sm:order-1"
        >
          Posts
        </Link>
        <Link href="/" className="order-1 mr-2 xs:mr-4 sm:order-2">
          <BlogTitle small title="Kfir's Blog" />
        </Link>
        <Link
          href="/about"
          className="order-3 font-semibold hover:text-rose-600 dark:hover:text-rose-400"
        >
          About
        </Link>
      </nav>

      <div className="ml-auto flex h-8 w-fit flex-row items-center justify-end space-x-1">
        <button onClick={toggleSearch}>
          <Search
            id="search"
            className={clsx(
              isSearching &&
                'text-rose-600 text-opacity-60 dark:text-rose-400 dark:text-opacity-80',
              'h-5 w-5 mix-blend-color-dodge hover:scale-110 hover:pb-0.5 hover:text-rose-600 dark:hover:text-rose-400 xs:h-6 xs:w-6',
            )}
            data-tooltip-content="Search Posts"
            aria-label="Search Posts"
          />
          <Tooltip anchorId="search" place="bottom" />
        </button>

        {isPostPage && (
          <>
            <button onClick={decreaseFontSize} disabled={isFontSizeMin}>
              <MinusSquare
                id="decrease-font-size"
                className="h-5 w-5 mix-blend-color-dodge hover:scale-110 hover:pb-0.5 hover:text-rose-600 disabled:text-rose-600 dark:hover:text-rose-400 dark:disabled:text-rose-400 xs:h-6 xs:w-6"
                data-tooltip-content="Decrease font size"
                aria-label="Decrease font size"
              />
              <Tooltip anchorId="decrease-font-size" place="bottom" />
            </button>
            <button onClick={increaseFontSize} disabled={isFontSizeMax}>
              <PlusSquare
                id="increase-font-size"
                className="h-5 w-5 mix-blend-color-dodge hover:scale-110 hover:pb-0.5 hover:text-rose-600 disabled:text-rose-600 dark:hover:text-rose-400 dark:disabled:text-rose-400 xs:h-6 xs:w-6"
                aria-label="Increase font size"
                data-tooltip-content="Increase font size"
              />
              <Tooltip anchorId="increase-font-size" place="bottom" />
            </button>
          </>
        )}

        <button onClick={toggleSerif}>
          <Type
            id="serif"
            className={clsx(
              isSerif &&
                'text-rose-600 text-opacity-60 dark:text-rose-400 dark:text-opacity-80',
              'ml-auto h-5 w-5 mix-blend-color-dodge hover:scale-110 hover:pb-0.5 hover:text-rose-600 dark:hover:text-rose-400 xs:h-6 xs:w-6',
            )}
            data-tooltip-content="Toggle serif font"
            aria-label="Toggle serif font"
          />
          <Tooltip anchorId="serif" place="bottom" />
        </button>
        <button onClick={toggleDarkAndApply} id="theme-toggle">
          {isDark ? (
            <Moon
              className="h-5 w-5 mix-blend-color-dodge hover:scale-110 hover:pb-0.5 hover:text-rose-600 dark:hover:text-rose-400 xs:h-6 xs:w-6"
              aria-label="Switch to light mode"
            />
          ) : (
            <Sun
              className="h-5 w-5 mix-blend-color-dodge hover:scale-110 hover:pb-0.5 hover:text-rose-600 dark:hover:text-rose-400 xs:h-6 xs:w-6"
              aria-label="Switch to dark mode"
            />
          )}
          <Tooltip
            anchorId="theme-toggle"
            place="bottom"
            content={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          />
        </button>
      </div>
    </header>
  );
}
