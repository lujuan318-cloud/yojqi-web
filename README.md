# YOJQI Official Next-Gen Web Platform

> **东方身心穿戴体感系统与重庆高空无人机机位艺术宿集官方平台**  
> High-performance DTC E-Commerce, Chongqing Drone Show Sanctuaries & Dual-Track Somatic Editorial Platform.

Built with the **ChinaStayFinder Modern Architecture Stack**:
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Server Components & Static Site Generation)
- **Frontend**: React 19, TypeScript, Tailwind CSS 3.4
- **Database & Auth**: Supabase (PostgreSQL, Row-Level Security, Edge API)
- **Global Payments**: Stripe Checkout (Apple Pay, Google Pay, Credit Cards, Multi-Currency)
- **Icons**: Lucide React
- **Performance**: Edge CDN Caching (<50ms Global TTFB, handles 100k+ concurrent visits)

---

## 🌟 Core Modules

### 1. DTC E-Commerce (`/shop` & `/product/[slug]`)
- **V2.0 Result-Driven Taxonomy**: Catalog organized by somatic intentions (`Sleep`, `Focus`, `Balance`, `Gift`) rather than raw shapes.
- **10+ Signature SKUs**:
  - Ambergris Ease Pendant & Wrist Anchor Bracelet
  - Osmanthus Poise Pendant & Autumn Resonance Bracelet
  - Ruihe Sanctuary Sleep Pendant & Bracelet
  - Kinetic Energy Anchor Pendant & Bracelet
  - Imperial Cooling Guard Pendant & Bracelet
  - Complete Trilogy Box & Ambergris Couple Sanctuary Set
- **Stripe Checkout Integration**: Seamless card & mobile payments with instant order confirmation.
- **Cross-Pairing Recommendations**: Automatic cross-linking between pendants and bracelets.

### 2. Chongqing Drone Show Sanctuaries (`/retreats` & `/retreats/[slug]`)
- **Baihong Drone Show Apartment (白宏无人机机位江景公寓)**:
  - Unobstructed high-floor terrace overlooking Yangtze/Jialing River confluence.
  - Front-row viewing of holiday drone shows, avoiding 50,000+ tourist street gridlock.
  - Acoustic double-glazing, Kung Fu tea tasting table, and Ruihe sleep kits.
- **YOJQI Drone Show Art Sanctuary (YOJQI 无人机机位艺术宿集)**:
  - Oriental wabi-sabi aesthetics, sound bath singing bowls, Tibetan saffron foot soaking tubs.
- **Direct Concierge Lead Capture**: Integrated 1-click VIP WhatsApp and WeChat reservation modal.

### 3. Dual-Track Somatic Wisdom Journal (`/wisdom` & `/wisdom/[slug]`)
- **Track 1: Somatic Healing & Vagus Nerve**: Tactile grounding, autonomic regulation, botanical resins.
- **Track 2: Chongqing Drone Show & Travel**: Viewing guides, crowd-avoidance itineraries, tea culture.
- **GEO AI Search Engine Optimization**:
  - Dedicated `.yojqi-takeaway` direct answer callout boxes for GPT / Perplexity / Google AI Overviews.
  - Step-by-step 4-Step Practice cards.
  - Strict 820×400px aspect-ratio hero image standard.

### 4. Automated Publishing & Webhooks (`/api/editorial/publish`)
- Receives automated daily bilingual articles from Python pipelines.
- Upserts directly into Supabase PostgreSQL.
- Triggers on-demand Next.js ISR cache revalidation (`revalidatePath`).

---

## 🚀 Quick Start

### 1. Installation
```bash
cd D:\AI工作空间\yojqi-web
npm install
```

### 2. Development Mode
```bash
npm run dev
# Open http://localhost:3000
```

### 3. Production Build & Start
```bash
npm run build
npm run start
```

---

## ⚙️ Environment Variables (`.env.local`)

```env
# Public App URL
NEXT_PUBLIC_APP_URL=https://yojqi.com

# Stripe Integration
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Supabase (Optional in dev, required in production)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Internal Admin Secret for automated publishing webhooks
EDITORIAL_API_SECRET=yojqi_editorial_secret_key_2026

# Enterprise WeChat Webhook
WECOM_WEBHOOK_URL=https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=bbd302ab-131c-40c7-9675-572099f22ac7
```
