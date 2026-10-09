import { cn } from '../../utils/cn';

export const FIELD_LABEL = 'mb-2 block font-mono text-xs uppercase tracking-wider text-muted';

export const FIELD_ERROR = 'mt-2 text-sm text-red-500';

// No width here: `cn` doesn't merge conflicting utilities, so each control sets its own.
export function fieldControl(hasError, className) {
  return cn(
    'rounded-2xl border bg-fg/[0.03] px-4 py-3 text-fg placeholder:text-muted/70 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25',
    hasError ? 'border-red-500/70' : 'border-fg/15',
    className,
  );
}
