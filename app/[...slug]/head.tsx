import { PagesSource } from '@/lib/mdx-sources';

interface PageHead {
  params: {
    slug: string[];
  };
}

export default async function PostHead({ params }: PageHead) {
  const page = await PagesSource.getMdxNode(params.slug);

  const { title, description } = page?.frontmatter ?? {
    title: 'Page Not Found',
    description: 'Page not found',
  };

  return (
    <>
      <title>{`Kfir's Blog | ${title}`}</title>
      <meta name="description" content={description} />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="article" />
      <meta
        property="og:image"
        content={`https://blog.kfirfitousi.com/api/og?title=${title}&subtitle=${description}`}
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@kp2c" />
      <meta name="twitter:creator" content="@kp2c" />
    </>
  );
}
