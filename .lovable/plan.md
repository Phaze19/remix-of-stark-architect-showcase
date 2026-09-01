# Contact page: real form + direct WhatsApp/Email contact

The `/contact` page currently has a fake form (a `setTimeout` that saves nothing) and a stale product list of 7 invented names. Fix it so visitors can actually reach you, and give them a fast direct path alongside the form.

## What changes

### 1. Wire the Contact form to the real database
File: `src/pages/Contact.tsx`

- Replace the fake `setTimeout` submission with a real `supabase.from("quote_requests").insert(...)` call, mirroring the pattern already used in `QuoteDialog.tsx` and `EnquiryCTA.tsx`.
- Add `zod` validation (name, email, message required; length limits matching the table's RLS check constraints).
- Show a success toast on insert, or a destructive toast with "email us directly at info@rationalengineers.com" on failure.
- Keep the existing layout (contact info column + form column) so the page doesn't need a redesign.

### 2. Update the product dropdown to the 12 real products
File: `src/pages/Contact.tsx`

Replace the `productTypes` array with the actual catalogue titles:
- CONTINUOUSLY TRANSPOSED CONDUCTOR (CTC)
- BARE CABLE
- INSULATED CABLE
- ENAMELLED COPPER — ROUND & RECTANGLE
- ENAMELLED ALUMINIUM — ROUND & RECTANGLE
- PAPER INSULATED COPPER CONDUCTOR (PICC)
- MICA INSULATED COPPER CONDUCTOR
- POLYIMIDE / KAPTON INSULATED COPPER
- FIBER GLASS INSULATED COPPER & ALUMINIUM
- HIGH FREQUENCY COPPER LITZ WIRES & CABLES
- HIGH FREQUENCY ALUMINIUM LITZ WIRES & CABLES
- BARE / TIN COATED BUSBAR
- (keep "Custom Product" as a final option)

### 3. Add a "direct contact" rail with WhatsApp + Email buttons
File: `src/pages/Contact.tsx`

Above the form, add two prominent buttons so a visitor can bypass the form entirely and reach you instantly:
- **WhatsApp** — `https://wa.me/919168643114?text=...` with a pre-filled message ("I'd like a quote for [product] — required quantity: ..."). Opens chat with +91 91686 43114.
- **Email us directly** — `mailto:info@rationalengineers.com?subject=...&body=...` with a pre-filled subject ("Quote request — [product]") and body template (product, quantity, specs fields).

Both use the brand's red accent button style (`bg-rational-red`) consistent with `EnquiryCTA.tsx`. The WhatsApp number and email both already appear elsewhere on the site, so this is consistent.

### 4. Fix the incomplete hero heading
File: `src/pages/Contact.tsx`

The hero currently reads "Copper Solutions for" with no continuation — it was cut off. Complete it to "Copper Solutions for Power & Industry" (or a similar on-brand phrase).

## Not touched
- No email infrastructure setup (no sender domain, no edge function). Direct WhatsApp + mailto cover immediate contact; form submissions land in the database. Email alerts can be added later as a separate task if you want automatic team notifications.
- No changes to `QuoteDialog.tsx`, `EnquiryCTA.tsx`, or the homepage.
- No database schema changes — the `quote_requests` table and RLS already support inserts from anon.

## Why WhatsApp + Email directly
Your buyers are mostly in India where WhatsApp is the default B2B channel. A click-to-chat button with a pre-filled product + quantity message lets a serious buyer reach your sales team in one tap, with zero form friction and no infrastructure to maintain. The form stays for visitors who prefer it.
