import { cn } from '../../utils/cn';
import Reveal from './Reveal';

export default function SectionHeading({ index, eyebrow, title, description, className }) {
  return (
    <div className={cn('max-w-3xl', className)}>
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
          {index && <span className="text-muted">{index} / </span>}
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-4 font-display text-display-lg font-bold">{title}</h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
