import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="h-full flex flex-col space-y-2 justify-center items-center">
      <FileQuestion
        size="4rem"
        className="text-slate-800 dark:text-slate-300"
      />
      <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-300">
        Post not found
      </h2>
    </div>
  );
}
