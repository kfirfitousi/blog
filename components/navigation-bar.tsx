import Link from 'next/link';
import { allPages } from 'contentlayer/generated';

import { BlogTitle } from '@/components/blog-title';
import { cn } from '@/lib/utils';

type NavigationBarProps = {
  className?: string;
};

export function NavigationBar({ className }: NavigationBarProps) {
  return (
    <nav
      className={cn(
        'flex h-8 flex-row items-center space-x-2 max-xs:text-sm sm:space-x-4',
        className,
      )}
    >
      <Link href="/">
        <BlogTitle />
      </Link>
      <Link
        href="/posts"
        className="font-semibold hover:text-accent dark:hover:text-accent-dark"
      >
        Posts
      </Link>
      {allPages.map((page) => (
        <Link
          href={page.url}
          key={page._id}
          className="font-semibold hover:text-accent dark:hover:text-accent-dark"
        >
          {page.title}
        </Link>
      ))}
    </nav>
  );
}
