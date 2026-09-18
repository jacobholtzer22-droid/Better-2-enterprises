/**
 * site.config.ts — single source of truth for ALL business content.
 *
 * Every string a human might want to change lives here. Components render
 * from this object and contain zero hardcoded business copy.
 *
 * FACT POLICY: everything in this file traces to the VERIFIED FACTS block of
 * the build brief (BBB, Genesee County permit records via BuildZoom, or the
 * client's Google Business Profile) or is service-description copy that makes
 * no factual claim. Unconfirmed facts are represented as `null` and listed in
 * docs/CLIENT-TODO.md — they must NOT be filled in without written client
 * confirmation.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ProjectCategory = 'municipal' | 'commercial' | 'residential'

/** Expanded detail for a project (client-provided project sheets). */
export interface ProjectDetails {
  owner: string
  location: string
  timeframe: string
  scope: string
  highlights: readonly string[]
  siteConditions?: string
}

export interface ProjectRecord {
  scope: string
  location: string
  city: string
  /** Numeric year for sorting. Multi-year projects use the end year. */
  year: number
  /** Display override for multi-year timeframes (e.g. "2024-26"). */
  yearLabel?: string
  category: ProjectCategory
  /** Present = the row is expandable and shows the full project sheet. */
  details?: ProjectDetails
}

export interface FaqItem {
  question: string
  answer: string
}

export interface ServiceItem {
  name: string
  description: string
}

export interface NavItem {
  label: string
  href: string
}

export interface CityInfo {
  name: string
  /** Short, unique context sentence. Only main markets get one. */
  blurb?: string
}

// ---------------------------------------------------------------------------
// Derived values
// ---------------------------------------------------------------------------

/**
 * Production URL — THE single place the domain lives. Canonicals, sitemap,
 * OG URLs, and the LocalBusiness schema @id all derive from `site.url`,
 * which reads this constant. Changing the domain is a one-line edit here.
 * PLACEHOLDER until Jacob confirms the registered domain (CLIENT-TODO #11).
 */
const PRODUCTION_URL = 'https://www.PUT_DOMAIN_HERE.com'

const FOUNDED = { year: 2002, month: 9, day: 23 } as const

/** Full years since incorporation (Sept 23, 2002), anniversary-accurate. */
export function yearsInBusiness(now: Date = new Date()): number {
  let years = now.getFullYear() - FOUNDED.year
  const anniversaryPassed =
    now.getMonth() + 1 > FOUNDED.month ||
    (now.getMonth() + 1 === FOUNDED.month && now.getDate() >= FOUNDED.day)
  if (!anniversaryPassed) years -= 1
  return years
}

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

export const site = {
  identity: {
    /** Trading name as shown on the Google Business Profile. Used in schema + headers. */
    name: 'Better 2 Enterprises',
    /** Legal name. Used once, in footer fine print. */
    legalName: 'Better 2 Enterprises Inc.',
    owner: 'Steve Hoadley',
    category: 'Concrete Contractor',
    foundingDate: '2002-09-23',
    phone: {
      display: '(810) 493-3521',
      e164: '+18104933521',
    },
    /**
     * Street address — UNCONFIRMED whether the client wants it public
     * (docs/CLIENT-TODO.md). While `public` is false the address renders
     * nowhere and is omitted from schema; the site presents as a
     * service-area business based in Montrose, MI.
     */
    address: {
      public: false as boolean,
      street: '7305 Dodge',
      city: 'Montrose',
      state: 'MI',
      zip: '48457',
    },
    homeBase: 'Montrose, Michigan',
    /** Confirmed email — none yet. Form + phone are the only contact channels. */
    email: null as string | null,
    /** Business hours — unconfirmed; omit openingHoursSpecification entirely. */
    hours: null as null,
    bbb: {
      accredited: true,
      accreditedSince: '2018-03-16',
      accreditedSinceDisplay: 'March 2018',
      rating: 'A+',
      profileUrl:
        'https://www.bbb.org/us/mi/montrose/profile/concrete-contractors/better-2-enterprises-0372-90032896',
    },
    buildZoomUrl: 'https://www.buildzoom.com/contractor/better-2-enterprises-inc',
    /** GBP URL — Jacob supplies after launch; then redeploy with sameAs. */
    googleBusinessProfileUrl: null as string | null,
  },

  /** Reads PRODUCTION_URL (top of file) — the only place the domain lives. */
  url: PRODUCTION_URL,

  // -------------------------------------------------------------------------
  // Contact form → Align & Acquire CRM
  // -------------------------------------------------------------------------
  form: {
    /** MUST be the www host. The bare apex 308-redirects and loses the POST. */
    endpoint: 'https://www.alignandacquire.com/api/contact',
    /**
     * GATE: do not guess this value. A wrong slug returns HTTP 200 with no
     * database write — leads vanish silently. Jacob verifies the slug against
     * the live Neon Business row and supplies it at the Phase 4 gate.
     */
    businessSlug: 'PENDING_SLUG_VERIFICATION',
    smsConsentLabel:
      'I agree to receive text messages from Better 2 Enterprises about my quote request. Message and data rates may apply. Reply STOP to opt out.',
    /** Minimum seconds between form mount and allowed submit (bot check). */
    minSubmitSeconds: 3,
  },

  // -------------------------------------------------------------------------
  // Navigation
  // -------------------------------------------------------------------------
  nav: [
    { label: 'Commercial', href: '/commercial-concrete' },
    { label: 'Municipal & Schools', href: '/municipal-and-institutional' },
    { label: 'Residential', href: '/residential-concrete' },
    { label: 'Projects', href: '/projects' },
    { label: 'About', href: '/about' },
    { label: 'Service Areas', href: '/service-areas' },
    { label: 'Contact', href: '/contact' },
  ] satisfies NavItem[],

  cta: {
    primary: { label: 'Request a Quote', href: '/contact' },
    call: { label: 'Call (810) 493-3521' },
  },

  // -------------------------------------------------------------------------
  // Project record (public record — Genesee County building permit filings)
  // -------------------------------------------------------------------------
  projects: {
    sourceNote:
      'Permit entries from Genesee County building permit filings. Detailed project descriptions provided by Better 2 Enterprises.',
    /**
     * Completed public works — client-provided project sheets (Sept 2026 PDF
     * from Steve). These carry full details and render as expandable rows.
     */
    publicWorks: [
      {
        scope: 'Campus sidewalk, curb, and stair concrete program',
        location: 'Mott Community College',
        city: 'Flint',
        year: 2026,
        category: 'municipal',
        details: {
          owner: 'Mott Community College',
          location: 'Main campus, 1401 E Court St, Flint, MI 48503',
          timeframe: 'May to August 2026',
          scope:
            'Concrete sidewalk, curb, pad, curb ramp openings, concrete stairs, and trip-hazard replacement and repair for ADA and campus safety before fall semester.',
          siteConditions: 'One-lane closure of Court Street required to complete the work.',
          highlights: [
            'Saw-cut, remove, and replace damaged sidewalks, curbs, pads, curb ramp openings, and walk-up steps',
            'Pour 5-inch, 4000 psi air-entrained concrete sidewalk on compacted aggregate with welded-wire reinforcement',
            'Repair MDOT-style concrete curb with reinforcing bars',
            'Finish with medium broom and tooled edges',
            'Correct trip hazards and restore damaged landscaping',
            'Barricade completed work on an occupied campus',
            'Maintain one-lane traffic control on Court Street during adjacent concrete work',
          ],
        },
      },
      {
        scope: 'City Hall sidewalk replacement, 5,625 square feet',
        location: 'Flint City Hall',
        city: 'Flint',
        year: 2026,
        category: 'municipal',
        details: {
          owner: 'City of Flint',
          location: 'Flint City Hall, 1101 S Saginaw St, Flint, MI 48502',
          timeframe: '2026',
          scope:
            'Remove and replace 5,625 square feet of deteriorated sidewalk at City Hall, including the "Back Forty" area behind Police and Fire.',
          highlights: [
            'Saw-cut and remove marked sidewalk squares',
            'Prepare grade and compact 23A sub-base',
            'Pour new 6-inch concrete sidewalk at the Back Forty',
            'Install expansion and control joints',
            'Broom-finish and edge the new walks',
            'Backfill, place topsoil, seed, fertilize, and restore lawn',
          ],
        },
      },
      {
        scope: 'Citywide seasonal speed hump program, about 175 units',
        location: 'Local streets',
        city: 'Flint',
        year: 2026,
        yearLabel: '2024-26',
        category: 'municipal',
        details: {
          owner: 'City of Flint, Department of Public Works',
          location: 'Local streets across the City of Flint, MI',
          timeframe: 'April through November, 2024 to 2026',
          scope:
            'Seasonal installation, maintenance, and removal of approximately 175 curb-to-curb speed humps on local roads.',
          highlights: [
            'Pick up city-owned speed hump sections from the city yard',
            'Install humps curb to curb with end caps, mid-sections, and lag bolts',
            'Set city-provided signs and posts where required',
            'Maintain units during the season, including loose bolts and service calls',
            'Remove humps in November and return them to the city yard',
          ],
        },
      },
      {
        scope: 'Campus flatwork at three Mott campuses',
        location: 'Mott Community College',
        city: 'Flint, Fenton, Lapeer',
        year: 2025,
        category: 'municipal',
        details: {
          owner: 'Mott Community College',
          location:
            'Main campus, 1401 E Court St, Flint, MI; Southern Lakes Branch Center, Fenton, MI; Lapeer Extension Center, Lapeer, MI',
          timeframe: 'May to September 2025',
          scope:
            'Concrete sidewalk, curb, pad, curb ramp openings, concrete stairs, and trip-hazard replacement and repair at Mott campuses in Flint, Fenton, and Lapeer.',
          highlights: [
            'Remove and replace sidewalk flags, pads and slabs, curbs, curb ramp openings, concrete stairs, and walk-up steps',
            'Pour 5-inch, 4000 psi air-entrained concrete sidewalk on compacted aggregate with welded-wire reinforcement',
            'Repair MDOT-style concrete curb with reinforcing bars',
            'Correct trip hazards',
            'Restore damaged landscaping and barricade completed work on an occupied campus',
          ],
        },
      },
      {
        scope: 'Clubhouse basement moisture control and building repairs',
        location: 'Mott Park Clubhouse',
        city: 'Flint',
        year: 2025,
        category: 'municipal',
        details: {
          owner: 'City of Flint',
          location: 'Mott Park Clubhouse, 2401 Nolen Dr, Flint, MI 48504',
          timeframe: '2025',
          scope:
            'Basement moisture control, mold remediation, ceiling and patio sealing, and mini-split installation at the Mott Park Clubhouse.',
          highlights: [
            'Inspect basement walls for cracks and water penetration',
            'Inspect and treat steel beams',
            'Repair cracks and holes in the ceiling',
            'Apply water-resistant sealant at the patio',
            'Install drip edge and flashing around the patio',
            'Inspect for mold, clean affected areas, and apply anti-mold, moisture-resistant paint',
            'Install an average of 4 inches of spray foam on the steel-deck ceiling',
            'Install a mini-split with required piping and electrical',
          ],
        },
      },
      {
        scope: "20' x 20' building addition and interior improvements",
        location: 'Krapohl Senior Center',
        city: 'Mount Morris',
        year: 2025,
        category: 'municipal',
        details: {
          owner: 'Charter Township of Mount Morris',
          location: 'Krapohl Senior Center, G-5447 Bicentennial Dr, Mount Morris, MI 48458',
          timeframe: 'June to December 2025',
          scope:
            "20' x 20' storage addition and interior and HVAC improvements at the senior center.",
          highlights: [
            "Build a 20' x 20' addition on the east side, including footings, concrete floor, entry, drywall, paint, electrical, heating, and lighting",
            'Install new ceiling tiles throughout the center, paint metal grids, and replace light covers',
            'Reconnect HVAC and install foam insulation at the rear office exterior walls',
            'Complete required site restoration and soil-erosion controls',
          ],
        },
      },
      {
        scope: '50/50 residential sidewalk replacement program',
        location: 'Residential streets',
        city: 'Flint',
        year: 2025,
        yearLabel: '2024-25',
        category: 'municipal',
        details: {
          owner: 'City of Flint',
          location: 'Residential sidewalks across the City of Flint, MI',
          timeframe: '2024 to 2025 construction seasons',
          scope:
            'Remove and replace residential concrete sidewalk under the City of Flint 50/50 program.',
          highlights: [
            'Remove failed sidewalk squares at participating residential properties',
            'Form, pour, and finish new 4-inch and 6-inch concrete sidewalk',
            'Install ADA ramps where required',
            'Replace sidewalk around trees where specified',
            'Restore work areas and leave squares ready for City inspection',
          ],
        },
      },
      {
        scope: 'Loading dock wall, dumpster pad, and stair reconstruction',
        location: 'Clio Area High School',
        city: 'Clio',
        year: 2024,
        category: 'municipal',
        details: {
          owner: 'Clio Area Schools',
          location: 'Clio Area High School, 1 Mustang Dr, Clio, MI 48420',
          timeframe: 'June 14 to 30, 2024',
          scope: 'Loading dock wall, dumpster pad, and interior stair reconstruction.',
          highlights: [
            'Demolition of existing paving, brick wall, stairs, and concrete wall at the dock',
            'New 12-inch-thick, 6-foot-tall reinforced concrete dock wall tied to the existing footing',
            'Form and pour reinforced concrete stairs to the existing profile',
            'New embed angle at the dock edge',
            "New 10' x 10' x 8-inch reinforced dumpster pad",
            'Remove and replace concrete in metal pan stairs and replace stair pans',
          ],
        },
      },
      {
        scope: 'District-wide concrete sidewalk replacement',
        location: 'District school sites',
        city: 'Yale',
        year: 2024,
        category: 'municipal',
        details: {
          owner: 'Yale Public Schools',
          location: 'Multiple school sites, Yale Public Schools, Yale, MI',
          timeframe: 'Summer 2024',
          scope:
            'Remove and replace approximately 1,851 square feet of concrete sidewalk at marked locations at district schools.',
          highlights: [
            'Remove existing marked sidewalk slabs',
            'Prepare base and haul off earth and debris',
            'Pour 6-inch concrete sidewalk reinforced with rebar and tied into existing walks',
            'Reseed and restore disturbed areas',
          ],
        },
      },
      {
        scope: 'Water treatment plant concrete repairs',
        location: 'Midland Water Treatment Plant',
        city: 'Midland',
        year: 2023,
        category: 'municipal',
        details: {
          owner: 'City of Midland',
          location: 'Midland Water Treatment Plant, 2125 Austin St, Midland, MI',
          timeframe: '2023',
          scope:
            'Exterior concrete repair and replacement at three locations: culvert headwall, east and west stairs, and outfall wing walls.',
          highlights: [
            'Saw-cut, demo, and replace the damaged culvert headwall; drill and epoxy #4 rebar; backfill with compacted MDOT Class II sand and restore slopes',
            'Repair east and west exterior stairs: replace abutment wall, patch spalls, add expansion joint, reinforce with epoxied #4 rebar, and refinish the existing handrail',
            'Remove timber outfall barrier walls and pour new frost-depth footings and cast-in-place concrete wing walls with rebar, expansion joints, and waterproofing',
            'Dispose of rubble and restore disturbed areas with topsoil, seed, and mulch',
          ],
        },
      },
    ] satisfies ProjectRecord[],
    records: [
      {
        scope: 'Concrete pad, sidewalk, and glass transit shelter',
        location: '3500 Flushing Rd',
        city: 'Flint',
        year: 2021,
        category: 'municipal',
      },
      {
        scope: 'Enclosed transit shelter',
        location: '3243 Mallery St',
        city: 'Flint',
        year: 2020,
        category: 'municipal',
      },
      {
        scope: "Foundation for 24' x 32' detached garage",
        location: '4024 E Atherton Rd',
        city: 'Burton',
        year: 2019,
        category: 'residential',
      },
      {
        scope: 'Inground pool demolition',
        location: '8384 Fenton Rd',
        city: 'Grand Blanc',
        year: 2019,
        category: 'residential',
      },
      {
        scope: 'Slab structure and sidewalks, transit shelter',
        location: '3515 Miller Rd',
        city: 'Flint',
        year: 2018,
        category: 'municipal',
      },
      {
        scope: 'Slab structure and sidewalk, transit shelter',
        location: '2469 S Linden Rd',
        city: 'Flint',
        year: 2018,
        category: 'municipal',
      },
      {
        scope: 'Slab structure and sidewalks, transit shelter',
        location: '1261 W Bristol Rd',
        city: 'Flint',
        year: 2018,
        category: 'municipal',
      },
    ] satisfies ProjectRecord[],
    categoryLabels: {
      // "Public" covers cities, townships, school districts, and colleges.
      municipal: 'Public',
      commercial: 'Commercial',
      residential: 'Residential',
    } as Record<ProjectCategory, string>,
  },

  // -------------------------------------------------------------------------
  // The single review — displayed honestly, singular framing, no schema markup
  // -------------------------------------------------------------------------
  review: {
    sectionTitle: 'From a recent customer',
    quote: 'they did good work on time and very respectful',
    author: 'Michael Norris',
    source: 'Google review',
  },

  // -------------------------------------------------------------------------
  // Services
  // -------------------------------------------------------------------------
  services: {
    commercial: {
      title: 'Commercial Concrete',
      href: '/commercial-concrete',
      intro:
        'Flatwork and site concrete for general contractors, property managers, and business owners across Genesee County. Scheduled around your operation, coordinated with your other trades, and finished on time.',
      items: [
        {
          name: 'Commercial flatwork',
          description:
            'Slabs, floors, and pads placed and finished to the tolerances your project calls for.',
        },
        {
          name: 'Sidewalks and walkways',
          description:
            'New pours and replacements, formed and finished for drainage and long service life.',
        },
        {
          name: 'Curb and gutter',
          description:
            'Site curbing formed to grade for parking areas, approaches, and drive lanes.',
        },
        {
          name: 'ADA-compliant ramps and detectable warning surfaces',
          description:
            'Accessible routes, ramps, and truncated-dome surfaces built to current accessibility standards.',
        },
        {
          name: 'Equipment and dumpster pads',
          description:
            'Reinforced pads sized for the loads they carry, from compactors to condensers.',
        },
        {
          name: 'Loading docks and approaches',
          description:
            'Heavy-duty approaches and dock aprons built for daily truck traffic.',
        },
        {
          name: 'Footings and foundations',
          description:
            'Foundation work for commercial structures, formed and poured to plan.',
        },
        {
          name: 'Parking area concrete',
          description:
            'Concrete paving, aprons, and repairs for lots that need to stay open while work happens.',
        },
        {
          name: 'Catch basin repair',
          description:
            'Rebuilding and repairing the catch basins and storm drains that collect runoff from parking lots and drives, so water goes where it should instead of undermining the pavement around it.',
        },
        {
          name: 'Demolition and removal',
          description:
            'Tear-out and haul-away of failed concrete, with the subgrade prepped right before anything new goes down.',
        },
      ] satisfies ServiceItem[],
    },
    municipal: {
      title: 'Municipal, Transit & School District Work',
      href: '/municipal-and-institutional',
      intro:
        'Public work is its own discipline: occupied buildings, school calendars, transit schedules, and the public walking past your work zone every day. Better 2 Enterprises has worked in Genesee County since 2002, and the permitted public projects below are on the record.',
      items: [
        {
          name: 'Transit shelter pads and sidewalks',
          description:
            'Concrete pads, connecting sidewalks, and shelter installations for transit stops. This is the core of our public permit record in Flint.',
        },
        {
          name: 'Public school district work',
          description:
            'Concrete work for school facilities, scheduled around the school calendar and occupied buildings.',
        },
        {
          name: 'Municipal sidewalk and curb programs',
          description:
            'Section replacements and new walks for city and township public works programs.',
        },
        {
          name: 'ADA accessibility upgrades',
          description:
            'Ramps, detectable warning surfaces, and accessible-route corrections on public walks and entrances.',
        },
        {
          name: 'Public building approaches and walkways',
          description:
            'Entrance slabs, steps, and walkways for public facilities, built with pedestrian safety fencing and clear detours.',
        },
        {
          name: 'Catch basin and storm drain repair',
          description:
            'Repairing and rebuilding the catch basins that street and lot drainage flows into, from the structure itself to the surrounding collar and pavement.',
        },
      ] satisfies ServiceItem[],
    },
    residential: {
      title: 'Residential Concrete',
      href: '/residential-concrete',
      intro:
        'Driveways, patios, and garage floors for Genesee County homeowners. A clear quote, a crew that shows up, and a finished slab you can be straightforward about.',
      items: [
        {
          name: 'Driveways and driveway replacement',
          description:
            'Full tear-out and re-pour or new construction, formed for drainage and finished for traction.',
        },
        {
          name: 'Patios',
          description:
            'Backyard patios formed to your layout, with control joints placed so the slab ages well.',
        },
        {
          name: 'Garage floors',
          description:
            'Flat, hard-troweled floors poured to drain toward the door.',
        },
        {
          name: 'Sidewalks and walkways',
          description:
            'Front walks, side paths, and city-strip sidewalk replacement.',
        },
        {
          name: 'Porches and steps',
          description:
            'Solid, square steps and porch slabs with consistent riser heights.',
        },
        {
          name: 'Footings',
          description:
            'Footings for garages, additions, and decks, dug and poured to inspection.',
        },
        {
          name: 'Tear-out and haul-away',
          description:
            'We remove the old concrete and haul it off, so you never deal with the rubble.',
        },
      ] satisfies ServiceItem[],
    },
  },

  // -------------------------------------------------------------------------
  // Residential process (what to expect — no dollar figures, no day counts we
  // can't stand behind; cure guidance is standard trade practice, not a claim
  // about this client's warranty)
  // -------------------------------------------------------------------------
  residentialProcess: [
    {
      step: 'Quote',
      detail:
        'Call or send the form. We look at the job, talk through what you want, and give you a written quote.',
    },
    {
      step: 'Tear-out and prep',
      detail:
        'Old concrete comes out and gets hauled away. The subgrade is graded and compacted. The part of the job you never see is the part that decides how long the slab lasts.',
    },
    {
      step: 'Form and pour',
      detail:
        'Forms are set to grade, concrete is placed and finished, and control joints are cut so the slab cracks where we decided, not where it wants to.',
    },
    {
      step: 'Cure',
      detail:
        'Concrete needs time to gain strength before it takes weight. We tell you exactly when you can walk on it and when you can drive on it before we leave.',
    },
  ],

  // -------------------------------------------------------------------------
  // Service area
  // -------------------------------------------------------------------------
  serviceArea: {
    region: 'Genesee County, Michigan',
    /**
     * Travel radius (client-stated Sept 2026): they will take jobs up to about
     * a 1.5 hour drive from Montrose. Backed by completed work in Midland
     * (2023) and Yale (2024). Drives the map on /service-areas.
     */
    travel: {
      heading: 'How far we go',
      note: 'Better 2 Enterprises is based in Montrose and takes jobs up to about an hour and a half out. That range reaches Saginaw, Bay City, Midland, Lapeer, Port Huron, Lansing, and the north side of Metro Detroit, and it is not theoretical: the project record includes completed work in Midland and Yale.',
      mapLabel: 'Based in Montrose, MI',
      radiusLabel: 'About a 1.5 hour drive',
      /** Montrose, MI town center — deliberately NOT the street address. */
      mapCenter: { lat: 43.1767, lng: -83.8925 },
      /** ~1.5 h drive at mixed highway speeds. */
      radiusMiles: 90,
    },
    /**
     * Blurbs exist ONLY where the permit record or verified facts support a
     * true, specific claim (Flint, Burton, Grand Blanc = permitted work;
     * Montrose = verified home base). Every other city is served, listed
     * plainly, and gets no invented paragraph.
     */
    core: [
      {
        name: 'Flint',
        blurb:
          'The center of our permitted public work: transit shelter pads, slabs, and sidewalks across the city, filed 2018 through 2021.',
      },
      { name: 'Flushing' },
      {
        name: 'Burton',
        blurb:
          'Site of a permitted foundation for a 24\' x 32\' detached garage on E Atherton Rd (2019).',
      },
      {
        name: 'Grand Blanc',
        blurb:
          'Site of a permitted inground pool demolition on Fenton Rd (2019).',
      },
      { name: 'Swartz Creek' },
      { name: 'Clio' },
      { name: 'Davison' },
      {
        name: 'Montrose',
        blurb: 'Our home base. Better 2 Enterprises has worked out of Montrose since 2002.',
      },
      { name: 'Mt. Morris' },
      { name: 'Linden' },
      { name: 'Fenton' },
      { name: 'Otisville' },
    ] satisfies CityInfo[],
    adjacent: {
      label: 'Also serving',
      cities: ['Chesaning', 'Birch Run', 'Owosso', 'Frankenmuth'],
    },
  },

  // -------------------------------------------------------------------------
  // FAQs (per page; every claim traceable to VERIFIED FACTS)
  // -------------------------------------------------------------------------
  faq: {
    home: [
      {
        question: 'What areas do you cover?',
        answer:
          'Our core area is Genesee County: Flint, Flushing, Burton, Grand Blanc, Swartz Creek, Clio, Davison, and our home base of Montrose. For the right job we travel up to about an hour and a half from Montrose, and we have completed projects as far out as Midland and Yale. If you are anywhere in that range, call and ask.',
      },
      {
        question: 'Do you work with school districts and municipalities?',
        answer:
          'Yes. Public and institutional work is a core part of what we do. Our Genesee County permit record includes transit shelter pads, slabs, and sidewalks across Flint, and we do concrete work for public school districts. See the municipal and school district page for the full project record.',
      },
      {
        question: 'Do you do residential work too?',
        answer:
          'Yes. Driveways, driveway replacement, patios, garage floors, sidewalks, porches, and steps for homeowners across Genesee County. The same company that pours transit pads for the public record pours your driveway.',
      },
      {
        question: 'How long has Better 2 Enterprises been in business?',
        answer:
          'Better 2 Enterprises was incorporated in September 2002 and has been doing concrete work in Genesee County ever since. The company is BBB accredited with an A+ rating and has been accredited since March 2018.',
      },
      {
        question: 'How do I get a quote?',
        answer:
          'Call (810) 493-3521 or send the quote form on the contact page. Tell us where the job is and roughly what you need, and we will take it from there.',
      },
    ] satisfies FaqItem[],
    commercial: [
      {
        question: 'Can you work around an operating business?',
        answer:
          'Yes, that is normal for commercial concrete. We plan pours and closures with you in advance so customers, tenants, and deliveries keep moving, and we keep the work zone contained and cleaned up.',
      },
      {
        question: 'Do you coordinate with general contractors and other trades?',
        answer:
          'Yes. Coordinating schedule, grade, embeds, and inspection points with the GC and the trades before and after us is part of the job on commercial work.',
      },
      {
        question: 'Do you handle demolition and subgrade prep?',
        answer:
          'Yes. We tear out failed concrete, haul it away, and prep the subgrade before the new pour. Getting the base right is most of what decides how long the new concrete lasts.',
      },
      {
        question: 'Can you build ADA-compliant ramps and walks?',
        answer:
          'Yes. Accessible ramps, routes, and detectable warning surfaces are built to current accessibility standards, a normal part of commercial and public sidewalk work.',
      },
    ] satisfies FaqItem[],
    municipal: [
      {
        question: 'What public work have you actually done?',
        answer:
          'Recent public work includes campus concrete programs for Mott Community College, sidewalk replacement at Flint City Hall and under the City of Flint 50/50 program, loading dock and stair reconstruction for Clio Area Schools, a building addition for Mount Morris Township, sidewalk replacement for Yale Public Schools, and concrete repairs at the Midland Water Treatment Plant. Our Genesee County permit record adds transit shelter pads, slabs, and sidewalks across Flint filed between 2018 and 2021. The full record is on this page. Click any project to see the details.',
      },
      {
        question: 'Can you work while a building is occupied?',
        answer:
          'Yes. Public work usually means working around students, staff, riders, or residents. We fence and sign the work zone, keep accessible detours open, and schedule the disruptive parts of the job for the times you tell us matter least.',
      },
      {
        question: 'Do you work around school calendars?',
        answer:
          'Yes. School district work gets scheduled around the calendar, using summer breaks, holiday breaks, and after-hours windows, so the work is done when the site is quiet.',
      },
      {
        question: 'How do we get you on a bid list?',
        answer:
          'Call (810) 493-3521 or use the contact form and tell us about the project. We can talk through scope, timeline, and documentation from there.',
      },
    ] satisfies FaqItem[],
    residential: [
      {
        question: 'How long before I can use my new driveway?',
        answer:
          'You can typically walk on new concrete after a day or two, but it needs about a week before it should take the weight of a vehicle, because concrete keeps gaining strength as it cures. We give you exact guidance for your pour before we leave the job.',
      },
      {
        question: 'Do you handle tear-out of the old concrete?',
        answer:
          'Yes. Tear-out and haul-away of the old driveway, patio, or walk is part of the job. You never deal with the rubble, and we prep the base properly before the new pour.',
      },
      {
        question: 'What drives the cost of a new driveway or patio?',
        answer:
          'Size and thickness of the slab, how much old concrete has to come out, the condition of the base underneath, and access for trucks and equipment. Every job is different, which is why we quote from the actual site. Call or send the form and we will give you a real number.',
      },
      {
        question: 'Why do driveways crack, and what do you do about it?',
        answer:
          'All concrete moves as it cures and as the ground freezes and thaws. The answer is control joints: cuts placed at deliberate intervals so the slab cracks along clean, straight lines you will never notice instead of wandering across the surface. Proper base prep and drainage do the rest.',
      },
    ] satisfies FaqItem[],
  },

  // -------------------------------------------------------------------------
  // Page copy blocks
  // -------------------------------------------------------------------------
  pages: {
    home: {
      h1: 'Concrete contractor for Genesee County',
      heroLead:
        'Commercial, municipal, and residential concrete out of Montrose, Michigan. Flatwork, sidewalks, foundations, and site concrete, formed, poured, and finished by the same family-run company since 2002.',
      splitHeading: 'Two kinds of customers. One standard of work.',
      commercialCard: {
        title: 'Commercial & public work',
        body: 'Flatwork, sidewalks, curb and gutter, ADA ramps, and site concrete for GCs, property managers, school districts, and municipalities. Evidence over adjectives: start with the permit record.',
        link: '/municipal-and-institutional',
        linkLabel: 'See the public project record',
      },
      residentialCard: {
        title: 'Home driveways & patios',
        body: 'Driveway replacement, patios, garage floors, and walks for Genesee County homeowners. A written quote, a crew that shows up, and a clear answer on when you can drive on it.',
        link: '/residential-concrete',
        linkLabel: 'Residential concrete services',
      },
      projectPreviewHeading: 'On the public record',
      projectPreviewSub:
        'A sample of permitted work from Genesee County building filings. No stock photos, no invented case studies. The record speaks for itself.',
      trust: {
        heading: 'The short version',
        yearsLabel: 'Years in business',
        bbbLabel: 'BBB rating, accredited since 2018',
        permitsLabel: 'Documented projects on record',
      },
      faqHeading: 'Common questions',
      finalCta: {
        heading: 'Tell us about the job',
        body: 'Call (810) 493-3521 or send the form. Whether it is a bus shelter pad or a backyard patio, it starts with a conversation.',
      },
    },
    commercial: {
      title: 'Commercial Concrete in Genesee County | Better 2 Enterprises',
      description:
        'Commercial flatwork, sidewalks, curb and gutter, ADA ramps, and site concrete for GCs and property managers across Genesee County, MI. Call (810) 493-3521.',
      h1: 'Commercial concrete, scheduled around your operation',
      forWho:
        'For general contractors who need a concrete sub that hits dates, and for property managers and owners who need work done around an open business.',
      expectations: [
        {
          title: 'Scheduling around an operating site',
          body: 'Pours, closures, and cure times are planned with you in advance so tenants, customers, and deliveries keep moving.',
        },
        {
          title: 'Coordination with other trades',
          body: 'We work to the GC’s schedule and coordinate grade, embeds, and inspection points with the trades before and after us.',
        },
        {
          title: 'Subgrade prep done right',
          body: 'The base under the slab decides how the slab performs. Tear-out, grading, and compaction come before anything gets poured.',
        },
        {
          title: 'Clean sites, contained work zones',
          body: 'Fenced and signed work areas, washout contained, rubble hauled, and the site left clean at the end of the job.',
        },
      ],
    },
    municipal: {
      title: 'Municipal & School Concrete in Flint, MI | Better 2 Enterprises',
      description:
        'Transit shelter pads, municipal sidewalks, ADA upgrades, and school district concrete across Genesee County. Public permit record included. Call (810) 493-3521.',
      h1: 'Municipal, transit, and school district concrete',
      recordHeading: 'The public record',
      recordSub:
        'Completed public works with full project sheets, plus permitted projects from Genesee County building filings. Click a project to see the owner, timeframe, and exactly what the work included. This is the evidence a facilities director actually wants.',
      expectations: [
        {
          title: 'Working around the public',
          body: 'Transit riders, students, and residents move through public sites every day. Work zones are fenced, signed, and kept tight, with accessible detours maintained.',
        },
        {
          title: 'School calendars and occupied buildings',
          body: 'Disruptive work gets scheduled for breaks and off-hours. We plan the job around the building’s life, not the other way around.',
        },
        {
          title: 'Bid-ready and paperwork-ready',
          body: 'A public permit record across Flint means the documentation side of the job is familiar ground. Call and tell us about the project.',
        },
        {
          title: 'ADA compliance on walks and ramps',
          body: 'Accessible routes, ramp slopes, and detectable warning surfaces built to current standards, a core part of public sidewalk work.',
        },
      ],
    },
    residential: {
      title: 'Driveways & Patios in Genesee County | Better 2 Enterprises',
      description:
        'Driveway replacement, patios, garage floors, and walkways for Genesee County homeowners. Tear-out included, written quotes, honest timelines. (810) 493-3521.',
      h1: 'Driveways, patios, and garage floors',
      processHeading: 'How the job runs',
      processSub: 'From first call to finished slab: what actually happens, in order.',
    },
    projects: {
      title: 'Project Record | Better 2 Enterprises, Genesee County',
      description:
        'Permitted concrete projects across Flint, Burton, and Grand Blanc: transit shelters, foundations, and site work from Genesee County building filings.',
      h1: 'The project record',
      intro:
        'Completed public works projects for cities, townships, schools, and colleges, plus permitted projects from Genesee County building filings. Click any project with an arrow to see the owner, the timeframe, and exactly what the work included. We would rather show you the record than tell you a story.',
      photoNote:
        'Photography of our own completed work is coming. Until then, this page stays photo-free on purpose: the permit record above is verified public history, and we will not dress it up with pictures of someone else\'s concrete.',
      galleryHeading: 'From our job sites',
    },
    about: {
      title: 'About Better 2 Enterprises | Concrete Since 2002',
      description:
        'Family-run concrete contractor in Montrose, MI. Incorporated 2002, BBB accredited since 2018 with an A+ rating. Commercial, municipal, and residential work.',
      h1: 'A family-run concrete company out of Montrose',
      body: [
        'Better 2 Enterprises Inc. was incorporated in September 2002 and has been doing concrete work in Genesee County ever since, coming up on a quarter century of the same trade in the same place.',
        'The company is run by Steve Hoadley. The work is a mix that most contractors never manage to hold together: transit shelter pads and public sidewalks across Flint, foundations and site work, school district projects, and driveways and patios for homeowners.',
        'Better 2 Enterprises has been a BBB Accredited Business since March 2018 and holds an A+ rating.',
        'If you want to know what the work looks like, start with the project record. It is public, it is permitted, and it is ours.',
      ],
    },
    serviceAreas: {
      title: 'Service Areas | Better 2 Enterprises, Genesee County MI',
      description:
        'Concrete contractor serving Flint, Flushing, Burton, Grand Blanc, Swartz Creek, Clio, Davison, Montrose, and surrounding Genesee County communities.',
      h1: 'Where we work',
      intro:
        'Better 2 Enterprises works out of Montrose and covers Genesee County, with the heaviest concentration of our work in and around Flint. For the right job we travel up to about an hour and a half out, and the record backs it: completed projects reach Midland to the northwest and Yale to the east.',
    },
    contact: {
      title: 'Get a Concrete Quote | Better 2 Enterprises',
      description:
        'Request a quote from Better 2 Enterprises: commercial, municipal, and residential concrete across Genesee County, MI. Call (810) 493-3521 or send the form.',
      h1: 'Tell us about the job',
      intro:
        'Call (810) 493-3521 or send the form below. Give us the location and a rough idea of the work, and we will take it from there.',
      formHeading: 'Request a quote',
      phoneHeading: 'Prefer to talk?',
    },
    privacy: {
      title: 'Privacy Policy | Better 2 Enterprises',
      description:
        'How Better 2 Enterprises handles the information you submit through this website, including quote requests and SMS consent.',
      h1: 'Privacy policy',
    },
    home_meta: {
      title: 'Concrete Contractor in Genesee County | Better 2 Enterprises',
      description:
        'Commercial, municipal, and residential concrete across Flint and Genesee County, MI. Family-run since 2002, BBB A+ accredited. Call (810) 493-3521.',
    },
  },

  // -------------------------------------------------------------------------
  // Page imagery — licensed stock (Pexels), ILLUSTRATIVE ONLY, see
  // docs/PHOTOS.md. Alt text describes the photo; it never attributes the
  // work to Better 2 and never names a location. NONE of these render on
  // /projects. Swap role-by-role when Steve's real photos arrive.
  // -------------------------------------------------------------------------
  images: {
    homeBand: {
      name: 'stock-driveway-pour',
      alt: 'Concrete crew screeding a freshly poured residential driveway behind a mixer truck',
    },
    commercialHero: {
      name: 'stock-power-screed',
      alt: 'Power screed leveling a freshly poured concrete slab along a curb form',
    },
    commercialSecondary: {
      name: 'stock-curb-form',
      alt: 'Wet concrete being placed and worked in curb and gutter formwork',
    },
    municipalBand: {
      name: 'stock-spreading-concrete',
      alt: 'Worker spreading wet concrete across wire mesh reinforcement with a shovel',
    },
    residentialHero: {
      name: 'stock-driveway-home',
      alt: 'Broom-finished two-car concrete driveway leading to a suburban home',
    },
    residentialProcess: {
      name: 'stock-footing-pour',
      alt: 'Concrete being placed into a formed footing excavation with rebar staged alongside',
    },
    residentialDetail: {
      name: 'stock-mesh-macro',
      alt: 'Welded wire reinforcement mesh stacked before a concrete pour',
    },
    serviceAreasBand: {
      name: 'stock-driveway-home-2',
      alt: 'Wide concrete driveway in front of a two-story house',
    },
  },

  // -------------------------------------------------------------------------
  // Privacy policy (covers the quote form data + SMS consent)
  // -------------------------------------------------------------------------
  privacy: {
    updated: 'August 2026',
    sections: [
      {
        heading: 'What we collect',
        body: 'When you submit the quote request form on this site, we collect the information you enter: your name, phone number, email address if you provide one, and your message describing the work you need. Calling us does not collect anything through this website.',
      },
      {
        heading: 'How we use it',
        body: 'We use your contact information for one purpose: responding to your quote request and communicating with you about your project. We do not sell your information, and we do not share it with third parties for their own marketing.',
      },
      {
        heading: 'Text messages',
        body: 'The form includes a consent checkbox for text messages. If you check it, we may text you about your quote request. Message and data rates may apply. You can opt out at any time by replying STOP to any message, and we will stop texting you.',
      },
      {
        heading: 'Who processes the data',
        body: 'Form submissions are processed and stored by Align and Acquire, the company that operates this website on our behalf, and are used only to deliver your request to us.',
      },
      {
        heading: 'Questions',
        body: 'If you want to know what information we have about you or want it removed, call us at (810) 493-3521.',
      },
    ],
  },

  footer: {
    tagline: 'Concrete contractor serving Genesee County, Michigan since 2002.',
    /** Legal-name fine print (the one place the "Inc." form appears). */
    legalLine: 'Better 2 Enterprises Inc.',
    credit: 'Site by Align and Acquire',
  },
} as const

export type Site = typeof site
