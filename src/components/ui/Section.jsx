import { cn } from '../../utils/cn';

export default function Section({ id, className, children }) {
  return (
    <section id={id} className={cn('relative py-24 md:py-32', className)}>
      {children}
    </section>
  );
}
