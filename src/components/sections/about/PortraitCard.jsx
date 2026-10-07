import { profile } from '../../../data/profile';
import { MapPinIcon } from '../../../icons';
import { cn } from '../../../utils/cn';
import SmartImage from '../../ui/SmartImage';
import SpotlightCard from '../../ui/SpotlightCard';

export default function PortraitCard({ className }) {
  return (
    <SpotlightCard className={cn('group overflow-hidden', className)}>
      <SmartImage
        src={profile.avatar}
        alt={`Portrait of ${profile.name}`}
        fallbackLabel={profile.name}
        width={900}
        height={900}
        className="h-full min-h-[26rem] w-full lg:min-h-[22rem] object-cover object-[50%_25%] transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg via-bg/70 to-transparent p-6 pt-20">
        <p className="font-display text-2xl font-bold">{profile.name}</p>
        <p className="mt-1 text-sm text-muted">{profile.role}</p>
        <p className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-fg/70">
          <MapPinIcon aria-hidden className="h-4 w-4 text-primary" />
          {profile.location}
        </p>
      </div>
    </SpotlightCard>
  );
}
