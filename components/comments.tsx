'use client';

import Giscus from '@giscus/react';

import { useThemeStore } from '@/stores/theme-store';
import { blogConfig } from '@/config';

export function Comments() {
  const isDark = useThemeStore((state) => state.isDark);

  const theme = isDark
    ? blogConfig.giscus.theme?.dark || 'dark_dimmed'
    : blogConfig.giscus.theme?.light || 'light';

  return (
    <section className="mx-auto max-w-2xl">
      <Giscus
        lang="en"
        loading="lazy"
        reactionsEnabled="1"
        inputPosition="bottom"
        {...blogConfig.giscus}
        theme={theme}
      />
    </section>
  );
}
