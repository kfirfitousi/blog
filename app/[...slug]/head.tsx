import { SEO } from '@/components/seo';
import { PagesSource } from '@/lib/mdx/sources';

interface PageHeadProps {
  params: {
    slug: string[];
  };
}

export default async function PageHead({ params }: PageHeadProps) {
  const page = await PagesSource.getMdxNode(params.slug);

  const { title, description } = page?.frontmatter ?? {
    title: 'Page Not Found',
    description: 'Page not found',
  };

  return (
    <SEO
      title={`Kfir's Blog | ${title}`}
      description={description}
      ogImage={`https://blog.kfirfitousi.com/api/og?title=${title}`}
    />
  );
}
