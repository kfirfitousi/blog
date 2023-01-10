import { allPages } from 'contentlayer/generated';
import { SEO } from '@/components/seo';

type PageHeadProps = {
  params: {
    slug: string[];
  };
};

export default async function PageHead({ params }: PageHeadProps) {
  const page = allPages.find((page) => page.slug === params.slug.join('/'));

  const { title, description } = page || {
    title: 'Page Not Found',
    description: 'Page not found',
  };

  return (
    <SEO
      title={`Kfir's Blog | ${title}`}
      description={description}
      ogImage={{ title }}
    />
  );
}
