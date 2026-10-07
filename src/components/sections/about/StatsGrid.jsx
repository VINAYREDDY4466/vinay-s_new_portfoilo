import { profile } from '../../../data/profile';
import { cn } from '../../../utils/cn';
import CountUp from '../../ui/CountUp';
import SpotlightCard from '../../ui/SpotlightCard';

export default function StatsGrid({ className }) {
  if (!profile.stats?.length) return null;

  return (
    <ul className={cn('grid grid-cols-2 gap-4', className)}>
      {profile.stats.map(({ value, suffix, label }) => (
        <SpotlightCard as="li" key={label} className="p-6">
          <p className="font-display text-4xl font-bold md:text-5xl">
            <CountUp value={value} suffix={suffix} />
          </p>
          <p className="mt-2 text-sm text-muted">{label}</p>
        </SpotlightCard>
      ))}
    </ul>
  );
}
