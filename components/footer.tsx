'use client';

import {
  AtSign,
  Copyright,
  Github,
  Linkedin,
  Pizza,
  Twitter,
} from 'lucide-react';

import { blogConfig } from '@/config';
import { Tooltip } from '@/components/tooltip';

export function Footer() {
  const { footerLinks } = blogConfig;

  return (
    <footer className="relative flex h-full w-full flex-col items-center justify-center space-y-4">
      <div className="flex flex-row flex-wrap justify-center gap-4 max-xs:px-16">
        {footerLinks?.github && (
          <a
            href={footerLinks.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github
              id="github"
              className="icon-base"
              data-tooltip-content="My GitHub profile"
              aria-label="My GitHub profile"
            />
            <Tooltip anchorId="github" />
          </a>
        )}
        {footerLinks?.twitter && (
          <a
            href={footerLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter
              id="twitter"
              className="icon-base"
              data-tooltip-content="My Twitter profile"
              aria-label="My Twitter profile"
            />
            <Tooltip anchorId="twitter" />
          </a>
        )}
        {footerLinks?.linkedin && (
          <a
            href={footerLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin
              id="linkedin"
              className="icon-base"
              data-tooltip-content="My LinkedIn profile"
              aria-label="My LinkedIn profile"
            />
            <Tooltip anchorId="linkedin" />
          </a>
        )}
        {footerLinks?.email && (
          <a href={`mailto:${footerLinks.email}`}>
            <AtSign
              id="email"
              className="icon-base"
              data-tooltip-content="My Email"
              aria-label="My Email"
            />
            <Tooltip anchorId="email" />
          </a>
        )}
        {footerLinks?.storybook && (
          <a
            href={footerLinks.storybook}
            target="_blank"
            rel="noopener noreferrer"
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
              strokeWidth="2.6"
              className="icon-base"
              data-tooltip-content="Storybook"
              aria-label="Storybook"
            >
              <path d="M21.786 0.318l-0.161 3.615c-0.005 0.203 0.229 0.328 0.391 0.203l1.411-1.068 1.198 0.932c0.156 0.104 0.365 0 0.375-0.188l-0.135-3.677 1.776-0.135c0.922-0.063 1.708 0.672 1.708 1.599v28.802c0 0.917-0.766 1.646-1.682 1.599l-21.469-0.958c-0.833-0.036-1.505-0.708-1.531-1.547l-1-26.401c-0.052-0.885 0.62-1.646 1.505-1.693l17.599-1.109zM17.693 12.401c0 0.625 4.214 0.318 4.786-0.109 0-4.266-2.292-6.521-6.479-6.521-4.198 0-6.531 2.297-6.531 5.724 0 5.932 8 6.036 8 9.276 0 0.938-0.427 1.469-1.401 1.469-1.281 0-1.802-0.651-1.734-2.88 0-0.479-4.865-0.641-5.026 0-0.359 5.375 2.974 6.932 6.797 6.932 3.724 0 6.63-1.984 6.63-5.573 0-6.359-8.135-6.188-8.135-9.333 0-1.292 0.964-1.464 1.505-1.464 0.604 0 1.667 0.094 1.589 2.49z" />
            </svg>
            <Tooltip anchorId="storybook" />
          </a>
        )}
        {footerLinks?.buyMeAPizza && (
          <a
            href={footerLinks.buyMeAPizza}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Pizza
              id="pizza"
              className="icon-base"
              data-tooltip-content="Buy me a pizza"
              aria-label="Buy me a pizza"
            />
            <Tooltip anchorId="pizza" />
          </a>
        )}
      </div>

      <div className="flex h-6 flex-row items-center justify-center space-x-1 text-slate-600 dark:text-slate-300">
        <Copyright className="h-4 w-4" aria-label="Copyright" />
        <span className="text-xs xs:text-sm">2023 · {blogConfig.author}</span>
      </div>

      <button
        className="absolute left-8 bottom-4 h-full w-fit"
        onClick={() => {
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
        }}
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
          className="icon-base h-12"
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
