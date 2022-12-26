import '@/styles/markdown.css';
import { notFound } from 'next/navigation';
import { BlogSource } from '@/lib/mdx/sources';
import { MdxContent } from '@/components/mdx-content';
import { PostIntro } from '@/components/post-intro';
import { Comments } from '@/components/comments';

interface PostPageProps {
  params: {
    slug: string[];
  };
}

export async function generateStaticParams(): Promise<
  PostPageProps['params'][]
> {
  const files = await BlogSource.getAllMdxFiles();

  return files.map((file) => ({
    slug: file.slug.split('/'),
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await BlogSource.getMdxNode(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="h-full px-8">
      <PostIntro
        title={post.frontmatter.title}
        date={post.frontmatter.date}
        tags={post.frontmatter.tags}
      />
      <MdxContent source={post.serialized} />
      <Comments />
    </article>
  );
}
