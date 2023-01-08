import { useSearchStore } from '@/stores/search-store';
import { useThemeStore } from '@/stores/theme-store';
import { Tooltip } from 'react-tooltip';
import { MinusSquare, Moon, PlusSquare, Search, Sun, Type } from 'lucide-react';
import shallow from 'zustand/shallow';
import clsx from 'clsx';

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
      className={clsx(
        className,
        'flex h-8 w-fit flex-row items-center justify-end space-x-1',
      )}
    >
      <button onClick={toggleSearch}>
        <Search
          id="search"
          className={clsx(
            isSearching &&
              'text-rose-600 text-opacity-60 dark:text-rose-400 dark:text-opacity-80',
            'h-5 w-5 mix-blend-color-dodge hover:scale-110 hover:pb-0.5 xs:h-6 xs:w-6',
            'hover:text-rose-600 dark:hover:text-rose-400',
          )}
          data-tooltip-content="Search Posts"
          aria-label="Search Posts"
        />
        <Tooltip anchorId="search" place="bottom" />
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
              className={clsx(
                'h-5 w-5 mix-blend-color-dodge xs:h-6 xs:w-6',
                'hover:scale-110 hover:pb-0.5 hover:text-rose-600 dark:hover:text-rose-400',
                'group-disabled:text-rose-600 group-disabled:text-opacity-60',
                'dark:group-disabled:text-rose-400 dark:group-disabled:text-opacity-80',
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
              className={clsx(
                'h-5 w-5 mix-blend-color-dodge xs:h-6 xs:w-6',
                'hover:scale-110 hover:pb-0.5 hover:text-rose-600 dark:hover:text-rose-400',
                'group-disabled:text-rose-600 group-disabled:text-opacity-60',
                'dark:group-disabled:text-rose-400 dark:group-disabled:text-opacity-80',
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
          className={clsx(
            isSerif &&
              'text-rose-600 text-opacity-60 dark:text-rose-400 dark:text-opacity-80',
            'hover:scale-110 hover:pb-0.5 hover:text-rose-600 dark:hover:text-rose-400',
            'ml-auto h-5 w-5 mix-blend-color-dodge xs:h-6 xs:w-6',
          )}
          data-tooltip-content="Toggle serif font"
          aria-label="Toggle serif font"
        />
        <Tooltip anchorId="serif" place="bottom" />
      </button>
      <button onClick={toggleDarkAndApply} id="theme-toggle">
        {isDark ? (
          <Moon
            className="h-5 w-5 mix-blend-color-dodge hover:scale-110 hover:pb-0.5
              hover:text-rose-600 dark:hover:text-rose-400 xs:h-6 xs:w-6"
            aria-label="Switch to light mode"
          />
        ) : (
          <Sun
            className="h-5 w-5 mix-blend-color-dodge hover:scale-110 hover:pb-0.5
              hover:text-rose-600 dark:hover:text-rose-400 xs:h-6 xs:w-6"
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
  );
}
