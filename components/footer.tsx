'use client';

import {
  ArrowUp,
  AtSign,
  Copyright,
  Github,
  Linkedin,
  Twitter,
} from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="relative flex h-full flex-col items-center justify-center space-y-2 pt-8 pb-4 text-slate-700 dark:text-rose-50">
      <button
        onClick={() => {
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
        }}
        className="absolute inset-x-8 inset-y-10 h-fit w-fit"
      >
        <ArrowUp
          className="h-6 w-6 hover:text-rose-600 dark:hover:text-rose-400"
          aria-label="Scroll to top"
        />
      </button>

      <div className="flex flex-row space-x-6">
        <Link href="https://www.github.com/kfirfitousi">
          <Github
            className="h-6 w-6 hover:text-rose-600 dark:hover:text-rose-400"
            aria-label="My GitHub profile"
          />
        </Link>
        <Link href="https://www.twitter.com/kp2c" className="ml-6">
          <Twitter
            className="h-6 w-6 hover:text-rose-600 dark:hover:text-rose-400"
            aria-label="My Twitter profile"
          />
        </Link>
        <a href="mailto:kfirfitousi@gmail.com" className="ml-6">
          <AtSign
            className="h-6 w-6 hover:text-rose-600 dark:hover:text-rose-400"
            aria-label="My Email"
          />
        </a>
        <Link href="https://www.linkedin.com/in/kfirp" className="ml-6">
          <Linkedin
            className="h-6 w-6 hover:text-rose-600 dark:hover:text-rose-400"
            aria-label="My LinkedIn profile"
          />
        </Link>
      </div>

      <div className="flex flex-row items-center space-x-1 text-slate-500 dark:text-slate-300">
        <Copyright className="h-4 w-4" aria-label="Copyright" />
        <span className="text-sm">2022 • Kfir Fitousi</span>
      </div>
    </footer>
  );
}
