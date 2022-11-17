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
          className="w-fit flex flex-row space-x-1 text-slate-700 hover:text-slate-500 dark:text-slate-200 dark:hover:text-slate-400"
        >
          <ArrowLeft />
          <label className="cursor-pointer">Back</label>
        </Link>
      )}

      <DarkModeSwitch />
    </header>
  );
}
