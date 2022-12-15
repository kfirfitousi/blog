import { BlogSource } from '@/lib/mdx-sources';
import { PostCard } from '@/components/post-card';
import { FileText } from 'lucide-react';
import Link from 'next/link';
import { HeroSection } from '@/components/hero-section';

export default async function Home() {
  const posts = await BlogSource.getAllMdxNodes();
  const latestPosts = posts.slice(0, 3);

  return (
    <div className="flex h-full flex-col space-y-4 px-6 pb-12 sm:px-12">
      <HeroSection />
      <section className="flex w-full flex-col space-y-4">
        {latestPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
        <Link href="/posts" className="place-self-end">
          <button className="flex flex-row items-center space-x-2 rounded bg-slate-700 p-2 font-semibold text-slate-200 hover:bg-transparent hover:text-slate-700 hover:outline hover:outline-slate-700 dark:bg-rose-50 dark:text-slate-800 dark:hover:bg-transparent dark:hover:text-rose-50 dark:hover:outline-rose-50">
            <FileText className="h-4 w-4" />
            <span className="text-sm">All Posts</span>
          </button>
        </Link>
      </section>
    </div>
  );
}
