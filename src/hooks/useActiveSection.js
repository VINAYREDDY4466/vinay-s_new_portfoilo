import { useEffect, useState } from 'react';

/** Tracks which section is currently in the middle of the viewport. */
export default function useActiveSection(sectionIds) {
  const [activeId, setActiveId] = useState('');
  const idsKey = sectionIds.join(',');

  useEffect(() => {
    const elements = idsKey
      .split(',')
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!elements.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [idsKey]);

  return activeId;
}
