import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export function Tag({ children, className, tone = 'default' }: { children: ReactNode; className?: string; tone?: 'default' | 'accent' }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[0.7rem] leading-none tracking-wide',
        tone === 'accent' ? 'border-accent/30 bg-accent-soft text-accent' : 'border-line bg-surface-2/70 text-fg-muted',
        className,
      )}
    >
      {children}
    </span>
  );
}
