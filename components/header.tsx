"use client";

import { usePathname } from "next/navigation";

import { DarkModeSwitch } from "./dark-mode-switch";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="h-full flex flex-row justify-between items-center px-8 py-auto">
      {pathname?.startsWith("/blog") && (
        <Link
          href="/"
          className="w-fit h-full flex flex-row items-center space-x-1 text-slate-700 hover:text-slate-500 dark:text-slate-200 dark:hover:text-slate-400"
        >
          <ArrowLeft className="w-10 h-10 sm:w-6 sm:h-6" />
          <label className="cursor-pointer text-xl sm:text-sm">Back</label>
        </Link>
      )}

      <DarkModeSwitch />
    </header>
  );
}
