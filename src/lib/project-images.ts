import type { Project } from '@/types';

export interface ProjectImage {
  src: string;
  alt: string;
}

/**
 * All images of a project as one list — the cover first, then every entry of `gallery`.
 * Used by both the thumbnail grid and the full-screen viewer so indexes line up.
 */
export function projectImages(project: Project): ProjectImage[] {
  return [
    { src: project.image, alt: project.imageAlt },
    ...project.gallery.map((src, i) => ({
      src,
      alt: `${project.title} — screenshot ${i + 1}`,
    })),
  ];
}
