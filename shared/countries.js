// Mobile number rules per country. `digits` is the [min, max] length of the national
// number without the trunk "0"; `pattern` adds a stricter check where it is well defined.

export const DEFAULT_COUNTRY = 'IN';

export const COUNTRIES = [
  { iso: 'IN', name: 'India', dial: '91', digits: [10, 10], pattern: /^[6-9]\d{9}$/ },
  { iso: 'US', name: 'United States', dial: '1', digits: [10, 10] },
  { iso: 'GB', name: 'United Kingdom', dial: '44', digits: [10, 10] },
  { iso: 'CA', name: 'Canada', dial: '1', digits: [10, 10] },
  { iso: 'AU', name: 'Australia', dial: '61', digits: [9, 9] },
  { iso: 'AE', name: 'United Arab Emirates', dial: '971', digits: [9, 9] },
  { iso: 'SA', name: 'Saudi Arabia', dial: '966', digits: [9, 9] },
  { iso: 'QA', name: 'Qatar', dial: '974', digits: [8, 8] },
  { iso: 'SG', name: 'Singapore', dial: '65', digits: [8, 8] },
  { iso: 'DE', name: 'Germany', dial: '49', digits: [10, 11] },
];

export function findCountry(iso) {
  return COUNTRIES.find((country) => country.iso === iso);
}
