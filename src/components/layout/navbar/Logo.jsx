import { HOME_SECTION_ID } from '../../../data/navigation';
import { profile } from '../../../data/profile';

export default function Logo({ onClick }) {
  return (
    <a
      href={`#${HOME_SECTION_ID}`}
      onClick={onClick}
      aria-label={`${profile.name} — back to top`}
      className="group flex items-center gap-2 font-display text-lg font-bold tracking-tight"
    >
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary-solid to-secondary text-sm text-white shadow-glow transition-transform group-hover:-rotate-6">
        {profile.initials}
      </span>
      <span className="hidden sm:inline">
        {profile.name.split(' ')[0]}
        <span className="text-primary">.</span>
      </span>
    </a>
  );
}
