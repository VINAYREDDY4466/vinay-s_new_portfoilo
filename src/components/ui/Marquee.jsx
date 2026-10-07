import { cn } from '../../utils/cn';

/** Infinite horizontal ticker. The second copy is decorative so screen readers read items once. */
export default function Marquee({ items, reverse = false, duration = 40, renderItem }) {
  if (!items?.length) return null;

  const track = [...items, ...items];

  return (
    <div className="group flex overflow-hidden mask-fade-x">
      {[0, 1].map((copy) => (
        <ul
          key={copy}
          aria-hidden={copy === 1 || undefined}
          style={{ '--marquee-duration': `${duration}s` }}
          className={cn(
            'flex shrink-0 animate-marquee items-center gap-4 pr-4 group-hover:[animation-play-state:paused]',
            reverse && '[animation-direction:reverse]',
          )}
        >
          {track.map((item, index) => (
            <li key={`${item}-${index}`}>{renderItem(item)}</li>
          ))}
        </ul>
      ))}
    </div>
  );
}
