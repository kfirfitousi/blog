import { BlogSource } from "@/lib/mdx-sources";
import { BlogTitle } from "@/components/blog-title";
import { PostCard } from "@/components/post-card";

export default async function Home() {
  const posts = await BlogSource.getAllMdxNodes();

  return (
    <div className="h-full flex flex-col space-y-4 px-6 sm:px-12 pb-12">
      <section className="col-span-3 mx-auto pb-8 md:pb-12">
        <BlogTitle title="Kfir's Blog" />
      </section>
      <section className="w-full col-start-2 flex flex-col space-y-4">
        {posts.map((post) => (
          <PostCard key={post?.slug} post={post} />
        ))}
      </section>
    </div>
  );
}
