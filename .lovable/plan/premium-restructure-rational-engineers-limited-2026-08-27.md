# Premium Restructure — Rational Engineers Limited

Reorganise the existing site into an international B2B engineering narrative. No rebuild: existing components, images, product data and brand identity are preserved and refined. No new facts are invented.

## New homepage sequence

```text
01  HERO                      who we are / what we make / CTAs
02  COMPANY AT A GLANCE       credibility metrics, count-up on scroll
03  PRODUCTS                  premium product cards + Explore All Products
04  TRUSTED BY LEADERS        existing client logo wall
05  APPLICATIONS              existing industrial applications grid
06  QUALITY & TESTING         reframed from current "Our Process" panel
07  OUR HISTORY               company milestones timeline
08  OUR GLOBAL FOOTPRINT      world map + locations + markets
09  RESPONSIBLE MANUFACTURING sustainability panel, de-greened
10  ASSOCIATED COMPANIES      REL METALS TRADING LLC, UAE
11  TESTIMONIALS              kept as-is (all three)
12  FINAL B2B ENQUIRY         full enquiry form + direct contact
13  FOOTER                    four-column, information-rich
```

Manufacturing Process section is deliberately skipped for now (stages and factory photos to be supplied later). Quality & Testing carries the "we actually manufacture" message in the meantime.

## Section-by-section changes

**Hero** — keep the industrial copper visual, "Empowering Transformation" headline and 1989 line. Replace the CTAs with the requested pair: primary **Explore Products**, secondary **Enquire Now** (opens the existing quote dialog). Move the stat rail out of the hero into its own section so the hero stays clean.

**Company at a Glance (new section)** — large stat cards built from figures already on the site: 35+ years of manufacturing, 33,000 MT annual capacity, 40+ OEM partners, 300+ OEM clients served, 99.9% copper purity, ISO 9001:2015 certified. Numbers animate up when they enter the viewport.

**Products** — moved above Trust Signals. Existing `ProductShowcase` cards keep their images, names, descriptions and specs; refined hover interaction (image scale, red rule) and a single **Explore All Products →** CTA. Brochure download button stays.

**Trusted by Leaders** — existing logo wall, retitled, with restrained motion only.

**Quality & Testing** — the current "Our Process / Why Our Products Perform Differently" content is reframed as Quality & Testing: controlled copper sourcing, in-house insulation and coating, multi-stage quality checks (incoming, in-process, final), application-specific customisation, plus the existing ISO 9001:2015 (active) and ISO 14001:2015 (in progress) certification cards. Technical typographic treatment, no new test claims.

**Our History** — moved after Quality. Existing milestones only (1989 founding, 2006, 2018, 2020 Gemini Instratech, 2022 Skylink Aero, 2024 HMTD, 2025 Vadodara greenfield), presented as a refined timeline with scroll reveal and active/hover states.

**Global Footprint** — existing world map and location cards, retitled "Our Global Footprint", with a verified-only positioning line. UAE keeps prominence via the REL Metals entry.

**Responsible Manufacturing** — existing sustainability panel retained and reframed: title "Responsible Manufacturing", generic sprout photograph replaced with a factual, restrained layout (no eco stock imagery). Same five verified initiatives.

**Associated Companies (new, dedicated)** — split out of the current combined sustainability/group block. Lists REL METALS TRADING LLC, UAE as a group trading entity with a neutral, verified description and a **Visit REL Metals Trading →** action. No external URL is available yet, so the action links to the existing contact route until you provide one; it will open in a new tab once a URL exists.

**Final B2B enquiry (new section)** — full-width enquiry block, headline "Let's Build the Right Solution for Your Requirement." Fields: Name, Company, Country, Email, Phone, Product/Requirement, Message. Submits through the existing quote-submission backend. Alongside it: Thane HQ address, +91 91686 43114, info@rationalengineers.com, LinkedIn.

**Footer** — rebuilt as four columns (Company / Products / Global / Connect) using existing routes and product categories, plus verified HQ address, phone, email, LinkedIn, copyright and Privacy Policy and Terms links. The placeholder phone and "Industrial Area, Gujarat" are replaced with the real Thane details.

**Navigation** — simplified to Home, About, Products, Quality, Global Presence, Sustainability, Contact, with a prominent **Enquire Now** button. Manufacturing is added later with that section. Sticky header, transparent over the hero and solid once scrolled, clean mobile hamburger. Existing About dropdown (Overview, Journey, Leadership, CSR) is kept.

**Removed from homepage** — the LME market ticker and MarketPulse pricing widget, which read as a commodity feed rather than a manufacturer's story. Say the word and they stay.

## Design and motion

Signal red on white, existing Space Grotesk / DM Sans typography, structured grids, generous whitespace, thin rules instead of heavy cards, minimal glass and gradient. Motion limited to hero entrance, stat count-up, card hover, timeline reveal, map animation and CTA micro-interactions, all gated on `prefers-reduced-motion`.

## Technical notes

- New components: `CompanyAtAGlance.tsx`, `QualityTesting.tsx`, `HistoryTimeline.tsx`, `GroupCompanies.tsx`, `EnquiryCTA.tsx`; `Index.tsx` reordered.
- Refactors: `Hero`, `Navigation`, `Footer`, `TrustSignals`, `ProductShowcase` (presentation only), `SustainabilityGroup` split.
- `Differentiation.tsx` content migrates into `QualityTesting.tsx`; timeline data is reused from `FounderJourney` via a shared milestones module so both pages stay in sync.
- Enquiry form reuses the `QuoteDialog` submission path; no schema change.
- Responsive verification at 1920, 1440, 1366, tablet and mobile widths via a browser pass, with mobile-specific stacking for stats, timeline and map.

## Not touched

Product data and images, About / Leadership / CSR / Certifications / Work / Blog / Contact page content, brand logo, analytics, SEO metadata (extended only for new anchors).
