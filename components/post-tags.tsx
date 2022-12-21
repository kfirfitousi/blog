import clsx from 'clsx';

interface PostTagsProps {
  tags: string[];
  className?: string;
}

export function PostTags({ tags, className }: PostTagsProps) {
  return (
    <div className={clsx(className, 'flex flex-row flex-wrap gap-1')}>
      {tags.map((tag) => (
        <span
          key={tag}
          className="w-fit whitespace-nowrap rounded bg-slate-600 px-2 py-1 text-slate-100 dark:bg-rose-50 dark:text-slate-900"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
