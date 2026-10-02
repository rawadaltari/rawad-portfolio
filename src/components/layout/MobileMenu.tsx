import { AnimatePresence, m } from 'motion/react';
import { Download } from 'lucide-react';
import { useRef } from 'react';
import { navItems, site } from '@/config/site';
import { useDialog } from '@/hooks/useDialog';
import { cn } from '@/lib/cn';
import { easeOutExpo } from '@/lib/motion';
import type { SectionId } from '@/types';
import { Button } from '../ui/Button';
import { SocialLinks } from '../ui/SocialLinks';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  active: SectionId;
}

export function MobileMenu({ open, onClose, active }: MobileMenuProps) {
  const ref = useRef<HTMLDivElement>(null);
  useDialog(ref, open, onClose);

  return (
    <AnimatePresence>
      {open && (
        <m.div
          ref={ref}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          tabIndex={-1}
          className="fixed inset-0 z-40 flex flex-col bg-bg/95 px-4 pb-8 pt-24 backdrop-blur-xl sm:px-6 lg:hidden"
          initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
          animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
          exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.55, ease: easeOutExpo }}
        >
          <nav aria-label="Mobile">
            <m.ul
              className="flex flex-col"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } }}
            >
              {navItems.map((item, i) => (
                <m.li
                  key={item.id}
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOutExpo } } }}
                  className="border-b border-line"
                >
                  <a
                    href={`#${item.id}`}
                    onClick={onClose}
                    aria-current={active === item.id ? 'true' : undefined}
                    className={cn(
                      'flex items-baseline justify-between py-4 text-[clamp(1.6rem,7vw,2.25rem)] font-semibold tracking-tight transition-colors',
                      active === item.id ? 'text-fg' : 'text-fg-muted hover:text-fg',
                    )}
                  >
                    {item.label}
                    <span className={cn('font-mono text-xs', active === item.id ? 'text-accent' : 'text-fg-subtle')}>
                      0{i + 1}
                    </span>
                  </a>
                </m.li>
              ))}
            </m.ul>
          </nav>

          <div className="mt-auto flex flex-col gap-5 pt-8">
            <Button href={site.cvFile} download={site.cvDownloadName} size="lg" className="w-full">
              <Download size={18} aria-hidden="true" />
              Download CV
            </Button>
            <div className="flex items-center justify-between gap-4">
              <a href={`mailto:${site.email}`} className="truncate text-sm text-fg-muted hover:text-fg">
                {site.email}
              </a>
              <SocialLinks size="sm" ids={['github', 'linkedin']} />
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
