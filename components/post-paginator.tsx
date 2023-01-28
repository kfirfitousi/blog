'use client';

import { useState } from 'react';
import { type Post } from 'contentlayer/generated';

import { PageControls } from '@/components/page-controls';
import { PostCard } from '@/components/post-card';

type PostPaginatorProps = {
  posts: Post[];
  postsPerPage?: number;
};

export function PostPaginator({ posts, postsPerPage = 5 }: PostPaginatorProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const lastPage = Math.ceil(posts.length / postsPerPage);

  return (
    <section className="flex h-full w-full flex-col space-y-4">
      <PageControls
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        lastPage={lastPage}
      />
      <div className="flex h-full w-full flex-col space-y-4">
        {posts
          .slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)
          .map((post) => (
            <PostCard key={post._id} post={post} />
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
