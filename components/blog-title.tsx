"use client";

import { useThemeStore } from "@/stores/theme-store";
import { Waves } from "lucide-react";
import clsx from "clsx";

interface BlogTitleProps {
  title: string;
  small?: boolean;
}

export function BlogTitle({ title, small }: BlogTitleProps) {
  const isSerif = useThemeStore((state) => state.isSerif);

  return (
    <div
      className={clsx(
        "w-full inline-flex justify-center space-x-",
        small ? "items-center" : "items-baseline"
      )}
    >
      <Waves
        className={clsx(
          small ? "w-4 h-4" : "w-8 h-8",
          "text-rose-700 dark:text-rose-50 text-opacity-40"
        )}
        aria-hidden="true"
      />
      <h1
        className={clsx(
          isSerif && "font-serif",
          small
            ? "mx-0.5 text-lg font-semibold"
            : "mx-2 pb-1.5 text-5xl sm:text-6xl font-bold",
          "text-slate-800 dark:text-rose-50 text-center drop-shadow-sm whitespace-nowrap"
        )}
      >
        {title}
      </h1>
      <Waves
        className={clsx(
          small ? "w-4 h-4" : "w-8 h-8",
          "text-rose-700 dark:text-rose-50 text-opacity-40"
        )}
        aria-hidden="true"
      />
    </div>
  );
}
