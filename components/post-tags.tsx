interface PostTagsProps {
  tags: string[];
}

export function PostTags({ tags }: PostTagsProps) {
  return (
    <p className="flex flex-row space-x-1">
      {tags.map((tag) => (
        <span
          key={tag}
          className="w-fit px-2 py-1 text-xs text-slate-100 bg-slate-600 rounded"
        >
          {tag}
        </span>
      ))}
    </p>
  );
}
