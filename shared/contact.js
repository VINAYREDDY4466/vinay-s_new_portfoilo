// Shared by the contact form (browser) and the Worker API so both enforce identical rules.
import { DEFAULT_COUNTRY } from './countries.js';
import { normalizePhone, validatePhone } from './phone.js';

export const CONTACT_LIMITS = {
  name: 100,
  email: 254,
  phone: 20,
  messageMin: 10,
  messageMax: 5000,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normalizeContact(input) {
  const source = input && typeof input === 'object' ? input : {};
  const country = String(source.country ?? DEFAULT_COUNTRY).trim().toUpperCase();

  return {
    name: String(source.name ?? '').trim(),
    email: String(source.email ?? '').trim().toLowerCase(),
    country,
    phone: normalizePhone(source.phone, country),
    message: String(source.message ?? '').trim(),
  };
}

/** Returns a `{ field: message }` map; empty when the contact is valid. */
export function validateContact({ name, email, country, phone, message }) {
  const errors = {};

  if (!name) errors.name = 'Please enter your name.';
  else if (name.length > CONTACT_LIMITS.name) errors.name = `Name must be ${CONTACT_LIMITS.name} characters or fewer.`;

  if (!email) errors.email = 'Please enter your email.';
  else if (email.length > CONTACT_LIMITS.email || !EMAIL_PATTERN.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  const phoneError = validatePhone(phone, country);
  if (phoneError) errors.phone = phoneError;

  if (message.length < CONTACT_LIMITS.messageMin) {
    errors.message = `Message must be at least ${CONTACT_LIMITS.messageMin} characters.`;
  } else if (message.length > CONTACT_LIMITS.messageMax) {
    errors.message = `Message must be ${CONTACT_LIMITS.messageMax} characters or fewer.`;
  }

  return errors;
}
