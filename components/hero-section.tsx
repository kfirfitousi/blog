'use client';

import { useState } from 'react';
import { useThemeStore } from '@/stores/theme-store';
import GraphemeSplitter from 'grapheme-splitter';
import Typist from 'react-typist-component';
import { Pause, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

const topics = [
  'Web Development',
  'React',
  'TypeScript',
  'Next.js',
  'Design',
  'Computer Vision',
];

const splitter = (str: string) => new GraphemeSplitter().splitGraphemes(str);

export function HeroSection() {
  const [firstLoop, setFirstLoop] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const isSerif = useThemeStore((state) => state.isSerif);

  return (
    <section
      className={cn(
        isSerif && 'font-serif',
        'flex flex-col items-center justify-center space-y-2',
        'relative h-40 w-full rounded-md px-4 shadow-xl',
        'bg-opacity-6 bg-slate-300',
        'dark:bg-slate-800 dark:bg-opacity-30',
      )}
    >
      <Typist typingDelay={100} splitter={splitter} pause={isPaused}>
        <h1
          className={cn(
            'text-center text-3xl font-bold xs:text-4xl sm:text-5xl',
            'text-slate-800 dark:text-rose-50',
          )}
        >
          Welcome to my blog{' '}
          <span className="inline-block origin-[70%_70%] animate-wave">👋</span>
        </h1>
      </Typist>
      <p className="text-center text-lg text-slate-800 dark:text-rose-50 xs:text-2xl">
        <Typist typingDelay={100} startDelay={3200} pause={isPaused}>
          I write about{' '}
        </Typist>
        <Typist
          typingDelay={100}
          startDelay={firstLoop ? 4500 : undefined}
          restartKey={firstLoop}
          onTypingDone={() => setFirstLoop(false)}
          backspaceDelay={75}
          pause={isPaused}
          loop
        >
          {topics.map((topic) => (
            <span key={topic} className="font-semibold">
              {topic}
              <Typist.Delay ms={1000} />
              <Typist.Backspace count={topic.length} />
            </span>
          ))}
        </Typist>
      </p>
      <button
        className="absolute right-3 top-1"
        onClick={() => setIsPaused((prev) => !prev)}
      >
        {isPaused ? (
          <Play
            className={cn(
              'h-4 w-4',
              'text-slate-400 text-opacity-50 hover:text-rose-600',
              'dark:text-rose-50 dark:text-opacity-20 dark:hover:text-rose-400',
            )}
            aria-label="Play animation"
          />
        ) : (
          <Pause
            className={cn(
              'h-4 w-4',
              'text-slate-400 text-opacity-50 hover:text-rose-600',
              'dark:text-rose-50 dark:text-opacity-20 dark:hover:text-rose-400',
            )}
            aria-label="Pause animation"
          />
        )}
      </button>
    </section>
  );
}
