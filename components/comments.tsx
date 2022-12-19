'use client';

import { useThemeStore } from '@/stores/theme-store';

export function Comments() {
  const isDark = useThemeStore((state) => state.isDark);

  return (
    <section
      ref={(element) => {
        if (!element) {
          return;
        }
        const scriptElement = document.createElement('script');
        scriptElement.setAttribute('src', 'https://utteranc.es/client.js');
        scriptElement.setAttribute('crossorigin', 'anonymous');
        scriptElement.setAttribute('repo', 'kfirfitousi/blog');
        scriptElement.setAttribute('issue-term', 'pathname');
        scriptElement.setAttribute('async', 'true');
        scriptElement.setAttribute(
          'theme',
          isDark ? 'photon-dark' : 'github-light',
        );
        element.replaceChildren(scriptElement);
      }}
    />
  );
}
