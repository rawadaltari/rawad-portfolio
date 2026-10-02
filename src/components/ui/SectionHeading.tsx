import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Reveal } from './Reveal';
import { TextReveal } from './TextReveal';

interface SectionHeadingProps {
  id: string;
  index: string;
  label: string;
  title: string;
  /** Part of the title rendered in the italic serif accent face. */
  accent?: string;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({ id, index, label, title, accent, description, align = 'left', className }: SectionHeadingProps) {
  return (
    <header className={cn('mb-12 max-w-3xl sm:mb-16', align === 'center' && 'mx-auto text-center', className)}>
      <Reveal>
        <p className={cn('eyebrow flex items-center gap-3', align === 'center' && 'justify-center')}>
          <span className="text-accent">{index}</span>
          <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
          <span>{label}</span>
        </p>
      </Reveal>
      <h2 id={id} className="mt-5 text-[clamp(2.1rem,5.2vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
        <TextReveal text={title} />
        {accent && (
          <>
            {' '}
            <TextReveal text={accent} delay={0.12} className="font-display font-normal italic tracking-[-0.01em] text-accent" />
          </>
        )}
      </h2>
      {description && (
        <Reveal delay={0.15}>
          <p className="mt-5 text-base leading-relaxed text-fg-muted sm:text-lg">{description}</p>
        </Reveal>
      )}
    </header>
  );
}
