// Dummy content — replace with your real details.
// Images live in /public/assets (e.g. /public/assets/profile/avatar.jpg → '/assets/profile/avatar.jpg').

export const profile = {
  name: 'Vinay Reddy Dodlapati',
  initials: 'VR',
  role: 'Full-Stack & AI Engineer',
  headline: ['Crafting SAAS, CRMs', 'products that', 'feel alive.'],
  tagline:
    'I design and engineer fast, scalable web applications — from pixel-perfect interfaces to cloud-native backends that just work.',
  email: 'vinayreddyd4466@gmail.com', 
  location: 'India',
  timeZone: 'Asia/Kolkata',
  avatar: '/assets/profile/avatar.webp',
  resume: '/assets/resume/resume.pdf',
  resumeFileName: 'Vinay_Reddy_Resume.pdf',
  availability: {
    isAvailable: true,
    label: 'Open to freelance & full-time roles',
    unavailableLabel: 'Currently booked — say hi anyway',
  },
  about: {
    title: 'From idea to scale,',
    titleHighlight: 'I own the whole stack.',
    paragraphs: [
      "I'm a full-stack engineer who takes products from a blank page to production — UI/UX, system design, databases, cloud and AI. I think like a product owner and build like an architect, so what ships is fast, scalable and genuinely pleasant to use.",
      'My flagship work is Enculture Assessments, a SaaS platform I built end to end that now serves 20,000+ users every month. I designed its architecture and data model, built the full application, and run it on AWS and Vercel with Docker, Kubernetes and CI/CD on GitHub Actions.',
      "On the AI side, I've shipped an AI chatbot and an AI builder powered by production RAG pipelines — tuned embeddings, a vector database and fast semantic search that return grounded, accurate answers.",
    ],
    currentFocus: 'Scaling Enculture Assessments and building AI-powered products. Open to roles and freelance projects.',
  },
  stats: [
    { value: 3, suffix: '+', label: 'Years of experience' },
    { value: 25, suffix: '+', label: 'Projects shipped' },
    { value: 12, suffix: '', label: 'Happy clients' },
    { value: 20, suffix: 'K+', label: 'Monthly active users' },
  ],
};
