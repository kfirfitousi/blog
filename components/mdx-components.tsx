import Image from "next/image";
import { CopyCode } from "@/components/copy-code";
/**
 * use div instead of p elements since p elements have restrictions on what
 * elements can be nested inside them
 */
function p(props: React.HTMLProps<HTMLParagraphElement>) {
  return <div {...props}>{props.children}</div>;
}

/**
 * image component that uses next/image, with optional caption
 */
function img({ src, alt }: React.HTMLProps<HTMLImageElement>) {
  const [_alt, caption] = alt?.split("$$") || [];

  return (
    <figure
      className="mx-auto mt-3 mb-6 flex aspect-video w-full max-w-3xl flex-col rounded border border-slate-300 bg-slate-300 bg-opacity-20 dark:border-slate-600 dark:bg-rose-50 dark:bg-opacity-5"
      aria-label={_alt}
    >
      <div className="relative h-full w-full">
        <Image
          src={src || ""}
          alt={_alt}
          fill
          style={{ objectFit: "contain" }}
          className="m-0"
        />
      </div>
      {caption && (
        <figcaption className="m-0 w-full rounded-b-[3px] bg-slate-300 bg-opacity-50 px-6 py-1 text-center text-slate-700 dark:bg-rose-50 dark:bg-opacity-10 dark:text-rose-50">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function pre({ children }: React.HTMLProps<HTMLPreElement>) {
  return (
    <pre className="relative mx-auto max-w-3xl">
      <CopyCode codeElement={children as React.ReactElement} />
      {children}
    </pre>
  );
}

export const MdxComponents = { p, img, pre };
