import BlogSource from "@/lib/mdx";

export default async function Head({
  params,
}: {
  params: {
    slug: string[];
  };
}) {
  const post = await BlogSource.getMdxNode(params.slug);

  if (!post) {
    return null;
  }

  return (
    <>
      <title>{post.frontMatter.title}</title>
      <meta name="description" content={post.frontMatter.excerpt} />
    </>
  );
}
