"use client";

import { useThemeStore } from "@/stores/theme-store";
import clsx from "clsx";

import { Waves } from "lucide-react";

interface BlogTitleProps {
  title: string;
}

export default function BlogTitle({ title }: BlogTitleProps) {
  const isSerif = useThemeStore((state) => state.isSerif);

  return (
    <div className="inline-flex items-baseline justify-center">
      <Waves className="w-8 h-8 min-w-max text-rose-700 dark:text-rose-50 text-opacity-40" />
      <h1
        className={clsx(
          isSerif && "font-serif",
          "pb-1.5 mx-2 text-slate-800 dark:text-rose-50 text-center text-5xl sm:text-6xl font-bold drop-shadow-sm whitespace-nowrap"
        )}
      >
        {title}
      </h1>
      <Waves className="w-8 h-8 min-w-max text-rose-700 dark:text-rose-50 text-opacity-40" />
    </div>
  );
}
