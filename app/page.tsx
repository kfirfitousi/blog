import { BlogSource } from "@/lib/mdx-sources";
import { BlogTitle } from "@/components/blog-title";
import { PostCard } from "@/components/post-card";

export default async function Home() {
  const posts = await BlogSource.getAllMdxNodes();
  const latestPosts = posts.slice(0, 3);

  return (
    <div className="flex h-full flex-col space-y-4 px-6 pb-12 sm:px-12">
      <section className="h-40 w-full rounded-md border bg-slate-300 pb-8">
        {/* TODO: Hero section */}
      </section>
      <section className="col-start-2 flex w-full flex-col space-y-4">
        <h2 className="text-center text-3xl font-semibold text-slate-800 dark:text-rose-100">
          Latest
        </h2>
        {latestPosts.map((post) => (
          <PostCard key={post?.slug} post={post} />
        ))}
      </section>
    </div>
  );
}
