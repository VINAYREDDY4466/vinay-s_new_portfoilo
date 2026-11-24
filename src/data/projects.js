// Selected work shown on the portfolio. Wording matches the resume.
// Put screenshots in /public/assets/projects/ (16:10 ratio looks best). Missing images show a styled placeholder.
// Leave a link empty ('') to hide its button.

export const projects = [
  {
    id: 'enculture-assessments',
    title: 'Enculture Assessments',
    summary:
      'Enterprise multi-tenant assessment platform for 20,000+ monthly users, with React workflows, Node.js and MongoDB services, RAG, and AWS deployments through GitHub Actions.',
    image: '',
    category: 'Full-Stack',
    year: '2025',
    featured: true,
    tech: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'AWS', 'Docker', 'OpenAI', 'RAG'],
    links: { live: '', github: '' },
  },
  {
    id: 'enzo',
    title: 'ENZO',
    summary:
      'Employee engagement platform that integrates with HRMS systems, with a React admin portal, real-time AI chat over WebSockets, and AWS, FastAPI, Redis and ClickHouse services.',
    image: '',
    category: 'Full-Stack',
    year: '2026',
    featured: false,
    tech: ['React', 'TypeScript', 'Node.js', 'FastAPI', 'Redis', 'AWS', 'ClickHouse'],
    links: { live: '', github: '' },
  },
  {
    id: 'honestpane',
    title: 'Honestpane',
    summary:
      'Interview integrity platform with a React dashboard, Node.js session APIs, a Rust Linux agent and browser extension, and heartbeat checks before a meeting unlocks.',
    image: '',
    category: 'Full-Stack',
    year: '2026',
    featured: false,
    tech: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Rust', 'AWS', 'Cloudflare'],
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
