import { findCountry } from './countries.js';

const SEPARATORS = /[\s\-().]/g;

/**
 * Reduces user input to national digits: drops separators, a repeated country
 * prefix (+91 / 0091 / 91 typed before a full number) and the trunk "0".
 */
export function normalizePhone(rawPhone, iso) {
  let phone = String(rawPhone ?? '').replace(SEPARATORS, '');
  const country = findCountry(iso);
  if (!country) return phone;

  for (const prefix of [`+${country.dial}`, `00${country.dial}`]) {
    if (phone.startsWith(prefix)) phone = phone.slice(prefix.length);
  }
  if (phone.length > country.digits[1] && phone.startsWith(country.dial)) {
    phone = phone.slice(country.dial.length);
  }
  return phone.replace(/^0+/, '');
}

/** Returns an error message, or an empty string when the number is valid. */
export function validatePhone(phone, iso) {
  const country = findCountry(iso);
  if (!country) return 'Please choose your country code.';
  if (!phone) return 'Please enter your mobile number.';
  if (!/^\d+$/.test(phone)) return 'Use digits only, and pick the country code from the list.';

  const [min, max] = country.digits;
  if (phone.length < min || phone.length > max) {
    const expected = min === max ? `${min}` : `${min}–${max}`;
    return `Enter a valid ${country.name} mobile number (${expected} digits).`;
  }
  if (country.pattern && !country.pattern.test(phone)) {
    return `That doesn't look like a valid ${country.name} mobile number.`;
  }
  return '';
}

/** "+91 8465048210" — readable, and still dialable in tel: / WhatsApp links. */
export function formatPhone(phone, iso) {
  const country = findCountry(iso);
  return country ? `+${country.dial} ${phone}` : phone;
}
