# Photo provenance and swap plan

## Current state: licensed stock photography (interim)

Jacob authorized stock photos to build out the pages until Steve's real job
photos arrive. All are **Pexels License** (free commercial use, no
attribution required). They are ILLUSTRATIVE ONLY and are handled under
these rules:

- Never on `/projects` — that page is the verified permit record and carries
  no photography until real Better 2 photos exist.
- Never captioned, and alt text never attributes the work to Better 2 or
  names a location.
- No identifiable branding/logos in any used photo.

| File in `public/images/source/` | Pexels ID | Shows | Used on |
|---|---|---|---|
| stock-driveway-pour.jpg | 33405139 | Crew screeding a residential driveway pour behind a mixer truck | Home band |
| stock-power-screed.jpg | 37121405 | Power screed leveling a fresh slab along a curb form | Commercial |
| stock-curb-form.jpg | 4134382 | Concrete placed in curb-and-gutter formwork | Commercial |
| stock-spreading-concrete.jpg | 19913288 | Worker spreading wet concrete over wire mesh | Municipal |
| stock-footing-pour.jpg | 26107204 | Concrete placed into a formed footing, rebar staged | Residential |
| stock-driveway-home.jpg | 3935333 | Two-car concrete driveway at a suburban home | Residential |
| stock-driveway-home-2.jpg | 4258279 | Wide concrete driveway at a two-story house | Service areas |
| stock-mesh-macro.jpg | 37475275 | Welded wire reinforcement mesh close-up | Residential |

Source URL pattern: `https://www.pexels.com/photo/<ID>/`

## When Steve's real photos arrive

1. Drop originals in `public/images/source/` (no `stock-` prefix; HEIC gets
   converted first — see the pipeline notes in scripts/process-images.mjs).
2. Run `npm run images`.
3. Replace the `images.*` entries in `site.config.ts` role by role, writing
   alt text from what the photo actually shows.
4. Delete the `stock-*` files the real photos replace.
5. Real photos MAY carry captions and locations (when known) and MAY appear
   on `/projects` — they are the only photos allowed to.
