// Selected work shown on the portfolio. Wording matches the resume.
// Put screenshots in /public/assets/projects/ (16:10 ratio looks best). Missing images show a styled placeholder.
// Leave a link empty ('') to hide its button.

export const projects = [
  {
    id: 'enzo',
    title: 'ENZO',
    summary:
      'An enterprise employee engagement platform that connects to HRMS systems and uses conversational AI and intelligent nudges to personalize employee communication.',
    image: '',
    category: 'Full-Stack',
    year: '2026',
    featured: true,
    tech: ['React', 'TypeScript', 'Node.js', 'FastAPI', 'AWS', 'ClickHouse'],
    links: { live: '', github: '' },
  },
  {
    id: 'honestpane',
    title: 'Honestpane',
    summary:
      'A full-stack interview integrity platform that detects known AI interview tools, streams review signals to HR, and unlocks the meeting only when the monitoring agent is connected.',
    image: '',
    category: 'Full-Stack',
    year: '2026',
    featured: true,
    tech: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Rust', 'AWS'],
    links: { live: '', github: '' },
  },
  {
    id: 'enculture-assessments',
    title: 'Enculture Assessments',
    summary:
      'A SaaS assessment platform built solo, end to end — architecture, product, RAG features and production on AWS and Vercel, now serving 20,000+ monthly users.',
    image: '',
    category: 'Full-Stack',
    year: '2025',
    featured: true,
    tech: ['AWS', 'Vercel', 'Docker', 'Kubernetes', 'RAG', 'GitHub Actions'],
    links: { live: '', github: '' },
  },
  {
    id: 'knowledge-base-rag',
    title: 'Knowledge Base RAG Chatbot',
    summary:
      'A document Q&A chatbot that chunks uploads, ranks passages with embeddings, and answers from those sources with citations and prompt-injection guardrails.',
    image: '',
    category: 'AI',
    year: '2026',
    featured: false,
    tech: ['Node.js', 'Express', 'MongoDB', 'OpenAI', 'Embeddings', 'Docker'],
    links: { live: '', github: '' },
  },
  {
    id: 'personal-ai-agent',
    title: 'Personal AI Agent',
    summary:
      'A self-hosted assistant that streams Llama 3.2 over Socket.IO, remembers conversations in MongoDB, and runs secured with JWT on AWS EC2.',
    image: '',
    category: 'AI',
    year: '2026',
    featured: false,
    tech: ['TypeScript', 'Express', 'Socket.IO', 'Ollama', 'MongoDB', 'AWS EC2'],
    links: { live: '', github: '' },
  },
  {
    id: 'deepam-crackers',
    title: 'Deepam Crackers',
    summary:
      'A complete ecommerce store built end to end — catalog, cart, and WhatsApp checkout, plus an admin console — from the product through testing and deployment.',
    image: '',
    category: 'Full-Stack',
    year: '2026',
    featured: false,
    tech: ['React', 'Node.js', 'MongoDB', 'AWS S3', 'EC2', 'GitHub Actions'],
    links: { live: '', github: '' },
  },
];
