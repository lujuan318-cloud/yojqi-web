import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, Flame, Shield, MapPin, Compass } from 'lucide-react';
import { Language, getDictionary } from '@/lib/i18n';
import { PRODUCTS, getProductsByCategory } from '@/lib/products-data';
import { SANCTUARY_PROPERTIES } from '@/lib/retreats-data';
import { INITIAL_ARTICLES } from '@/lib/editorial-data';
import { ProductCard } from '@/components/ProductCard';
import { RetreatCard } from '@/components/RetreatCard';
import { ArticleCard } from '@/components/ArticleCard';
import { BreathingCircle } from '@/components/BreathingCircle';
import { MindEnergyQuiz } from '@/components/MindEnergyQuiz';
import { ReviewsSection } from '@/components/ReviewsSection';
import { DiscoverClientSections } from '@/components/DiscoverClientSections';

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Language;
  const dict = getDictionary(lang);
  const isZh = lang === 'zh';

  // Organic selection of wearable objects (integrated, not dominating)
  const featuredWearables = PRODUCTS.filter(p => p.category !== 'protection').slice(0, 4);

  // Consecrated Taoist talismans
  const featuredTalismans = getProductsByCategory('protection').slice(0, 4);

  return (
    <div className="space-y-24 pb-20">
      {/* 1. BRAND → 2. NEED / STATE → 3. LIFESTYLE → 4. RITUAL → 5. COMPANION → 6. FRIENDS */}
      <DiscoverClientSections lang={lang} />

      {/* 7. INTERACTIVE 4-7-8 SOMATIC BREATHING CIRCLE */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <BreathingCircle lang={lang} />
      </section>

      {/* 8. PHYSICAL EXPERIENCES (Chongqing Skyline & Drone Balconies) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-yojqi-bronze mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{isZh ? '真实空间居停' : 'Physical Sanctuaries'}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-yojqi-inkHeading">
              {isZh ? '重庆高空无人机机位艺术宿集' : 'Chongqing Skyline Drone Show Suites'}
            </h2>
          </div>
          <Link
            href={`/${lang}/retreats`}
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-yojqi-ink hover:text-yojqi-bronze transition-colors"
          >
            <span>{isZh ? '查看两江机位档期' : 'Explore All Suites'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {SANCTUARY_PROPERTIES.map((property) => (
            <RetreatCard key={property.id} property={property} lang={lang} />
          ))}
        </div>
      </section>

      {/* 9. TAOIST TALISMANS SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1c1b18] text-[#fffdfa] rounded-3xl p-8 sm:p-12 border border-amber-900/40 shadow-xl space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-amber-900/50 pb-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-900/60 border border-amber-600/40 text-amber-300 text-xs font-mono uppercase tracking-widest">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>{dict.talismans.eyebrow}</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-white">
                {dict.talismans.title}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl leading-relaxed">
                {dict.talismans.subtitle}
              </p>
            </div>
            <Link
              href={`/${lang}/talismans`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-mono uppercase tracking-widest font-semibold transition-colors shrink-0"
            >
              <span>{isZh ? '进入符咒专区' : 'View All 10 Talismans'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTalismans.map((product) => (
              <ProductCard key={product.id} product={product} lang={lang} darkTheme />
            ))}
          </div>
        </div>
      </section>

      {/* 10. OBJECTS FOR BETTER MOMENTS (Products Integrated Organically) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-mono font-medium tracking-widest text-yojqi-bronze uppercase block mb-1">
              {isZh ? '契合当下的具身器物' : 'Objects for Better Moments'}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-yojqi-inkHeading">
              {isZh ? '随身草木香丸锚点' : 'Wearable Herbal Scent Anchors'}
            </h2>
          </div>
          <Link
            href={`/${lang}/shop`}
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-yojqi-ink hover:text-yojqi-bronze transition-colors"
          >
            <span>{isZh ? '探索全部器物' : 'Explore All Objects'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredWearables.map((product) => (
            <ProductCard key={product.id} product={product} lang={lang} />
          ))}
        </div>
      </section>

      {/* 11. MIND & ENERGY DIAGNOSTIC QUIZ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <MindEnergyQuiz lang={lang} />
      </section>

      {/* 12. EDITORIAL WISDOM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-mono font-medium tracking-widest text-yojqi-bronze uppercase block mb-1">
              {dict.wisdom.eyebrow}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-yojqi-inkHeading">
              {dict.wisdom.title}
            </h2>
          </div>
          <Link
            href={`/${lang}/wisdom`}
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-yojqi-ink hover:text-yojqi-bronze transition-colors"
          >
            <span>{isZh ? '查阅专栏全览' : 'Read All Journals'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {INITIAL_ARTICLES.map((article) => (
            <ArticleCard key={article.slug} article={article} lang={lang} />
          ))}
        </div>
      </section>

      {/* 13. TESTIMONIALS & REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ReviewsSection lang={lang} />
      </section>
    </div>
  );
}
