import { useCallback, useState } from 'react';
import { fetchMessages } from '../services/api';

/** Password is kept in memory only (never persisted), so a refresh or "Lock" requires it again. */
export default function useAdminMessages() {
  const [password, setPassword] = useState('');
  const [messages, setMessages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const lock = useCallback(() => {
    setPassword('');
    setMessages(null);
    setError('');
  }, []);

  const load = useCallback(
    async (secret) => {
      setIsLoading(true);
      setError('');
      try {
        const data = await fetchMessages(secret);
        setPassword(secret);
        setMessages(Array.isArray(data.messages) ? data.messages : []);
      } catch (loadError) {
        if (loadError.status === 401) lock();
        setError(loadError.message);
      } finally {
        setIsLoading(false);
      }
    },
    [lock],
  );

  return {
    messages,
    isUnlocked: messages !== null,
    isLoading,
    error,
    unlock: load,
    refresh: () => load(password),
    lock,
  };
}
