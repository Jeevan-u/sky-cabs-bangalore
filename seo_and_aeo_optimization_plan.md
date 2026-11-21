# Sky Cabs Bangalore - Master SEO & AEO Optimization Plan

## Objective
Elevate Sky Cabs Bangalore (`https://skycabsbangalore.com/`) to rank #1 on Google Organic Search, Google Maps Local Pack, and AI Answer Engines (Perplexity, ChatGPT, Claude, Gemini) across Bengaluru, Begur, Whitefield, Indiranagar, Whitefield, Yelahanka, and major South India pilgrimage routes.

---

## Executed 4-Phase Architecture

### Phase 1: Core Technical SEO & De-Indexation Fix
- **Canonical Root De-coupling**: Removed blanket `canonical: "https://skycabsbangalore.com/"` from `RootLayout` (`src/app/layout.tsx`). Child pages now declare self-referencing canonical URLs to eliminate duplicate content signals.
- **Title Tag Normalization**: Retained `template: "%s | Sky Cabs Bangalore Bengaluru"` in `RootLayout`. Stripped redundant brand suffix patterns from child page titles across all regional and airport landing pages.
- **Semantic Hierarchy (`<h1>` Injections)**:
  - Homepage (`src/app/(server-components)/SectionHero.tsx`): Primary `<h1>` with keyword enrichment.
  - About (`src/app/about/SectionHero.tsx`): Semantic `<h1>` for company identity.
  - Fleet Archive (`src/app/(server-components)/SectionHeroArchivePage.tsx`): Semantic `<h1>` for 50+ commercial vehicle fleet.
  - Vehicle Detail (`src/app/(listing-detail)/listing-car-detail/page.tsx`): Dynamic `<h1>` matching vehicle name and capacity.
  - Blog Archive (`src/app/blog/page.tsx`): Semantic `<h1>` for travel guides and road trip insights.
- **Template Sanitization & Zombie Route Quarantine**:
  - Purged all dummy text, Lorem ipsum, and placeholder author profiles from `src/app/blog/[...slug]/page.tsx`. Replaced with authentic travel guide content, route checklists, and booking CTAs.
  - Set `robots: { index: false, follow: false }` on zombie/internal routes: `/home-2`, `/home-3`, `/subscription`, `/account/*`, and `/listing-stay-detail`.
  - Replaced dead `href="#"` links in `SocialsList1.tsx` and `SocialsShare.tsx` with live social sharing and verified URLs.

---

### Phase 2: Navigation & URL Integrity Repair
- **Fleet Query Parameter Integrity**: Updated all vehicles in `src/data/jsons/__carsListing.json` with deep links passing `?vehicle=` query parameters (`prime-sedan`, `innova-crysta`, `ertiga`, `tempo-traveller-12`, `urbania-16`, `passenger-bus`).
- **Dynamic Blog Routing**: Updated `src/data/posts.ts` from static anchor hashes to genuine dynamic routes (`/blog/mysuru-guide`, `/blog/tirupati-balaji`, etc.).
- **Local Review Funnel**: Configured Google Maps local review query link in `src/app/review/page.tsx`.

---

### Phase 3: AEO & Knowledge Graph Hardening
- **LLM Manifests (`llms.txt` & `llms-full.txt`)**:
  - Authored standard `public/llms.txt` following llmstxt.org specification for rapid parsing by Perplexity, ChatGPT, Claude, and Gemini.
  - Created exhaustive `public/llms-full.txt` incorporating full pricing matrices, vehicle specs, zero-surge policies, driver vetting standards, and FAQs.
- **AI Crawler Whitelist (`src/app/robots.ts`)**:
  - Whitelisted AI bots (`GPTBot`, `ChatGPT-User`, `PerplexityBot`, `ClaudeBot`, `Claude-Web`, `Google-Extended`, `Applebot-Extended`, `cohere-ai`, `Omgilibot`).
  - Allowed direct access to `/llms.txt` and `/llms-full.txt`.
- **Structured Data Optimization**:
  - Deduplicated `FAQPage` schemas by isolating global FAQs to homepage via `HomepageFaqSchema` and local landing FAQs to `LocationLandingTemplate`.
  - Added rich `Product` and `Vehicle` schema catalogue in `src/components/StructuredData.tsx` for all 6 fleet categories.
  - Added exact GeoCoordinates for operational hubs (Begur, Kempegowda International Airport (BLR), Whitefield, Whitefield, Indiranagar, Yelahanka, Jayanagar).
  - Injected `knowsLanguage: ["en", "te", "hi"]` across LocalBusiness, TaxiService, and Person schemas.

---

### Phase 4: High-Intent Commercial URL Expansion & Sitemap
- **Dedicated Pilgrimage Landing Pages**:
  - `src/app/bengaluru-to-mysuru-cabs/page.tsx`
  - `src/app/bengaluru-to-tirupati-cabs/page.tsx`
  - `src/app/bengaluru-to-coorg-cabs/page.tsx`
  - `src/app/bangalore-to-mysuru-cabs/page.tsx`
  - `src/app/cabs-in-jayanagar/page.tsx`
- **Sitemap Restructuring (`src/app/sitemap.ts`)**:
  - Included all primary hubs, outstation pilgrimage landing pages, fleet archive, and blog guides with prioritized weights (1.0 to 0.7) and change frequencies.
  - Excluded transactional `/checkout` and `/subscription` routes from indexing.
