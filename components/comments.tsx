'use client';

import Giscus from '@giscus/react';
import { useThemeStore } from '@/stores/theme-store';

export function Comments() {
  const isDark = useThemeStore((state) => state.isDark);

  return (
    <div className="mx-auto max-w-2xl">
      <Giscus
        repo="kfirfitousi/blog"
        repoId="R_kgDOIcM7JA"
        category="Comments"
        categoryId="DIC_kwDOIcM7JM4CTdK0"
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme={isDark ? 'dark_dimmed' : 'light'}
        lang="en"
        loading="lazy"
      />
    </div>
  );
}
