import Link from 'next/link';

import { BlogTitle } from '@/components/blog-title';
import { cn } from '@/lib/utils';

type NavigationBarProps = {
  className?: string;
};

export function NavigationBar({ className }: NavigationBarProps) {
  return (
    <nav
      className={cn(
        'flex h-8 flex-row items-center justify-start max-xs:text-sm sm:justify-center',
        className,
      )}
    >
      <Link
        href="/posts"
        className="order-2 mr-2 font-semibold hover:text-accent dark:hover:text-accent-dark xs:mr-4 sm:order-1"
      >
        Posts
      </Link>
      <Link href="/" className="order-1 mr-2 xs:mr-4 sm:order-2">
        <BlogTitle className="text-lg" />
      </Link>
      <Link
        href="/about"
        className="order-3 font-semibold hover:text-accent dark:hover:text-accent-dark"
      >
        About
      </Link>
    </nav>
  );
}
