import { BlogSource } from '@/lib/mdx/sources';

interface PostHeadProps {
  params: {
    slug: string[];
  };
}

export default async function PostHead({ params }: PostHeadProps) {
  const post = await BlogSource.getMdxNode(params.slug);

  const { title, excerpt } = post?.frontmatter ?? {
    title: 'Post Not Found',
    excerpt: 'Post not found',
  };

  return (
    <>
      <title>{`Kfir's Blog | ${title}`}</title>
      <meta name="description" content={excerpt} />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={excerpt} />
      <meta property="og:type" content="article" />
      <meta
        property="og:image"
        content={`https://blog.kfirfitousi.com/api/og?title=${title}&subtitle=${excerpt}`}
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@kp2c" />
      <meta name="twitter:creator" content="@kp2c" />
    </>
  );
}
