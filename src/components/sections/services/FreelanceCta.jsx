import { ArrowUpRightIcon } from '../../../icons';
import AvailabilityBadge from '../../ui/AvailabilityBadge';
import Button from '../../ui/Button';
import Reveal from '../../ui/Reveal';

export default function FreelanceCta() {
  return (
    <Reveal className="relative isolate mt-16 overflow-hidden rounded-[2rem] border border-fg/10 p-8 shadow-card dark:shadow-none md:p-14">
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/15 via-surface to-secondary/10" />
      <div aria-hidden className="absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-secondary/20 blur-[100px]" />

      <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <AvailabilityBadge />
          <h3 className="mt-6 font-display text-display-md font-bold">
            Have an idea? Let's turn it into a product people love.
          </h3>
          <p className="mt-4 text-muted">
            Clear communication, transparent pricing and on-time delivery — from MVPs to production-scale apps.
          </p>
        </div>
        <Button href="#contact" icon={ArrowUpRightIcon} className="shrink-0">
          Start a project
        </Button>
      </div>
    </Reveal>
  );
}
