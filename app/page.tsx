import { BlogSource } from '@/lib/mdx-sources';
import { HeroSection } from '@/components/hero-section';
import { PostCard } from '@/components/post-card';
import { Button } from '@/components/button';
import { FileText } from 'lucide-react';

export default async function Home() {
  const latestPosts = (await BlogSource.getAllMdxNodes()).slice(0, 3);

  return (
    <div className="flex h-full flex-col space-y-4 px-6 pb-12 sm:px-12">
      <HeroSection />
      <section className="flex w-full flex-col space-y-4">
        {latestPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
        <Button
          href="/posts"
          label="All Posts"
          className="place-self-end"
          icon={<FileText className="h-4 w-4" />}
        />
      </section>
    </div>
  );
}
