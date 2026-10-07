function legacyCopy(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';

  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand('copy');
  document.body.removeChild(textarea);

  if (!copied) throw new Error('Copy command was rejected');
}

/** Uses the async Clipboard API (HTTPS / localhost) and falls back if it is missing or rejected. */
export async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Permission denied or document not focused — try the legacy path below.
    }
  }
  legacyCopy(text);
}
