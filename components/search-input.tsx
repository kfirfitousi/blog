'use client';

import { useEffect, useRef } from 'react';
import { useSearchStore } from '@/stores/search-store';
import { cn } from '@/lib/utils';
import { XIcon } from 'lucide-react';

type SearchInputProps = {
  hasResults: boolean;
};

export function SearchInput({ hasResults }: SearchInputProps) {
  const query = useSearchStore((state) => state.query);
  const setQuery = useSearchStore((state) => state.setQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // focus input when search is opened
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <input
        ref={inputRef}
        type="text"
        className={cn(
          'w-full rounded border px-2 placeholder:opacity-50',
          hasResults ? 'sm:text-2xl' : 'sm:text-4xl',
          'border-slate-400 bg-slate-100 text-slate-700',
          'dark:border-slate-500 dark:bg-slate-700 dark:text-rose-50',
        )}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search Posts"
        placeholder={
          placeholders[Math.floor(Math.random() * placeholders.length)]
        }
      />
      {query && (
        <button
          onClick={() => setQuery('')}
          className={cn(
            'absolute right-14 top-[1.1rem]',
            hasResults ? 'sm:top-5' : 'sm:top-7',
          )}
        >
          <XIcon
            className={cn('icon-base text-slate-500 dark:text-slate-400')}
            aria-label="Clear"
          />
        </button>
      )}
    </>
  );
}

const placeholders = [
  'What are you looking for?',
  'Something need doing?',
  'Looking for something specific?',
  'Looking for something special?',
  'Ah, I have just the thing for you.',
  'What brings you here?',
  'Whatcha lookin for?',
  "You need somethin'?",
  'I got what you need!',
  'Yeah, what do you want?',
  'What do you require?',
  'I have exactly what you need.',
  'What can I get for ya today?',
  'May you find what you seek.',
  "I hope you'll find something useful!",
  'Feel free to browse.',
];
