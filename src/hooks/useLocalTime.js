import { useEffect, useMemo, useState } from 'react';

const REFRESH_MS = 30_000;

function createFormatter(timeZone) {
  try {
    return new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone });
  } catch {
    return null;
  }
}

/** Returns the formatted current time in `timeZone`, or `null` if the zone is invalid. */
export default function useLocalTime(timeZone) {
  const formatter = useMemo(() => createFormatter(timeZone), [timeZone]);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    if (!formatter) return undefined;
    const intervalId = setInterval(() => setNow(new Date()), REFRESH_MS);
    return () => clearInterval(intervalId);
  }, [formatter]);

  return formatter ? formatter.format(now) : null;
}
