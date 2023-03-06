'use client';

import { MinusSquare, Moon, PlusSquare, Search, Sun, Type } from 'lucide-react';
import { shallow } from 'zustand/shallow';

import { useSearchStore } from '@/stores/search-store';
import { useThemeStore } from '@/stores/theme-store';
import { Tooltip } from '@/components/tooltip';
import { cn } from '@/lib/utils';

type ToolbarProps = {
  fontControls: boolean;
  className?: string;
};

export function Toolbar({ fontControls, className }: ToolbarProps) {
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
    document.querySelector('html')?.classList.toggle('dark');
  };

  return (
    <div
      className={cn(
        'flex h-8 w-fit flex-row items-center justify-end space-x-1',
        className,
      )}
    >
      <button onClick={toggleSearch}>
        <Search
          id="search"
          className={cn(
            'icon-base h-5 w-5 mix-blend-color-dodge xs:h-6 xs:w-6',
            isSearching && 'text-accent/60 dark:text-accent-dark/80',
          )}
          data-tooltip-content="Search Posts"
          aria-label="Search Posts"
        />
        <Tooltip anchorId="search" />
      </button>

      {fontControls && (
        <>
          <button
            onClick={decreaseFontSize}
            disabled={isFontSizeMin}
            className="group"
          >
            <MinusSquare
              id="decrease-font-size"
              className={cn(
                'icon-base h-5 w-5 mix-blend-color-dodge xs:h-6 xs:w-6',
                'group-disabled:text-accent/60 dark:group-disabled:text-accent-dark/80',
              )}
              data-tooltip-content="Decrease font size"
              aria-label="Decrease font size"
            />
            <Tooltip anchorId="decrease-font-size" place="bottom" />
          </button>
          <button
            onClick={increaseFontSize}
            disabled={isFontSizeMax}
            className="group"
          >
            <PlusSquare
              id="increase-font-size"
              className={cn(
                'icon-base h-5 w-5 mix-blend-color-dodge xs:h-6 xs:w-6',
                'group-disabled:text-accent/60 dark:group-disabled:text-accent-dark/80',
              )}
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
          className={cn(
            'icon-base ml-auto h-5 w-5 mix-blend-color-dodge xs:h-6 xs:w-6',
            isSerif && 'text-accent/60 dark:text-accent-dark/80',
          )}
          data-tooltip-content="Toggle serif font"
          aria-label="Toggle serif font"
        />
        <Tooltip anchorId="serif" place="bottom" />
      </button>
      <button onClick={toggleDarkAndApply} id="theme-toggle">
        {isDark ? (
          <Moon
            className="icon-base h-5 w-5 mix-blend-color-dodge xs:h-6 xs:w-6"
            aria-label="Switch to light mode"
          />
        ) : (
          <Sun
            className="icon-base h-5 w-5 mix-blend-color-dodge xs:h-6 xs:w-6"
            aria-label="Switch to dark mode"
          />
        )}
        <Tooltip
          anchorId="theme-toggle"
          place="bottom"
          content={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        />
      </button>
    </div>
  );
}
