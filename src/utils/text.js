export function getInitials(label = '') {
  return label
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');
}

export function formatPeriod(start, end) {
  const endLabel = end || 'Present';
  return start ? `${start} — ${endLabel}` : endLabel;
}
