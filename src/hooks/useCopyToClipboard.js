import { useCallback, useEffect, useRef, useState } from 'react';
import { copyText } from '../utils/clipboard';

/** status: 'idle' | 'copied' | 'error' — resets to 'idle' after `resetAfterMs`. */
export default function useCopyToClipboard(resetAfterMs = 2000) {
  const [status, setStatus] = useState('idle');
  const timeoutRef = useRef(null);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const copy = useCallback(
    async (text) => {
      try {
        await copyText(text);
        setStatus('copied');
      } catch {
        setStatus('error');
      }

      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setStatus('idle'), resetAfterMs);
    },
    [resetAfterMs],
  );

  return { status, copy };
}
