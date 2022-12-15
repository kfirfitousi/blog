'use client';

import { useState } from 'react';
import Typist from 'react-typist-component';
import GraphemeSplitter from 'grapheme-splitter';

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

  return (
    <section className="flex h-40 w-full flex-col items-center justify-center space-y-2 rounded-md bg-slate-300 bg-opacity-60 px-4 dark:bg-slate-800 dark:bg-opacity-30">
      <Typist typingDelay={100} splitter={splitter}>
        <h1 className="text-center text-3xl font-bold text-slate-800 dark:text-rose-50 xs:text-4xl sm:text-5xl">
          Welcome to my blog{' '}
          <span className="inline-block origin-[70%_70%] animate-wave">👋</span>
        </h1>
      </Typist>
      <p className="text-center text-lg text-slate-800 dark:text-rose-50 xs:text-2xl">
        <Typist typingDelay={100} startDelay={3200}>
          I write about{' '}
        </Typist>
        <Typist
          typingDelay={100}
          startDelay={firstLoop ? 4500 : undefined}
          restartKey={firstLoop}
          onTypingDone={() => setFirstLoop(false)}
          backspaceDelay={75}
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
    </section>
  );
}
