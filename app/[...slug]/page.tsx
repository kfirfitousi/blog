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

export function generateMetadata({ params }: PageProps): Metadata {
  const { title, description, url } = allPages.find(
    ({ slug }) => slug === params.slug.join('/'),
  ) || {
    title: 'Page Not Found',
    description: 'Page Not Found',
    url: '/',
  };

  const ogImage = {
    url: `${blogConfig.url}/api/og?title=${title}`,
  };

  return {
    title,
    description,
    openGraph: {
      // @ts-ignore (this should be ok but typescript no likey)
      type: 'website',
      url: `${blogConfig.url}${url}`,
      // @ts-ignore (this should also be ok)
      title,
      description,
      images: [ogImage],
    },
    twitter: {
      title,
      description,
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
