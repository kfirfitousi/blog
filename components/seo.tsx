type SEOProps = {
  title: string;
  description: string;
  ogImage?: {
    title?: string;
    subtitle?: string;
  };
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
      <meta
        property="og:image"
        content={`https://blog.kfirfitousi.com/api/og?title=${
          ogImage?.title || ''
        }&subtitle=${ogImage?.subtitle || ''}`}
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@kp2c" />
      <meta name="twitter:creator" content="@kp2c" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
    </>
  );
}
