import { m } from 'motion/react';
import { Download } from 'lucide-react';
import { useCallback, useState } from 'react';
import { navItems, site } from '@/config/site';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useScrolled } from '@/hooks/useScrolled';
import { cn } from '@/lib/cn';
import { easeOutExpo } from '@/lib/motion';
import { Button } from '../ui/Button';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
import { ThemeToggle } from './ThemeToggle';

const sectionIds = navItems.map((n) => n.id);

export function Navbar() {
  const scrolled = useScrolled(24);
  const active = useActiveSection(sectionIds);
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <m.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.1 }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500',
          scrolled || open ? 'border-b border-line bg-bg/75 backdrop-blur-xl' : 'border-b border-transparent',
        )}
      >
        <div
          className={cn(
            'container-page flex items-center justify-between gap-4 transition-[height] duration-500 ease-out-expo',
            scrolled ? 'h-16' : 'h-20',
          )}
        >
          <Logo />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1 rounded-full border border-line bg-surface/80 p-1">
              {navItems.map((item) => {
                const isActive = active === item.id;
                return (
                  <li key={item.id} className="relative">
                    {isActive && (
                      <m.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full bg-surface-2 ring-1 ring-line-strong"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <a
                      href={`#${item.id}`}
                      aria-current={isActive ? 'true' : undefined}
                      className={cn(
                        'relative block rounded-full px-3.5 py-1.5 text-sm transition-colors xl:px-4',
                        isActive ? 'text-fg' : 'text-fg-muted hover:text-fg',
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="hidden sm:block">
              <Button href={site.cvFile} download={site.cvDownloadName} size="sm" magnetic>
                <Download size={15} aria-hidden="true" />
                Download CV
              </Button>
            </div>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="relative grid size-10 place-items-center rounded-full border border-line lg:hidden"
            >
              <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
              <span aria-hidden="true" className="relative block h-3 w-4">
                <span className={cn('absolute left-0 h-0.5 w-4 rounded bg-fg transition-all duration-300', open ? 'top-[5px] rotate-45' : 'top-0')} />
                <span className={cn('absolute left-0 top-[5px] h-0.5 w-4 rounded bg-fg transition-opacity duration-200', open && 'opacity-0')} />
                <span className={cn('absolute left-0 h-0.5 w-4 rounded bg-fg transition-all duration-300', open ? 'top-[5px] -rotate-45' : 'top-[10px]')} />
              </span>
            </button>
          </div>
        </div>
      </m.header>

      <MobileMenu open={open} onClose={close} active={active} />
    </>
  );
}
