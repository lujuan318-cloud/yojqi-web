-- ==============================================================================
-- YOJQI Official Platform - Database Schema (Supabase PostgreSQL)
-- Modeled for High-Concurrency, Edge CDN Invalidation, and Bilingual Content
-- ==============================================================================

-- 1. Editorial Articles & AI Takeaways Table
CREATE TABLE IF NOT EXISTS public.editorial_articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    track TEXT NOT NULL CHECK (track IN ('product_wisdom', 'chongqing_travel')),
    title_en TEXT NOT NULL,
    title_zh TEXT NOT NULL,
    summary_en TEXT,
    summary_zh TEXT,
    direct_takeaway_en TEXT,
    direct_takeaway_zh TEXT,
    featured_image TEXT,
    publish_date DATE DEFAULT CURRENT_DATE,
    read_time_en TEXT DEFAULT '5 min read',
    read_time_zh TEXT DEFAULT '5 分钟阅读',
    author_en TEXT DEFAULT 'YOJQI Somatic Lab',
    author_zh TEXT DEFAULT 'YOJQI 身心疗愈实验室',
    tags_en TEXT[] DEFAULT '{}',
    tags_zh TEXT[] DEFAULT '{}',
    content_html_en TEXT NOT NULL,
    content_html_zh TEXT NOT NULL,
    four_step_practice_en JSONB,
    four_step_practice_zh JSONB,
    related_product_slug TEXT,
    related_property_slug TEXT,
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_editorial_slug ON public.editorial_articles (slug);
CREATE INDEX IF NOT EXISTS idx_editorial_track ON public.editorial_articles (track);
CREATE INDEX IF NOT EXISTS idx_editorial_created ON public.editorial_articles (created_at DESC);

-- 2. Sanctuary Bookings & Concierge Inquiries
CREATE TABLE IF NOT EXISTS public.sanctuary_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_slug TEXT NOT NULL,
    guest_name TEXT,
    contact_channel TEXT CHECK (contact_channel IN ('wechat', 'whatsapp', 'phone', 'email')),
    contact_value TEXT,
    check_in_date DATE,
    check_out_date DATE,
    guests_count INTEGER DEFAULT 2,
    special_requests TEXT,
    drone_show_focus BOOLEAN DEFAULT true,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'confirmed', 'cancelled')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sanctuary_inquiries_prop ON public.sanctuary_inquiries (property_slug);

-- 3. E-Commerce Stripe Orders Record
CREATE TABLE IF NOT EXISTS public.ecommerce_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    stripe_session_id TEXT UNIQUE,
    customer_email TEXT,
    customer_name TEXT,
    shipping_address JSONB,
    currency TEXT DEFAULT 'usd',
    amount_total NUMERIC(10, 2) NOT NULL,
    items JSONB NOT NULL,
    payment_status TEXT DEFAULT 'unpaid',
    fulfillment_status TEXT DEFAULT 'unfulfilled' CHECK (fulfillment_status IN ('unfulfilled', 'processing', 'shipped', 'delivered', 'refunded')),
    tracking_number TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_stripe_session ON public.ecommerce_orders (stripe_session_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.editorial_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sanctuary_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ecommerce_orders ENABLE ROW LEVEL SECURITY;

-- Public read policies for articles
CREATE POLICY "Public read editorial articles" ON public.editorial_articles
    FOR SELECT USING (true);

-- Service role full access policies
CREATE POLICY "Service role full access on articles" ON public.editorial_articles
    FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access on inquiries" ON public.sanctuary_inquiries
    FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access on orders" ON public.ecommerce_orders
    FOR ALL TO service_role USING (true) WITH CHECK (true);
