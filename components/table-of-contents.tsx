import { useState } from 'react';
import { Bookmark, ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';

type TableOfContentsProps = {
  children: React.ReactNode;
};

export function TableOfContents({ children }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="mt-8 flex w-full flex-col rounded bg-slate-300/50 dark:bg-slate-600/50 sm:w-fit">
      <button
        className={cn(
          'flex flex-row items-center rounded p-2 font-bold',
          isOpen && 'rounded-b-none',
          'bg-slate-300 text-slate-700',
          'dark:bg-slate-600 dark:text-slate-200',
        )}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle Table of Contents"
      >
        <Bookmark className="mr-1 h-5 w-5" />
        <span className="mr-6">Table of Contents</span>
        <ChevronDown
          className={cn(
            'ml-auto h-6 w-6 transition-transform duration-300 ease-in-out',
            isOpen && 'rotate-180',
          )}
        />
      </button>
      {isOpen && <div className="p-2 pr-6">{children}</div>}
    </section>
  );
}
