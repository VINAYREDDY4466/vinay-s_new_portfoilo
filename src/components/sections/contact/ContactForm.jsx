import { CONTACT_LIMITS } from '../../../../shared/contact';
import useContactForm from '../../../hooks/useContactForm';
import { ArrowUpRightIcon, CheckIcon } from '../../../icons';
import { cn } from '../../../utils/cn';
import Button from '../../ui/Button';
import FormField from '../../ui/FormField';
import SpotlightCard from '../../ui/SpotlightCard';
import PhoneField from './PhoneField';

function SuccessMessage({ onReset }) {
  return (
    <div role="status" className="flex flex-col items-start gap-4 py-6">
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-success/15 text-2xl text-success">
        <CheckIcon aria-hidden />
      </span>
      <h3 className="font-display text-2xl font-semibold">Message sent — thank you!</h3>
      <p className="text-muted">I&apos;ll get back to you within 24 hours.</p>
      <button type="button" onClick={onReset} className="text-sm font-semibold text-primary hover:underline">
        Send another message
      </button>
    </div>
  );
}

export default function ContactForm({ className }) {
  const { values, errors, status, serverError, handleChange, handleSubmit, reset } = useContactForm();
  const isSubmitting = status === 'submitting';

  return (
    <SpotlightCard className={cn('p-6 md:p-8', className)}>
      {status === 'success' ? (
        <SuccessMessage onReset={reset} />
      ) : (
        <form noValidate onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
          <h3 className="font-display text-2xl font-semibold sm:col-span-2">Send me a message</h3>

          <FormField
            label="Name"
            name="name"
            autoComplete="name"
            maxLength={CONTACT_LIMITS.name}
            value={values.name}
            onChange={handleChange}
            error={errors.name}
            required
          />
          <FormField
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={CONTACT_LIMITS.email}
            value={values.email}
            onChange={handleChange}
            error={errors.email}
            required
          />
          <PhoneField
            country={values.country}
            phone={values.phone}
            error={errors.phone}
            onChange={handleChange}
            className="sm:col-span-2"
          />
          <FormField
            label="Message"
            name="message"
            multiline
            rows={5}
            maxLength={CONTACT_LIMITS.messageMax}
            placeholder="Tell me about your role or project…"
            value={values.message}
            onChange={handleChange}
            error={errors.message}
            className="sm:col-span-2"
            required
          />

          {/* Honeypot for bots: hidden from people and screen readers. */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            value={values.website}
            onChange={handleChange}
            className="pointer-events-none absolute left-0 top-0 h-0 w-0 opacity-0"
          />

          <div className="flex flex-col items-start gap-4 sm:col-span-2 sm:flex-row sm:items-center">
            <Button type="submit" icon={ArrowUpRightIcon} disabled={isSubmitting} className="disabled:opacity-60">
              {isSubmitting ? 'Sending…' : 'Send message'}
            </Button>
            {serverError && (
              <p role="alert" className="text-sm text-red-500">
                {serverError}
              </p>
            )}
          </div>
        </form>
      )}
    </SpotlightCard>
  );
}
