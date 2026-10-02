import { Calendar, Download, GraduationCap, Mail, MapPin, Phone } from 'lucide-react';
import { site } from '@/config/site';
import { about, education, focusAreas } from '@/data/content';
import { cn } from '@/lib/cn';
import { Button } from '../ui/Button';
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';

export function About() {
  const facts = [
    { icon: MapPin, label: 'Location', value: site.location },
    { icon: Mail, label: 'Email', value: site.email, href: `mailto:${site.email}` },
    { icon: Phone, label: 'Phone', value: site.phone, href: site.phoneHref },
    { icon: GraduationCap, label: 'Education', value: `${education.institution} — AI & ML` },
    { icon: Calendar, label: 'Date of birth', value: site.dateOfBirth },
  ];

  return (
    <Section id="about">
      <div className="grid gap-14 lg:grid-cols-12 [&>*]:min-w-0 lg:gap-12">
        <div className="lg:col-span-7">
          <SectionHeading id="about-title" index="01" label="About" title="Engineering intelligence," accent="designing for people." />

          <Reveal>
            <p className="font-display text-[clamp(1.5rem,3vw,2.1rem)] leading-[1.25] tracking-[-0.01em] text-fg">{about.lead}</p>
          </Reveal>
          <div className="mt-8 space-y-5 text-[1.05rem] leading-relaxed text-fg-muted">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 lg:pt-4">
          <Reveal>
            <div className="card overflow-hidden">
              <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
                <span className="eyebrow">Profile</span>
                <span className="flex gap-1.5" aria-hidden="true">
                  <span className="size-2 rounded-full bg-line-strong" />
                  <span className="size-2 rounded-full bg-line-strong" />
                  <span className="size-2 rounded-full bg-accent" />
                </span>
              </div>
              <dl className="divide-y divide-line">
                {facts.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-center gap-4 px-5 py-4">
                    <Icon size={16} className="shrink-0 text-fg-subtle" aria-hidden="true" />
                    <dt className="w-20 shrink-0 text-sm text-fg-subtle xs:w-24">{label}</dt>
                    <dd className="min-w-0 text-sm font-medium [overflow-wrap:anywhere]">
                      {href ? (
                        <a href={href} className="underline-offset-4 hover:text-accent hover:underline">
                          {value}
                        </a>
                      ) : (
                        value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="border-t border-line p-4">
                <Button href={site.cvFile} download={site.cvDownloadName} variant="secondary" className="w-full">
                  <Download size={16} aria-hidden="true" />
                  Download full CV
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Focus areas — factual categories, no invented numbers */}
      <RevealGroup className="mt-16 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-20 lg:grid-cols-5">
        {focusAreas.map(({ title, description, icon: Icon }, i) => (
          <RevealItem
            key={title}
            className={cn(
              'card group relative overflow-hidden p-5 transition-colors duration-300 hover:border-line-strong',
              i === 0 && 'sm:col-span-2 lg:col-span-1',
            )}
          >
            <span className="font-mono text-[0.65rem] text-fg-subtle">0{i + 1}</span>
            <Icon
              size={22}
              strokeWidth={1.5}
              aria-hidden="true"
              className={cn('mt-6 transition-transform duration-500 group-hover:-translate-y-0.5', i === 0 ? 'text-accent' : 'text-fg')}
            />
            <h3 className="mt-4 font-semibold tracking-tight">{title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{description}</p>
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100"
            />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
