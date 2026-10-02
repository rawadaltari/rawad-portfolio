import { Mail } from 'lucide-react';
import { socials } from '@/config/site';
import { cn } from '@/lib/cn';
import type { SocialLink } from '@/types';
import { GithubIcon, LinkedinIcon } from './BrandIcons';

const ICONS: Partial<Record<SocialLink['id'], (p: { size?: number }) => React.ReactElement>> = {
  github: (p) => <GithubIcon {...p} />,
  linkedin: (p) => <LinkedinIcon {...p} />,
  email: (p) => <Mail size={p.size} aria-hidden="true" />,
};

interface SocialLinksProps {
  ids?: SocialLink['id'][];
  className?: string;
  size?: 'sm' | 'md';
}

export function SocialLinks({ ids = ['github', 'linkedin', 'email'], className, size = 'md' }: SocialLinksProps) {
  const items = ids.map((id) => socials.find((s) => s.id === id)).filter((s): s is SocialLink => Boolean(s));
  const box = size === 'sm' ? 'size-9' : 'size-11';
  const icon = size === 'sm' ? 16 : 18;

  return (
    <ul className={cn('flex items-center gap-2', className)}>
      {items.map((s) => {
        const Icon = ICONS[s.id];
        const cls = cn(
          box,
          'grid place-items-center rounded-full border border-line text-fg-muted transition-colors duration-300',
        );
        return (
          <li key={s.id}>
            {s.href ? (
              <a
                href={s.href}
                aria-label={s.label}
                title={s.label}
                {...(s.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={cn(cls, 'hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent transition-transform')}
              >
                {Icon?.({ size: icon })}
              </a>
            ) : (
              <span role="link" aria-disabled="true" aria-label={`${s.label} (coming soon)`} title={`${s.label} — coming soon`} className={cn(cls, 'cursor-not-allowed opacity-45')}>
                {Icon?.({ size: icon })}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
