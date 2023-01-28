import { blogConfig } from '@/config';
import { SEO } from '@/components/seo';

export default function Head() {
  return (
    <SEO title={blogConfig.title} description={blogConfig.descriptions.home} />
  );
}
