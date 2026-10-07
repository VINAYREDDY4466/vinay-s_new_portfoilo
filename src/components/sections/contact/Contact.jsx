import { contactChannels } from '../../../data/contact';
import { profile } from '../../../data/profile';
import { DownloadIcon } from '../../../icons';
import Button from '../../ui/Button';
import Reveal from '../../ui/Reveal';
import Section from '../../ui/Section';
import EmailCopy from './EmailCopy';
import WorkProfiles from './WorkProfiles';

export default function Contact() {
  return (
    <Section id="contact" className="pb-16">
      <div className="container">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
            <span className="text-muted">06 / </span>Contact
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-6 max-w-5xl font-display text-display-xl font-bold">
            Let's build something <span className="text-gradient">remarkable.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Hiring for a role or have a freelance project in mind? My inbox is always open — I usually reply within 24 hours.
          </p>
        </Reveal>

        <Reveal delay={0.24} className="mt-12">
          <EmailCopy email={profile.email} />
        </Reveal>

        <Reveal delay={0.3} className="mt-10 flex flex-wrap gap-4">
          {contactChannels.map(({ id, label, url, icon }) => (
            <Button key={id} href={url} variant={id === contactChannels[0].id ? 'primary' : 'ghost'} icon={icon}>
              {label}
            </Button>
          ))}
          <Button href={profile.resume} variant="ghost" icon={DownloadIcon} download>
            Resume
          </Button>
        </Reveal>

        <div className="mt-20">
          <Reveal>
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-muted">Find me on</h3>
          </Reveal>
          <Reveal delay={0.08} className="mt-6">
            <WorkProfiles />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
