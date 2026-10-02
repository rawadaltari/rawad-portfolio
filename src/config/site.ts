/**
 * Central site configuration.
 * Everything a non-developer may need to update (links, file paths, contact info) lives here.
 */
import type { NavItem, SocialLink } from '@/types';

export const site = {
  name: 'Rawad Altari',
  titles: ['Artificial Intelligence Engineer', 'Front-End Developer'] as const,
  statement:
    'I build intelligent, modern, and user-focused web experiences by combining Artificial Intelligence with modern Front-End development.',
  location: 'Damascus, Syria',
  phone: '+963 988 510 233',
  phoneHref: 'tel:+963988510233',
  email: 'rawad.microsoft@gmail.com',
  dateOfBirth: '27/04/2002',

  /** Public URL used for canonical/OG tags (set VITE_SITE_URL in .env). */
  url: (import.meta.env.VITE_SITE_URL as string | undefined) ?? '',

  /** Replace the file at /public/images/profile/rawad-altari.jpg to update the portrait. */
  profileImage: '/images/profile/rawad.png',

  /** Replace the file at /public/cv/rawad-altari-cv.pdf to update the CV. */
  cvFile: '/cv/rawad-altari-cv.pdf',
  cvDownloadName: 'Rawad-Altari-CV.pdf',

  /** Optional public form endpoint (Formspree etc.). Empty → mailto fallback. */
  contactEndpoint: (import.meta.env.VITE_CONTACT_FORM_ENDPOINT as string | undefined) ?? '',
} as const;

/**
 * Social / profile links.
 * TODO(Rawad): confirm the GitHub username and add the LinkedIn URL.
 * An empty href renders as a disabled "coming soon" control instead of a broken link.
 */
export const socials: SocialLink[] = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/rawadaltari' },
  { id: 'linkedin', label: 'LinkedIn', href: '' },
  { id: 'email', label: 'Email', href: `mailto:${site.email}` },
  { id: 'portfolio', label: 'Freelance portfolio', href: 'https://rawadaltari.github.io/new-5-/' },
];

export const getSocial = (id: SocialLink['id']): SocialLink =>
  socials.find((s) => s.id === id) ?? { id, label: id, href: '' };

export const navItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];
