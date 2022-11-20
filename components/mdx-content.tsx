"use client";

import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import { useThemeStore } from "@/stores/theme-store";
import { type HTMLProps } from "react";

import Image from "next/image";
import Link from "next/link";
import { Link as LinkIcon } from "lucide-react";
import clsx from "clsx";

interface MdxContentProps {
  source: MDXRemoteSerializeResult;
}

const components = {
  p: ({ children }: HTMLProps<HTMLParagraphElement>) => <div>{children}</div>,
  h2: ({ children }: HTMLProps<HTMLHeadingElement>) => {
    const id = children?.toString().toLowerCase().replace(/ /g, "-");

    return (
      <h2 id={id} className="group inline-flex space-x-1 items-baseline">
        <a href={`#${id}`} className="no-underline group-hover:underline">
          {children}
        </a>
        <LinkIcon className="w-4 h-4 hidden group-hover:block" />
      </h2>
    );
  },
  a: ({ href, children }: HTMLProps<HTMLAnchorElement>) => (
    <Link href={href || "#"} className="no-underline">
      <span className="text-rose-700 dark:text-rose-300 hover:text-rose-400 dark:hover:text-rose-600 underline">
        {children}
      </span>
    </Link>
  ),
  img: ({ src, alt }: HTMLProps<HTMLImageElement>) => {
    const caption = alt?.startsWith("$") ? alt.slice(1) : null;

    return (
      <section className="flex flex-col mt-3 mb-6 rounded border bg-slate-300 bg-opacity-20 border-slate-300 dark:bg-rose-50 dark:border-slate-600 dark:bg-opacity-10">
        <div className="relative w-full aspect-video">
          <Image
            src={src || ""}
            alt={caption || alt || ""}
            fill
            style={{ objectFit: "contain" }}
            className="m-0"
          />
        </div>
        {caption && (
          <figcaption className="px-2 py-1 text-center text-sm sm:text-base m-0 rounded-b-md text-slate-700 bg-slate-300 bg-opacity-50 dark:text-rose-50 dark:bg-rose-50 dark:bg-opacity-10">
            {caption}
          </figcaption>
        )}
      </section>
    );
  },
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
