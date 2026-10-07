import { ArrowUpRightIcon, GithubIcon, LockIcon } from '../../../icons';
import { cn } from '../../../utils/cn';
import { getSafeUrl } from '../../../utils/url';
import SmartLink from '../../ui/SmartLink';

const LINK_TYPES = [
  { key: 'live', label: 'Live demo', icon: ArrowUpRightIcon },
  { key: 'github', label: 'Source code', icon: GithubIcon },
];

export default function ProjectLinks({ links = {}, projectTitle, className }) {
  const available = LINK_TYPES.filter(({ key }) => getSafeUrl(links[key]));

  if (!available.length) {
    return (
      <p className={cn('inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted', className)}>
        <LockIcon aria-hidden /> Private / under NDA
      </p>
    );
  }

  return (
    <div className={cn('flex flex-wrap gap-5', className)}>
      {available.map(({ key, label, icon: Icon }) => (
        <SmartLink
          key={key}
          href={links[key]}
          aria-label={`${label} — ${projectTitle}`}
          className="group/link inline-flex items-center gap-2 text-sm font-semibold text-fg transition-colors hover:text-primary"
        >
          {label}
          <Icon
            aria-hidden
            className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
          />
        </SmartLink>
      ))}
    </div>
  );
}
