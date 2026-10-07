import { socials } from '../../data/socials';
import { cn } from '../../utils/cn';
import { getSafeUrl } from '../../utils/url';
import SmartLink from './SmartLink';

export default function SocialLinks({ items = socials, className }) {
  const validItems = items.filter((item) => getSafeUrl(item.url));
  if (!validItems.length) return null;

  return (
    <ul className={cn('flex flex-wrap items-center gap-2', className)}>
      {validItems.map(({ id, label, url, icon: Icon }) => (
        <li key={id}>
          <SmartLink
            href={url}
            aria-label={label}
            title={label}
            className="grid h-10 w-10 place-items-center rounded-full border border-fg/10 text-muted transition-colors duration-300 hover:border-primary/60 hover:text-primary"
          >
            <Icon aria-hidden className="h-4 w-4" />
          </SmartLink>
        </li>
      ))}
    </ul>
  );
}
