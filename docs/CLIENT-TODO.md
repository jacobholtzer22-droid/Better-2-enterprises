# CLIENT-TODO — Unconfirmed facts (do not publish until confirmed)

Every item below has a copy slot built and waiting. Nothing here appears on
the site until Steve confirms it — the page ships with the element omitted
rather than guessed.

| # | Item | Why it matters | Where it goes once confirmed |
|---|---|---|---|
| 1 | **License status + number, bonding, insurance certificate** | Public records show conflicting license status and a May 2026 expiration. A "Licensed & Insured" claim without a current certificate is a liability. | Trust strip on home + about page + footer. Five-minute fill once a current certificate is in hand: add a `credentials` block to `site.config.ts` `identity`. |
| 2 | **Street address public?** (7305 Dodge, Montrose) | Many contractors run from a home/yard and prefer service-area-only. Currently the site presents as service-area-only. | Flip `identity.address.public` to `true` in `site.config.ts` → footer NAP + contact page + `address` property in LocalBusiness schema. |
| 3 | **Business hours** | Get from the Google Business Profile — use exactly what the GBP shows. Currently omitted everywhere (no `openingHoursSpecification` in schema). | `identity.hours` in `site.config.ts` → contact page + schema. |
| 4 | **Email address** | No confirmed email. Form + phone are the only contact channels. | `identity.email` → contact page + footer + schema `email`. |
| 5 | **Named school districts / commercial clients** | Client says they do school district work; naming districts requires permission. Site currently says "public school districts" generically. | Municipal page — a named-clients line under the intro. |
| 6 | **Crew size, equipment, employee count** | Not stated anywhere; not confirmed. | About page, if Steve wants it. |
| 7 | **Any dollar figures / price ranges** | Never published without client sign-off. FAQ answers explain cost drivers and invite a quote instead. | Residential FAQ, if ever confirmed. |
| 8 | **Response-time expectation** ("we return calls within X") | Only if Steve commits to one. | Contact page intro. |
| 9 | **BBB profile URL + BuildZoom profile URL** | Needed for `sameAs` in LocalBusiness schema (real URLs only). | `identity.bbb.profileUrl` / `identity.buildZoomUrl` in `site.config.ts` → schema `sameAs`. |
| 10 | **Google Business Profile URL** | Jacob supplies after launch; redeploy adds it to `sameAs`. | `identity.googleBusinessProfileUrl` → schema. |
| 11 | **Final production domain** | `site.url` currently `https://www.better2enterprises.com` (assumed, not registered/confirmed). Canonicals, sitemap, and OG URLs derive from it. | `url` in `site.config.ts`. |
| 12 | **GBP phone matches (810) 397-5000?** | NAP consistency — must match the GBP character for character. | Confirm only; already sitewide. |
| 13 | **Real job-site photos** | `/public/images/source/` is EMPTY as of Phase 0. Site is designed to carry itself typographically, but real photos materially help the projects page. Use only photos the business uploaded/owns — NOT the 3 customer photos Michael Norris posted to the GBP. | Drop originals in `/public/images/source/`, run `npm run images`, add alt text per the inventory. |
| 14 | **Verified `businessSlug` for the quote form** | A wrong slug = HTTP 200 with no DB write; leads vanish silently. Currently `PENDING_SLUG_VERIFICATION` — production build is blocked on it. | `form.businessSlug` in `site.config.ts` (Phase 4 gate — Jacob verifies against the live Neon row). |
