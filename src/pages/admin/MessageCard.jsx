import SpotlightCard from '../../components/ui/SpotlightCard';
import { TrashIcon, WhatsappIcon } from '../../icons';

const dateFormatter = new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' });

function formatDate(isoDate) {
  const date = new Date(isoDate);
  return Number.isNaN(date.getTime()) ? '' : dateFormatter.format(date);
}

function PhoneLinks({ phone }) {
  const digits = phone.replace(/\D/g, '');
  if (!digits) return null;

  return (
    <span className="flex items-center gap-3 text-sm">
      <a href={`tel:+${digits}`} className="text-primary hover:underline">
        {phone}
      </a>
      <a
        href={`https://wa.me/${digits}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat on WhatsApp with ${phone}`}
        className="text-muted transition-colors hover:text-success"
      >
        <WhatsappIcon aria-hidden />
      </a>
    </span>
  );
}

function DeleteButton({ name, isDeleting, onConfirm }) {
  const handleClick = () => {
    if (window.confirm(`Delete the message from ${name}? This can't be undone.`)) onConfirm();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isDeleting}
      aria-label={`Delete message from ${name}`}
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold text-muted transition-colors hover:bg-red-500/10 hover:text-red-500 disabled:pointer-events-none disabled:opacity-60"
    >
      <TrashIcon aria-hidden className="h-3.5 w-3.5" />
      {isDeleting ? 'Deleting…' : 'Delete'}
    </button>
  );
}

export default function MessageCard({ message, isDeleting, onDelete }) {
  const { id, name, email, phone, message: body, createdAt } = message;

  return (
    <SpotlightCard as="li" className="p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <div className="flex min-w-0 flex-col gap-1">
          <p className="font-semibold">{name}</p>
          <a href={`mailto:${email}`} className="break-all text-sm text-primary hover:underline">
            {email}
          </a>
          <PhoneLinks phone={phone ?? ''} />
        </div>
        <div className="flex items-center gap-3">
          <time dateTime={createdAt} className="font-mono text-xs uppercase tracking-wider text-muted">
            {formatDate(createdAt)}
          </time>
          <DeleteButton name={name} isDeleting={isDeleting} onConfirm={() => onDelete(id)} />
        </div>
      </div>
      <p className="mt-4 whitespace-pre-wrap break-words leading-relaxed text-fg/85">{body}</p>
    </SpotlightCard>
  );
}
