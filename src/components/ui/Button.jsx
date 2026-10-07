import { cn } from '../../utils/cn';
import { getSafeUrl } from '../../utils/url';
import Magnetic from './Magnetic';
import SmartLink from './SmartLink';

const BASE =
  'group inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-semibold transition-[box-shadow,background-color,border-color,color] duration-300';

const VARIANTS = {
  primary: 'bg-primary-solid text-white hover:shadow-glow',
  ghost: 'border border-fg/15 text-fg hover:border-fg/40 hover:bg-fg/5',
};

export default function Button({ href, variant = 'primary', icon: Icon, children, className, ...rest }) {
  if (href !== undefined && !getSafeUrl(href)) return null;

  const classes = cn(BASE, VARIANTS[variant] ?? VARIANTS.primary, className);
  const content = (
    <>
      {children}
      {Icon && (
        <Icon
          aria-hidden
          className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      )}
    </>
  );

  return (
    <Magnetic>
      {href ? (
        <SmartLink href={href} className={classes} {...rest}>
          {content}
        </SmartLink>
      ) : (
        <button type="button" className={classes} {...rest}>
          {content}
        </button>
      )}
    </Magnetic>
  );
}
