import { useEffect } from 'react';
import { COUNTRIES, findCountry } from '../../../../shared/countries';
import { CaretDownIcon } from '../../../icons';
import { ensureFlagEmojis, flagEmoji } from '../../../utils/flags';
import { fieldControl } from '../../ui/fieldStyles';

/**
 * Shows a compact "🇮🇳 +91" face. A transparent native <select> sits on top, so
 * keyboard, screen-reader and mobile pickers keep working and list full country names.
 */
export default function CountrySelect({ value, onChange, hasError }) {
  useEffect(() => ensureFlagEmojis(), []);
  const selected = findCountry(value) ?? COUNTRIES[0];

  return (
    <div
      className={fieldControl(
        hasError,
        'relative flex shrink-0 items-center gap-2 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/25',
      )}
    >
      <span aria-hidden className="text-xl leading-none">
        {flagEmoji(selected.iso)}
      </span>
      <span aria-hidden>+{selected.dial}</span>
      <CaretDownIcon aria-hidden className="h-3.5 w-3.5 text-muted" />
      <select
        name="country"
        aria-label="Country code"
        autoComplete="tel-country-code"
        value={selected.iso}
        onChange={onChange}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0 [&>option]:bg-surface [&>option]:text-fg"
      >
        {COUNTRIES.map(({ iso, name, dial }) => (
          <option key={iso} value={iso}>
            {`${flagEmoji(iso)}  ${name} (+${dial})`}
          </option>
        ))}
      </select>
    </div>
  );
}
