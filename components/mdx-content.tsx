"use client";

import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import { useThemeStore } from "@/stores/theme-store";
import { MdxComponents } from "@/components/mdx-components";
import clsx from "clsx";

interface MdxContentProps {
  source: MDXRemoteSerializeResult;
}

export function MdxContent({ source }: MdxContentProps) {
  const fontSize = useThemeStore((state) => state.fontSize);
  const isSerif = useThemeStore((state) => state.isSerif);

  return (
    <div
      className={clsx(
        isSerif && "font-serif",
        `prose prose-${fontSize} prose-slate dark:prose-invert dark:text-rose-50 dark:prose-headings:text-rose-100
        prose-blockquote:border-l-slate-800 dark:prose-blockquote:text-rose-50 dark:prose-blockquote:border-l-slate-300 
        prose-li:marker:text-slate-600 dark:prose-li:marker:text-slate-400 prose-li:my-0 prose-ul:my-1
        max-w-none py-8`
      )}
    >
      <MDXRemote {...source} components={MdxComponents} />
    </div>
  );
}
