import { services } from '@/data/content';
import { RevealGroup, RevealItem } from '../ui/Reveal';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';

export function Services() {
  return (
    <Section id="services" className="border-t border-line">
      <SectionHeading
        id="services-title"
        index="02"
        label="Services"
        title="What I"
        accent="can do."
        description="Practical, CV-backed services — from pixel-accurate interfaces to bringing machine learning into the browser."
      />

      <RevealGroup className="grid overflow-hidden rounded-[1.25rem] border border-line sm:grid-cols-2 lg:grid-cols-3" gap={0.06}>
        {services.map(({ id, title, description, icon: Icon }, i) => (
          <RevealItem
            key={id}
            as="article"
            className="group relative -mb-px -mr-px border-b border-r border-line bg-surface p-7 transition-colors duration-500 hover:bg-surface-2 sm:p-8"
          >
            <div className="flex items-start justify-between">
              <span className="grid size-11 place-items-center rounded-xl border border-line bg-bg text-fg transition-colors duration-500 group-hover:border-accent/50 group-hover:text-accent">
                <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
              </span>
              <span className="font-mono text-xs text-fg-subtle">{String(i + 1).padStart(2, '0')}</span>
            </div>
            <h3 className="mt-8 text-lg font-semibold tracking-tight">{title}</h3>
            <p className="mt-2 leading-relaxed text-fg-muted">{description}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
