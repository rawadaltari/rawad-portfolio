# Rawad Altari — Portfolio

Personal portfolio for **Rawad Altari — Artificial Intelligence Engineer & Front-End Developer**.

**Stack:** React 19 · TypeScript (strict) · Vite 8 · Tailwind CSS 4 · Motion (Framer Motion) · Lucide icons · self-hosted fonts (Inter Tight, Instrument Serif, JetBrains Mono).

## Run

```bash
cp .env.example .env   # then set VITE_SITE_URL
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build → dist/
npm run preview    # serve the production build
npm run lint
```

Node 20+ recommended. To deploy on Netlify, set the build command to `npm run build` and the publish directory to `dist`. `public/_headers` already sets caching and security headers.

## Environment (`.env`)

| Variable                     | Purpose                                                                                   |
| ---------------------------- | ----------------------------------------------------------------------------------------- |
| `VITE_SITE_URL`              | Public URL with no trailing slash. Used for the canonical, Open Graph and JSON-LD tags.   |
| `VITE_CONTACT_FORM_ENDPOINT` | Optional public form endpoint (Formspree, Getform…). If it's empty, the form opens the visitor's email app. |

Also update the domain in `public/robots.txt` and `public/sitemap.xml`.

## Replace content

| What                 | Where                                                                                              |
| -------------------- | -------------------------------------------------------------------------------------------------- |
| **Profile photo**    | Add `public/images/profile/rawad-altari.jpg` (4:5, about 832×1040). It shows up automatically. |
| **CV**               | Add `public/cv/rawad-altari-cv.pdf`. Every "Download CV" button links to it.                    |
| **Project images**   | Add `public/images/projects/<name>.webp` (16:10). See the README in that folder for the names. |
| **Links / contact**  | `src/config/site.ts`. Any link left empty (`''`) shows a disabled "coming soon" state. |
| **Projects**         | `src/data/projects.ts`                                                                             |
| **Experience**       | `src/data/experience.ts`                                                                           |
| **Skills**           | `src/data/skills.ts`                                                                               |
| **About / Services / Education** | `src/data/content.ts`                                                                  |

### Add a project

1. Put the cover image at `public/images/projects/my-project.webp`.
2. Add an object to the `projects` array in `src/data/projects.ts`:

```ts
{
  slug: 'my-project',
  title: 'My Project',
  subtitle: 'Short category',
  summary: 'One or two sentences for the card.',
  description: ['Paragraph shown in the details modal.'],
  features: ['Feature one', 'Feature two'],
  tech: ['React.js', 'Tailwind CSS'],
  image: '/images/projects/my-project.webp',
  imageAlt: 'Screenshot of My Project',
  gallery: [],                 // extra screenshots for the modal
  links: { github: 'https://github.com/…', demo: 'https://…' },
  visual: 'layout',            // placeholder style until the image exists
  featured: false,             // true = large card at the top
}
```

The card, the details modal (`?project=my-project` deep link) and the prev/next navigation pick it up automatically.

## Architecture

```
src/
  config/site.ts           single source for name, links, file paths
  data/                    all CV content (typed)
  types/                   shared TypeScript types
  providers/ThemeProvider  dark/light theme with a circular View-Transition reveal
  hooks/                   active section, scroll state, dialog focus-trap, spotlight, media query
  lib/                     motion presets, project-modal store (URL-synced), className helper
  components/
    layout/                Navbar, MobileMenu, ThemeToggle, ScrollProgress, Logo, Footer
    sections/              Hero, Portrait, About, Services, Experience, Skills, Projects, Education, Contact, ContactForm
    projects/              ProjectCard, ProjectModal, ProjectLinks, ProjectArt (placeholders)
    background/            NeuralField (canvas neural network)
    ui/                    Button (magnetic), Reveal, TextReveal, Section, SectionHeading, SmartImage, Tag, SocialLinks…
```

## Animation system

- **Motion** loads lazily through `LazyMotion`, so the animation engine sits in its own chunk.
- `MotionConfig reducedMotion="user"` respects `prefers-reduced-motion`. A CSS fallback also stops the CSS animations.
- Reusable pieces: `Reveal`, `RevealGroup`/`RevealItem` (staggered), `TextReveal` (masked word reveal), and a magnetic `Button`.
- The experience timeline line fills as you scroll (`useScroll`). The nav pill slides between sections (`layoutId`).
- `NeuralField` draws on a canvas. It starts when the browser is idle, pauses when off-screen or when the tab is hidden, caps the pixel ratio at 2, and draws a single static frame when reduced motion is on.
