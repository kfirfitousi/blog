import { ArrowLeft, FileQuestion } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-2 pb-28">
      <FileQuestion className="h-24 w-24 text-slate-800 dark:text-rose-100" />
      <h2 className="text-3xl font-bold text-slate-800 dark:text-rose-50">
        Post not found
      </h2>
      <Link
        href="/"
        className="inline-flex items-center space-x-0.5 text-slate-700 hover:text-rose-500 dark:text-rose-50 dark:hover:text-rose-400"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="text-sm">Go back home</span>
      </Link>
    </div>
  );
}
