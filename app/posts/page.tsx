import { allPosts } from 'contentlayer/generated';
import { Paginator } from '@/components/paginator';
import { compareDesc } from 'date-fns';

export default async function PostsPage() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  );

  return (
    <div className="h-full px-6 pb-12 sm:px-12">
      <Paginator posts={posts} />
    </div>
  );
}
