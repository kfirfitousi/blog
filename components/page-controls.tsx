import { ArrowLeft, ArrowRight } from 'lucide-react';
import clsx from 'clsx';

type PageControlsProps = {
  currentPage: number;
  lastPage: number;
  setCurrentPage: (page: number) => void;
  bottom?: boolean;
};

export function PageControls({
  currentPage,
  lastPage,
  bottom = false,
  setCurrentPage,
}: PageControlsProps) {
  return (
    <div className="grid w-full grid-cols-[6rem,1fr,6rem] items-center justify-between">
      <button
        onClick={() => {
          setCurrentPage(currentPage - 1);
          if (bottom) {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
          }
        }}
        disabled={currentPage === 1}
        className={clsx(
          bottom ? 'place-self-start' : 'place-self-end',
          'flex h-6 flex-row items-center space-x-1 justify-self-start',
          'text-slate-600 enabled:hover:text-rose-600 disabled:text-slate-400',
          'dark:text-slate-300 dark:enabled:hover:text-rose-400 dark:disabled:text-slate-500',
        )}
      >
        <ArrowLeft aria-label="Previous page" />
        <span>Previous</span>
      </button>
      <div className="flex flex-row flex-wrap justify-center space-x-2 px-2 text-2xl">
        {Array.from({ length: currentPage }, (_, i) => (
          <span
            key={i}
            className={clsx(
              currentPage === i + 1
                ? 'leading-3'
                : currentPage === i + 2
                ? 'leading-4'
                : 'leading-5',
              'text-slate-800 dark:text-slate-300',
            )}
          >
            •
          </span>
        ))}
        {Array.from({ length: lastPage - currentPage }, (_, i) => (
          <span
            key={i}
            className={clsx(
              i === 0 ? 'leading-4' : 'leading-5',
              'text-slate-400 dark:text-slate-500',
            )}
          >
            •
          </span>
        ))}
      </div>
      <button
        onClick={() => {
          setCurrentPage(currentPage + 1);
          if (bottom) {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
          }
        }}
        disabled={currentPage === lastPage}
        className={clsx(
          bottom ? 'place-self-start' : 'place-self-end',
          'flex h-6 flex-row items-center justify-end space-x-1 justify-self-end',
          'text-slate-600 enabled:hover:text-rose-600 disabled:text-slate-400',
          'dark:text-slate-300 dark:enabled:hover:text-rose-400 dark:disabled:text-slate-500',
        )}
      >
        <span className="h-full">Next</span>
        <ArrowRight aria-label="Next page" />
      </button>
    </div>
  );
}
