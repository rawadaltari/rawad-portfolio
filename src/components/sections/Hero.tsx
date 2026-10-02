import { m } from 'motion/react';
import { ArrowDown, ArrowRight, ArrowUpRight, Download, MapPin } from 'lucide-react';
import { site } from '@/config/site';
import { featuredProjects } from '@/data/projects';
import { signatureStack } from '@/data/skills';
import { easeOutExpo } from '@/lib/motion';
import { openProject } from '@/lib/project-store';
import { NeuralField } from '../background/NeuralField';
import { Button } from '../ui/Button';
import { SocialLinks } from '../ui/SocialLinks';
import { TextReveal } from '../ui/TextReveal';
import { Portrait } from './Portrait';

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: easeOutExpo, delay },
});

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      {/* Background: engineering grid + neural field + soft accent glow */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="bg-grid mask-fade-y absolute inset-0" />
        <NeuralField className="opacity-90" />
        <div
          className="absolute -top-40 right-[-10%] h-[38rem] w-[38rem] rounded-full opacity-70 blur-3xl"
          style={{ background: 'radial-gradient(circle, var(--accent-soft), transparent 65%)' }}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <div className="container-page">
        <div className="grid items-center gap-14 lg:grid-cols-12 [&>*]:min-w-0 lg:gap-10">
          {/* Copy */}
          <div className="lg:col-span-7">
            <m.p {...enter(0.05)} className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/90 px-3 py-1.5">
                <span className="animate-pulse-dot size-1.5 rounded-full bg-accent" />
                <MapPin size={12} aria-hidden="true" />
                {site.location}
              </span>
              <span className="hidden xs:inline">AI · ML · React.js</span>
            </m.p>

            <h1 id="hero-title" className="mt-7">
              <span className="block text-[clamp(3rem,15vw,7.75rem)] font-semibold uppercase leading-[0.86] tracking-[-0.055em]">
                <TextReveal text="Rawad" immediate delay={0.1} />
                <br />
                <TextReveal text="Altari" immediate delay={0.18} wordClassName="bg-gradient-to-b from-fg from-10% to-fg-subtle bg-clip-text text-transparent" />
              </span>
              <span className="sr-only"> — </span>
              <m.span {...enter(0.4)} className="mt-7 block text-[clamp(1.2rem,2.6vw,1.75rem)] font-medium leading-snug tracking-tight">
                Artificial Intelligence Engineer
                <br className="sm:hidden" />
                <span className="mr-2 font-display text-[1.25em] font-normal italic text-accent sm:ml-2">&amp;</span>
                Front-End Developer
              </m.span>
            </h1>

            <m.p {...enter(0.5)} className="mt-6 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg">
              {site.statement}
            </m.p>

            <m.div {...enter(0.6)} className="mt-9 flex flex-wrap items-center gap-3">
              <Button href="#projects" size="lg" magnetic>
                View My Work
                <ArrowRight size={18} aria-hidden="true" className="transition-transform group-hover/btn:translate-x-0.5" />
              </Button>
              <Button href={site.cvFile} download={site.cvDownloadName} variant="secondary" size="lg" magnetic>
                <Download size={18} aria-hidden="true" />
                Download CV
              </Button>
              <Button href="#contact" variant="ghost" size="lg">
                Contact Me
                <ArrowUpRight size={18} aria-hidden="true" />
              </Button>
            </m.div>

            <m.div {...enter(0.7)} className="mt-9 flex items-center gap-4">
              <SocialLinks />
              <span aria-hidden="true" className="h-px flex-1 max-w-24 bg-line-strong" />
            </m.div>
          </div>

          {/* Portrait */}
          <m.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, ease: easeOutExpo, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <Portrait />
          </m.div>
        </div>

        {/* Featured work — visible in the first seconds */}
        <m.div {...enter(0.8)} className="mt-16 grid gap-3 sm:grid-cols-2 lg:mt-20">
          {featuredProjects.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              onClick={() => openProject(p.slug)}
              className="group card flex items-center justify-between gap-4 !rounded-2xl px-5 py-4 text-left transition-colors hover:border-line-strong"
            >
              <span className="flex min-w-0 items-center gap-4">
                <span className="font-mono text-xs text-accent">0{i + 1}</span>
                <span className="min-w-0">
                  <span className="eyebrow block !text-[0.62rem]">Featured project</span>
                  <span className="mt-1 block truncate font-medium tracking-tight">{p.title}</span>
                </span>
              </span>
              <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-fg">
                <ArrowUpRight size={16} aria-hidden="true" />
              </span>
            </button>
          ))}
        </m.div>
      </div>

      {/* Signature stack marquee */}
      <div className="mt-14 border-y border-line bg-surface py-4 sm:mt-16" aria-label="Core technologies">
        <div className="mask-fade-x flex overflow-hidden">
          <ul className="animate-marquee flex shrink-0 gap-10 pr-10 motion-reduce:animate-none hover:[animation-play-state:paused]">
            {[...signatureStack, ...signatureStack].map((s, i) => (
              <li key={i} aria-hidden={i >= signatureStack.length ? 'true' : undefined} className="flex shrink-0 items-center gap-10 font-mono text-sm text-fg-muted">
                {s}
                <span aria-hidden="true" className="text-accent">✦</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-24 right-6 hidden items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-fg-subtle hover:text-fg xl:flex [writing-mode:vertical-rl]"
      >
        Scroll
        <ArrowDown size={14} aria-hidden="true" className="animate-float" />
      </a>
    </section>
  );
}
