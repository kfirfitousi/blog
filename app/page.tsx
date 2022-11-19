import BlogSource from "@/lib/mdx";

import { PostCard } from "@/components/post-card";
import { Waves } from "lucide-react";

export default async function Home() {
  const posts = await BlogSource.getAllMdxNodes();

  return (
    <div className="flex flex-col space-y-4 px-6 sm:px-12 pb-12">
      <section className="col-span-3 inline-flex items-center justify-center pb-8 md:pb-12">
        <Waves className="w-8 h-8 text-rose-700 dark:text-rose-50 text-opacity-40" />
        <h1 className="pb-1.5 mx-2 text-slate-800 dark:text-rose-50 text-center text-6xl font-bold drop-shadow-sm whitespace-nowrap">
          Kfir&apos;s Blog
        </h1>
        <Waves className="w-8 h-8 text-rose-700 dark:text-rose-50 text-opacity-40" />
      </section>
      <section className="w-full col-start-2 flex flex-col space-y-4">
        {posts.map((post) => (
          <PostCard key={post?.slug} post={post} />
        ))}
      </section>
    </div>
  );
}
