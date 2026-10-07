import useLocalTime from '../../hooks/useLocalTime';

export default function LocalTime({ location, timeZone }) {
  const time = useLocalTime(timeZone);
  if (!time) return null;

  return (
    <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
      {location && <span>Based in {location} · </span>}
      <time>{time}</time> local
    </p>
  );
}
