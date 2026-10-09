import { useEffect } from 'react';
import Button from '../../components/ui/Button';
import ThemeToggle from '../../components/ui/ThemeToggle';
import useAdminMessages from '../../hooks/useAdminMessages';
import { LockIcon } from '../../icons';
import MessageCard from './MessageCard';
import UnlockForm from './UnlockForm';

/** Keeps the admin page out of search engines and gives it its own tab title. */
function usePrivatePageMeta() {
  useEffect(() => {
    const previousTitle = document.title;
    const robots = document.createElement('meta');
    robots.name = 'robots';
    robots.content = 'noindex, nofollow';
    document.head.appendChild(robots);
    document.title = 'Messages — Admin';

    return () => {
      robots.remove();
      document.title = previousTitle;
    };
  }, []);
}

export default function MessagesPage() {
  usePrivatePageMeta();
  const { messages, isUnlocked, isLoading, error, unlock, refresh, lock } = useAdminMessages();

  return (
    <main className="container min-h-screen py-10 md:py-16">
      <div className="flex items-center justify-between gap-4">
        <a href="/" className="text-sm text-muted transition-colors hover:text-primary">
          ← Back to portfolio
        </a>
        <ThemeToggle />
      </div>

      {!isUnlocked ? (
        <div className="mt-16">
          <UnlockForm onUnlock={unlock} isLoading={isLoading} error={error} />
        </div>
      ) : (
        <section className="mt-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-display-md font-bold">Contact messages</h1>
              <p className="mt-2 text-muted">
                {messages.length} {messages.length === 1 ? 'message' : 'messages'}, newest first
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" onClick={refresh} disabled={isLoading} className="disabled:opacity-60">
                {isLoading ? 'Refreshing…' : 'Refresh'}
              </Button>
              <Button variant="ghost" icon={LockIcon} onClick={lock}>
                Lock
              </Button>
            </div>
          </div>

          {error && (
            <p role="alert" className="mt-6 text-sm text-red-500">
              {error}
            </p>
          )}

          {messages.length === 0 ? (
            <p className="mt-16 text-center text-muted">No messages yet.</p>
          ) : (
            <ul className="mt-8 grid gap-4">
              {messages.map((message) => (
                <MessageCard key={message.id} message={message} />
              ))}
            </ul>
          )}
        </section>
      )}
    </main>
  );
}
