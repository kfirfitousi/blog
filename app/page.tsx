import { allPosts } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';
import { FileText } from 'lucide-react';

import { Button } from '@/components/button';
import { HeroSection } from '@/components/hero-section';
import { PostCard } from '@/components/post-card';

export default function Home() {
  const latestPosts = allPosts
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, 3);

  return (
    <div className="flex h-full flex-col space-y-4 px-6 pb-12 sm:px-12">
      <HeroSection />
      <section className="flex w-full flex-col space-y-4">
        {latestPosts.map((post) => (
          <PostCard key={post._id} post={post} />
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
