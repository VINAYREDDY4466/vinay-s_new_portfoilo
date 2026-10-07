import { forwardRef } from 'react';
import { getSafeUrl, isExternalUrl } from '../../utils/url';

/** Anchor that renders nothing for unsafe/empty URLs and opens external links securely. */
const SmartLink = forwardRef(function SmartLink({ href, children, ...rest }, ref) {
  const safeHref = getSafeUrl(href);
  if (!safeHref) return null;

  const externalProps = isExternalUrl(safeHref) ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <a ref={ref} href={safeHref} {...externalProps} {...rest}>
      {children}
    </a>
  );
});

export default SmartLink;
