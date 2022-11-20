import BlogSource from "@/lib/mdx";

export default async function Head({
  params,
}: {
  params: {
    slug: string[];
  };
}) {
  const post = await BlogSource.getMdxNode(params.slug);

  return (
    <>
      <title>
        {`Kfir's Blog | ${post?.frontMatter.title ?? "Post Not Found"}`}
      </title>
      <meta
        name="description"
        content={post?.frontMatter.excerpt ?? "Post not found"}
      />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
    </>
  );
}
