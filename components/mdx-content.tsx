"use client";

import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import { type HTMLProps } from "react";
import Image from "next/image";
import Link from "next/link";

interface MdxContentProps {
  source: MDXRemoteSerializeResult;
}

const components = {
  a: (props: HTMLProps<HTMLAnchorElement>) => (
    <Link href={props.href || "#"}>
      <span className="text-blue-700 dark:text-cyan-200 hover:text-cyan-600 dark:hover:text-cyan-600 underline">
        {props.children}
      </span>
    </Link>
  ),
  Image: Image,
};

export function MdxContent({ source }: MdxContentProps) {
  return <MDXRemote {...source} components={components} />;
}
