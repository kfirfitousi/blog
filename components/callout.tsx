import {
  AlertCircle,
  AlertTriangle,
  AlertOctagon,
  Lightbulb,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type CalloutProps = {
  type: 'update' | 'note' | 'warning' | 'important';
  children: React.ReactNode;
};

const Icons: Record<CalloutProps['type'], React.ReactNode> = {
  note: <AlertCircle className="h-4 w-4" aria-label="note" />,
  warning: <AlertTriangle className="h-4 w-4" aria-label="warning" />,
  update: <Lightbulb className="h-4 w-4" aria-label="update" />,
  important: <AlertOctagon className="h-4 w-4" aria-label="important" />,
};

export const Callout = ({ type, children }: CalloutProps) => {
  return (
    <div
      className={cn(
        'relative my-6 rounded-md p-2 px-8',
        type === 'update' &&
          'bg-slate-100 text-slate-600 dark:bg-slate-600 dark:text-slate-200',
        type === 'note' &&
          'bg-cyan-50 bg-opacity-50 text-cyan-700 dark:bg-cyan-200 dark:bg-opacity-10 dark:text-cyan-100',
        type === 'warning' &&
          'bg-amber-50 bg-opacity-50 text-amber-700 dark:bg-amber-300 dark:bg-opacity-10 dark:text-amber-500',
        type === 'important' &&
          'bg-red-50 bg-opacity-50 text-rose-700 dark:bg-rose-400 dark:bg-opacity-10 dark:text-rose-300',
      )}
    >
      <div
        className={cn(
          'absolute left-3 -top-3 flex h-6 w-fit rounded-md p-2',
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
        {Icons[type]}
        <div className="text-sm">
          {type.charAt(0).toUpperCase()}
          {type.slice(1)}
        </div>
      </div>
      {children}
    </div>
  );
};
