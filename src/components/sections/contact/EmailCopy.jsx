import useCopyToClipboard from '../../../hooks/useCopyToClipboard';
import { CheckIcon, CopyIcon } from '../../../icons';
import { isValidEmail } from '../../../utils/url';
import SmartLink from '../../ui/SmartLink';

const STATUS_LABELS = {
  idle: 'Copy',
  copied: 'Copied!',
  error: 'Copy failed',
};

export default function EmailCopy({ email }) {
  const { status, copy } = useCopyToClipboard();
  if (!isValidEmail(email)) return null;

  const StatusIcon = status === 'copied' ? CheckIcon : CopyIcon;

  return (
    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
      <SmartLink
        href={`mailto:${email.trim()}`}
        className="break-all font-display text-2xl font-semibold transition-colors hover:text-primary sm:text-4xl md:text-5xl"
      >
        {email}
      </SmartLink>
      <button
        type="button"
        onClick={() => copy(email.trim())}
        className="inline-flex shrink-0 items-center gap-2 rounded-full border border-fg/15 px-4 py-2 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:border-primary/50 hover:text-primary"
      >
        <StatusIcon aria-hidden />
        {STATUS_LABELS[status]}
      </button>
      <span role="status" className="sr-only">
        {status === 'copied' ? 'Email address copied to clipboard' : ''}
      </span>
    </div>
  );
}
