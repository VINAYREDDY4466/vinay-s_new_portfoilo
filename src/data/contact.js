import { CalendarIcon, WhatsappIcon } from '../icons';

const whatsappMessage = encodeURIComponent('Hi! I saw your portfolio and would like to discuss a project.');

// Dummy links — replace with your real booking / chat links.
export const contactChannels = [
  {
    id: 'calendly',
    label: 'Book a call',
    url: 'https://calendly.com/your-handle',
    icon: CalendarIcon,
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    url: `https://wa.me/910000000000?text=${whatsappMessage}`,
    icon: WhatsappIcon,
  },
];
