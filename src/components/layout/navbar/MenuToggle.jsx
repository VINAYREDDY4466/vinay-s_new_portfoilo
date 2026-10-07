import { cn } from '../../../utils/cn';

const LINE = 'absolute left-1/2 h-px w-5 -translate-x-1/2 bg-fg transition-all duration-300';

export default function MenuToggle({ isOpen, onToggle, controlsId }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-controls={controlsId}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      className="relative h-11 w-11 rounded-full border border-fg/10 bg-fg/[0.04] backdrop-blur md:hidden"
    >
      <span className={cn(LINE, isOpen ? 'top-1/2 rotate-45' : 'top-[18px]')} />
      <span className={cn(LINE, isOpen ? 'top-1/2 -rotate-45' : 'top-[25px]')} />
    </button>
  );
}
