import { useSyncExternalStore } from 'react';
import { projects } from '@/data/projects';

/**
 * Minimal global store for the project-details modal, synced with `?project=<slug>`
 * so a project can be deep-linked and the browser Back button closes the modal.
 */
type Listener = () => void;
const listeners = new Set<Listener>();
let pushedByUs = false;

function readSlug(): string | null {
  if (typeof window === 'undefined') return null;
  const slug = new URLSearchParams(window.location.search).get('project');
  return slug && projects.some((p) => p.slug === slug) ? slug : null;
}

let current: string | null = readSlug();

function emit() {
  current = readSlug();
  listeners.forEach((l) => l());
}

if (typeof window !== 'undefined') {
  window.addEventListener('popstate', () => {
    pushedByUs = false;
    emit();
  });
}

function urlWith(slug: string | null): string {
  const url = new URL(window.location.href);
  if (slug) url.searchParams.set('project', slug);
  else url.searchParams.delete('project');
  return url.pathname + url.search + url.hash;
}

export function openProject(slug: string) {
  if (current === slug) return;
  if (current) window.history.replaceState({ project: slug }, '', urlWith(slug));
  else {
    window.history.pushState({ project: slug }, '', urlWith(slug));
    pushedByUs = true;
  }
  emit();
}

export function closeProject() {
  if (!current) return;
  if (pushedByUs) {
    pushedByUs = false;
    window.history.back(); // popstate → emit
  } else {
    window.history.replaceState(null, '', urlWith(null));
    emit();
  }
}

export function useOpenProjectSlug(): string | null {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => current,
    () => null,
  );
}
