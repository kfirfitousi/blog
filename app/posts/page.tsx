import { BlogSource } from "@/lib/mdx-sources";
import { Paginator } from "@/components/paginator";

export default async function PostsPage() {
  const posts = await BlogSource.getAllMdxNodes();

  return (
    <div className="flex h-full flex-col space-y-4 px-6 pb-12 sm:px-12">
      <Paginator posts={posts} postPerPage={5} />
    </div>
  );
}
