"use client";

import { ArrowUp, AtSign, Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative flex h-full flex-row items-center justify-center p-8 text-slate-700 dark:text-rose-50">
      <button
        onClick={() => {
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
        }}
        className="absolute inset-8 w-fit"
      >
        <ArrowUp
          className="h-6 w-6 hover:text-rose-600 dark:hover:text-rose-400"
          aria-label="Scroll to top"
        />
      </button>
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
    </footer>
  );
}
