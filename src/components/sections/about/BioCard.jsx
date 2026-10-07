import { profile } from '../../../data/profile';
import { cn } from '../../../utils/cn';
import SpotlightCard from '../../ui/SpotlightCard';

export default function BioCard({ className }) {
  const { paragraphs, currentFocus } = profile.about;

  return (
    <SpotlightCard className={cn('flex flex-col justify-between gap-8 p-7 md:p-10', className)}>
      <div className="space-y-5 text-lg leading-relaxed text-fg/85">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      {currentFocus && (
        <div className="flex items-start gap-3 rounded-2xl border border-fg/10 bg-fg/[0.03] p-4">
          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
          <p className="text-sm text-muted">
            <span className="font-mono text-[11px] uppercase tracking-wider text-fg">Currently — </span>
            {currentFocus}
          </p>
        </div>
      )}
    </SpotlightCard>
  );
}
