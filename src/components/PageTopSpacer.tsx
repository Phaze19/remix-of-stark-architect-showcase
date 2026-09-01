/**
 * Reserves exactly the height of the fixed site header (published by
 * Navigation as the `--nav-h` CSS variable) so page content is never
 * hidden behind it. Falls back to a safe value before measurement lands.
 */
const PageTopSpacer = () => (
  <div aria-hidden="true" style={{ height: "var(--nav-h, 12rem)" }} />
);

export default PageTopSpacer;
