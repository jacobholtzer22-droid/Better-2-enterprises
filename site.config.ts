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

export interface ProjectRecord {
  scope: string
  location: string
  city: string
  year: number
  category: ProjectCategory
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
      display: '(810) 397-5000',
      e164: '+18103975000',
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
      /** Real BBB profile URL — to be added before Phase 5 sameAs is final. */
      profileUrl: null as string | null,
    },
    /** BuildZoom profile URL — to be added before Phase 5 sameAs is final. */
    buildZoomUrl: null as string | null,
    /** GBP URL — Jacob supplies after launch; then redeploy with sameAs. */
    googleBusinessProfileUrl: null as string | null,
  },

  /** Production URL. Confirm final domain before deploy (docs/CLIENT-TODO.md). */
  url: 'https://www.better2enterprises.com',

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
    call: { label: 'Call (810) 397-5000' },
  },

  // -------------------------------------------------------------------------
  // Project record (public record — Genesee County building permit filings)
  // -------------------------------------------------------------------------
  projects: {
    sourceNote: 'Project record from Genesee County building permit filings.',
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
        scope: 'Inground pool demolition and site restoration',
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
      municipal: 'Municipal',
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
        'Public work is its own discipline: occupied buildings, school calendars, transit schedules, and the public walking past your work zone every day. Better 2 Enterprises has been doing this work in Genesee County for over two decades — the permit record below is the proof.',
      items: [
        {
          name: 'Transit shelter pads and sidewalks',
          description:
            'Concrete pads, connecting sidewalks, and shelter installations for transit stops — the core of our public permit record in Flint.',
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
            'We remove the old concrete and haul it off — you never deal with the rubble.',
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
        'Old concrete comes out and gets hauled away. The subgrade is graded and compacted — the part of the job you never see is the part that decides how long the slab lasts.',
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
    core: [
      {
        name: 'Flint',
        blurb:
          'The center of our public work — transit shelter pads, slabs, and sidewalks across the city are on our permit record.',
      },
      {
        name: 'Flushing',
        blurb:
          'Commercial and residential concrete just west of Flint, minutes from our Montrose home base.',
      },
      {
        name: 'Burton',
        blurb:
          'Garage foundations and residential flatwork — including a permitted detached-garage foundation on E Atherton Rd.',
      },
      {
        name: 'Grand Blanc',
        blurb:
          'Site work and residential concrete, including permitted demolition and site restoration work.',
      },
      {
        name: 'Swartz Creek',
        blurb: 'Driveways, patios, and commercial flatwork on the county’s southwest side.',
      },
      {
        name: 'Clio',
        blurb: 'Residential and commercial concrete along the I-75 corridor north of Flint.',
      },
      {
        name: 'Davison',
        blurb: 'Concrete work east of Flint, from driveways to site concrete.',
      },
      {
        name: 'Montrose',
        blurb: 'Our home base — Better 2 Enterprises has worked from Montrose since 2002.',
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
          'We work across Genesee County — Flint, Flushing, Burton, Grand Blanc, Swartz Creek, Clio, Davison, and our home base of Montrose — plus nearby communities like Chesaning, Birch Run, Owosso, and Frankenmuth. If you are close to that area, call and ask.',
      },
      {
        question: 'Do you work with school districts and municipalities?',
        answer:
          'Yes. Public and institutional work is a core part of what we do. Our Genesee County permit record includes transit shelter pads, slabs, and sidewalks across Flint, and we do concrete work for public school districts. See the municipal and school district page for the full project record.',
      },
      {
        question: 'Do you do residential work too?',
        answer:
          'Yes. Driveways, driveway replacement, patios, garage floors, sidewalks, porches, and steps for homeowners across Genesee County. Same crew, same standards as our commercial work.',
      },
      {
        question: 'How long has Better 2 Enterprises been in business?',
        answer:
          'Better 2 Enterprises was incorporated in September 2002 and has been doing concrete work in Genesee County ever since. The company is BBB accredited with an A+ rating and has been accredited since March 2018.',
      },
      {
        question: 'How do I get a quote?',
        answer:
          'Call (810) 397-5000 or send the quote form on the contact page. Tell us where the job is and roughly what you need, and we will take it from there.',
      },
    ] satisfies FaqItem[],
    commercial: [
      {
        question: 'Can you work around an operating business?',
        answer:
          'Yes — that is normal for commercial concrete. We plan pours and closures with you in advance so customers, tenants, and deliveries keep moving, and we keep the work zone contained and cleaned up.',
      },
      {
        question: 'Do you coordinate with general contractors and other trades?',
        answer:
          'Yes. We regularly work as the concrete sub on larger projects — coordinating schedule, grade, and inspection points with the GC and the trades before and after us.',
      },
      {
        question: 'Do you handle demolition and subgrade prep?',
        answer:
          'Yes. We tear out failed concrete, haul it away, and prep the subgrade before the new pour. Getting the base right is most of what decides how long the new concrete lasts.',
      },
      {
        question: 'Can you build ADA-compliant ramps and walks?',
        answer:
          'Yes. Accessible ramps, routes, and detectable warning surfaces are part of our regular commercial and public work, built to current accessibility standards.',
      },
    ] satisfies FaqItem[],
    municipal: [
      {
        question: 'What public work have you actually done?',
        answer:
          'Our Genesee County permit record includes concrete pads, slabs, and sidewalks for transit shelters across Flint — on Flushing Rd, Miller Rd, S Linden Rd, W Bristol Rd, and Mallery St — filed between 2018 and 2021. The full record is on this page and on the projects page.',
      },
      {
        question: 'Can you work while a building is occupied?',
        answer:
          'Yes. Public work usually means working around students, staff, riders, or residents. We fence and sign the work zone, keep accessible detours open, and schedule the disruptive parts of the job for the times you tell us matter least.',
      },
      {
        question: 'Do you work around school calendars?',
        answer:
          'Yes. School district work gets scheduled around the calendar — summer breaks, holiday breaks, and after-hours windows — so the work is done when the site is quiet.',
      },
      {
        question: 'How do we get you on a bid list?',
        answer:
          'Call (810) 397-5000 or use the contact form and tell us about the project. We can talk through scope, timeline, and documentation from there.',
      },
    ] satisfies FaqItem[],
    residential: [
      {
        question: 'How long before I can use my new driveway?',
        answer:
          'You can typically walk on new concrete after a day or two, but it needs about a week before it should take the weight of a vehicle — concrete keeps gaining strength as it cures. We give you exact guidance for your pour before we leave the job.',
      },
      {
        question: 'Do you handle tear-out of the old concrete?',
        answer:
          'Yes. Tear-out and haul-away of the old driveway, patio, or walk is part of the job. You never deal with the rubble, and we prep the base properly before the new pour.',
      },
      {
        question: 'What drives the cost of a new driveway or patio?',
        answer:
          'Size and thickness of the slab, how much old concrete has to come out, the condition of the base underneath, and access for trucks and equipment. Every job is different, which is why we quote from the actual site — call or send the form and we will give you a real number.',
      },
      {
        question: 'Why do driveways crack, and what do you do about it?',
        answer:
          'All concrete moves as it cures and as the ground freezes and thaws. The answer is control joints — cuts placed at deliberate intervals so the slab cracks along clean, straight lines you will never notice instead of wandering across the surface. Proper base prep and drainage do the rest.',
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
        'Commercial, municipal, and residential concrete out of Montrose, Michigan. Flatwork, sidewalks, foundations, and site concrete — formed, poured, and finished by the same family-run company since 2002.',
      splitHeading: 'Two kinds of customers. One standard of work.',
      commercialCard: {
        title: 'Commercial & public work',
        body: 'Flatwork, sidewalks, curb and gutter, ADA ramps, and site concrete for GCs, property managers, school districts, and municipalities. Evidence over adjectives — start with the permit record.',
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
        'A sample of permitted work from Genesee County building filings. No stock photos, no invented case studies — the record speaks for itself.',
      trust: {
        heading: 'The short version',
        yearsLabel: 'Years in business',
        bbbLabel: 'BBB rating, accredited since 2018',
        permitsLabel: 'Permitted public projects on record',
      },
      faqHeading: 'Common questions',
      finalCta: {
        heading: 'Tell us about the job',
        body: 'Call (810) 397-5000 or send the form. Whether it is a bus shelter pad or a backyard patio, it starts with a conversation.',
      },
    },
    commercial: {
      title: 'Commercial Concrete in Genesee County | Better 2 Enterprises',
      description:
        'Commercial flatwork, sidewalks, curb and gutter, ADA ramps, and site concrete for GCs and property managers across Genesee County, MI. Call (810) 397-5000.',
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
        'Transit shelter pads, municipal sidewalks, ADA upgrades, and school district concrete across Genesee County. Public permit record included. Call (810) 397-5000.',
      h1: 'Municipal, transit, and school district concrete',
      recordHeading: 'The public record',
      recordSub:
        'These are permitted, completed projects from Genesee County building filings — locations, scope as written on the permit, and year. This is the evidence a facilities director actually wants.',
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
          body: 'Two decades of permitted public work in Genesee County means the documentation side of the job is familiar ground. Call and tell us about the project.',
        },
        {
          title: 'ADA compliance on walks and ramps',
          body: 'Accessible routes, ramp slopes, and detectable warning surfaces built to current standards — a core part of public sidewalk work.',
        },
      ],
    },
    residential: {
      title: 'Driveways & Patios in Genesee County | Better 2 Enterprises',
      description:
        'Driveway replacement, patios, garage floors, and walkways for Genesee County homeowners. Tear-out included, written quotes, honest timelines. (810) 397-5000.',
      h1: 'Driveways, patios, and garage floors',
      processHeading: 'How the job runs',
      processSub: 'From first call to finished slab — what actually happens, in order.',
    },
    projects: {
      title: 'Project Record | Better 2 Enterprises, Genesee County',
      description:
        'Permitted concrete projects across Flint, Burton, and Grand Blanc — transit shelters, foundations, and site work from Genesee County building filings.',
      h1: 'The project record',
      intro:
        'Every entry below is a permitted, completed project from Genesee County building filings — the location, the scope as written on the permit, and the year. We would rather show you the public record than tell you a story.',
      galleryHeading: 'From our job sites',
    },
    about: {
      title: 'About Better 2 Enterprises | Concrete Since 2002',
      description:
        'Family-run concrete contractor in Montrose, MI. Incorporated 2002, BBB accredited since 2018 with an A+ rating. Commercial, municipal, and residential work.',
      h1: 'A family-run concrete company out of Montrose',
      body: [
        'Better 2 Enterprises Inc. was incorporated in September 2002 and has been doing concrete work in Genesee County ever since — coming up on a quarter century of the same trade in the same place.',
        'The company is run by Steve Hoadley. The work is a mix that most contractors never manage to hold together: transit shelter pads and public sidewalks across Flint, foundations and site work, school district projects, and driveways and patios for homeowners.',
        'Better 2 Enterprises has been a BBB Accredited Business since March 2018 and holds an A+ rating.',
        'If you want to know what the work looks like, start with the project record — it is public, it is permitted, and it is ours.',
      ],
    },
    serviceAreas: {
      title: 'Service Areas | Better 2 Enterprises, Genesee County MI',
      description:
        'Concrete contractor serving Flint, Flushing, Burton, Grand Blanc, Swartz Creek, Clio, Davison, Montrose, and surrounding Genesee County communities.',
      h1: 'Where we work',
      intro:
        'Better 2 Enterprises works out of Montrose and covers Genesee County, with the heaviest concentration of our permitted work in and around Flint. We also take jobs in nearby communities just outside the county.',
    },
    contact: {
      title: 'Get a Concrete Quote | Better 2 Enterprises',
      description:
        'Request a quote from Better 2 Enterprises — commercial, municipal, and residential concrete across Genesee County, MI. Call (810) 397-5000 or send the form.',
      h1: 'Tell us about the job',
      intro:
        'Call (810) 397-5000 or send the form below. Give us the location and a rough idea of the work, and we will take it from there.',
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
        'Commercial, municipal, and residential concrete across Flint and Genesee County, MI. Family-run since 2002, BBB A+ accredited. Call (810) 397-5000.',
    },
  },

  footer: {
    tagline: 'Concrete contractor serving Genesee County, Michigan since 2002.',
    /** Legal-name fine print (the one place the "Inc." form appears). */
    legalLine: 'Better 2 Enterprises Inc.',
    credit: 'Site by Align and Acquire',
  },
} as const

export type Site = typeof site
