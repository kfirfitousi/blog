import { cn } from '@/lib/utils';

interface PostTagsProps {
  tags: string[];
  className?: string;
}

export function PostTags({ tags, className }: PostTagsProps) {
  return (
    <div className={cn('flex flex-row flex-wrap gap-1', className)}>
      {tags.map((tag) => (
        <span
          key={tag}
          className={cn(
            'w-fit whitespace-nowrap rounded px-2 py-1',
            'bg-slate-700 text-slate-200',
            'dark:bg-rose-50 dark:text-slate-700',
          )}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
