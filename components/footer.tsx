'use client';

import { AtSign, Copyright, Github, Linkedin, Twitter } from 'lucide-react';
import { Tooltip } from '@/components/tooltip';
import Link from 'next/link';

export function Footer() {
  return (
    <footer
      className="relative grid h-full w-full grid-rows-2 flex-col items-center justify-center
      py-4 text-slate-700 dark:text-rose-50"
    >
      <div className="flex flex-row space-x-6">
        <Link href="https://www.github.com/kfirfitousi" target="_blank">
          <Github
            id="github"
            className="h-6 w-6 hover:scale-110 hover:pb-0.5 hover:text-rose-600 dark:hover:text-rose-400"
            data-tooltip-content="My GitHub profile"
            aria-label="My GitHub profile"
          />
          <Tooltip anchorId="github" />
        </Link>
        <Link
          href="https://www.twitter.com/kp2c"
          target="_blank"
          className="ml-6"
        >
          <Twitter
            id="twitter"
            className="h-6 w-6 hover:scale-110 hover:pb-0.5 hover:text-rose-600 dark:hover:text-rose-400"
            data-tooltip-content="My Twitter profile"
            aria-label="My Twitter profile"
          />
          <Tooltip anchorId="twitter" />
        </Link>
        <a href="mailto:kfirfitousi@gmail.com" className="ml-6">
          <AtSign
            id="email"
            className="h-6 w-6 hover:scale-110 hover:pb-0.5 hover:text-rose-600 dark:hover:text-rose-400"
            data-tooltip-content="My Email"
            aria-label="My Email"
          />
          <Tooltip anchorId="email" />
        </a>
        <Link
          href="https://www.linkedin.com/in/kfirp"
          target="_blank"
          className="ml-6"
        >
          <Linkedin
            id="linkedin"
            className="h-6 w-6 hover:scale-110 hover:pb-0.5 hover:text-rose-600 dark:hover:text-rose-400"
            data-tooltip-content="My LinkedIn profile"
            aria-label="My LinkedIn profile"
          />
          <Tooltip anchorId="linkedin" />
        </Link>
        <a
          href="https://story.blog.kfirfitousi.com"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-6"
        >
          <svg
            id="storybook"
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            height="24px"
            viewBox="-4 -4 40 40"
            role="img"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            className="h-6 w-6 hover:scale-110 hover:pb-0.5 hover:text-rose-600 dark:hover:text-rose-400"
            data-tooltip-content="Storybook"
            aria-label="Storybook"
          >
            <path d="M21.786 0.318l-0.161 3.615c-0.005 0.203 0.229 0.328 0.391 0.203l1.411-1.068 1.198 0.932c0.156 0.104 0.365 0 0.375-0.188l-0.135-3.677 1.776-0.135c0.922-0.063 1.708 0.672 1.708 1.599v28.802c0 0.917-0.766 1.646-1.682 1.599l-21.469-0.958c-0.833-0.036-1.505-0.708-1.531-1.547l-1-26.401c-0.052-0.885 0.62-1.646 1.505-1.693l17.599-1.109zM17.693 12.401c0 0.625 4.214 0.318 4.786-0.109 0-4.266-2.292-6.521-6.479-6.521-4.198 0-6.531 2.297-6.531 5.724 0 5.932 8 6.036 8 9.276 0 0.938-0.427 1.469-1.401 1.469-1.281 0-1.802-0.651-1.734-2.88 0-0.479-4.865-0.641-5.026 0-0.359 5.375 2.974 6.932 6.797 6.932 3.724 0 6.63-1.984 6.63-5.573 0-6.359-8.135-6.188-8.135-9.333 0-1.292 0.964-1.464 1.505-1.464 0.604 0 1.667 0.094 1.589 2.49z" />
          </svg>
          <Tooltip anchorId="storybook" />
        </a>
      </div>
      <div className="flex h-6 flex-row items-center justify-center space-x-1 text-slate-600 dark:text-slate-300">
        <Copyright className="h-4 w-4" aria-label="Copyright" />
        <span className="text-sm">2023 · Kfir Fitousi</span>
      </div>

      <button
        onClick={() => {
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
        }}
        className="absolute left-8 my-auto h-full w-fit"
      >
        <svg
          id="scroll-to-top"
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
          data-tooltip-content="Scroll to top"
        >
          <line x1="12" y1="38" x2="12" y2="5"></line>
          <polyline points="5 12 12 5 19 12"></polyline>
        </svg>
        <Tooltip anchorId="scroll-to-top" place="right" />
      </button>
    </footer>
  );
}
