import { BlogSource } from "@/lib/mdx-sources";
import { PostCard } from "@/components/post-card";
import Link from "next/link";
import { FileText } from "lucide-react";

export default async function Home() {
  const posts = await BlogSource.getAllMdxNodes();
  const latestPosts = posts.slice(0, 3);

  return (
    <div className="flex h-full flex-col space-y-4 px-6 pb-12 sm:px-12">
      <section className="h-40 w-full rounded-md border bg-slate-300 pb-8">
        {/* TODO: Hero section */}
      </section>
      <section className="flex w-full flex-col space-y-4">
        {latestPosts.map((post) => (
          <PostCard key={post?.slug} post={post} />
        ))}
        <Link href="/posts" className="place-self-end">
          <button className="flex flex-row items-center space-x-2 rounded bg-slate-700 p-2 font-semibold text-slate-200 hover:bg-slate-200 hover:text-slate-700 hover:outline hover:outline-slate-700 dark:bg-rose-50 dark:text-slate-800">
            <FileText className="h-4 w-4" />
            <span className="text-sm">All Posts</span>
          </button>
        </Link>
      </section>
    </div>
  );
}
