import { CloudIcon, CodeIcon, LayoutIcon, ServerIcon } from '../icons';

// Dummy content — replace with the freelance services you offer.
export const services = [
  {
    id: 'web-apps',
    title: 'Web App Development',
    description: 'End-to-end products built with React and Node.js — fast, responsive and ready to scale.',
    deliverables: ['SPA / SSR apps', 'Admin dashboards', 'E-commerce'],
    icon: CodeIcon,
  },
  {
    id: 'backend',
    title: 'APIs & Backend',
    description: 'Secure, well-documented REST and GraphQL APIs with clean architecture and solid data models.',
    deliverables: ['Auth & payments', 'Database design', 'Integrations'],
    icon: ServerIcon,
  },
  {
    id: 'cloud',
    title: 'Cloud & Deployment',
    description: 'Production-grade AWS setups with CI/CD, monitoring and cost-aware infrastructure.',
    deliverables: ['AWS EC2 / S3 / Amplify', 'Docker', 'CI/CD pipelines'],
    icon: CloudIcon,
  },
  {
    id: 'ui',
    title: 'UI Engineering',
    description: 'Pixel-perfect, accessible interfaces from Figma designs with delightful motion.',
    deliverables: ['Design systems', 'Animations', 'Landing pages'],
    icon: LayoutIcon,
  },
];
