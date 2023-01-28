import { blogConfig } from '@/config';
import { SEO } from '@/components/seo';

export default function PostsPageHead() {
  return (
    <SEO
      title={`${blogConfig.title} | Posts`}
      description={blogConfig.descriptions.posts}
      ogImage={{ title: 'Posts' }}
    />
  );
}
