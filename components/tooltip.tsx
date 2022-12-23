import { Tooltip as ReactTooltip, ITooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

export function Tooltip(props: ITooltip) {
  return (
    <ReactTooltip
      className="!bg-slate-700 text-sm !text-slate-200 dark:!bg-slate-200 dark:!text-slate-700"
      {...props}
    />
  );
}
