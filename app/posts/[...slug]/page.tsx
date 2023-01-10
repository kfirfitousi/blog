import '@/styles/markdown.css';
import { notFound } from 'next/navigation';
import { allPosts } from 'contentlayer/generated';
import { MdxContent } from '@/components/mdx-content';
import { PostIntro } from '@/components/post-intro';
import { Comments } from '@/components/comments';

type PostPageProps = {
  params: {
    slug: string[];
  };
};

export async function generateStaticParams(): Promise<
  PostPageProps['params'][]
> {
  return allPosts.map((post) => ({
    slug: post.slug.split('/'),
  }));
}

export default function PostPage({ params }: PostPageProps) {
  const post = allPosts.find((post) => post.slug === params.slug.join('/'));

  if (!post) {
    notFound();
  }

  return (
    <article className="h-full px-8">
      <PostIntro title={post.title} date={post.date} tags={post.tags} />
      <MdxContent code={post.body.code} />
      <Comments />
    </article>
  );
}
