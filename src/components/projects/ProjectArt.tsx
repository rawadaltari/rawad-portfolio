import { Headphones, ImageIcon, Laptop, PawPrint, Smartphone } from 'lucide-react';
import { memo } from 'react';
import { cn } from '@/lib/cn';
import type { ProjectVisual } from '@/types';

/**
 * Abstract, clearly-illustrative placeholder art shown until a real screenshot is added.
 * These are NOT fake screenshots — just on-brand compositions hinting at each project's domain.
 */
export const ProjectArt = memo(function ProjectArt({
  visual,
  path,
  compact = false,
}: {
  visual: ProjectVisual;
  path: string;
  compact?: boolean;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-surface-2">
      <div aria-hidden="true" className="bg-grid mask-radial absolute inset-0 opacity-80" />
      <div
        aria-hidden="true"
        className="absolute -right-1/4 -top-1/3 size-[80%] rounded-full opacity-60 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--accent-soft), transparent 70%)' }}
      />
      <div aria-hidden="true" className="absolute inset-0 grid place-items-center p-[8%]">
        {ART[visual]}
      </div>
      <div className={cn('absolute bottom-3 left-3 flex items-center gap-2 rounded-full border border-line bg-bg/70 px-3 py-1.5 backdrop-blur-sm', compact && 'hidden sm:flex')}>
        <ImageIcon size={12} className="text-fg-subtle" aria-hidden="true" />
        <span className="font-mono text-[0.65rem] tracking-wide text-fg-subtle">
          {import.meta.env.DEV ? path : 'Preview coming soon'}
        </span>
      </div>
    </div>
  );
});

const stroke = 'stroke-[var(--fg-subtle)]';

const ART: Record<ProjectVisual, React.ReactNode> = {
  neural: <NeuralArt />,
  dashboard: <DashboardArt />,
  motion: <MotionArt />,
  commerce: (
    <div className="grid w-full max-w-md grid-cols-3 gap-3">
      {[Laptop, Smartphone, Headphones].map((Icon, i) => (
        <div key={i} className="card flex aspect-[3/4] flex-col items-center justify-center gap-3 !rounded-xl">
          <Icon className="size-1/3 text-fg-muted" strokeWidth={1.2} />
          <span className="h-1.5 w-1/2 rounded-full bg-line-strong" />
          <span className="h-1.5 w-1/3 rounded-full bg-accent/60" />
        </div>
      ))}
    </div>
  ),
  profile: (
    <div className="card flex w-full max-w-sm items-center gap-5 p-5 !rounded-2xl">
      <span className="size-16 shrink-0 rounded-full border border-line-strong bg-surface-2" />
      <div className="flex flex-1 flex-col gap-2">
        <span className="h-2.5 w-3/4 rounded-full bg-fg/25" />
        <span className="h-2 w-1/2 rounded-full bg-line-strong" />
        <div className="mt-2 flex gap-1.5">
          <span className="h-4 w-10 rounded-full bg-accent/40" />
          <span className="h-4 w-12 rounded-full bg-line-strong" />
          <span className="h-4 w-8 rounded-full bg-line-strong" />
        </div>
      </div>
    </div>
  ),
  layout: (
    <div className="flex w-full max-w-md items-end justify-center gap-3">
      <div className="card aspect-[16/10] w-[58%] !rounded-lg p-2">
        <div className="h-full w-full rounded border border-line" />
      </div>
      <div className="card aspect-[3/4] w-[24%] !rounded-lg p-1.5">
        <div className="h-full w-full rounded border border-line" />
      </div>
      <div className="card aspect-[9/18] w-[13%] !rounded-lg p-1">
        <div className="h-full w-full rounded border border-accent/50" />
      </div>
    </div>
  ),
  shop: (
    <div className="grid w-full max-w-[13rem] grid-cols-2 gap-2.5">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="card flex aspect-[4/3] items-center justify-center !rounded-xl">
          <PawPrint className={cn('size-1/3', i === 1 ? 'text-accent' : 'text-fg-subtle')} strokeWidth={1.2} />
        </div>
      ))}
    </div>
  ),
};

function NeuralArt() {
  const layers = [
    [20, 40, 60, 80],
    [15, 32, 50, 68, 85],
    [30, 50, 70],
    [50],
  ];
  const xs = [12, 38, 64, 88];
  return (
    <svg viewBox="0 0 100 100" className="h-full max-h-64 w-full max-w-md" preserveAspectRatio="xMidYMid meet">
      {layers.slice(0, -1).map((layer, li) =>
        layer.map((y1) =>
          layers[li + 1]!.map((y2) => (
            <line
              key={`${li}-${y1}-${y2}`}
              x1={xs[li]}
              y1={y1}
              x2={xs[li + 1]}
              y2={y2}
              className={cn(stroke, li === 2 ? 'opacity-70' : 'opacity-25')}
              strokeWidth={0.3}
            />
          )),
        ),
      )}
      {layers.map((layer, li) =>
        layer.map((y) => (
          <circle
            key={`n-${li}-${y}`}
            cx={xs[li]}
            cy={y}
            r={li === 3 ? 3.6 : 2}
            className={li === 3 ? 'fill-[var(--accent)]' : 'fill-[var(--surface)] stroke-[var(--fg-muted)]'}
            strokeWidth={0.5}
          />
        )),
      )}
      <circle cx={88} cy={50} r={7} className="fill-none stroke-[var(--accent)] opacity-40" strokeWidth={0.4} />
    </svg>
  );
}

function DashboardArt() {
  const panels = ['Admin', 'Student', 'Instructor'];
  return (
    <div className="grid w-full max-w-lg grid-cols-3 gap-3">
      {panels.map((label, i) => (
        <div key={label} className={cn('card flex flex-col gap-2 p-3 !rounded-xl', i === 1 && '-translate-y-3 border-accent/40')}>
          <span className="font-mono text-[0.6rem] uppercase tracking-widest text-fg-subtle">{label}</span>
          <div className="flex h-12 items-end gap-1">
            {[40, 70, 55, 85, 60].map((h, j) => (
              <span key={j} className={cn('flex-1 rounded-sm', i === 1 ? 'bg-accent/60' : 'bg-line-strong')} style={{ height: `${h}%` }} />
            ))}
          </div>
          <span className="h-1.5 w-3/4 rounded-full bg-line-strong" />
          <span className="h-1.5 w-1/2 rounded-full bg-line-strong" />
        </div>
      ))}
    </div>
  );
}

function MotionArt() {
  return (
    <div className="relative h-full w-full max-w-md">
      <span className="animate-float absolute left-[8%] top-[18%] size-16 rounded-2xl border border-line-strong bg-surface" />
      <span className="animate-float absolute right-[12%] top-[10%] size-10 rounded-full bg-accent/70 [animation-delay:-2s]" />
      <span className="animate-float absolute bottom-[14%] left-[30%] h-6 w-32 rounded-full border border-line-strong [animation-delay:-4s]" />
      <span className="animate-spin-slow absolute bottom-[18%] right-[18%] size-14 rounded-xl border border-dashed border-accent/60" />
      <span className="animate-float absolute left-[46%] top-[40%] size-5 rotate-45 bg-fg/30 [animation-delay:-1s]" />
    </div>
  );
}
