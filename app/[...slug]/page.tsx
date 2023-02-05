import { notFound } from 'next/navigation';
import { type Metadata } from 'next/types';
import { allPages } from 'contentlayer/generated';

import { blogConfig } from '@/config';
import { MDXContent } from '@/components/mdx-content';

type PageProps = {
  params: {
    slug: string[];
  };
};

export async function generateStaticParams(): Promise<PageProps['params'][]> {
  return allPages.map(({ slug }) => ({
    slug: slug.split('/'),
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { title, description, slug } = allPages.find(
    ({ slug }) => slug === params.slug.join('/'),
  ) || {
    title: 'Page Not Found',
    description: 'Page not found',
    slug: '',
  };

  return {
    title: `${blogConfig.title} | ${title}`,
    description,
    openGraph: {
      type: 'website',
      url: `${blogConfig.url}/${slug}`,
      title: { absolute: `${blogConfig.title} | ${title}` },
      description,
      images: [{ url: `${blogConfig.url}/api/og?title=${title}` }],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const page = allPages.find(({ slug }) => slug === params.slug.join('/'));

  if (!page) {
    notFound();
  }

  return (
    <div className="h-full px-8">
      <MDXContent code={page.body.code} />
    </div>
  );
}
