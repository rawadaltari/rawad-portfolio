import { m, useScroll, useSpring } from 'motion/react';
import { ArrowUpRight, BookOpen, Briefcase, GraduationCap, HandHeart, Laptop, Rocket } from 'lucide-react';
import { useRef } from 'react';
import { experience } from '@/data/experience';
import { cn } from '@/lib/cn';
import type { ExperienceItem } from '@/types';
import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { Tag } from '../ui/Tag';

const TYPE_META: Record<ExperienceItem['type'], { label: string; icon: typeof Briefcase }> = {
  work: { label: 'Employment', icon: Briefcase },
  teaching: { label: 'Teaching', icon: BookOpen },
  training: { label: 'Training', icon: GraduationCap },
  startup: { label: 'Startup', icon: Rocket },
  volunteer: { label: 'Volunteer', icon: HandHeart },
  freelance: { label: 'Freelance', icon: Laptop },
};

export function Experience() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 70%', 'end 60%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  return (
    <Section id="experience" className="border-t border-line">
      <SectionHeading
        id="experience-title"
        index="03"
        label="Experience"
        title="A path through"
        accent="support, teaching & code."
        description="Hands-on roles across IT support, front-end development, teaching and startup programs."
      />

      <ol ref={listRef} className="relative">
        {/* rail */}
        <span aria-hidden="true" className="absolute bottom-2 left-[11px] top-2 w-px bg-line md:left-[203px]" />
        <m.span
          aria-hidden="true"
          style={{ scaleY: fill }}
          className="absolute bottom-2 left-[11px] top-2 w-px origin-top bg-accent md:left-[203px]"
        />

        {experience.map((item) => (
          <TimelineItem key={item.id} item={item} />
        ))}
      </ol>
    </Section>
  );
}

function TimelineItem({ item }: { item: ExperienceItem }) {
  const meta = TYPE_META[item.type];
  const Icon = meta.icon;

  return (
    <li className="relative grid gap-3 pb-10 pl-10 last:pb-0 md:grid-cols-[180px_1fr] md:gap-12 md:pl-0">
      {/* year column */}
      <Reveal className="md:pt-5 md:text-right">
        <p className="font-mono text-2xl font-medium tracking-tight md:text-3xl">{item.year ?? '—'}</p>
        <p className="mt-1 text-sm text-fg-subtle">{item.period ?? 'Volunteer role'}</p>
      </Reveal>

      {/* node */}
      <span
        aria-hidden="true"
        className={cn(
          'absolute left-[5px] top-1.5 grid size-[13px] place-items-center rounded-full border bg-bg md:left-[197px] md:top-7',
          item.current ? 'border-accent' : 'border-line-strong',
        )}
      >
        <span className={cn('size-[5px] rounded-full', item.current ? 'animate-pulse-dot bg-accent' : 'bg-fg-subtle')} />
      </span>

      <Reveal delay={0.08}>
        <article className="card group p-5 transition-[border-color,transform] duration-500 hover:-translate-y-0.5 hover:border-line-strong sm:p-7">
          <div className="flex flex-wrap items-center gap-2">
            <Tag>
              <Icon size={12} className="mr-1.5" aria-hidden="true" />
              {meta.label}
            </Tag>
            {item.current && <Tag tone="accent">Present</Tag>}
          </div>
          <h3 className="mt-4 text-xl font-semibold tracking-tight sm:text-[1.35rem]">{item.role}</h3>
          <p className="mt-1 text-fg-muted">
            {item.company}
            {item.location && <span className="text-fg-subtle"> · {item.location}</span>}
          </p>
          <div className="mt-4 space-y-3 leading-relaxed text-fg-muted">
            {item.description.map((d, i) => (
              <p key={i}>{d}</p>
            ))}
          </div>
          <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Relevant skills">
            {item.skills.map((s) => (
              <li key={s}>
                <Tag>{s}</Tag>
              </li>
            ))}
          </ul>
          {item.link && (
            <a
              href={item.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent underline-offset-4 hover:underline"
            >
              {item.link.label}
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          )}
        </article>
      </Reveal>
    </li>
  );
}
