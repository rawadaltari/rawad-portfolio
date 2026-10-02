import { BrainCircuit, Code2, Layers, PenTool, Plug, Wrench } from 'lucide-react';
import type { SkillGroup } from '@/types';

export const skillGroups: SkillGroup[] = [
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    icon: BrainCircuit,
    blurb: 'Academic specialization and hands-on work bringing models into real, usable products.',
    skills: ['Artificial Intelligence', 'Machine Learning', 'Python', 'Machine Learning Models', 'AI Integration'],
    featured: true,
  },
  {
    id: 'frontend',
    title: 'Front-End',
    icon: Code2,
    blurb: 'Modern, component-driven interfaces that are fast, responsive and maintainable.',
    skills: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap', 'Material UI', 'jQuery'],
    featured: true,
  },
  {
    id: 'state',
    title: 'State Management',
    icon: Layers,
    blurb: 'Predictable application state from local hooks to global stores.',
    skills: ['Redux', 'Redux Toolkit', 'React Hooks'],
  },
  {
    id: 'api',
    title: 'API & Backend Integration',
    icon: Plug,
    blurb: 'Connecting interfaces to services and model endpoints.',
    skills: ['REST APIs', 'Axios', 'Fetch API'],
  },
  {
    id: 'design',
    title: 'Design',
    icon: PenTool,
    blurb: 'From Figma frames to pixel-accurate, responsive UI.',
    skills: ['UI/UX', 'Figma', 'Responsive Design'],
  },
  {
    id: 'tools',
    title: 'Tools',
    icon: Wrench,
    blurb: 'Version control and deployment workflow.',
    skills: ['Git', 'GitHub', 'Netlify'],
  },
];

/** Short list used in the hero marquee — the signature combination. */
export const signatureStack = [
  'Artificial Intelligence',
  'Machine Learning',
  'React.js',
  'Python',
  'JavaScript',
  'Tailwind CSS',
  'REST APIs',
  'Redux Toolkit',
  'UI/UX · Figma',
  'Responsive Design',
];
