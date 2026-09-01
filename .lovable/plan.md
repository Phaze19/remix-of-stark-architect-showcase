# Fix header overlapping page content

## The problem

The main header is fixed to the top of the window (it floats above the page so it stays visible). The multi-tier header — logo band, contact strip, then the menu row — is roughly 200px tall on large screens, but the inner pages reserve only 128px (`pt-32`) of space beneath it. So the top of each page's content sits under the header and is hidden.

Confirmed in the code:
- `Navigation.tsx` is `fixed top-0` with a logo that scales up to `h-28` plus vertical padding and a second menu tier.
- `About.tsx`, `Leadership.tsx`, `CSR.tsx` reserve `pt-32 md:pt-40`.
- `Certifications.tsx` and `Contact.tsx` reserve `pt-32`.
- The homepage does not have this bug because the hero reserves `pt-48 / md:pt-60 / lg:pt-64`.

So this is a fixed, hard-coded spacing number that is smaller than the real header — and it will drift again whenever the header changes.

## The fix

Stop guessing the number. Measure the header once at runtime and let every page reserve exactly that much space.

1. In the header component, measure its own rendered height and publish it as a CSS variable (`--nav-h`) on the document, updating on resize and when the mobile menu opens/closes.
2. Add a small shared `PageTopSpacer` (or a utility class) that reserves exactly `var(--nav-h)` with a sensible fallback for the first paint.
3. Apply it to the affected pages, replacing the hard-coded `pt-32 md:pt-40`:
   - About Us (`/about`)
   - Leadership (`/leadership`) — same About Us sub-nav, same bug
   - CSR (`/csr`) — same
   - Certifications (`/certifications`)
   - Contact (`/contact`)
4. Also fix the other pages carrying the same `pt-32` so the problem does not resurface: Work, Blog, Blog post, 404.
5. Leave the homepage hero untouched — its full-bleed background is designed to sit behind the header.

## Verification

Load each page at desktop, tablet and mobile widths and confirm the first heading/breadcrumb row is fully visible directly below the header, with no clipped text and no oversized gap.

## Technical notes

- `ResizeObserver` on the nav element writes `--nav-h` to `document.documentElement`; cleanup on unmount.
- Fallback padding via `padding-top: var(--nav-h, 12rem)` so there is no jump before the measurement lands.
- The header's scroll-away transform does not change layout, so content spacing stays stable while scrolling.
