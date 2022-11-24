"use client";

import { PostTags } from "./post-tags";
import { useThemeStore } from "@/stores/theme-store";
import clsx from "clsx";

interface PostIntroProps {
  title: string;
  date: string;
  tags: string[];
}

export function PostIntro({ title, date, tags }: PostIntroProps) {
  const fontSize = useThemeStore((state) => state.fontSize);
  const isSerif = useThemeStore((state) => state.isSerif);

  return (
    <div className="flex flex-col space-y-4 p-3">
      <h1
        className={clsx(
          isSerif && "font-serif",
          fontSize === "sm" && "text-xl sm:text-2xl md:text-3xl",
          fontSize === "base" && "text-2xl sm:text-3xl md:text-4xl",
          fontSize === "lg" && "text-3xl sm:text-4xl md:text-5xl",
          fontSize === "xl" && "text-4xl sm:text-5xl md:text-6xl",
          fontSize === "2xl" && "text-5xl sm:text-6xl",
          "text-slate-800 dark:text-rose-50 font-bold"
        )}
      >
        {title}
      </h1>
      <p
        className={clsx(
          isSerif && "font-serif",
          fontSize === "sm" && "text-xs sm:text-sm",
          fontSize === "base" && "text-sm sm:text-base",
          fontSize === "lg" && "text-base sm:text-lg",
          fontSize === "xl" && "text-lg sm:text-xl",
          fontSize === "2xl" && "text-xl sm:text-2xl",
          "text-lg sm:text-base text-slate-600 dark:text-slate-200"
        )}
      >
        Published{" "}
        {new Date(date).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </p>
      <PostTags
        tags={tags}
        className={clsx(
          isSerif && "font-serif",
          fontSize === "sm" && "text-xs",
          fontSize === "base" && "text-sm sm:text-xs",
          fontSize === "lg" && "text-base sm:text-sm",
          fontSize === "xl" && "text-lg sm:text-base",
          fontSize === "2xl" && "text-xl sm:text-lg"
        )}
      />
    </div>
  );
}
