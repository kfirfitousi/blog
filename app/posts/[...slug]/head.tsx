import { allPosts } from 'contentlayer/generated';
import { SEO } from '@/components/seo';

type PostPageHeadProps = {
  params: {
    slug: string[];
  };
};

export default function PostPageHead({ params }: PostPageHeadProps) {
  const post = allPosts.find((post) => post.slug === params.slug.join('/'));

  const { title, excerpt } = post || {
    title: 'Post Not Found',
    excerpt: 'Post not found',
  };

  return (
    <SEO
      title={`‹kfir/blog› | ${title}`}
      description={excerpt}
      ogType="article"
      ogImage={{
        title,
        subtitle: excerpt,
      }}
    />
  );
}
