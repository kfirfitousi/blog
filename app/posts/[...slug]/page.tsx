import { notFound } from 'next/navigation';
import { allPosts } from 'contentlayer/generated';

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
