import { HOME_SECTION_ID } from '../../data/navigation';
import { profile } from '../../data/profile';
import { ArrowUpIcon } from '../../icons';
import SocialLinks from '../ui/SocialLinks';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-fg/5 pt-16">
      <div className="container flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-muted">
          © {year} {profile.name}. Designed & built with care.
        </p>
        <SocialLinks />
        <a
          href={`#${HOME_SECTION_ID}`}
          className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-primary"
        >
          Back to top
          <ArrowUpIcon aria-hidden className="transition-transform group-hover:-translate-y-0.5" />
        </a>
      </div>
      <p
        aria-hidden
        className="text-outline mt-10 select-none whitespace-nowrap text-center font-display text-[17vw] font-extrabold leading-[0.8] tracking-tighter"
      >
        {profile.name.split(' ')[0]}
      </p>
    </footer>
  );
}
