"use client";

import { type BlogMdxNode } from "@/lib/mdx-sources";
import { useThemeStore } from "@/stores/theme-store";
import { parseDate } from "@/lib/datetime";
import { PostTags } from "@/components/post-tags";
import { Calendar } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

interface PostCardProps {
  post: BlogMdxNode;
}

export function PostCard({ post }: PostCardProps) {
  const isSerif = useThemeStore((state) => state.isSerif);

  if (!post) return null;

  const { formattedDate, relativeTime, isFresh } = parseDate(
    post.frontmatter.date
  );

  return (
    <Link href={post.url} className="group relative h-full w-full">
      <article
        className={clsx(
          isSerif && "font-serif",
          "relative z-10 m-[2px] flex flex-col space-y-4 rounded bg-slate-100 py-3 pl-10 pr-8 dark:bg-slate-600"
        )}
      >
        <div className="flex flex-col space-y-2">
          <h2 className="text-2xl font-bold leading-normal text-slate-800 dark:text-rose-50 sm:text-3xl">
            {post.frontmatter.title}
            {isFresh && (
              <sup className="text-base text-rose-600 text-opacity-40 dark:text-rose-200">
                {" "}
                New
              </sup>
            )}
          </h2>

          <p className="text-slate-600 dark:text-rose-50">
            {post.frontmatter.excerpt}
          </p>

          <p className="inline-flex items-center space-x-1 text-slate-600 dark:text-slate-200">
            <Calendar className="h-4 w-4 self-baseline" />
            <span className="text-sm">
              Published {formattedDate}{" "}
              <span className="hidden text-slate-500 dark:text-slate-300 xs:inline">
                • {relativeTime}
              </span>
            </span>
          </p>
        </div>
        <PostTags tags={post.frontmatter.tags} className="text-sm sm:text-xs" />
      </article>
      <div className="absolute inset-0 z-20 my-auto h-[calc(100%-4px)] w-4 rounded-l bg-slate-700 group-hover:animate-border group-focus:animate-border-fast dark:bg-rose-50"></div>
    </Link>
  );
}
