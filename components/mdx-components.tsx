import { type HTMLProps } from "react";
import Image from "next/image";

/**
 * use div instead of p elements since p elements have restrictions on what
 * elements can be nested inside them
 */
function p(props: HTMLProps<HTMLParagraphElement>) {
  return <div {...props}>{props.children}</div>;
}

/**
 * image component that uses next/image, with optional caption
 */
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

export const MdxComponents = { p, img };
