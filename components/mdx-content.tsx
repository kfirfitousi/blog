"use client";

import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import Image from "next/image";
import Link from "next/link";
import { HTMLProps } from "react";

interface MdxContentProps {
  source: MDXRemoteSerializeResult;
}

const components = {
  a: (props: HTMLProps<HTMLAnchorElement>) => (
    <Link href={props.href || "#"}>
      <span className="text-blue-600 hover:text-slate-500 underline">
        {props.children}
      </span>
    </Link>
  ),
  Image: Image
};

export function MdxContent({ source }: MdxContentProps) {
  return <MDXRemote {...source} components={components} />;
}
