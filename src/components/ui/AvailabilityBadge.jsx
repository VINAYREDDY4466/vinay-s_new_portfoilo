import { profile } from '../../data/profile';
import { cn } from '../../utils/cn';

export default function AvailabilityBadge({ className }) {
  const { isAvailable, label, unavailableLabel } = profile.availability;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2.5 rounded-full border border-fg/10 bg-fg/[0.03] px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-fg/80 backdrop-blur',
        className,
      )}
    >
      <span className="relative flex h-2 w-2">
        {isAvailable && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />}
        <span className={cn('relative inline-flex h-2 w-2 rounded-full', isAvailable ? 'bg-success' : 'bg-muted')} />
      </span>
      {isAvailable ? label : unavailableLabel}
    </span>
  );
}
