import { WhatsappIcon } from '../icons';

// Country code + number, digits only.
const WHATSAPP_NUMBER = '918465048210';
const whatsappMessage = encodeURIComponent('Hi! I saw your portfolio and would like to discuss a project.');

export const contactChannels = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    url: `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`,
    icon: WhatsappIcon,
  },
];
