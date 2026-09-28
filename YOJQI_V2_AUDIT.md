# YOJQI V2 — Architectural Audit & Progressive Upgrade Plan

**Date**: September 28, 2026  
**Target Platform**: YOJQI (https://www.yojqi.com)  
**Strategy**: AUDIT → UNDERSTAND → PRESERVE → RESTRUCTURE → UPGRADE (Progressive Evolution, Zero Breakage)

---

## 1. Existing Architecture

* **Framework & Runtime**: Next.js 15.5.26 (App Router), React 19, TypeScript 5.7.3.
* **Styling & Design Tokens**: Tailwind CSS 3.4.17 with custom YOJQI palette (`#fffdfa` ivory, `#15110f` ink, `#7a5a3a` bronze, warm amber accents), `@tailwindcss/typography`, custom shadows, Cormorant Garamond (`--font-cormorant`), Source Sans 3 (`--font-sans`).
* **Routing Strategy**: Dynamic route grouping with locale slug `app/[lang]/...` (`en` & `zh`).
* **Locale Middleware**: `middleware.ts` enforces default redirect from `/` to `/en`, while preserving `/[lang]/...` paths and API routes.
* **State Management**: React Context (`CartContext`, `CurrencyContext`), local storage persistence for cart items, currency preferences, and order tracking.
* **Backend & Storage**: Next.js API Routes (`/api/admin/...`, `/api/orders/...`, `/api/inquiry/...`, `/api/checkout`), Supabase SSR client integration configured, mock store cache with seed data in `lib/admin-store.ts`.

---

## 2. Existing Routes & Endpoints

### Front-facing Routes:
* `/[lang]`: Homepage with hero, 4-7-8 breathing circle, 5 intentions taxonomy, 30s mind energy diagnostic quiz, featured wearables, Taoist talismans spotlight, Chongqing drone-show sanctuaries, editorial articles, customer reviews.
* `/[lang]/shop`: Catalog page with category filters (`all`, `sleep`, `focus`, `balance`, `protection`, `gift`).
* `/[lang]/product/[slug]`: Rich product detail pages (somatic benefits, sensory profile / scent pyramid, ritual steps, ingredients/materials, pair recommendations, sticky buy bar).
* `/[lang]/talismans`: Dedicated Taoist Talisman portal (10 consecrated vermilion talismans, consecration ritual steps, placement instructions).
* `/[lang]/retreats`: Chongqing Drone Show Sanctuaries overview (Baihong, YOJQI Skyline apartments, skyline balcony angle, drone schedule widget).
* `/[lang]/retreats/[slug]`: Specific sanctuary detail view with VIP concierge booking inquiry form.
* `/[lang]/wisdom`: Editorial articles and wellness philosophy.
* `/[lang]/wisdom/[slug]`: Long-form editorial guides.
* `/[lang]/track-order`: Public parcel & logistics tracking page by order number + email.
* `/[lang]/account`: VIP Customer portal with order history & profile.
* `/[lang]/checkout/success`: Checkout completion screen.
* `/[lang]/admin`: Full-featured Two-Tier RBAC admin console (Super Admin, Shipping Admin, Concierge Admin, Analytics).

### API Endpoints:
* `/api/admin/auth`: Admin login & session verification.
* `/api/admin/orders`: Order retrieval & fulfillment updates.
* `/api/admin/users`: Sub-admin user management.
* `/api/admin/inquiries`: Customer inquiry updates.
* `/api/admin/analytics`: PV/UV and traffic sources aggregation.
* `/api/orders/track`: Public tracking lookup.
* `/api/inquiry/submit`: Guest concierge request submission.
* `/api/checkout`: Stripe checkout session creation.
* `/sitemap.xml` & `/robots.txt`: SEO indexing.

---

## 3. Existing Reusable Components

| Component | Current Role | Reusability in V2 |
| :--- | :--- | :--- |
| `Navbar.tsx` | Sticky desktop/mobile header | **Refactor**: Update desktop/mobile navigation to `DISCOVER`, `TODAY`, `JOURNEY`, `FRIENDS`, `SHOP`, while keeping Search, Currency, Lang, Account & Cart. |
| `Footer.tsx` | Rich footer with trust badges & links | **Preserve & Enhance**: Add links to Today, Journey, Friends, Listening Room, and Experiences. |
| `ProductCard.tsx` | Product grid item with hover state & price | **Reuse & Enhance**: Add emotional state tags ("Sleep Better", "Slow Down", "Focus"). |
| `ProductDetailView.tsx`| Comprehensive single product view | **Preserve & Enhance**: Add "Emotional Purpose", "When to Use", "Why it fits your journey", "Gift option". |
| `BreathingCircle.tsx` | 4-7-8 somatic breath pacing widget | **Reuse**: Embed into Today's Ritual & Listening Room reset flows. |
| `MindEnergyQuiz.tsx` | 30s mind/energy diagnostic widget | **Evolve**: Inform the "Start Your Journey" onboarding engine. |
| `SearchModal.tsx` | Multi-category search overlay | **Upgrade**: Support search by feelings ("I can't sleep", "Stress"), rituals, experiences, products. |
| `CartDrawer.tsx` | Slide-over cart with multi-currency | **Preserve**: Seamless checkout and gift note capabilities. |
| `CurrencySelector.tsx`| USD, EUR, GBP, CNY instant switcher | **Preserve**: Keeps multi-currency global buying experience intact. |
| `WeChatModal.tsx` | VIP concierge QR modal | **Preserve**: High-touch offline/human connection channel. |
| `SanctuaryInquiryForm.tsx`| Booking inquiry modal | **Preserve**: Experiences reservation flow. |
| `ScentPyramid.tsx` | Olfactory notes visualization | **Reuse**: Sensory profile for incense & herbal anchors. |
| `SkylineComparisonSlider.tsx`| Balcony drone show interactive slider | **Reuse**: In Experiences & Chongqing Sanctuary section. |
| `ReviewsSection.tsx` | Authentic VIP testimonials | **Reuse**: In Discover and Shop pages. |

---

## 4. Existing Data Structures

* `lib/products-data.ts`: `Product` interface (`id`, `slug`, `category`, `type`, `system`, `nameEn`, `nameZh`, `price`, `somaticBenefits`, `materials`, `scentProfile`, etc.).
* `lib/retreats-data.ts`: `SanctuaryProperty` interface (`slug`, `droneVantageScore`, `panoramicAngle`, `hostConcierge`, `amenities`, etc.).
* `lib/editorial-data.ts`: `Article` interface (`slug`, `title`, `takeaway`, `contentMarkdown`, `readTime`, etc.).
* `lib/admin-data.ts`: `OrderRecord`, `CustomerInquiryRecord`, `AdminUser`, `AnalyticsSummary`.
* `lib/i18n.ts`: `DICTIONARY` dictionary for `en` and `zh`.

---

## 5. Existing Integrations

* **Stripe**: Multi-currency checkout session initiation in `/api/checkout`.
* **Supabase**: `@supabase/ssr` & `@supabase/supabase-js` configured for future persistent user accounts and journey storage.
* **i18n**: First-class English (`/en`) & Chinese (`/zh`) bilingual routing and content.

---

## 6. Existing SEO Audit

* **Metadata & OpenGraph**: Configured in `app/layout.tsx` and child pages with keywords, localized slugs, and structured data.
* **Sitemap & Robots**: Pre-rendered dynamic `sitemap.xml` and `robots.txt`.
* **URL Stability**: Existing product URLs (`/[lang]/product/[slug]`), retreat URLs (`/[lang]/retreats/[slug]`), and talisman URLs (`/[lang]/talismans`) are indexed and must be preserved with 100% backward compatibility.

---

## 7. Existing UX & Brand Gaps (Why V2 is needed)

1. **Product-First vs. Journey-First**: The existing homepage leans heavily into traditional catalog presentation (Hero → Intentions → Wearables Grid → Talismans Grid → Accommodations). V2 must shift to: Brand → Need / State → Lifestyle → Ritual → Experience → Companion → Friends → Products.
2. **Absence of User State Progression**: Currently, a first-time visitor, a returning visitor, and a long-time member see the same static homepage. V2 needs a 4-state progression (Anonymous → New User → Returning User → Long-Term User).
3. **No Dedicated Daily Space (`/today`)**: Users lack a daily ritual home to check in, see today's balance, and receive gentle guidance without feeling bombarded with sales pitches.
4. **No Long-Term Personal Space (`/journey`)**: Users cannot view their somatic rhythm trends, ritual history, preferences, and companion dialogue history.
5. **No Emotional Safe Harbor (`/listen`)**: Users facing nighttime overthinking have nowhere to vent privately or choose to share anonymously.
6. **No Calm AI Companion (`/companion`)**: Needs a dedicated, quiet, warm, Eastern-inspired companion that listens before advising.
7. **No Human-to-Human Care Loop (`/friends`)**: Lacks an editorial, calm, anonymous community where users can say "Today I feel..." and exchange "I Feel You", "Send Care", and thoughtful notes.

---

## 8. Proposed V2 Architecture & Information Architecture

```text
                  YOJQI V2 PLATFORM
                          │
                   USER'S JOURNEY
                          │
  ┌───────────────┬───────┴───────┬───────────────┬──────────────┐
  ↓               ↓               ↓               ↓              ↓
DISCOVER        TODAY          JOURNEY         FRIENDS         SHOP
(Universal    (Personalized   (Long-Term      (Calm Human    (Objects For
 Experience)   Daily Space)    Companion)      Community)    Better Moments)
  │               │               │               │              │
  ├─ Onboarding   ├─ Today's      ├─ Rhythm       ├─ "Today I    ├─ By How You
  │  (3 Gentle       Balance         Trends          Feel..."       Want to Feel
  │   Questions)  ├─ Guidance     ├─ Rituals      ├─ I Feel You  ├─ Incense/Tea
  ├─ Needs/       ├─ Ritual          History      ├─ Send Care   ├─ Wearables
  │  States       ├─ Companion    ├─ Preferences  └─ Care Gift   └─ Talismans
  └─ Experiences  └─ For You      └─ Notes           Loop
```

### Key New Routes (Bilingual `/en` and `/zh`):
* `/[lang]/today`: Daily sanctuary, Today's balance, Tonight's ritual, Companion quick check-in.
* `/[lang]/journey`: Personal journey dashboard, state trends, completed rituals, scent/tea preferences.
* `/[lang]/listen`: The Listening Room — "You can say it here. You don't have to solve everything tonight." (Keep Private vs. Share Anonymously).
* `/[lang]/companion`: The YOJQI Companion — Quiet, warm, observant AI personality with modes (Talk, Reset, Ritual, Reflect, Explore) and pluggable model provider architecture.
* `/[lang]/friends`: Editorial anonymous human care community with "I Feel You", "Send Care", "Leave a Note", and Care gift loop.
* `/[lang]/experiences`: Physical retreats (Chongqing Skyline, Baihong Suites, Tea & Incense ceremonies).
* `/[lang]/discover/eastern-living`: Eastern living pillars (Tea, Incense, Seasonal Living, Quiet Rituals).

### Preserved Existing Routes:
* `/[lang]/shop` & `/[lang]/product/[slug]` (upgraded with emotional intentions)
* `/[lang]/talismans` (authentic Taoist vermilion talismans)
* `/[lang]/retreats` & `/[lang]/retreats/[slug]` (Chongqing Drone Show Sanctuaries)
* `/[lang]/wisdom` & `/[lang]/wisdom/[slug]` (Editorial guides)
* `/[lang]/track-order` & `/[lang]/account` & `/[lang]/admin`

---

## 9. Migration & Phasing Strategy

* **Phase 1: Design Tokens & Foundations**: Add subtle cyber-oriental / quiet luxury styling (dark accents, warm amber, jade teal, smooth transitions) into `globals.css` and `tailwind.config.ts`.
* **Phase 2: V2 Navigation**: Update `components/Navbar.tsx` and `components/Footer.tsx` with top-level `DISCOVER | TODAY | JOURNEY | FRIENDS | SHOP` + Search, Language, Currency, Account, Bag.
* **Phase 3: Journey & Onboarding Store (`lib/journey-store.ts`)**: In-memory and local-storage reactive store managing user state (Anonymous, New User, Returning, Long-Term), user onboarding responses, mood check-ins, ritual history, and care interactions.
* **Phase 4: Discover Homepage Evolving**: Refactor `app/[lang]/page.tsx` into the universal "AN EASTERN WAY TO LIVE WELL" experience:
  - Hero with "START YOUR JOURNEY" modal and "EXPLORE YOJQI"
  - 6 User Needs/States: SLEEP, RELAX, RESET, FOCUS, BALANCE, EXPLORE
  - Interactive "Start Your Journey" 3-step conversational flow generating "Your First YOJQI Journey"
  - Living ritual showcases, AI Companion preview, Friends human connection, physical experiences, and products integrated organically.
* **Phase 5: Daily Sanctuary (`/[lang]/today`)**:
  - Today's Balance (Sleep, Energy, Mood, Stress, Focus, Relaxation in non-medical language)
  - Today's Guidance & Tonight's Ritual
  - Companion Quick Dialogue
  - Personalized Recommendations
* **Phase 6: Personal Space (`/[lang]/journey`)**:
  - Current Journey, weekly somatic trends, ritual completion log, lifestyle preferences.
* **Phase 7: The Listening Room (`/[lang]/listen`)**:
  - "You can say it here. You don't have to solve everything tonight."
  - Private submission or anonymous sharing with PII safety warning.
  - Direct transition to YOJQI Companion.
* **Phase 8: YOJQI Companion (`/[lang]/companion`)**:
  - Pluggable AI service abstraction (`lib/companion-service.ts`)
  - Warm, respectful, non-judgmental conversational flow with modes: Talk, Reset, Ritual, Reflect, Explore.
* **Phase 9: YOJQI Friends & Care Loop (`/[lang]/friends`)**:
  - "Today I Feel..." anonymous stream
  - "I Feel You", "Send Care", "Leave a Note"
  - "Send a Little Care" modal (Tea, Incense, Ritual, Note, Gift) linking human warmth to products.
* **Phase 10: Experiences & Eastern Living**:
  - `/[lang]/experiences` and `/[lang]/discover/eastern-living`.
* **Phase 11: Testing & Verification**:
  - Update unit test suite in `tests/` to verify V2 journey state engine, companion responses, anonymous care loop, and zero regressions in existing tests.
  - Verify `npm run build` static generation passes cleanly.

---

## 10. Potential Risks & Safety Guardrails

1. **Medical Claim Boundary**: Strictly use lifestyle/wellness language ("gentle way to slow down", "traditional practice") and avoid clinical/medical diagnosis.
2. **Privacy & Anonymity**: Ensure notes posted to Friends are stripped of identifying information, and private conversations in Listening Room/Companion remain confidential.
3. **SEO Preservation**: Zero broken URLs. Every existing path (`/shop`, `/product/...`, `/talismans`, `/retreats/...`, `/wisdom/...`, `/track-order`, `/admin`) remains fully working.
4. **Performance & Bundle Size**: Keep client components lightweight, leveraging SSR where beneficial and keeping bundle size optimized.
