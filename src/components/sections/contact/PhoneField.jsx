import { useId } from 'react';
import { CONTACT_LIMITS } from '../../../../shared/contact';
import { FIELD_ERROR, FIELD_LABEL, fieldControl } from '../../ui/fieldStyles';
import CountrySelect from './CountrySelect';

/** Country-code picker + national number, sharing one label and one error. */
export default function PhoneField({ country, phone, error, onChange, className }) {
  const id = useId();
  const errorId = `${id}-error`;
  const hasError = Boolean(error);

  return (
    <div className={className}>
      <label htmlFor={id} className={FIELD_LABEL}>
        Mobile number
      </label>
      <div className="flex gap-3">
        <CountrySelect value={country} onChange={onChange} hasError={hasError} />
        <input
          id={id}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder="98765 43210"
          maxLength={CONTACT_LIMITS.phone}
          value={phone}
          onChange={onChange}
          required
          aria-invalid={hasError}
          aria-describedby={error ? errorId : undefined}
          className={fieldControl(hasError, 'min-w-0 flex-1')}
        />
      </div>
      {error && (
        <p id={errorId} className={FIELD_ERROR}>
          {error}
        </p>
      )}
    </div>
  );
}
