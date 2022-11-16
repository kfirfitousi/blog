import { MdxNode } from "@/lib/mdx";

import { PostTags } from "./post-tags";
import Link from "next/link";

interface PostCardProps {
  post: MdxNode;
}

export function PostCard({ post }: PostCardProps) {
  if (!post) return null;
  
  return (
    <Link
      key={post.slug}
      href={post.url}
      className="group relative w-full h-full"
    >
      <article className="flex flex-col space-y-4 px-10 py-3 rounded bg-slate-100 m-[2px] relative z-10">
        <div className="flex flex-col space-y-2">
          <h2 className="text-slate-800 text-2xl font-bold leading-normal sm:text-3xl md:text-3xl">
            {post.frontMatter.title}
          </h2>
          <p className="text-slate-600">{post.frontMatter.excerpt}</p>
          <p className="text-sm text-slate-600">
            {new Date(post.frontMatter.date).toLocaleDateString()}
          </p>
        </div>
        <PostTags tags={post.frontMatter.tags} />
      </article>
      <div className="absolute z-20 inset-0 bg-slate-800 w-4 h-[calc(100%-4px)] my-auto rounded-l group-hover:animate-border"></div>
    </Link>
  );
}
