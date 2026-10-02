import { LazyMotion, MotionConfig } from 'motion/react';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { ProjectModal } from './components/projects/ProjectModal';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';
import { Education } from './components/sections/Education';
import { Experience } from './components/sections/Experience';
import { Hero } from './components/sections/Hero';
import { Projects } from './components/sections/Projects';
import { Services } from './components/sections/Services';
import { Skills } from './components/sections/Skills';
import { ThemeProvider } from './providers/ThemeProvider';

const loadFeatures = () => import('./lib/motion-features').then((mod) => mod.default);

export default function App() {
  return (
    <ThemeProvider>
      {/* reducedMotion="user" → transforms are skipped automatically for prefers-reduced-motion users */}
      <MotionConfig reducedMotion="user">
        <LazyMotion features={loadFeatures} strict>
          <a
            href="#main"
            className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-fg transition-transform focus:translate-y-0"
          >
            Skip to content
          </a>
          <ScrollProgress />
          <Navbar />
          <main id="main" tabIndex={-1} className="outline-none">
            <Hero />
            <About />
            <Services />
            <Experience />
            <Skills />
            <Projects />
            <Education />
            <Contact />
          </main>
          <Footer />
          <ProjectModal />
        </LazyMotion>
      </MotionConfig>
    </ThemeProvider>
  );
}
