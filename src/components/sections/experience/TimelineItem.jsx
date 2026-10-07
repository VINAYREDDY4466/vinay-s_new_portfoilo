import { formatPeriod } from '../../../utils/text';
import { getSafeUrl } from '../../../utils/url';
import Reveal from '../../ui/Reveal';
import SmartLink from '../../ui/SmartLink';
import SpotlightCard from '../../ui/SpotlightCard';
import Tag, { TagList } from '../../ui/Tag';

export default function TimelineItem({ item }) {
  const { role, company, companyUrl, type, location, start, end, summary, achievements = [], tech = [] } = item;
  const isCurrent = !end;

  return (
    <Reveal as="li" className="relative grid gap-4 pl-10 md:grid-cols-[200px_1fr] md:gap-16 md:pl-0">
      <span
        aria-hidden
        className="absolute left-[11px] top-1.5 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-primary bg-bg md:left-[232px]"
      />

      <div className="font-mono text-xs uppercase tracking-widest text-muted md:pt-0.5 md:text-right">
        <p className={isCurrent ? 'text-primary' : 'text-fg/90'}>{formatPeriod(start, end)}</p>
        {location && <p className="mt-1.5">{location}</p>}
      </div>

      <SpotlightCard className="p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="font-display text-xl font-semibold md:text-2xl">{role}</h3>
          {type && <Tag variant={isCurrent ? 'primary' : 'default'}>{type}</Tag>}
        </div>
        <p className="mt-1.5 text-fg/70">
          {getSafeUrl(companyUrl) ? (
            <SmartLink href={companyUrl} className="underline-offset-4 hover:text-primary hover:underline">
              {company}
            </SmartLink>
          ) : (
            company
          )}
        </p>

        {summary && <p className="mt-4 leading-relaxed text-muted">{summary}</p>}

        {achievements.length > 0 && (
          <ul className="mt-5 space-y-2.5">
            {achievements.map((achievement) => (
              <li key={achievement} className="flex gap-3 text-sm leading-relaxed text-fg/80">
                <span aria-hidden className="mt-2 h-1 w-3 shrink-0 rounded-full bg-primary" />
                {achievement}
              </li>
            ))}
          </ul>
        )}

        <TagList items={tech} className="mt-6" />
      </SpotlightCard>
    </Reveal>
  );
}
