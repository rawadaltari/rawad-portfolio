import { ArrowUpRight, Sparkles } from 'lucide-react';
import { useSpotlight } from '@/hooks/useSpotlight';
import { cn } from '@/lib/cn';
import { openProject } from '@/lib/project-store';
import type { Project } from '@/types';
import { SmartImage } from '../ui/SmartImage';
import { Spotlight } from '../ui/Spotlight';
import { Tag } from '../ui/Tag';
import { ProjectArt } from './ProjectArt';
import { ProjectLinks } from './ProjectLinks';

interface ProjectCardProps {
  project: Project;
  index: number;
  layout?: 'feature' | 'grid';
  /** Feature cards alternate image side on desktop. */
  reverse?: boolean;
}

export function ProjectCard({ project, index, layout = 'grid', reverse = false }: ProjectCardProps) {
  const onPointerMove = useSpotlight();
  const isFeature = layout === 'feature';
  const number = String(index + 1).padStart(2, '0');
  const titleId = `project-${project.slug}-title`;

  return (
    <article
      aria-labelledby={titleId}
      onPointerMove={onPointerMove}
      className={cn(
        'card group relative isolate flex h-full flex-col overflow-hidden transition-[border-color,transform,box-shadow] duration-500 hover:-translate-y-1 hover:border-line-strong',
        isFeature && 'lg:grid lg:grid-cols-12 [&>*]:min-w-0 lg:items-stretch',
      )}
    >
      <Spotlight />

      {/* Media — the whole image opens the details modal */}
      <button
        type="button"
        onClick={() => openProject(project.slug)}
        aria-label={`View details for ${project.title}`}
        className={cn(
          'relative block overflow-hidden border-line text-left',
          isFeature
            ? cn('aspect-[16/10] border-b lg:col-span-7 lg:aspect-auto lg:min-h-[26rem] lg:border-b-0', reverse ? 'lg:order-2 lg:border-l' : 'lg:border-r')
            : 'aspect-[16/10] border-b',
        )}
      >
        <SmartImage
          src={project.image}
          alt={project.imageAlt}
          width={1600}
          height={1000}
          sizes={isFeature ? '(min-width: 1024px) 700px, 100vw' : '(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw'}
          className="h-full w-full transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.035]"
          imgClassName="object-top"
          fallback={<ProjectArt visual={project.visual} path={`public${project.image}`} compact={!isFeature} />}
        />
        <span className="absolute right-4 top-4 grid size-11 translate-y-2 place-items-center rounded-full bg-accent text-accent-fg opacity-0 shadow-lg transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:opacity-100">
          <ArrowUpRight size={18} aria-hidden="true" />
        </span>
      </button>

      {/* Body */}
      <div className={cn('relative flex flex-1 flex-col p-6 sm:p-7', isFeature && 'lg:col-span-5 lg:p-10')}>
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-xs text-fg-subtle">
            <span className="text-accent">{number}</span> / {project.subtitle}
          </span>
          {isFeature && (
            <span className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-accent">
              <Sparkles size={12} aria-hidden="true" /> Featured
            </span>
          )}
        </div>

        <h3 id={titleId} className={cn('mt-4 font-semibold tracking-[-0.025em]', isFeature ? 'text-[clamp(1.6rem,3vw,2.25rem)] leading-tight' : 'text-xl')}>
          {project.title}
        </h3>

        {project.highlights && (
          <ul className="mt-4 flex flex-wrap items-center gap-1.5" aria-label="Highlights">
            {project.highlights.map((h, i) => (
              <li key={h} className="flex items-center gap-1.5">
                {i > 0 && <span aria-hidden="true" className="text-fg-subtle">+</span>}
                <Tag tone="accent">{h}</Tag>
              </li>
            ))}
          </ul>
        )}

        <p className={cn('mt-4 leading-relaxed text-fg-muted', !isFeature && 'line-clamp-3 text-[0.95rem]')}>{project.summary}</p>

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.tech.map((t) => (
            <li key={t}>
              <Tag>{t}</Tag>
            </li>
          ))}
        </ul>

        <div className={cn('mt-auto pt-7', isFeature ? 'flex flex-wrap items-center gap-2' : 'flex flex-col gap-4')}>
          <button
            type="button"
            onClick={() => openProject(project.slug)}
            className="mr-auto inline-flex items-center gap-1.5 text-sm font-medium text-fg underline-offset-4 hover:text-accent hover:underline"
          >
            View details
            <ArrowUpRight size={14} aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
          <div className={cn(isFeature ? 'flex flex-wrap gap-2' : 'grid grid-cols-2 gap-2 border-t border-line pt-4 [&>*]:w-full')}>
            <ProjectLinks project={project} />
          </div>
        </div>
      </div>
    </article>
  );
}
