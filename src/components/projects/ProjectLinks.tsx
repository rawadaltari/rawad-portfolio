import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/types';
import { GithubIcon } from '../ui/BrandIcons';
import { Button } from '../ui/Button';

export function ProjectLinks({ project, size = 'sm' }: { project: Project; size?: 'sm' | 'md' }) {
  return (
    <>
      <Button
        href={project.links.github ?? ''}
        variant="secondary"
        size={size}
        unavailableLabel="Repository link coming soon"
        aria-label={`${project.title} source code on GitHub`}
      >
        <GithubIcon size={15} />
        GitHub
      </Button>
      <Button
        href={project.links.demo ?? ''}
        variant="secondary"
        size={size}
        unavailableLabel="Live demo coming soon"
        aria-label={`${project.title} live demo`}
      >
        Live Demo
        <ArrowUpRight size={15} aria-hidden="true" />
      </Button>
    </>
  );
}
