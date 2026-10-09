import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill';
import flagFontUrl from 'country-flag-emoji-polyfill/dist/TwemojiCountryFlags.woff2?url';

const REGIONAL_INDICATOR_A = 0x1f1e6;

/** "IN" → 🇮🇳 */
export function flagEmoji(iso) {
  return String.fromCodePoint(...[...iso.toUpperCase()].map((char) => REGIONAL_INDICATOR_A + char.charCodeAt(0) - 65));
}

let polyfillRequested = false;

/** Windows/Chromium has no flag glyphs; there this loads a small self-hosted flag font. */
export function ensureFlagEmojis() {
  if (polyfillRequested) return;
  polyfillRequested = true;
  polyfillCountryFlagEmojis('Twemoji Country Flags', flagFontUrl);
}
