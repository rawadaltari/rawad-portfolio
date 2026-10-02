import { m, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import type { ComponentPropsWithoutRef, PointerEvent, ReactNode } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const base =
  'group/btn relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-tight transition-[background-color,border-color,color,box-shadow] duration-300 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:opacity-50';

const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-accent-fg hover:bg-accent-strong shadow-[0_8px_30px_-10px_var(--accent)] hover:shadow-[0_10px_36px_-8px_var(--accent)]',
  secondary: 'border border-line-strong bg-surface/60 text-fg hover:border-fg/40 hover:bg-surface-2',
  ghost: 'text-fg-muted hover:text-fg hover:bg-surface-2',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-[0.95rem]',
  lg: 'h-12 px-6 text-base',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  /** Subtle pointer-following "magnetic" effect (fine pointers only, disabled for reduced motion). */
  magnetic?: boolean;
  className?: string;
  children: ReactNode;
}

type AnchorProps = CommonProps &
  Omit<ComponentPropsWithoutRef<'a'>, keyof CommonProps | 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'> & {
    href: string;
    /** Shown as a tooltip when href is empty (link not available yet). */
    unavailableLabel?: string;
  };

type NativeButtonProps = CommonProps &
  Omit<ComponentPropsWithoutRef<'button'>, keyof CommonProps | 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'> & {
    href?: undefined;
  };

export type ButtonProps = AnchorProps | NativeButtonProps;

function useMagnet(enabled: boolean) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (!enabled) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.22);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.32);
  };
  const onPointerLeave = () => {
    x.set(0);
    y.set(0);
  };
  return { style: enabled ? { x: sx, y: sy } : undefined, onPointerMove, onPointerLeave };
}

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', magnetic = false, className, children } = props;
  const reduce = useReducedMotion();
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)');
  const magnet = useMagnet(magnetic && !reduce && finePointer);
  const classes = cn(base, variants[variant], sizes[size], className);

  if (props.href !== undefined) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { variant: _v, size: _s, magnetic: _m, className: _c, children: _ch, unavailableLabel, href, ...rest } = props;

    if (!href) {
      return (
        <span role="link" aria-disabled="true" title={unavailableLabel ?? 'Link coming soon'} className={classes}>
          {children}
        </span>
      );
    }

    const external = /^https?:\/\//.test(href);
    return (
      <m.a
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
        className={classes}
        style={magnet.style}
        onPointerMove={magnet.onPointerMove}
        onPointerLeave={magnet.onPointerLeave}
        whileTap={reduce ? undefined : { scale: 0.97 }}
      >
        {children}
      </m.a>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { variant: _v, size: _s, magnetic: _m, className: _c, children: _ch, href: _h, type = 'button', ...rest } = props;
  return (
    <m.button
      type={type}
      {...rest}
      className={classes}
      style={magnet.style}
      onPointerMove={magnet.onPointerMove}
      onPointerLeave={magnet.onPointerLeave}
      whileTap={reduce ? undefined : { scale: 0.97 }}
    >
      {children}
    </m.button>
  );
}
