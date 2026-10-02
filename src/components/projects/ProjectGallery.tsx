import { AnimatePresence, m } from 'motion/react';
import { ArrowLeft, ArrowRight, Expand, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { easeOutExpo } from '@/lib/motion';
import type { ProjectImage } from '@/lib/project-images';
import type { Project } from '@/types';
import { SmartImage } from '../ui/SmartImage';
import { ProjectArt } from './ProjectArt';

/** Thumbnail grid of the extra screenshots; each one opens the viewer. */
export function ProjectGallery({
  project,
  images,
  onOpen,
}: {
  project: Project;
  images: ProjectImage[];
  onOpen: (index: number) => void;
}) {
  const shots = images.slice(1); // index 0 is the cover, shown above the details

  if (shots.length === 0) {
    return <p className="mt-3 text-sm text-fg-subtle">Additional screenshots will be added soon.</p>;
  }

  return (
    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
      {shots.map((image, i) => (
        <li key={image.src}>
          <button
            type="button"
            onClick={() => onOpen(i + 1)}
            aria-label={`Open screenshot ${i + 1} of ${project.title} full size`}
            className="group relative block w-full overflow-hidden rounded-xl border border-line transition-colors hover:border-line-strong"
          >
            <SmartImage
              src={image.src}
              alt={image.alt}
              className="aspect-[16/10] transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.035]"
              imgClassName="object-top"
              sizes="(min-width: 640px) 420px, 100vw"
              fallback={<ProjectArt visual={project.visual} path={`public${image.src}`} compact />}
            />
            <span className="absolute right-3 top-3 grid size-9 translate-y-1 place-items-center rounded-full bg-accent text-accent-fg opacity-0 shadow-lg transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
              <Expand size={15} aria-hidden="true" />
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

const FOCUSABLE = 'button:not([disabled])';

/**
 * Full-screen image viewer rendered in a portal (the modal panel is animated with
 * `transform`, which would otherwise become the containing block for `position: fixed`).
 */
export function ProjectLightbox({
  project,
  images,
  index,
  onIndex,
  onClose,
}: {
  project: Project;
  images: ProjectImage[];
  index: number;
  onIndex: (index: number) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const image = images[index]!;
  const many = images.length > 1;

  const go = useCallback(
    (step: number) => onIndex((index + step + images.length) % images.length),
    [index, images.length, onIndex],
  );

  useEffect(() => {
    // Capture phase + stopImmediatePropagation: the project modal listens for Escape on
    // `document` too, and without this a single Escape would close both layers.
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopImmediatePropagation();
        onClose();
        return;
      }
      if (many && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
        e.preventDefault();
        e.stopImmediatePropagation();
        go(e.key === 'ArrowRight' ? 1 : -1);
        return;
      }
      if (e.key !== 'Tab' || !ref.current) return;
      const items = Array.from(ref.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!items.length) return;
      e.stopImmediatePropagation();
      const first = items[0]!;
      const last = items[items.length - 1]!;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown, true);
    return () => document.removeEventListener('keydown', onKeyDown, true);
  }, [go, many, onClose]);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const raf = requestAnimationFrame(() => {
      ref.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus({ preventScroll: true });
    });
    return () => {
      cancelAnimationFrame(raf);
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-[90] flex flex-col sm:p-6">
      <m.div
        aria-hidden="true"
        className="absolute inset-0 bg-black/85 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      />

      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} — image ${index + 1} of ${images.length}`}
        className="relative flex min-h-0 flex-1 flex-col"
      >
        <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-0">
          <span className="font-mono text-xs text-white/70">
            {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </span>
          <button
            type="button"
            onClick={onClose}
            data-autofocus
            aria-label="Close image viewer"
            className="grid size-10 place-items-center rounded-full border border-white/20 text-white transition-colors hover:border-white/50 hover:bg-white/10"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 items-center gap-2 px-2 sm:gap-4 sm:px-0">
          {many && (
            <NavButton label={`Previous image of ${project.title}`} onClick={() => go(-1)}>
              <ArrowLeft size={20} aria-hidden="true" />
            </NavButton>
          )}

          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={image.src}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease: easeOutExpo }}
              className="flex min-h-0 flex-1 items-center justify-center"
            >
              <ImageFrame project={project} image={image} />
            </m.div>
          </AnimatePresence>

          {many && (
            <NavButton label={`Next image of ${project.title}`} onClick={() => go(1)}>
              <ArrowRight size={20} aria-hidden="true" />
            </NavButton>
          )}
        </div>

        <p className="px-4 py-3 text-center text-sm text-white/70 sm:px-0">{image.alt}</p>
      </div>
    </div>,
    document.body,
  );
}

/**
 * Uniform viewer frame: every image — phone screenshot or wide desktop capture — gets the
 * same box. The shot itself is never cropped (`contain`); a blurred, cover-sized copy of it
 * fills the leftover space so there are no empty bars.
 */
function ImageFrame({ project, image }: { project: Project; image: ProjectImage }) {
  const [backdrop, setBackdrop] = useState(true);

  return (
    <div className="relative aspect-[16/10] max-h-[78dvh] w-full max-w-5xl overflow-hidden rounded-xl border border-white/10 bg-black/40">
      {backdrop && (
        <img
          src={image.src}
          alt=""
          aria-hidden="true"
          onError={() => setBackdrop(false)}
          className="absolute inset-0 h-full w-full scale-125 object-cover opacity-45 blur-2xl"
        />
      )}
      <div className="absolute inset-0">
        <SmartImage
          src={image.src}
          alt={image.alt}
          fit="contain"
          priority
          sizes="(min-width: 1024px) 1024px, 100vw"
          className="h-full w-full"
          fallback={<ProjectArt visual={project.visual} path={`public${image.src}`} />}
        />
      </div>
    </div>
  );
}

function NavButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid size-10 shrink-0 place-items-center rounded-full border border-white/20 text-white transition-colors hover:border-white/50 hover:bg-white/10 sm:size-12"
    >
      {children}
    </button>
  );
}
