import { m } from 'motion/react';
import { Fragment } from 'react';
import { easeOutExpo, viewportOnce } from '@/lib/motion';
import { cn } from '@/lib/cn';

interface TextRevealProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  /** Animate on mount instead of when scrolled into view (used in the hero). */
  immediate?: boolean;
}

/**
 * Masked word-by-word reveal. Words slide up from behind a clip; screen readers get the plain string.
 * Real spaces sit between the word boxes so headings wrap naturally on narrow screens.
 */
export function TextReveal({ text, className, wordClassName, delay = 0, immediate = false }: TextRevealProps) {
  const words = text.split(' ');
  const trigger = immediate
    ? { initial: 'hidden', animate: 'visible' }
    : { initial: 'hidden', whileInView: 'visible', viewport: viewportOnce };

  return (
    <m.span
      className={cn('inline', className)}
      {...trigger}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06, delayChildren: delay } } }}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <Fragment key={`${word}-${i}`}>
            {i > 0 && ' '}
            <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
              <m.span
                className={cn('inline-block will-change-transform', wordClassName)}
                variants={{
                  hidden: { y: '110%' },
                  visible: { y: '0%', transition: { duration: 0.9, ease: easeOutExpo } },
                }}
              >
                {word}
              </m.span>
            </span>
          </Fragment>
        ))}
      </span>
    </m.span>
  );
}
