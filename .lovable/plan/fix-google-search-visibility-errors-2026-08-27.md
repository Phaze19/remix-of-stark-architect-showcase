# Fix Google Search visibility errors

## What I found (verified now)

- No Google Search Console account is connected to this project or your workspace, so **there is currently no Search Console data at all** — no reported crawl, sitemap, or indexing errors are visible to me. This absence is not proof the site isn't indexed; it just means I have no evidence yet.
- Your sitemap and robots.txt point to `https://www.rationalengineers.com/`, but the site is published at `https://rationalengineers.lovable.app`. No `<loc>` in the sitemap belongs to the live published origin, so Google cannot use this sitemap for the published site — this is a real, concrete error to fix.
- No `google-site-verification` meta tag exists in `index.html`, so the published site is not verified for Search Console.
- Title and meta description are present and app-specific (good).

## Plan

1. Connect a Google Search Console account (I'll open the connection card; you pick or authorize your Google account).
2. Get a meta-tag verification token for the published origin and add it to `index.html`'s `<head>`.
3. Correct `public/sitemap.xml` and the `Sitemap:` line in `public/robots.txt` so they list URLs on the live published origin (`https://rationalengineers.lovable.app`). If you plan to launch on `www.rationalengineers.com` soon, tell me and I'll target that domain instead so we only do this once.
4. Publish so the verification tag and corrected sitemap go live.
5. Verify the property with Google, add it to your Search Console property list, and submit the sitemap.
6. Read back the real Search Console state: homepage indexing/canonical status and any errors Google actually reports, and report the exact findings.

## Technical notes

- Files touched: `index.html` (verification meta), `public/sitemap.xml`, `public/robots.txt`.
- Verification uses the META method on the root URL-prefix property; no DNS changes needed.
- Sitemap URLs must match the origin of the property being verified, otherwise Search Console rejects or ignores them.
