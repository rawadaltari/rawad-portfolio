import { useCallback, type PointerEvent } from 'react';

/** Writes pointer position into CSS vars (--mx/--my) for a cheap, GPU-friendly spotlight hover. */
export function useSpotlight() {
  return useCallback((e: PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  }, []);
}
