"use client";

import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import { useThemeStore } from "@/stores/theme-store";
import { type HTMLProps } from "react";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

interface MdxContentProps {
  source: MDXRemoteSerializeResult;
}

const components = {
  a: ({ href, children }: HTMLProps<HTMLAnchorElement>) => (
    <Link href={href || "#"} className="no-underline">
      <span className="text-rose-700 dark:text-rose-300 hover:text-rose-400 dark:hover:text-rose-600 underline">
        {children}
      </span>
    </Link>
  ),
  Image: Image,
};

export function MdxContent({ source }: MdxContentProps) {
  const fontSize = useThemeStore((state) => state.fontSize);
  const serif = useThemeStore((state) => state.serif);

  return (
    <div
      className={clsx(
        serif && "font-serif",
        `prose prose-${fontSize} prose-slate dark:prose-invert dark:text-rose-50 dark:prose-headings:text-rose-100
        prose-blockquote:border-l-slate-800 dark:prose-blockquote:text-rose-50 dark:prose-blockquote:border-l-slate-300 
        prose-li:marker:text-slate-600 dark:prose-li:marker:text-slate-400
        max-w-none py-8`
      )}
    >
      <MDXRemote {...source} components={components} />
    </div>
  );
}
