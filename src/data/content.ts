import { BrainCircuit, Code2, GraduationCap, LayoutTemplate, LifeBuoy, MonitorSmartphone, Plug, Presentation, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Service } from '@/types';

export const about = {
  lead: 'I sit where Artificial Intelligence meets the interface — turning machine learning ideas into web products people can actually use.',
  paragraphs: [
    'I’m a Junior Web Developer specializing in front-end development, with experience across the full development cycle of dynamic web projects — from Figma designs to responsive, production-ready React applications connected to REST APIs.',
    'Alongside front-end work, my academic focus is Artificial Intelligence & Machine Learning. I’m most interested in AI-powered applications and intelligent web systems: products where a model does real work and the interface makes it clear, fast and trustworthy.',
    'Day to day I bring a problem-solving mindset shaped by technical support at Arab International University, teaching front-end development, and freelancing since 2021.',
  ],
};

export interface FocusArea {
  title: string;
  description: string;
  icon: LucideIcon;
}

/** Factual focus categories — no invented numbers. */
export const focusAreas: FocusArea[] = [
  { title: 'AI & ML', description: 'AI & Machine Learning specialization; AI-powered web applications.', icon: BrainCircuit },
  { title: 'Front-End Development', description: 'React.js, Redux Toolkit, Tailwind CSS, REST APIs.', icon: Code2 },
  { title: 'UI/UX', description: 'Figma to responsive, accessible interfaces.', icon: LayoutTemplate },
  { title: 'IT Support', description: 'Hardware, software & network support at AIU.', icon: LifeBuoy },
  { title: 'Teaching', description: 'Front-end course instructor at Ousos Center.', icon: Presentation },
];

export const services: Service[] = [
  {
    id: 'frontend',
    title: 'Front-End Development',
    description: 'Modern responsive websites and web applications built with React.js.',
    icon: Code2,
  },
  {
    id: 'uiux',
    title: 'UI/UX Implementation',
    description: 'Transforming Figma designs into responsive, polished interfaces.',
    icon: LayoutTemplate,
  },
  {
    id: 'ai-apps',
    title: 'AI-Powered Web Applications',
    description: 'Integrating machine learning and AI functionality into web applications.',
    icon: Sparkles,
  },
  {
    id: 'api',
    title: 'API Integration',
    description: 'Connecting front-end applications with REST APIs using Axios and Fetch.',
    icon: Plug,
  },
  {
    id: 'responsive',
    title: 'Responsive Web Design',
    description: 'Interfaces that work seamlessly across desktop, tablet and mobile.',
    icon: MonitorSmartphone,
  },
  {
    id: 'support',
    title: 'Technical Support',
    description: 'Hardware, software and network troubleshooting.',
    icon: LifeBuoy,
  },
];

export const education = {
  degree: 'Bachelor Degree in Information Technology Engineering',
  institution: 'Syrian Virtual University',
  specialization: 'Artificial Intelligence & Machine Learning',
  icon: GraduationCap,
  interests: ['Artificial Intelligence', 'Machine Learning', 'AI-powered applications', 'Intelligent web systems'],
};
