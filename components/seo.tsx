type SEOProps = {
  title: string;
  description: string;
  ogImage: string;
  ogType?: 'website' | 'article';
};

export function SEO({
  title,
  description,
  ogImage,
  ogType = 'website',
}: SEOProps) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@kp2c" />
      <meta name="twitter:creator" content="@kp2c" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link rel="icon" href="/favicon.ico" />
    </>
  );
}
