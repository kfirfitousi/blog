import { allPosts } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';

import { PostPaginator } from '@/components/post-paginator';

export default function PostsPage() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  );

  return (
    <div className="h-full px-6 pb-12 sm:px-12">
      <PostPaginator posts={posts} />
    </div>
  );
}
