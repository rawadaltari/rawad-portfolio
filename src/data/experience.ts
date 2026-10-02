import type { ExperienceItem } from '@/types';

/** Ordered newest → oldest by start date. Undated entries go last. */
export const experience: ExperienceItem[] = [
  {
    id: 'ousos-instructor',
    role: 'Frontend Development Instructor',
    company: 'Ousos Center',
    location: 'Damascus',
    period: 'Jun 2025',
    year: '2025',
    type: 'teaching',
    description: [
      'Designed and delivered a comprehensive “Frontend Development from Zero to Professional” course covering HTML, CSS, JavaScript, and modern frameworks including React.js.',
      'Developed structured learning materials, practical coding exercises, and real-world projects while guiding students toward building fully functional responsive web applications.',
    ],
    skills: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Curriculum Design', 'Mentoring'],
  },
  {
    id: 'ix-coders',
    role: 'Front-End Developer Training',
    company: 'IX Coders',
    period: 'Aug 2024 — Nov 2024',
    year: '2024',
    type: 'training',
    description: [
      'Completed practical front-end development training focused on React.js and modern web development practices.',
    ],
    skills: ['React.js', 'JavaScript', 'Modern Web Practices'],
  },
  {
    id: 'undb-bdm',
    role: 'Business Development Manager',
    company: 'UNDB / Kensington Academic Pathways',
    period: 'Jun 2024 — Sep 2024',
    year: '2024',
    type: 'startup',
    description: [
      'Business development role within the Startup Journey program run by UNDB / Kensington Academic Pathways.',
    ],
    skills: ['Business Development', 'Startup Journey', 'Teamwork'],
  },
  {
    id: 'kafo-car',
    role: 'KAFO-CAR Application',
    company: 'UNDB / Kensington Academic Pathways',
    period: 'Jun 2024 — Sep 2024',
    year: '2024',
    type: 'startup',
    description: [
      'Participated in a startup marathon focused on developing an application for on-road car maintenance services.',
    ],
    skills: ['Startup Marathon', 'Product Development', 'Mobility Services'],
  },
  {
    id: 'aiu-it-support',
    role: 'IT Support — Technical Support Officer',
    company: 'Arab International University (AIU)',
    period: 'Mar 2023 — Present',
    year: '2023',
    current: true,
    type: 'work',
    description: [
      'Technical Support Officer responsible for hardware, software, troubleshooting, and network-related technical support.',
    ],
    skills: ['Hardware', 'Software', 'Troubleshooting', 'Networking'],
  },
  {
    id: 'mostaql',
    role: 'Front-End Freelancer',
    company: 'Mostaql',
    period: 'Jan 2021 — Present',
    year: '2021',
    current: true,
    type: 'freelance',
    description: [
      'Building responsive front-end interfaces and web projects as a freelance developer.',
    ],
    skills: ['React.js', 'JavaScript', 'Responsive Design', 'UI Implementation'],
    link: { label: 'Freelance portfolio', href: 'https://rawadaltari.github.io/new-5-/' },
  },
  {
    id: 'svu-contest',
    role: 'Volunteer Organizer',
    company: 'Syrian Virtual University Programming Contest',
    type: 'volunteer',
    description: [
      'Collaborated with the organizing team to plan and coordinate the official programming contest, supporting event logistics, participants, and competition operations.',
    ],
    skills: ['Event Coordination', 'Logistics', 'Teamwork'],
  },
];
