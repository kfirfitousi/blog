import Link from 'next/link';

import { cn } from '@/lib/utils';

type ButtonProps = {
  href: string;
  label: string;
  className?: string;
  icon?: React.ReactNode;
};

export function Button({ href, label, className, icon }: ButtonProps) {
  return (
    <Link href={href} className={className}>
      <button
        className={cn(
          'flex flex-row items-center space-x-2 rounded p-2 font-semibold shadow-xl hover:outline',
          'bg-slate-700 text-slate-200 hover:bg-transparent hover:text-slate-700 hover:outline-slate-700',
          'dark:bg-rose-50 dark:text-slate-800 dark:hover:bg-transparent dark:hover:text-rose-50 dark:hover:outline-rose-50',
        )}
      >
        {icon && <span aria-hidden>{icon}</span>}
        <span className="text-sm">{label}</span>
      </button>
    </Link>
  );
}
