import { useState } from 'react';
import Button from '../../components/ui/Button';
import FormField from '../../components/ui/FormField';
import SpotlightCard from '../../components/ui/SpotlightCard';
import { LockIcon } from '../../icons';

export default function UnlockForm({ onUnlock, isLoading, error }) {
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password && !isLoading) onUnlock(password);
  };

  return (
    <SpotlightCard className="mx-auto w-full max-w-md p-8">
      <span className="grid h-12 w-12 place-items-center rounded-2xl border border-primary/20 bg-primary/10 text-2xl text-primary">
        <LockIcon aria-hidden />
      </span>
      <h1 className="mt-6 font-display text-2xl font-semibold">Messages are locked</h1>
      <p className="mt-2 text-sm text-muted">Enter the admin password to view contact submissions.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <FormField
          label="Password"
          type="password"
          autoComplete="current-password"
          autoFocus
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={error}
        />
        <Button type="submit" icon={LockIcon} disabled={!password || isLoading} className="disabled:opacity-60">
          {isLoading ? 'Checking…' : 'Unlock'}
        </Button>
      </form>
    </SpotlightCard>
  );
}
