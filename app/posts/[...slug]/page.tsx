import { notFound } from 'next/navigation';
import { type Metadata } from 'next/types';
import { allPosts } from 'contentlayer/generated';

import { blogConfig } from '@/config';
import { Comments } from '@/components/comments';
import { MDXContent } from '@/components/mdx-content';
import { PostIntro } from '@/components/post-intro';

type PostPageProps = {
  params: {
    slug: string[];
  };
};

export async function generateStaticParams(): Promise<
  PostPageProps['params'][]
> {
  return allPosts.map(({ slug }) => ({
    slug: slug.split('/'),
  }));
}

export function generateMetadata({ params }: PostPageProps): Metadata {
  const { title, excerpt, url, date } = allPosts.find(
    ({ slug }) => slug === params.slug.join('/'),
  ) || {
    title: 'Post Not Found',
    excerpt: null,
    url: '/posts',
    date: new Date().toISOString(),
  };

  const ogImage = {
    url: `${blogConfig.url}/og?title=${title}&subtitle=${excerpt ?? ''}`,
  };

  const description = excerpt ?? 'Post Not Found';

  return {
    title,
    description,
    openGraph: {
      type: 'article',
      url: `${blogConfig.url}${url}`,
      title,
      description,
      publishedTime: date,
      images: [ogImage],
    },
    twitter: {
      title,
      description,
      images: ogImage,
      card: 'summary_large_image',
    },
  };
}

export default function PostPage({ params }: PostPageProps) {
  const post = allPosts.find(({ slug }) => slug === params.slug.join('/'));

  if (!post) {
    notFound();
  }

  return (
    <article className="h-full px-8">
      <PostIntro title={post.title} date={post.date} tags={post.tags} />
      <MDXContent code={post.body.code} />
      <Comments />
    </article>
  );
}
