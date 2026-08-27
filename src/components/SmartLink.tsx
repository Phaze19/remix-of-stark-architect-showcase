import { forwardRef } from "react";
import { Link } from "react-router-dom";

type SmartLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

/**
 * Uses client-side routing for internal page routes (so navigation is instant)
 * and falls back to a plain anchor for hash / external / mail / tel links.
 */
const SmartLink = forwardRef<HTMLAnchorElement, SmartLinkProps>(
  ({ href, children, ...rest }, ref) => {
    const isInternalRoute = href.startsWith("/") && !href.startsWith("/#");

    if (isInternalRoute) {
      return (
        <Link ref={ref} to={href} {...rest}>
          {children}
        </Link>
      );
    }

    return (
      <a ref={ref} href={href} {...rest}>
        {children}
      </a>
    );
  }
);

SmartLink.displayName = "SmartLink";

export default SmartLink;
