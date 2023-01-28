'use client';

import { useThemeStore } from '@/stores/theme-store';
import { cn } from '@/lib/utils';

type FontStyleProviderProps = {
  children: React.ReactNode;
};

export function FontStyleProvider({ children }: FontStyleProviderProps) {
  const isSerif = useThemeStore((state) => state.isSerif);

  return (
    <div className={cn('contents', isSerif ? 'font-serif' : 'font-sans')}>
      {children}
    </div>
  );
}
