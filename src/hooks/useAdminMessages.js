import { useCallback, useState } from 'react';
import { deleteMessage, fetchMessages } from '../services/api';

/** Password is kept in memory only (never persisted), so a refresh or "Lock" requires it again. */
export default function useAdminMessages() {
  const [password, setPassword] = useState('');
  const [messages, setMessages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
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

  const remove = useCallback(
    async (id) => {
      const dropFromList = () => setMessages((current) => current?.filter((message) => message.id !== id) ?? current);

      setDeletingId(id);
      setError('');
      try {
        await deleteMessage(password, id);
        dropFromList();
      } catch (deleteError) {
        // 404: already deleted (e.g. in another tab), so the list just catches up.
        if (deleteError.status === 404) return dropFromList();
        if (deleteError.status === 401) lock();
        setError(deleteError.message);
      } finally {
        setDeletingId(null);
      }
    },
    [password, lock],
  );

  return {
    messages,
    isUnlocked: messages !== null,
    isLoading,
    deletingId,
    error,
    unlock: load,
    refresh: () => load(password),
    remove,
    lock,
  };
}
