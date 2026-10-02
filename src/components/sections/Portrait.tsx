import { ScanFace } from 'lucide-react';
import { site } from '@/config/site';
import { SmartImage } from '../ui/SmartImage';

/** Framed portrait. Replace /public/images/profile/rawad-altari.jpg — it appears automatically. */
export function Portrait() {
  return (
    <figure className="relative mx-auto w-full max-w-[22rem] sm:max-w-[26rem]">
      {/* viewfinder corners */}
      <span aria-hidden="true" className="absolute -left-3 -top-3 size-6 border-l border-t border-fg-subtle" />
      <span aria-hidden="true" className="absolute -right-3 -top-3 size-6 border-r border-t border-fg-subtle" />
      <span aria-hidden="true" className="absolute -bottom-3 -left-3 size-6 border-b border-l border-fg-subtle" />
      <span aria-hidden="true" className="absolute -bottom-3 -right-3 size-6 border-b border-r border-fg-subtle" />

      {/* animated hairline border */}
      <div className="relative overflow-hidden rounded-[2rem] p-px">
        <div
          aria-hidden="true"
          className="animate-spin-slow absolute left-1/2 top-1/2 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2 motion-reduce:animate-none"
          style={{ background: 'conic-gradient(from 0deg, transparent 0 62%, var(--accent) 80%, transparent 92%)' }}
        />
        <div className="absolute inset-0 rounded-[2rem] border border-line-strong" aria-hidden="true" />
        <div className="relative overflow-hidden rounded-[calc(2rem-1px)] bg-surface">
          <SmartImage
            src={site.profileImage}
            alt="Portrait of Rawad Altari"
            width={832}
            height={1040}
            priority
            className="aspect-[4/5]"
            imgClassName="grayscale-[35%] contrast-[1.05] transition-[filter] duration-700 hover:grayscale-0"
            fallback={<PortraitPlaceholder />}
          />
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
          <figcaption className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
            <span>
              <span className="block text-sm font-semibold tracking-tight text-white">Rawad Altari</span>
              <span className="block font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/70">AI & ML · Front-End</span>
            </span>
            <span className="rounded-full border border-white/20 bg-black/40 px-2.5 py-1 font-mono text-[0.62rem] text-white/80">
              Damascus
            </span>
          </figcaption>
        </div>
      </div>

      {/* floating code fragments */}
      <span
        aria-hidden="true"
        className="animate-float absolute -left-4 top-[14%] hidden rounded-xl border border-line bg-elevated px-3 py-2 font-mono text-[0.7rem] text-fg-muted shadow-card sm:block lg:-left-10"
      >
        <span className="text-accent">model</span>.predict(<span className="text-fg">x</span>)
      </span>
      <span
        aria-hidden="true"
        className="animate-float absolute -right-4 bottom-[22%] hidden rounded-xl border border-line bg-elevated px-3 py-2 font-mono text-[0.7rem] text-fg-muted shadow-card [animation-delay:-3s] sm:block lg:-right-8"
      >
        &lt;<span className="text-accent">React</span> /&gt;
      </span>
    </figure>
  );
}

function PortraitPlaceholder() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-4 bg-surface-2">
      <div aria-hidden="true" className="bg-grid mask-radial absolute inset-0" />
      <div className="relative grid size-24 place-items-center rounded-full border border-dashed border-line-strong">
        <ScanFace size={40} strokeWidth={1.2} className="text-fg-subtle" aria-hidden="true" />
      </div>
      <p className="relative px-6 text-center font-mono text-[0.68rem] leading-relaxed text-fg-subtle">
        {import.meta.env.DEV ? (
          <>
            Add portrait at
            <br />
            <span className="text-fg-muted">public{site.profileImage}</span>
          </>
        ) : (
          'Portrait'
        )}
      </p>
    </div>
  );
}
