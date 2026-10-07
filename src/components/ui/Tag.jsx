import { cn } from '../../utils/cn';

const VARIANTS = {
  default: 'border-fg/10 bg-fg/[0.04] text-fg/80',
  primary: 'border-primary/30 bg-primary/10 text-primary',
};

export default function Tag({ children, variant = 'default', className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-wider backdrop-blur',
        VARIANTS[variant] ?? VARIANTS.default,
        className,
      )}
    >
      {children}
    </span>
  );
}

export function TagList({ items = [], className }) {
  if (!items.length) return null;

  return (
    <ul className={cn('flex flex-wrap gap-2', className)}>
      {items.map((item) => (
        <li key={item}>
          <Tag>{item}</Tag>
        </li>
      ))}
    </ul>
  );
}
