import Link from 'next/link';

type ButtonProps = {
  href: string;
  label: string;
  className?: string;
  icon?: React.ReactNode;
};

export function Button({ href, label, className, icon }: ButtonProps) {
  return (
    <Link href={href} className={className}>
      <button className="flex flex-row items-center space-x-2 rounded bg-slate-700 p-2 font-semibold text-slate-200 shadow-xl hover:bg-transparent hover:text-slate-700 hover:outline hover:outline-slate-700 dark:bg-rose-50 dark:text-slate-800 dark:hover:bg-transparent dark:hover:text-rose-50 dark:hover:outline-rose-50">
        {icon}
        <span className="text-sm">{label}</span>
      </button>
    </Link>
  );
}
