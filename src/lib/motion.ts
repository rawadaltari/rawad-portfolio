import type { Transition, Variants } from 'motion/react';

/** Shared easing — a soft "expo out" used across the site for a consistent feel. */
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export const baseTransition: Transition = { duration: 0.8, ease: easeOutExpo };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: baseTransition },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: easeOutExpo } },
};

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

/** Standard in-view trigger used by scroll reveals. */
export const viewportOnce = { once: true, margin: '0px 0px -12% 0px' } as const;
