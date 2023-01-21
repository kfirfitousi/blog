import { SEO } from '@/components/seo';

export default function PostsPageHead() {
  return (
    <SEO
      title="‹kfir/blog› | Posts"
      description="All my blog posts. I write about Web Development and other topics I'm interested in."
      ogImage={{ title: 'Posts' }}
    />
  );
}
