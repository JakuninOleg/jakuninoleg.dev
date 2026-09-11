---
name: ilyadotgr-style-portfolio
description: >-
  Build developer portfolio sites in the ilyadotgr interaction language:
  full-viewport dark hero, dual-layer mascot flashlight reveal on pointer,
  ambient color glows, floating glass cards, oklch tokens, Onest-like type.
  Use when redesigning Oleg's portfolio or matching ilyadotgr.ru quality.
---

# ilyadotgr-style portfolio

## Visual thesis

Dark product-engineer stage: charcoal-blue `oklch` canvas, cyan primary, pink/purple secondary, yellow focus marks. Hero is a composed scene — copy left, interactive mascot right, floating identity/focus cards — not a gradient poster.

## Hero interaction (required)

1. **Two stacked mascot PNGs** (base + reveal), same framing, transparent cutouts.
2. On `pointermove` over the hero (fine pointer only), lerp a radial `mask-image` on the reveal layer:
   - `radial-gradient(circle ${radius}px at ${x}px ${y}px, black 0%, black 42%, rgba(0,0,0,0.68) 60%, rgba(0,0,0,0.2) 78%, transparent 100%)`
   - lerp factor ~0.12 desktop, ~0.18 coarse/auto
   - radius ~30% of mascot width, capped ~240px
3. Coarse/touch: idle orbit with `sin/cos` instead of pointer.
4. `prefers-reduced-motion`: static mask at ~52% 42%, no rAF loop.
5. Pause rAF when hero leaves viewport or document is hidden.
6. Soft `mascot-glow` radial blobs behind the character (cyan/yellow/pink).

## Layout grammar

- `min-height: 100svh` hero with faint grid + atmospheric radials
- Giant watermark word (`DEVELOPER`) behind content
- Left: role chip, H1, lead, dual CTAs (solid cyan + outlined purple)
- Right column overlays: identity/social stack + "focus" checklist card
- Circular menu control top-left; scroll-step control bottom-center (optional)

## Motion

- Prefer GSAP + `@gsap/react` `useGSAP` for entrance choreography
- CSS for hover/focus only
- Respect reduced motion

## Do not

- Copy ilyadotgr assets, identity, or copy verbatim
- Ship purple-on-white / cream-serif AI defaults
- Draw the mascot as SVG/CSS doodles — use authored PNG cutouts
