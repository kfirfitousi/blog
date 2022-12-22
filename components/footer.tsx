'use client';

import { AtSign, Copyright, Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="relative grid h-full w-full grid-rows-2 flex-col items-center justify-center py-4 text-slate-700 dark:text-rose-50">
      <div className="flex flex-row space-x-6">
        <Link href="https://www.github.com/kfirfitousi" target="_blank">
          <Github
            className="h-6 w-6 hover:scale-110 hover:pb-0.5 hover:text-rose-600 dark:hover:text-rose-400"
            aria-label="My GitHub profile"
          />
        </Link>
        <Link
          href="https://www.twitter.com/kp2c"
          target="_blank"
          className="ml-6"
        >
          <Twitter
            className="h-6 w-6 hover:scale-110 hover:pb-0.5 hover:text-rose-600 dark:hover:text-rose-400"
            aria-label="My Twitter profile"
          />
        </Link>
        <a href="mailto:kfirfitousi@gmail.com" className="ml-6">
          <AtSign
            className="h-6 w-6 hover:scale-110 hover:pb-0.5 hover:text-rose-600 dark:hover:text-rose-400"
            aria-label="My Email"
          />
        </a>
        <Link
          href="https://www.linkedin.com/in/kfirp"
          target="_blank"
          className="ml-6"
        >
          <Linkedin
            className="h-6 w-6 hover:scale-110 hover:pb-0.5 hover:text-rose-600 dark:hover:text-rose-400"
            aria-label="My LinkedIn profile"
          />
        </Link>
      </div>
      <div className="flex h-6 flex-row items-center justify-center space-x-1 text-slate-600 dark:text-slate-300">
        <Copyright className="h-4 w-4" aria-label="Copyright" />
        <span className="text-sm">2022 · Kfir Fitousi</span>
      </div>

      <button
        onClick={() => {
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
        }}
        className="absolute left-8 my-auto h-full w-fit"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="48"
          viewBox="0 0 24 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-12 w-6 hover:scale-110 hover:text-rose-600 dark:hover:text-rose-400"
          viewTarget="0 0 24 48"
          aria-label="Scroll to top"
        >
          <line x1="12" y1="38" x2="12" y2="5"></line>
          <polyline points="5 12 12 5 19 12"></polyline>
        </svg>
      </button>
    </footer>
  );
}
