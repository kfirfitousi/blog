"use client";

import { type BlogMdxNode } from "@/lib/mdx-sources";
import { useThemeStore } from "@/stores/theme-store";
import clsx from "clsx";

import { PostTags } from "./post-tags";
import { Calendar } from "lucide-react";
import Link from "next/link";

interface PostCardProps {
  post: BlogMdxNode;
}

export function PostCard({ post }: PostCardProps) {
  const isSerif = useThemeStore((state) => state.isSerif);

  if (!post) return null;

  return (
    <Link
      key={post.slug}
      href={post.url}
      className="group relative w-full h-full"
    >
      <article
        className={clsx(
          isSerif && "font-serif",
          "flex flex-col space-y-4 px-10 py-3 rounded bg-slate-100 dark:bg-slate-500 m-[2px] relative z-10"
        )}
      >
        <div className="flex flex-col space-y-2">
          <h2 className="text-slate-800 dark:text-rose-50 text-2xl sm:text-3xl font-bold leading-normal">
            {post.frontMatter.title}
          </h2>

          <p className="text-xl sm:text-base text-slate-600 dark:text-rose-50">
            {post.frontMatter.excerpt}
          </p>

          <p className="inline-flex items-center space-x-1 text-slate-600 dark:text-slate-200">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">
              Published{" "}
              {new Date(post.frontMatter.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </p>
        </div>
        <PostTags tags={post.frontMatter.tags} className="text-sm sm:text-xs" />
      </article>
      <div className="absolute z-20 inset-0 bg-slate-700 dark:bg-rose-50 w-4 h-[calc(100%-4px)] my-auto rounded-l group-hover:animate-border group-focus:animate-border-fast"></div>
    </Link>
  );
}
