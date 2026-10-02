import type { LucideIcon } from 'lucide-react';

export type Theme = 'dark' | 'light';

export interface NavItem {
  id: SectionId;
  label: string;
}

export type SectionId = 'home' | 'about' | 'experience' | 'skills' | 'projects' | 'education' | 'contact';

export interface SocialLink {
  id: 'github' | 'linkedin' | 'email' | 'portfolio';
  label: string;
  /** Leave empty ('') until the real URL is known — the UI renders a disabled state instead of a broken link. */
  href: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location?: string;
  /** Human-readable period, e.g. "Mar 2023 — Present" */
  period?: string;
  /** Short label for the timeline rail, e.g. "2023" */
  year?: string;
  current?: boolean;
  type: 'work' | 'teaching' | 'training' | 'startup' | 'volunteer' | 'freelance';
  description: string[];
  skills: string[];
  link?: { label: string; href: string };
}

export interface SkillGroup {
  id: string;
  title: string;
  icon: LucideIcon;
  blurb: string;
  skills: string[];
  /** Highlighted groups get a larger, emphasized tile. */
  featured?: boolean;
}

/** Visual style of the generated placeholder shown until a real screenshot is added. */
export type ProjectVisual = 'neural' | 'dashboard' | 'motion' | 'commerce' | 'profile' | 'layout' | 'shop';

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  description: string[];
  features: string[];
  tech: string[];
  /** Public path (inside /public) of the cover image. Replace the file — no code change needed. */
  image: string;
  imageAlt: string;
  /**
   * Extra screenshots (public paths, any number) shown as a thumbnail grid in the details
   * modal; together with `image` they form the full-screen viewer. Empty = none yet.
   */
  gallery: string[];
  links: { github?: string; demo?: string };
  visual: ProjectVisual;
  featured?: boolean;
  /** Optional emphasis badges, e.g. ["AI", "Machine Learning", "Front-End"] */
  highlights?: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}
