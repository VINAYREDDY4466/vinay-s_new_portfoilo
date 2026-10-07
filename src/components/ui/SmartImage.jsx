import { useEffect, useState } from 'react';
import { cn } from '../../utils/cn';
import { getInitials } from '../../utils/text';

/** Lazy image that falls back to a branded gradient placeholder when the file is missing or fails to load. */
export default function SmartImage({ src, alt, fallbackLabel, className, ...rest }) {
  const [hasFailed, setHasFailed] = useState(!src);

  useEffect(() => setHasFailed(!src), [src]);

  if (hasFailed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn('grid place-items-center bg-gradient-to-br from-primary/25 via-surface to-secondary/20', className)}
      >
        <span className="font-display text-5xl font-bold text-fg/25">{getInitials(fallbackLabel ?? alt)}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setHasFailed(true)}
      className={className}
      {...rest}
    />
  );
}
