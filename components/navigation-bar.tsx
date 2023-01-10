import { BlogTitle } from '@/components/blog-title';
import Link from 'next/link';
import clsx from 'clsx';

type NavigationBarProps = {
  className?: string;
};

export function NavigationBar({ className }: NavigationBarProps) {
  return (
    <nav
      className={clsx(
        className,
        'flex h-8 flex-row items-center justify-start max-xs:text-sm sm:justify-center',
      )}
    >
      <Link
        href="/posts"
        className="order-2 mr-2 font-semibold hover:text-rose-600 dark:hover:text-rose-400 xs:mr-4 sm:order-1"
      >
        Posts
      </Link>
      <Link href="/" className="order-1 mr-2 xs:mr-4 sm:order-2">
        <BlogTitle small title="Kfir's Blog" />
      </Link>
      <Link
        href="/about"
        className="order-3 font-semibold hover:text-rose-600 dark:hover:text-rose-400"
      >
        About
      </Link>
    </nav>
  );
}
