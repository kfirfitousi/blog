import { Loader2Icon } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Loader2Icon className="h-12 w-12 animate-spin text-slate-700 dark:text-rose-50" />
    </div>
  );
}
