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

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = allPosts.find(({ slug }) => slug === params.slug.join('/')) || {
    title: 'Post Not Found',
    excerpt: '',
    url: '/posts',
    date: new Date().toISOString(),
  };

  const title = `${blogConfig.title} | ${post.title}`;

  const ogImage = {
    url: `${blogConfig.url}/api/og?title=${post.title}&subtitle=${post.excerpt}`,
  };

  return {
    title,
    description: post.excerpt,
    openGraph: {
      type: 'article',
      url: `${blogConfig.url}${post.url}`,
      title: { absolute: title },
      description: post.excerpt,
      publishedTime: post.date,
      images: [ogImage],
    },
    twitter: {
      title,
      description: post.excerpt,
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
