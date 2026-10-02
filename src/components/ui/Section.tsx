import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  /** id of the heading element labelling this region */
  labelledBy?: string;
}

export function Section({ id, children, className, labelledBy }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy ?? `${id}-title`} className={cn('relative py-24 sm:py-28 lg:py-32', className)}>
      <div className="container-page">{children}</div>
    </section>
  );
}
