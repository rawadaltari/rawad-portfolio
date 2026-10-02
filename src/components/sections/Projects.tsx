import { featuredProjects, otherProjects } from '@/data/projects';
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { ProjectCard } from '../projects/ProjectCard';

export function Projects() {
  return (
    <Section id="projects" className="border-t border-line">
      <SectionHeading
        id="projects-title"
        index="05"
        label="Selected work"
        title="Projects where"
        accent="models meet interfaces."
        description="From AI-powered prediction and recommendation systems to motion-rich landing pages and e-commerce."
      />

      <div className="flex flex-col gap-5">
        {featuredProjects.map((p, i) => (
          <Reveal key={p.slug}>
            <ProjectCard project={p} index={i} layout="feature" reverse={i % 2 === 1} />
          </Reveal>
        ))}
      </div>

      <div className="mb-6 mt-20 flex items-center gap-4">
        <h3 className="eyebrow shrink-0">More projects</h3>
        <span aria-hidden="true" className="h-px flex-1 bg-line" />
      </div>

      <RevealGroup as="ul" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {otherProjects.map((p, i) => (
          <RevealItem as="li" key={p.slug}>
            <ProjectCard project={p} index={featuredProjects.length + i} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
