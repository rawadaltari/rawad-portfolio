import { BrainCircuit } from 'lucide-react';
import { education } from '@/data/content';
import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { Tag } from '../ui/Tag';

export function Education() {
  const Icon = education.icon;
  return (
    <Section id="education" className="border-t border-line">
      <SectionHeading id="education-title" index="06" label="Education" title="Academic" accent="foundation." />

      <Reveal>
        <article className="card relative overflow-hidden">
          <div aria-hidden="true" className="bg-grid mask-radial absolute inset-0 opacity-70" />
          <div className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-12 [&>*]:min-w-0 lg:gap-12 lg:p-12">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-xl border border-line bg-bg">
                  <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
                </span>
                <span className="eyebrow">Bachelor’s Degree</span>
              </div>
              <h3 className="mt-6 font-display text-[clamp(1.9rem,4.4vw,3.2rem)] leading-[1.08] tracking-[-0.01em]">
                {education.degree}
              </h3>
              <p className="mt-4 text-lg text-fg-muted">{education.institution}</p>
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <span className="text-sm text-fg-subtle">Specialization</span>
                <Tag tone="accent">{education.specialization}</Tag>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="h-full rounded-2xl border border-line bg-bg/60 p-6 backdrop-blur-sm">
                <p className="eyebrow flex items-center gap-2">
                  <BrainCircuit size={14} className="text-accent" aria-hidden="true" /> Academic & practical interests
                </p>
                <ul className="mt-5 divide-y divide-line">
                  {education.interests.map((item, i) => (
                    <li key={item} className="flex items-center justify-between gap-4 py-3.5">
                      <span className="font-medium tracking-tight">{item}</span>
                      <span className="font-mono text-xs text-fg-subtle">{String(i + 1).padStart(2, '0')}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </article>
      </Reveal>
    </Section>
  );
}
