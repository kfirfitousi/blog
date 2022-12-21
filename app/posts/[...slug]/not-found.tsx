import { Button } from '@/components/button';
import { FileQuestion, FileText, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-2 pb-28">
      <FileQuestion className="h-24 w-24 text-slate-800 dark:text-rose-100" />
      <h2 className="text-3xl font-bold text-slate-800 dark:text-rose-50">
        Post not found
      </h2>
      <div className="flex flex-row space-x-2">
        <Button
          href="/posts"
          label="All Posts"
          icon={<FileText className="h-4 w-4" />}
        />
        <Button href="/" label="Home" icon={<Home className="h-4 w-4" />} />
      </div>
    </div>
  );
}
