import { useEffect, useState } from 'react';

const getMatch = (query) => typeof window !== 'undefined' && window.matchMedia(query).matches;

export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => getMatch(query));

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handleChange = () => setMatches(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
}
