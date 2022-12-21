import { CopyCode } from '@/components/copy-code';
import Image from 'next/image';
import clsx from 'clsx';
import Link from 'next/link';

/**
 * use <Link> for internal links and <a> for external links and anchors
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
 * use div instead of p elements since p elements have restrictions on what
 * elements can be nested inside them
 */
function p(props: React.HTMLProps<HTMLParagraphElement>) {
  return <div {...props} />;
}

/**
 * image component that uses next/image, with optional caption and width/height
 * example usage: \![alt text {{ w: 600, h: 300, cap: "caption text" }}](/path/to/image)
 */
function img({ src, alt }: React.HTMLProps<HTMLImageElement>) {
  const _alt = (alt?.split('{')[0].trim() ?? alt) || '';
  const props = alt?.split('{')[1];
  const width = parseInt(props?.match(/w:\s*(\d+)/)?.[1] ?? '700');
  const height = parseInt(props?.match(/h:\s*(\d+)/)?.[1] ?? '400');
  const caption = props?.match(/cap:\s*"(.*?)"/)?.[1];

  return (
    <figure
      className="mx-auto mt-3 mb-6 flex h-fit w-fit flex-col rounded border border-slate-300 bg-slate-300 bg-opacity-20 dark:border-slate-600 dark:bg-rose-50 dark:bg-opacity-25"
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
          className="m-0 rounded-b-[3px] bg-slate-300 bg-opacity-50 px-6 py-1 text-center text-slate-700 dark:bg-rose-50 dark:bg-opacity-5 dark:text-rose-50"
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
 * add copy code button to code blocks
 */
function pre({ children }: React.HTMLProps<HTMLPreElement>) {
  return (
    <pre className="relative mx-auto max-w-3xl">
      <CopyCode codeElement={children as React.ReactElement} />
      {children}
    </pre>
  );
}

export const MdxComponents = { a, p, img, pre };
