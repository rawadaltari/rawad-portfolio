import { m } from 'motion/react';
import { skillGroups } from '@/data/skills';
import { useSpotlight } from '@/hooks/useSpotlight';
import { cn } from '@/lib/cn';
import { easeOutExpo, viewportOnce } from '@/lib/motion';
import type { SkillGroup } from '@/types';
import { RevealGroup, RevealItem } from '../ui/Reveal';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { Spotlight } from '../ui/Spotlight';

const SPANS: Record<string, string> = {
  'ai-ml': 'sm:col-span-2 lg:col-span-7',
  frontend: 'sm:col-span-2 lg:col-span-5',
  state: 'lg:col-span-3',
  api: 'lg:col-span-3',
  design: 'lg:col-span-3',
  tools: 'lg:col-span-3',
};

export function Skills() {
  return (
    <Section id="skills" className="border-t border-line">
      <SectionHeading
        id="skills-title"
        index="04"
        label="Skills"
        title="A toolkit built at the"
        accent="intersection of AI & UI."
        description="Grouped by how I use them — no vanity percentages, just the tools I work with."
      />

      <RevealGroup className="grid gap-3 sm:grid-cols-2 lg:grid-cols-12 [&>*]:min-w-0" gap={0.07}>
        {skillGroups.map((group) => (
          <RevealItem key={group.id} className={SPANS[group.id]}>
            <SkillCard group={group} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

function SkillCard({ group }: { group: SkillGroup }) {
  const onPointerMove = useSpotlight();
  const Icon = group.icon;
  const isAI = group.id === 'ai-ml';

  return (
    <article
      onPointerMove={onPointerMove}
      className={cn(
        'card group relative flex h-full flex-col overflow-hidden p-6 transition-colors duration-500 hover:border-line-strong sm:p-7',
        isAI && 'border-accent/25',
      )}
    >
      <Spotlight />
      {isAI && <MiniNetwork />}

      <div className="relative flex items-center gap-3">
        <span
          className={cn(
            'grid size-10 place-items-center rounded-xl border',
            isAI ? 'border-accent/40 bg-accent-soft text-accent' : 'border-line bg-bg text-fg',
          )}
        >
          <Icon size={19} strokeWidth={1.6} aria-hidden="true" />
        </span>
        <h3 className={cn('font-semibold tracking-tight', group.featured ? 'text-xl' : 'text-base')}>{group.title}</h3>
      </div>
      <p className="relative mt-4 max-w-md text-sm leading-relaxed text-fg-muted">{group.blurb}</p>

      <m.ul
        className="relative mt-auto flex flex-wrap gap-2 pt-6"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={{ visible: { transition: { staggerChildren: 0.04, delayChildren: 0.2 } } }}
        aria-label={`${group.title} skills`}
      >
        {group.skills.map((s) => (
          <m.li
            key={s}
            variants={{
              hidden: { opacity: 0, y: 8, scale: 0.96 },
              visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: easeOutExpo } },
            }}
            className={cn(
              'rounded-lg border px-3 py-1.5 text-sm transition-colors duration-300',
              group.featured ? 'border-line-strong bg-bg/60 hover:border-accent/50 hover:text-accent' : 'border-line bg-bg/40 text-fg-muted hover:text-fg',
            )}
          >
            {s}
          </m.li>
        ))}
      </m.ul>
    </article>
  );
}

/** Decorative network motif in the AI card corner. */
function MiniNetwork() {
  const nodes = [
    [20, 20], [60, 12], [100, 28], [40, 56], [84, 64], [120, 54], [64, 96], [110, 100],
  ] as const;
  const edges = [[0, 1], [1, 2], [0, 3], [1, 3], [1, 4], [2, 5], [3, 4], [4, 5], [3, 6], [4, 6], [4, 7], [5, 7]] as const;
  return (
    <svg aria-hidden="true" viewBox="0 0 140 120" className="absolute -right-2 -top-2 h-36 w-40 opacity-60 sm:h-44 sm:w-52">
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          stroke="var(--fg-subtle)"
          strokeWidth={0.6}
          strokeDasharray="3 3"
          className="motion-safe:animate-[dash_6s_linear_infinite]"
        />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 4 ? 4 : 2.4} fill={i === 4 ? 'var(--accent)' : 'var(--surface)'} stroke="var(--fg-muted)" strokeWidth={0.6} />
      ))}
    </svg>
  );
}
