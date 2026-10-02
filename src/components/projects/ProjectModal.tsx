import { AnimatePresence, m } from 'motion/react';
import { ArrowLeft, ArrowRight, Check, Expand, X } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';
import { projects } from '@/data/projects';
import { useDialog } from '@/hooks/useDialog';
import { easeOutExpo } from '@/lib/motion';
import { projectImages } from '@/lib/project-images';
import { closeProject, openProject, useOpenProjectSlug } from '@/lib/project-store';
import type { Project } from '@/types';
import { SmartImage } from '../ui/SmartImage';
import { Tag } from '../ui/Tag';
import { ProjectArt } from './ProjectArt';
import { ProjectGallery, ProjectLightbox } from './ProjectGallery';
import { ProjectLinks } from './ProjectLinks';

export function ProjectModal() {
  const slug = useOpenProjectSlug();
  const index = projects.findIndex((p) => p.slug === slug);
  const project = index >= 0 ? projects[index] : undefined;

  return (
    <AnimatePresence>
      {project && <ModalPanel key="project-modal" project={project} index={index} />}
    </AnimatePresence>
  );
}

function ModalPanel({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useDialog(ref, true, closeProject);

  const prev = projects[(index - 1 + projects.length) % projects.length]!;
  const next = projects[(index + 1) % projects.length]!;
  const titleId = 'project-modal-title';

  const images = projectImages(project);
  /** Which image is shown full screen. Tagged with the slug so stepping to the
   *  previous/next project closes the viewer instead of showing a stale index. */
  const [viewer, setViewer] = useState<{ slug: string; index: number } | null>(null);
  const viewerIndex = viewer?.slug === project.slug ? viewer.index : null;
  const openViewer = useCallback((i: number) => setViewer({ slug: project.slug, index: i }), [project.slug]);
  const closeViewer = useCallback(() => setViewer(null), []);

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6">
      <m.div
        aria-hidden="true"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={closeProject}
      />

      <m.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.98 }}
        transition={{ duration: 0.5, ease: easeOutExpo }}
        className="relative flex max-h-[92dvh] w-full max-w-4xl flex-col overflow-hidden rounded-t-[1.5rem] border border-line-strong bg-surface shadow-2xl sm:rounded-[1.5rem]"
      >
        {/* top bar */}
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-6">
          <span className="truncate font-mono text-xs text-fg-subtle">
            <span className="text-accent">{String(index + 1).padStart(2, '0')}</span> / {String(projects.length).padStart(2, '0')} — {project.subtitle}
          </span>
          <div className="flex items-center gap-1">
            <button type="button" onClick={() => openProject(prev.slug)} aria-label={`Previous project: ${prev.title}`} className="grid size-9 place-items-center rounded-full text-fg-muted hover:bg-surface-2 hover:text-fg">
              <ArrowLeft size={16} aria-hidden="true" />
            </button>
            <button type="button" onClick={() => openProject(next.slug)} aria-label={`Next project: ${next.title}`} className="grid size-9 place-items-center rounded-full text-fg-muted hover:bg-surface-2 hover:text-fg">
              <ArrowRight size={16} aria-hidden="true" />
            </button>
            <button type="button" onClick={closeProject} aria-label="Close project details" data-autofocus className="ml-1 grid size-9 place-items-center rounded-full border border-line hover:border-line-strong">
              <X size={16} aria-hidden="true" />
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={project.slug}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.35, ease: easeOutExpo }}
            className="overflow-y-auto overscroll-contain"
          >
            <button
              type="button"
              onClick={() => openViewer(0)}
              aria-label={`Open ${project.title} cover image full size`}
              className="group relative block w-full"
            >
              <SmartImage
                src={project.image}
                alt={project.imageAlt}
                width={1600}
                height={1000}
                sizes="(min-width: 896px) 896px, 100vw"
                className="aspect-[16/9] border-b border-line"
                imgClassName="object-top"
                fallback={<ProjectArt visual={project.visual} path={`public${project.image}`} />}
              />
              <span className="absolute right-4 top-4 grid size-10 translate-y-1 place-items-center rounded-full bg-accent text-accent-fg opacity-0 shadow-lg transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                <Expand size={16} aria-hidden="true" />
              </span>
            </button>

            <div className="grid gap-10 p-5 sm:p-8 md:grid-cols-5">
              <div className="md:col-span-3">
                <h2 id={titleId} className="text-[clamp(1.6rem,4vw,2.4rem)] font-semibold leading-tight tracking-[-0.03em]">
                  {project.title}
                </h2>
                {project.highlights && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.highlights.map((h) => (
                      <Tag key={h} tone="accent">{h}</Tag>
                    ))}
                  </div>
                )}
                <div className="mt-5 space-y-4 leading-relaxed text-fg-muted">
                  {project.description.map((d, i) => (
                    <p key={i}>{d}</p>
                  ))}
                </div>
                <div className="mt-7 flex flex-wrap gap-2">
                  <ProjectLinks project={project} size="md" />
                </div>
              </div>

              <div className="space-y-8 md:col-span-2">
                <div>
                  <h3 className="eyebrow">Key features</h3>
                  <ul className="mt-4 space-y-2.5">
                    {project.features.map((f) => (
                      <li key={f} className="flex gap-3 text-[0.95rem]">
                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                          <Check size={12} aria-hidden="true" />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="eyebrow">Technologies</h3>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <li key={t}>
                        <Tag>{t}</Tag>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Screenshots */}
            <div className="border-t border-line p-5 sm:p-8">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="eyebrow">Screenshots</h3>
                {images.length > 1 && (
                  <span className="font-mono text-xs text-fg-subtle">{images.length} images</span>
                )}
              </div>
              <ProjectGallery project={project} images={images} onOpen={openViewer} />
            </div>
          </m.div>
        </AnimatePresence>
      </m.div>

      <AnimatePresence>
        {viewerIndex !== null && (
          <ProjectLightbox
            key="project-lightbox"
            project={project}
            images={images}
            index={viewerIndex}
            onIndex={openViewer}
            onClose={closeViewer}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
