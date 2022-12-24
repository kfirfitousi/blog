import { SEO } from '@/components/seo';

export default async function PostsPageHead() {
  return (
    <SEO
      title="Kfir's Blog | Posts"
      description="All my blog posts. I write about Web Development and other topics I'm interested in."
      ogImage="https://blog.kfirfitousi.com/api/og?title=Posts"
    />
  );
}
