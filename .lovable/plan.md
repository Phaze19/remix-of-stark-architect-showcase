# Global Footprint Map on the Homepage

The footprint content from your infographic already lives on the homepage as a coded section — it just lacks the world map. This plan adds the map visual so the section matches the reference.

## What gets added

- A grey world map with red/black location pins for:
  - India (Thane HQ + domestic plants) — red manufacturing pin
  - Dubai (REL Metal Trading Co) — black global-presence pin
  - Germany (European warehousing) — black global-presence pin
- Dashed connector lines from labels to their pins, drawn on scroll (same reveal feel as the rest of the site).
- Pins drop in with a soft pulse ring; hovering a pin highlights the matching numbered location card, and hovering a card highlights its pin.
- A small legend: red pin = Manufacturing Footprints, black pin = Global Presence.
- Layout: map on the left, the existing numbered 01–04 location list on the right (stacks vertically on mobile, map first).
- The "Global Footprint at a Glance" strip with the six stats stays as-is below.

## Responsiveness and accessibility

- Map scales fluidly via SVG; labels shrink and reposition on tablet, and on mobile the connector labels are hidden so only pins and the card list show.
- Motion respects reduced-motion preferences: pins and lines appear without animation.
- Map has an accessible description; pins are focusable with keyboard.

## Technical notes

- Update `src/components/GlobalFootprint.tsx` only; no change to `src/pages/Index.tsx` ordering (section stays where it is today).
- New `src/components/footprint/WorldMap.tsx` holding a lightweight inline SVG world silhouette (viewBox-based, no map library, no extra dependency) plus pin/label markup driven by a coordinate array.
- Animation via existing `framer-motion` (`whileInView`) and `useReducedMotion`, consistent with `CopperLine2D`.
- Colors use existing semantic tokens (`primary` red, `foreground` black, `muted` map fill) — no hardcoded hex.
- Your uploaded infographic is used as design reference only, not embedded as an image.
