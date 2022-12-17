import { BlogSource } from '@/lib/mdx-sources';
import { GetServerSideProps } from 'next';

const createSitemap = (
  slugs: string[],
) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${slugs
          .map((slug) => {
            return `
                <url>
                    <loc>${`https://blog.kfirfitousi.com/${slug}`}</loc>
                </url>
            `;
          })
          .join('')}
    </urlset>
`;
export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const allPostsSlugs = (await BlogSource.getAllMdxNodes()).map(
    (post) => post.slug,
  );

  const allPages = [
    '',
    'about',
    'posts',
    ...allPostsSlugs.map((slug) => `posts/${slug}`),
  ];

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=1200, stale-while-revalidate=600',
  );
  res.write(createSitemap(allPages));
  res.end();

  return {
    props: {},
  };
};

export default function Sitemap() {
  return null;
}
