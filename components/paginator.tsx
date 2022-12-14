'use client';

import { type BlogMdxNode } from '@/lib/mdx/sources';
import { useThemeStore } from '@/stores/theme-store';
import { PageControls } from '@/components/page-controls';
import { PostCard } from '@/components/post-card';
import { useState } from 'react';
import clsx from 'clsx';

type PaginatorProps = {
  posts: BlogMdxNode[];
  postsPerPage?: number;
};

export function Paginator({ posts, postsPerPage = 5 }: PaginatorProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const lastPage = Math.ceil(posts.length / postsPerPage);
  const isSerif = useThemeStore((state) => state.isSerif);

  return (
    <section
      className={clsx(
        isSerif && 'font-serif',
        'flex h-full w-full flex-col space-y-4',
      )}
    >
      <PageControls
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        lastPage={lastPage}
      />
      <div className="flex h-full w-full flex-col space-y-4">
        {posts
          .slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)
          .map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
      </div>
      <PageControls
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        lastPage={lastPage}
        bottom
      />
    </section>
  );
}
