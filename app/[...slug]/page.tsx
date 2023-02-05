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
  const page = allPages.find(({ slug }) => slug === params.slug.join('/')) || {
    title: 'Page Not Found',
    description: '',
    url: '/',
  };

  const title = `${blogConfig.title} | ${page.title}`;

  const ogImage = {
    url: `${blogConfig.url}/api/og?title=${page.title}`,
  };

  return {
    title,
    description: page.description,
    openGraph: {
      type: 'website',
      url: `${blogConfig.url}${page.url}`,
      title: { absolute: title },
      description: page.description,
      images: [ogImage],
    },
    twitter: {
      title,
      description: page.description,
      images: ogImage,
      card: 'summary_large_image',
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
