# Navigation Contrast & Spacing Cleanup

## What I found (verified at 375 / 768 / 1280 px)

- **Desktop (1280px):** clean. Logo, six links, and the red Request Quote button fit with good contrast (dark grey links and white-on-red button on an opaque white bar).
- **Tablet (768px):** broken. The desktop menu switches on at 768px but there is no room: the logo is squeezed to a sliver, "WHY LEADERS CHOOSE US" and "QUALITY SYSTEMS" wrap onto 3 lines, and the red button overlaps the CONTACT link — hurting both legibility and contrast (red button sitting under dark text).
- **Mobile (375px):** acceptable. Logo plus hamburger, but the hamburger is a plain `☰` glyph in muted grey with no accessible label, and the bar is taller than needed.
- Bar height is 122–138px, which is heavy relative to the content.

## Changes

1. **Move the desktop breakpoint up to `lg`** — hamburger menu is used for mobile and tablet, desktop links/CTA appear only from 1024px. This removes the 768px collision entirely.
2. **Prevent link wrapping** — add `whitespace-nowrap` to nav links and tighten spacing to `gap-6` at `lg` and `gap-10` at `xl` so all six links plus the CTA breathe without crowding.
3. **Protect the logo** — give the logo link `shrink-0` and scale it responsively (`h-16` mobile, `h-20` tablet, `h-24` desktop) so it never compresses and the bar gets shorter and cleaner.
4. **Refine padding** — consistent `px-4 md:px-6 lg:px-8` with `py-2 lg:py-3`, giving an even, tighter bar.
5. **Contrast fixes** — bump inactive link colour from `text-muted-foreground` to `text-foreground/70` (higher contrast on white, still clearly secondary), and keep the red hover. Slightly reduce CTA padding (`px-5 py-2.5`) so it reads as a button, not a block.
6. **Mobile toggle polish** — replace the text glyphs with lucide `Menu`/`X` icons, add `aria-label` and `aria-expanded`, and use the foreground colour for contrast.
7. **Mobile menu spacing** — tighter `py-4`, `space-y-3`, per-link tap padding, and full-width Request Quote button inside the mobile menu (currently the CTA is unreachable on mobile).

## Technical notes

Single file: `src/components/Navigation.tsx`. No colour tokens change — all colours stay on existing semantic tokens (`background`, `foreground`, `rational-red`). No changes to the CopperTicker offset (`top-8`) or the red bottom border. After the edit I'll re-screenshot at 375 / 768 / 1024 / 1280 to confirm no wrapping or overlap remains.
