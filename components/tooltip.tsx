import {
  Tooltip as ReactTooltip,
  type ITooltip as TooltipProps,
} from 'react-tooltip';
import clsx from 'clsx';

export function Tooltip(props: TooltipProps) {
  return (
    <ReactTooltip
      className={clsx(
        'hidden !bg-slate-700 text-sm !text-slate-200 dark:!bg-slate-200 dark:!text-slate-700 xs:block',
        props.className,
      )}
      {...props}
    />
  );
}
