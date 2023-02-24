import { type Metadata } from 'next/types';
import { allPosts } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';

import { blogConfig } from '@/config';
import { PostPaginator } from '@/components/post-paginator';

const { url, title, description } = blogConfig.pages.posts;

const ogImage = {
  url: `${blogConfig.url}/og?title=${title}`,
};

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    type: 'website',
    url: `${blogConfig.url}${url}`,
    title,
    description,
    images: [ogImage],
  },
  twitter: {
    title,
    description,
    images: ogImage,
    card: 'summary_large_image',
  },
};

export default function PostsPage() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  );

  return (
    <div className="h-full px-6 pb-12 sm:px-12">
      <PostPaginator posts={posts} />
    </div>
  );
}
