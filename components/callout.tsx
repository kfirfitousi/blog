import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Lightbulb,
  LucideIcon,
} from 'lucide-react';

import { cn } from '@/lib/utils';

type CalloutProps = {
  type: 'update' | 'note' | 'warning' | 'important';
  children: React.ReactNode;
};

const Icons: Record<CalloutProps['type'], LucideIcon> = {
  note: AlertCircle,
  warning: AlertTriangle,
  update: Lightbulb,
  important: AlertOctagon,
};

export const Callout = ({ type, children }: CalloutProps) => {
  const Icon = Icons[type];

  return (
    <div
      className={cn(
        'relative my-6 rounded-md p-2 px-8',
        type === 'update' &&
          'bg-slate-100 text-slate-600 dark:bg-slate-600 dark:text-slate-200',
        type === 'note' &&
          'bg-cyan-50/50 text-cyan-700 dark:bg-cyan-200/10 dark:text-cyan-100',
        type === 'warning' &&
          'bg-amber-50/50 text-amber-700 dark:bg-amber-300/10 dark:text-amber-500',
        type === 'important' &&
          'bg-red-50/50 text-rose-700 dark:bg-rose-400/10 dark:text-rose-300',
      )}
    >
      <div
        className={cn(
          'absolute left-3 -top-3 h-6 w-fit rounded-md p-2',
          'flex flex-row items-center justify-center space-x-1',
          type === 'update' &&
            'bg-slate-600 text-slate-300 dark:bg-slate-300 dark:text-slate-600',
          type === 'note' &&
            'bg-cyan-700 text-cyan-50 dark:bg-cyan-100 dark:text-cyan-900',
          type === 'warning' &&
            'bg-amber-700 text-amber-50 dark:bg-amber-500 dark:text-amber-900',
          type === 'important' &&
            'bg-rose-700 text-rose-50 dark:bg-rose-300 dark:text-rose-900',
        )}
      >
        <Icon className="h-4 w-4" aria-hidden />
        <div className="text-sm">
          {type.charAt(0).toUpperCase()}
          {type.slice(1)}
        </div>
      </div>
      {children}
    </div>
  );
};
