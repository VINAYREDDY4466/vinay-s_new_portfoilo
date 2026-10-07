import { socials } from '../../../data/socials';
import { ArrowUpRightIcon } from '../../../icons';
import { getSafeUrl } from '../../../utils/url';
import SmartLink from '../../ui/SmartLink';

export default function WorkProfiles() {
  const profiles = socials.filter((social) => getSafeUrl(social.url));
  if (!profiles.length) return null;

  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {profiles.map(({ id, label, handle, url, icon: Icon }) => (
        <li key={id}>
          <SmartLink
            href={url}
            className="group flex items-center gap-4 rounded-2xl border border-fg/10 bg-surface/70 p-5 shadow-card transition-colors duration-300 hover:border-primary/40 dark:bg-surface/50 dark:shadow-none"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-fg/10 text-lg text-fg/80 transition-colors group-hover:border-primary/40 group-hover:text-primary">
              <Icon aria-hidden />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-semibold">{label}</span>
              {handle && <span className="block truncate text-sm text-muted">{handle}</span>}
            </span>
            <ArrowUpRightIcon
              aria-hidden
              className="shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
            />
          </SmartLink>
        </li>
      ))}
    </ul>
  );
}
