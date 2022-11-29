import clsx from "clsx";

interface PostTagsProps {
  tags: string[];
  className?: string;
}

export function PostTags({ tags, className }: PostTagsProps) {
  return (
    <p className={clsx(className, "flex flex-row gap-1 flex-wrap")}>
      {tags.map((tag) => (
        <span
          key={tag}
          className="w-fit px-2 py-1 text-slate-100 dark:text-slate-900 bg-slate-600 dark:bg-rose-50 rounded whitespace-nowrap"
        >
          {tag}
        </span>
      ))}
    </p>
  );
}
