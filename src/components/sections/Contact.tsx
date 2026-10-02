import { Check, Copy, Mail, MapPin, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getSocial, site } from '@/config/site';
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons';
import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { ContactForm } from './ContactForm';

export function Contact() {
  const github = getSocial('github');
  const linkedin = getSocial('linkedin');

  const rows = [
    { icon: <Mail size={18} aria-hidden="true" />, label: 'Email', value: site.email, href: `mailto:${site.email}`, copy: site.email },
    { icon: <Phone size={18} aria-hidden="true" />, label: 'Phone', value: site.phone, href: site.phoneHref, copy: site.phone },
    { icon: <MapPin size={18} aria-hidden="true" />, label: 'Location', value: site.location },
    { icon: <GithubIcon size={18} />, label: 'GitHub', value: github.href ? github.href.replace(/^https?:\/\//, '') : 'Coming soon', href: github.href || undefined },
    { icon: <LinkedinIcon size={18} />, label: 'LinkedIn', value: linkedin.href ? linkedin.href.replace(/^https?:\/\/(www\.)?/, '') : 'Coming soon', href: linkedin.href || undefined },
  ];

  return (
    <Section id="contact" className="border-t border-line">
      <div className="grid gap-12 lg:grid-cols-12 [&>*]:min-w-0 lg:gap-14">
        <div className="lg:col-span-5">
          <SectionHeading
            id="contact-title"
            index="07"
            label="Contact"
            title="Let’s build something"
            accent="intelligent."
            description="Have a project, a role or an idea that combines AI with a great interface? I’d be glad to hear about it."
          />
          <Reveal>
            <ul className="divide-y divide-line border-y border-line">
              {rows.map((r) => (
                <li key={r.label} className="flex items-center gap-4 py-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line text-fg-muted">{r.icon}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-fg-subtle">{r.label}</p>
                    {r.href ? (
                      <a
                        href={r.href}
                        {...(r.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="block truncate font-medium underline-offset-4 hover:text-accent hover:underline"
                      >
                        {r.value}
                      </a>
                    ) : (
                      <p className="truncate font-medium">{r.value}</p>
                    )}
                  </div>
                  {r.copy && <CopyButton value={r.copy} label={r.label} />}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:pt-28">
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      /* clipboard blocked — user can still select the text */
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? `${label} copied` : `Copy ${label.toLowerCase()}`}
      title={copied ? 'Copied' : 'Copy'}
      className="grid size-9 shrink-0 place-items-center rounded-full text-fg-subtle transition-colors hover:bg-surface-2 hover:text-fg"
    >
      {copied ? <Check size={15} className="text-accent" aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
    </button>
  );
}
