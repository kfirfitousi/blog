import {
  Tooltip as ReactTooltip,
  type ITooltip as TooltipProps,
} from 'react-tooltip';

import { cn } from '@/lib/utils';

export function Tooltip(props: TooltipProps) {
  return (
    <ReactTooltip
      className={cn(
        'hidden text-sm xs:block',
        '!bg-slate-700 !text-slate-200',
        'dark:!bg-slate-200 dark:!text-slate-700',
        props.className,
      )}
      {...props}
    />
  );
}
