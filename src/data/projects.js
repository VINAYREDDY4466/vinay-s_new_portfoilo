// Dummy content — replace with your real projects.
// Put screenshots in /public/assets/projects/ (16:10 ratio looks best). Missing images show a styled placeholder.
// Leave a link empty ('') to hide its button.

export const projects = [
  {
    id: 'cracker-commerce',
    title: 'Cracker Commerce',
    summary: 'A full-stack e-commerce platform with real-time inventory, admin analytics and secure checkout.',
    image: '/assets/projects/project-1.jpg',
    category: 'Full-Stack',
    year: '2026',
    featured: true,
    tech: ['React', 'Node.js', 'MongoDB', 'AWS'],
    links: { live: 'https://example.com', github: 'https://github.com/your-username/project-1' },
  },
  {
    id: 'pulse-dashboard',
    title: 'Pulse Analytics',
    summary: 'A SaaS analytics dashboard with interactive charts, role-based access and CSV exports.',
    image: '/assets/projects/project-2.jpg',
    category: 'Frontend',
    year: '2025',
    featured: true,
    tech: ['React', 'Recharts', 'Tailwind CSS'],
    links: { live: 'https://example.com', github: 'https://github.com/your-username/project-2' },
  },
  {
    id: 'cloud-deployer',
    title: 'Cloud Deployer',
    summary: 'Automated EC2 deployment pipeline with zero-downtime releases and health monitoring.',
    image: '/assets/projects/project-3.jpg',
    category: 'Backend',
    year: '2025',
    featured: false,
    tech: ['Node.js', 'Docker', 'AWS EC2', 'Nginx'],
    links: { live: '', github: 'https://github.com/your-username/project-3' },
  },
  {
    id: 'ai-notes',
    title: 'Mindful AI Notes',
    summary: 'An AI-powered note-taking app that summarises, tags and searches your notes semantically.',
    image: '/assets/projects/project-4.jpg',
    category: 'AI',
    year: '2024',
    featured: false,
    tech: ['Next.js', 'OpenAI', 'PostgreSQL'],
    links: { live: 'https://example.com', github: '' },
  },
];
