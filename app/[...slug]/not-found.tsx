import { Button } from '@/components/button';
import { HomeIcon, XCircleIcon } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
      <XCircleIcon className="h-24 w-24 text-slate-700 dark:text-rose-100" />
      <h2 className="text-3xl font-bold text-slate-700 dark:text-rose-50">
        Page not found
      </h2>
      <Button
        href="/"
        label="HomeIcon"
        icon={<HomeIcon className="h-4 w-4" />}
      />
    </div>
  );
}
