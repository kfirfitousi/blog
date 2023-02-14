'use client';

import { useEffect, useRef, useState } from 'react';
import { useSelectedLayoutSegments } from 'next/navigation';

import { blogConfig } from '@/config';
import { NavigationBar } from '@/components/navigation-bar';
import { Toolbar } from '@/components/toolbar';
import { cn } from '@/lib/utils';

export function Header() {
  const [scrollTop, setScrollTop] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const layoutSegment = useSelectedLayoutSegments();
  const isPostPage =
    layoutSegment[0] === blogConfig.pages.posts.url.substring(1) &&
    !!layoutSegment[1];

  useEffect(() => {
    // sync scroll position with state
    setScrollTop(document.documentElement.scrollTop);

    // update state on scroll
    const handleScroll = () => {
      setScrollTop(document.documentElement.scrollTop);
    };
    document.addEventListener('scroll', handleScroll);

    return () => document.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className={cn(
        headerRef.current && scrollTop > headerRef.current.clientHeight
          ? 'border-b border-b-slate-300 bg-slate-500/20 py-2 dark:border-b-slate-600'
          : 'bg-transparent py-8',
        'flex flex-row items-center justify-between px-4 xs:px-8',
        'transition-[padding,background-color] duration-300 ease-in-out',
        'text-slate-700 backdrop-blur dark:text-rose-50',
      )}
    >
      <NavigationBar className="flex-grow mix-blend-color-dodge max-xs:mr-2" />
      <Toolbar fontControls={isPostPage} className="ml-auto" />
    </header>
  );
}
