import { m, type Variants } from 'motion/react';
import type { ReactNode } from 'react';
import { fadeUp, stagger, viewportOnce } from '@/lib/motion';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variants?: Variants;
  as?: 'div' | 'li' | 'article' | 'section' | 'p' | 'span';
}

/** Scroll-triggered reveal. Motion respects `prefers-reduced-motion` via <MotionConfig reducedMotion="user">. */
export function Reveal({ children, className, delay = 0, variants = fadeUp, as = 'div' }: RevealProps) {
  const Comp = m[as];
  return (
    <Comp
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </Comp>
  );
}

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  gap?: number;
  delay?: number;
  as?: 'div' | 'ul' | 'ol';
}

/** Parent that staggers child <RevealItem>s as the group enters the viewport. */
export function RevealGroup({ children, className, gap = 0.08, delay = 0, as = 'div' }: RevealGroupProps) {
  const Comp = m[as];
  return (
    <Comp className={className} variants={stagger(gap, delay)} initial="hidden" whileInView="visible" viewport={viewportOnce}>
      {children}
    </Comp>
  );
}

export function RevealItem({
  children,
  className,
  as = 'div',
  variants = fadeUp,
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'li' | 'article';
  variants?: Variants;
}) {
  const Comp = m[as];
  return (
    <Comp className={className} variants={variants}>
      {children}
    </Comp>
  );
}
