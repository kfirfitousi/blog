import { FileQuestion, FileText, Home } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-2 pb-28">
      <FileQuestion className="h-24 w-24 text-slate-800 dark:text-rose-100" />
      <h2 className="text-3xl font-bold text-slate-800 dark:text-rose-50">
        Post not found
      </h2>
      <div className="flex flex-row space-x-2">
        <Link href="/posts">
          <button className="flex flex-row items-center space-x-2 rounded bg-slate-700 p-2 font-semibold text-slate-200 hover:bg-transparent hover:text-slate-700 hover:outline hover:outline-slate-700 dark:bg-rose-50 dark:text-slate-800 dark:hover:bg-transparent dark:hover:text-rose-50 dark:hover:outline-rose-50">
            <FileText className="h-4 w-4" />
            <span className="text-sm">All Posts</span>
          </button>
        </Link>
        <Link href="/">
          <button className="flex flex-row items-center space-x-2 rounded bg-slate-700 p-2 font-semibold text-slate-200 hover:bg-transparent hover:text-slate-700 hover:outline hover:outline-slate-700 dark:bg-rose-50 dark:text-slate-800 dark:hover:bg-transparent dark:hover:text-rose-50 dark:hover:outline-rose-50">
            <Home className="h-4 w-4" />
            <span className="text-sm">Home</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
