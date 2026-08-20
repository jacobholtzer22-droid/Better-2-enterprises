# Design Plan — Better 2 Enterprises

Two-pass process per the build brief: brainstorm → critique → revised system.
The revised system (Pass 2) is binding for all component work.

---

## Pass 1 — First concept (brainstorm)

Ran the design-system generator against "concrete contractor / industrial /
commercial municipal trust." It returned the statistically-likely answer:

- Slate/industrial grey palette (`#64748B` primary) + **safety orange** accent (`#EA580C`)
- Lexend / Source Sans 3 type pairing
- "Exaggerated minimalism" with oversized display type
- Hero-first landing with client logos and video

First-instinct layout: dark hero, big headline, three-card "why choose us"
row, services grid, testimonials band, CTA. Accent on survey-stake orange
(one of the two accents offered by the brief).

## Critique of Pass 1

1. **It is the default contractor site.** Grey + orange + big hero + icon row
   is precisely the template the brief orders thrown out. The generator
   confirmed the trap rather than the answer.
2. **Orange is the wrong accent for this client.** The brief's "do not build"
   list names "an orange or safety-yellow accent" as the tell. Of the two
   accents offered (survey-stake orange / chalk-line blue), orange converges
   with the default; **chalk-line blue** diverges from it while staying
   trade-authentic — it is literally the blue chalk snapped on formwork to
   set lines before a cut or pour. Precision, not decoration.
3. **The generic palette is neutral-UI grey.** Cured concrete is not
   `slate-500`. It's slightly cool with a green cast in the mid-tones. The
   palette should come from the material, not from Tailwind defaults.
4. **A hero image is assumed — we may have zero photos.** The photo source
   directory is currently empty. The design must be *typographic and
   structural first*, so it looks intentional with zero-to-five photos and
   gets better (not dependent) when real photos land.
5. **The most credible element was an afterthought.** The permit record is
   the single strongest conversion asset for the primary audience (facilities
   directors, GCs). Pass 1 buried it. Pass 2 designs the site *around* it.
6. **Lexend is fine but characterless** for a display face. The brief asks
   for a condensed industrial face "with real character."

## Pass 2 — Final system (binding)

### Concept: **"Formwork"**

The page is structured the way a slab is: a visible line system (control
joints) divides sections at deliberate intervals; content sits inside the
grid like pours inside formwork; one chalk-line blue accent appears only
where a decision is being marked (links, CTAs, active states, the snapped
hero rule). Boldness is spent on the joint grid and the display type;
everything else stays quiet and load-bearing.

### Palette — 6 named values, CSS custom properties, used nowhere else

| Token | Hex | Role | Derivation |
|---|---|---|---|
| `--slab` | `#EEEFEB` | Page base (light) | Cured slab in overcast light — warm-grey with the faintest green cast |
| `--form` | `#DFE2DC` | Alt surfaces, cards, table stripes | Freshly stripped formed face, one step darker |
| `--joint` | `#C2C7BF` | Hairline rules, borders, saw-cut ticks | The shadow line of a control joint |
| `--aggregate` | `#545D56` | Secondary text, captions, meta | Exposed-aggregate green-grey mid-tone |
| `--ink` | `#161D24` | Primary text, structural dark sections | Near-black structural navy — institutional weight |
| `--chalk` | `#3240C0` | Single accent: links, CTAs, marks | Snap-line chalk blue — saturated with a violet cast, like the actual pigment (tuned per client feedback from an earlier corporate `#1E5FA8`) |

Contrast (computed):
- `--ink` on `--slab` ≈ 13.9:1 ✓ (body)
- `--aggregate` on `--slab` ≈ 5.9:1 ✓ (secondary text)
- `--chalk` on `--slab` = 6.91:1 ✓ (links)
- `#FFFFFF` on `--chalk` = 7.98:1 ✓ (button text)
- `--slab` on `--ink` ≈ 13.9:1 ✓ (dark sections)
- `--chalk` on `--ink` = 2.13:1 ✗ — chalk is NEVER used as text or UI color
  on dark sections; a `color-mix()` lightened derivative (`--chalk-lift`,
  not a 7th named hex) handles rules/underlines there.

### Weight directive (client feedback, binding)

The light "printed drawing" direction must not drift architecture-firm
delicate. This is a concrete sub bidding municipal work: display type set
heavy (700–800), structural rules that read as cuts rather than hairline
decoration where sections carry weight, generous but disciplined spacing.
Confident, not precious. If a section starts feeling airy for its own sake,
add weight.

Rule: components reference tokens only (Tailwind theme maps to the CSS
custom properties). No raw hex in components.

### Typography — three faces, all self-hosted via next/font (zero third-party requests)

| Role | Face | Why |
|---|---|---|
| Display | **Big Shoulders Display** (condensed grotesque, variable weight) | Condensed industrial with genuine character — drawn for the "City of Big Shoulders" tradition of American industry. Used for H1/H2 and large numerals. Never below 20px. |
| Body | **Source Sans 3** (humanist sans, variable) | Designed for legibility at UI sizes; holds up at 16px on a phone in sunlight. 16px base / 1.6 line-height. |
| Utility | **IBM Plex Mono** | Project record table, permit years, phone numbers, section station-markers. Tabular by nature — columns of years and addresses align. |

Loading: `next/font/google` (self-hosts at build — static font files served
from our origin, `font-display: swap`, no render-blocking third-party
request). Explicit fallback stacks on every face.

### Signature element — the control-joint grid

- Sections meet on **visible hairline rules** (`--joint`, 1px) that run the
  full viewport width — the page reads as a surveyed slab, not a stack of
  cards.
- At rule intersections and section corners: small **saw-cut ticks** (short
  perpendicular 1px marks), the way joints cross in real flatwork.
- Every section carries a **mono station-marker** label (`01 — SCOPE OF
  WORK` style) in `--aggregate`, echoing survey stationing.
- The **project record table is the centerpiece**: full-width tabular
  treatment, mono year column, scope in body face, category tag
  (Municipal / Commercial / Residential) as a small bordered chip, sourcing
  note in fine print beneath. It appears in preview on the home page and in
  full on /projects and /municipal-and-institutional.
- The hero is **typographic**: oversized Big Shoulders headline on `--slab`,
  with a single horizontal chalk-blue rule beneath it — the "snapped line."
  No hero photo dependency.

### Layout structure

- Max content width 72rem; mobile-first, checked at 390px before 1440px.
- Sticky mobile bottom bar: `tel:` call button + quote CTA (thumb-reachable).
- Header: wordmark set in Big Shoulders, quiet nav, phone number visible at
  desktop, hamburger → full-screen panel on mobile.
- Dark (`--ink`) sections used sparingly: final CTA band and footer, so the
  page stays light/printed-drawing in feel rather than "dark hero template."

### Motion (per ANIMATION spec)

- Load sequence < 900ms: H1 paints immediately (LCP, no animation); the
  chalk rule "snaps" in (scaleX transform), station markers and nav fade up.
- One shared `IntersectionObserver` hook (`useReveal`) — single observer
  instance; groups stagger 40–60ms; elements start `opacity:0;
  translateY(12px)`; nothing animates twice.
- Ambient hero layer: an extremely subtle drifting aggregate-grain texture
  (SVG feTurbulence noise, CSS transform drift, <5% visual weight), the only
  infinite animation. Killed by `prefers-reduced-motion`.
- Hover: 150ms ease-out, transform/opacity only.
- Count-ups on real figures only (years in business = computed from 2002;
  permitted projects = 7), rendering final value immediately under reduced
  motion.

### Imagery stance

- Zero real photos exist at Phase 0. The system above is designed to carry
  the site typographically. When photos land: processed via sharp to
  640/1280/1920 AVIF+WebP+JPEG, served through a static `<Picture>`
  component, honest alt text written from viewing each image.
- Generated imagery limited to: the aggregate grain ambient layer and any
  abstract joint-derived dividers. Nothing that could read as Better 2's
  work, crew, or equipment.

### Anti-patterns actively avoided

- No dark stock-photo hero, no icon-row "Why Choose Us," no diagonal
  dividers, no Poppins, no orange/safety-yellow accent, no star badges,
  no plural "testimonials" framing around one review, no fabricated
  anything.
