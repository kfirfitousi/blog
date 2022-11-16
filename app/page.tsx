import BlogSource from "@/lib/mdx";

import { PostCard } from "@/components/post-card";

export default async function Home() {
  const posts = await BlogSource.getAllMdxNodes();

  return (
    <div className="flex flex-col space-y-4 px-12 pb-12">
      <section className="col-span-3 flex flex-col space-y-4 py-8 md:py-12">
        <h1 className="text-slate-800 text-center text-6xl font-bold">
          Kfir&apos;s Blog
        </h1>

        <h2 className="text-slate-600 text-center text-xl">
          Welcome to my personal blog
        </h2>
      </section>

      <section className="w-full col-start-2 flex flex-col space-y-4">
        {posts.map((post) => (
          <PostCard key={post?.slug} post={post} />
        ))}
      </section>
    </div>
  );
}
