import { BlogSource } from '@/lib/mdx/sources';
import { SEO } from '@/components/seo';

interface PostPageHeadProps {
  params: {
    slug: string[];
  };
}

export default async function PostPageHead({ params }: PostPageHeadProps) {
  const post = await BlogSource.getMdxNode(params.slug);

  const { title, excerpt } = post?.frontmatter ?? {
    title: 'Post Not Found',
    excerpt: 'Post not found',
  };

  return (
    <SEO
      title={`Kfir's Blog | ${title}`}
      description={excerpt}
      ogImage={`https://blog.kfirfitousi.com/api/og?title=${title}&subtitle=${excerpt}`}
      ogType="article"
    />
  );
}
