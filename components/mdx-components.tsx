import { type HTMLProps } from "react";
import Image from "next/image";
import Link from "next/link";
import { Link as LinkIcon } from "lucide-react";

function p({ children }: HTMLProps<HTMLParagraphElement>) {
  return <div>{children}</div>;
}

function h1({ children }: HTMLProps<HTMLHeadingElement>) {
  const id = children?.toString().toLowerCase().replace(/ /g, "-");

  return (
    <h1 id={id} className="group flex space-x-1.5 items-center">
      <a
        href={`#${id}`}
        className="text-slate-800 dark:text-rose-100 no-underline group-hover:underline"
      >
        {children}
      </a>
      <LinkIcon className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 group-hover:text-slate-800 dark:group-hover:text-rose-100" />
    </h1>
  );
}

function h2({ children }: HTMLProps<HTMLHeadingElement>) {
  const id = children?.toString().toLowerCase().replace(/ /g, "-");

  return (
    <h2 id={id} className="group flex space-x-1.5 items-center">
      <a
        href={`#${id}`}
        className="text-slate-800 dark:text-rose-100 no-underline group-hover:underline"
      >
        {children}
      </a>
      <LinkIcon className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 group-hover:text-slate-800 dark:group-hover:text-rose-100" />
    </h2>
  );
}

function a({ href, children }: HTMLProps<HTMLAnchorElement>) {
  return (
    <Link href={href || "#"} className="no-underline">
      <span className="text-rose-700 dark:text-rose-300 hover:text-rose-500 dark:hover:text-rose-400 underline">
        {children}
      </span>
    </Link>
  );
}

function img({ src, alt }: HTMLProps<HTMLImageElement>) {
  const [_alt, caption] = alt?.split("$$") || [];

  return (
    <figure className="flex flex-col mt-3 mb-6 rounded border bg-slate-300 bg-opacity-20 border-slate-300 dark:bg-rose-50 dark:border-slate-600 dark:bg-opacity-10">
      <div className="relative w-full aspect-video">
        <Image
          src={src || ""}
          alt={_alt || ""}
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
    </figure>
  );
}

export const MdxComponents = { p, h1, h2, a, img };
