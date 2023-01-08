import { CopyCode } from '@/components/copy-code';
import { Bookmark, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

/**
 * Use <Link> for internal links and <a> for external links and anchors
 * and open external links in a new tab
 */
export function a({ href, children }: React.HTMLProps<HTMLAnchorElement>) {
  if (href && href.startsWith('/')) {
    return <Link href={href}>{children}</Link>;
  }

  if (href && href.startsWith('#')) {
    return <a href={href}>{children}</a>;
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

/**
 * Use div instead of p elements since p elements have restrictions on what
 * elements can be nested inside them
 */
function p(props: React.HTMLProps<HTMLParagraphElement>) {
  return <div className={clsx(props.className, 'my-4')} {...props} />;
}

/**
 * Image component that uses next/image, with optional caption and width/height
 * Example usage: \!\[alt text {{ w: 600, h: 300, cap: "caption text" }}](/path/to/image)
 */
function img({ src, alt }: React.HTMLProps<HTMLImageElement>) {
  const _alt = (alt?.split('{')[0].trim() ?? alt) || '';
  const props = alt?.split('{')[1];
  const width = parseInt(props?.match(/w:\s*(\d+)/)?.[1] ?? '700');
  const height = parseInt(props?.match(/h:\s*(\d+)/)?.[1] ?? '400');
  const caption = props?.match(/cap:\s*"(.*?)"/)?.[1];

  return (
    <figure
      className="mx-auto mt-3 mb-6 flex h-fit w-fit flex-col rounded border border-slate-300
      bg-slate-300 bg-opacity-20 dark:border-slate-600 dark:bg-rose-50 dark:bg-opacity-25"
      aria-label={_alt}
    >
      <Image
        src={src || ''}
        alt={_alt}
        width={width}
        height={height}
        className={clsx('rounded', caption && 'rounded-b-none')}
      />
      {caption && (
        <figcaption
          className="m-0 rounded-b-[3px] bg-slate-300 bg-opacity-50 px-6 py-1
          text-center text-slate-700 dark:bg-rose-50 dark:bg-opacity-5 dark:text-rose-50"
          style={{
            maxWidth: width,
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Add copy-code button to code blocks
 */
function pre({ children }: React.HTMLProps<HTMLPreElement>) {
  return (
    <pre className="relative mx-auto max-w-3xl">
      <CopyCode codeElement={children as React.ReactElement} />
      {children}
    </pre>
  );
}

/**
 * Collapsible Table of Contents component
 */
export function TableOfContents({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section
      className="mt-8 flex w-full flex-col rounded bg-slate-300 bg-opacity-50 
      dark:bg-slate-600 dark:bg-opacity-50 sm:w-fit"
    >
      <button
        className={clsx(
          'bg-slate-300 text-slate-700 dark:bg-slate-600 dark:text-slate-200',
          'flex flex-row items-center rounded p-2 font-bold',
          isOpen && 'rounded-b-none',
        )}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle Table of Contents"
      >
        <Bookmark className="mr-1 h-5 w-5" />
        <span className="mr-6">Table of Contents</span>
        <ChevronDown
          className={clsx(
            'ml-auto h-6 w-6 transition-transform duration-300 ease-in-out',
            isOpen && 'rotate-180',
          )}
        />
      </button>
      {isOpen && <div className="p-2 pr-6">{children}</div>}
    </section>
  );
}

export const MdxComponents = { a, p, img, pre, TableOfContents };
