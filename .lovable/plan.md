# Browser tab title → "Rational Engineers"

The browser tab text comes from two sources, and both need updating so the tab shows **"Rational Engineers"** instead of the current "Copper CTC Wires & Transformer Conductors | Rational Engineers".

## What changes

**1. `index.html` (line 6)** — the static `<title>` shown the instant the tab opens, before React loads.
- `<title>` → `Rational Engineers`
- For consistency, also update the matching `og:title` (line 23) and `twitter:title` (line 24) to `Rational Engineers`.

**2. `src/pages/Index.tsx` (line 41)** — the `<Helmet>` title React swaps in once the homepage renders (this is the text you actually see on the loaded tab).
- `<title>` → `Rational Engineers`
- Also update `og:title` (line 47) and `twitter:title` (line 55) to `Rational Engineers` so social shares stay consistent.

## Notes

- The `meta name="description"` and `og:description` are left as-is — they describe the business and help SEO; they do not appear on the tab.
- Other pages (About, Products, Contact, etc.) already set their own `<Helmet>` titles, so the homepage change will not affect them.
- After this change, social-preview crawlers that only read the static `index.html` will also see "Rational Engineers" as the title.

## Not touched
No other files. No description, canonical, or JSON-LD changes.
