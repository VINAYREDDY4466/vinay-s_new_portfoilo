import { useId } from 'react';
import { cn } from '../../utils/cn';
import { FIELD_ERROR, FIELD_LABEL, fieldControl } from './fieldStyles';

/** Labelled input/textarea with an accessible inline error. */
export default function FormField({ label, error, multiline = false, className, ...inputProps }) {
  const id = useId();
  const errorId = `${id}-error`;
  const Control = multiline ? 'textarea' : 'input';

  return (
    <div className={className}>
      <label htmlFor={id} className={FIELD_LABEL}>
        {label}
      </label>
      <Control
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={fieldControl(Boolean(error), cn('w-full', multiline && 'min-h-[9rem] resize-y'))}
        {...inputProps}
      />
      {error && (
        <p id={errorId} className={FIELD_ERROR}>
          {error}
        </p>
      )}
    </div>
  );
}
