import { ArrowUp } from 'lucide-react';
import { site } from '@/config/site';
import { SocialLinks } from '../ui/SocialLinks';

export function Footer() {
  return (
    <footer className="relative border-t border-line">
      <div className="container-page py-14 sm:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[clamp(2rem,6vw,3.5rem)] font-semibold uppercase leading-none tracking-[-0.04em]">Rawad Altari</p>
            <p className="mt-4 text-fg-muted">
              Artificial Intelligence Engineer <span className="font-display italic text-accent">&amp;</span> Front-End Developer
            </p>
          </div>
          <div className="flex flex-col items-start gap-5 md:items-end">
            <SocialLinks />
            <a href={`mailto:${site.email}`} className="text-sm text-fg-muted underline-offset-4 hover:text-fg hover:underline">
              {site.email}
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-4 border-t border-line pt-6 text-sm text-fg-subtle sm:flex-row sm:items-center">
          <p>© 2026 Rawad Altari. All rights reserved.</p>
          <a href="#home" className="group inline-flex items-center gap-2 hover:text-fg">
            Back to top
            <span className="grid size-8 place-items-center rounded-full border border-line transition-transform group-hover:-translate-y-0.5">
              <ArrowUp size={14} aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
