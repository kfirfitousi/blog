import {
  Tooltip as ReactTooltip,
  ITooltip as TooltipProps,
} from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import clsx from 'clsx';

export function Tooltip(props: TooltipProps) {
  return (
    <ReactTooltip
      className={clsx(
        props.className,
        'hidden !bg-slate-700 text-sm !text-slate-200 dark:!bg-slate-200 dark:!text-slate-700 xs:block',
      )}
      {...props}
    />
  );
}
