import { cn } from '@/lib/cn';

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <a href="#home" aria-label="Rawad Altari — back to top" className={cn('group flex items-center gap-3', className)}>
      <span className="relative grid size-9 place-items-center rounded-xl border border-line-strong bg-surface font-mono text-[0.78rem] font-semibold tracking-tight transition-colors group-hover:border-accent/60">
        RA
        <span className="animate-pulse-dot absolute -right-0.5 -top-0.5 size-2 rounded-full bg-accent" />
      </span>
      {!compact && (
        <span className="hidden flex-col leading-none sm:flex">
          <span className="text-[0.95rem] font-semibold tracking-tight">Rawad Altari</span>
          <span className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-fg-subtle">AI · Front-End</span>
        </span>
      )}
    </a>
  );
}
