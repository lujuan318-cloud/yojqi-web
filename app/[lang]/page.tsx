import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, Moon, Zap, Shield, Gift, Compass, ChevronRight } from 'lucide-react';
import { Language, getDictionary } from '@/lib/i18n';
import { PRODUCTS } from '@/lib/products-data';
import { SANCTUARY_PROPERTIES } from '@/lib/retreats-data';
import { INITIAL_ARTICLES } from '@/lib/editorial-data';
import { ProductCard } from '@/components/ProductCard';
import { RetreatCard } from '@/components/RetreatCard';
import { ArticleCard } from '@/components/ArticleCard';

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Language;
  const dict = getDictionary(lang);

  const intentions = [
    {
      id: 'balance',
      name: dict.intentions.balanceTitle,
      desc: dict.intentions.balanceDesc,
      icon: Shield,
      href: `/${lang}/shop?category=balance`,
      count: lang === 'zh' ? '4 款选品' : '4 Products',
    },
    {
      id: 'sleep',
      name: dict.intentions.sleepTitle,
      desc: dict.intentions.sleepDesc,
      icon: Moon,
      href: `/${lang}/shop?category=sleep`,
      count: lang === 'zh' ? '2 款选品' : '2 Products',
    },
    {
      id: 'focus',
      name: dict.intentions.focusTitle,
      desc: dict.intentions.focusDesc,
      icon: Zap,
      href: `/${lang}/shop?category=focus`,
      count: lang === 'zh' ? '4 款选品' : '4 Products',
    },
    {
      id: 'gift',
      name: dict.intentions.giftTitle,
      desc: dict.intentions.giftDesc,
      icon: Gift,
      href: `/${lang}/shop?category=gift`,
      count: lang === 'zh' ? '2 款套组' : '2 Sets',
    },
  ];

  // Pick top 4 products for homepage
  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-gradient-to-b from-[#fffaf6] via-[#fffdfa] to-white border-b border-yojqi-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yojqi-sand text-yojqi-bronze text-xs font-mono tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{dict.hero.eyebrow}</span>
              </div>

              <div className="space-y-2">
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-yojqi-inkHeading leading-[1.15]">
                  {dict.hero.title}
                </h1>
                <p className="font-serif text-xl sm:text-2xl text-yojqi-bronze italic">
                  {dict.hero.subtitle}
                </p>
              </div>

              <p className="text-base sm:text-lg text-yojqi-body leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {dict.hero.desc}
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href={`/${lang}/shop`}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl yojqi-btn-primary text-sm font-medium tracking-wide flex items-center justify-center gap-2"
                >
                  <span>{dict.hero.exploreShop}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href={`/${lang}/retreats`}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl yojqi-btn-secondary text-sm font-medium tracking-wide flex items-center justify-center gap-2"
                >
                  <Compass className="w-4 h-4 text-yojqi-bronze" />
                  <span>{dict.hero.discoverRetreats}</span>
                </Link>
              </div>
            </div>

            {/* Right Hero Visual (Real High-Res Night Drone View) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden border border-yojqi-borderAccent shadow-2xl bg-neutral-900 aspect-[4/5]">
                <Image
                  src="/images/retreats/baihong-drone-night.jpg"
                  alt="YOJQI Chongqing Skyline & Drone Show Terrace"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Overlay Card */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-white/50 text-yojqi-ink shadow-lg">
                  <div className="flex items-center gap-2 text-[11px] font-mono font-semibold text-amber-800 uppercase mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>{lang === 'zh' ? '两江汇天幕机位 · 现房实景' : 'Live High-Altitude Terrace'}</span>
                  </div>
                  <h4 className="font-serif text-base font-semibold">
                    {lang === 'zh' ? '白宏无人机机位江景公寓' : 'Baihong Drone Show Apartment'}
                  </h4>
                  <p className="text-xs text-yojqi-body line-clamp-1 mt-0.5">
                    {lang === 'zh' ? '坐拥两江交汇浩瀚全景，私享无人机天幕' : 'Front-row balcony overlooking the Yangtze & Jialing confluence.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FOUR INTENTIONS ENTRANCE ("Begin with the state you wish to return to") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-mono font-medium tracking-widest text-yojqi-bronze uppercase block">
            {lang === 'zh' ? '意图导向 · 身心回归' : 'Intention-Driven Taxonomy'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-yojqi-inkHeading">
            {dict.intentions.title}
          </h2>
          <p className="text-sm text-yojqi-body">
            {dict.intentions.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {intentions.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={item.href}
                className="group p-6 bg-white rounded-2xl border border-yojqi-border hover:border-yojqi-borderAccent hover:shadow-cardHover transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-yojqi-sand flex items-center justify-center text-yojqi-bronze group-hover:bg-yojqi-ink group-hover:text-white transition-colors mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg font-medium text-yojqi-inkHeading group-hover:text-yojqi-bronze transition-colors leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-xs text-yojqi-body mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-yojqi-bronze font-medium">
                  <span>{item.count}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS ("Find the ritual that meets your moment") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-mono font-medium tracking-widest text-yojqi-bronze uppercase block mb-1">
              {lang === 'zh' ? '经典随身香丸锚点' : 'Signature Anchors'}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-yojqi-inkHeading">
              {lang === 'zh' ? '契合你当下呼吸的随身物件' : 'Find the Ritual That Meets Your Moment'}
            </h2>
          </div>
          <Link
            href={`/${lang}/shop`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-yojqi-ink hover:text-yojqi-bronze transition-colors"
          >
            <span>{lang === 'zh' ? '查看全部 10 款选品' : 'Explore All Collections'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} lang={lang} />
          ))}
        </div>
      </section>

      {/* 4. CHONGQING DRONE SHOW SANCTUARIES SPOTLIGHT */}
      <section className="bg-yojqi-warm py-20 border-y border-yojqi-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-mono font-semibold tracking-widest text-amber-800 uppercase block">
              {dict.retreats.eyebrow}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-yojqi-inkHeading">
              {dict.retreats.title}
            </h2>
            <p className="text-sm text-yojqi-body leading-relaxed">
              {dict.retreats.subtitle}
            </p>
          </div>

          <div className="space-y-10">
            {SANCTUARY_PROPERTIES.map((property) => (
              <RetreatCard key={property.id} property={property} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. SOMATIC WISDOM JOURNAL (Strict 820x400 + AI Search Takeaway) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
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
            className="inline-flex items-center gap-1.5 text-sm font-medium text-yojqi-ink hover:text-yojqi-bronze transition-colors"
          >
            <span>{lang === 'zh' ? '进入专栏与攻略库' : 'Browse All Articles'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {INITIAL_ARTICLES.map((article) => (
            <ArticleCard key={article.id} article={article} lang={lang} />
          ))}
        </div>
      </section>

      {/* 6. BRAND ETHOS SECTION */}
      <section id="ethos" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-yojqi-border text-center space-y-6 shadow-xs">
          <span className="text-xs font-mono font-semibold tracking-widest text-yojqi-bronze uppercase">
            {lang === 'zh' ? 'YOJQI 品牌初心' : 'The YOJQI Ethos'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-yojqi-inkHeading leading-snug">
            {lang === 'zh'
              ? '不以喧哗争夺视线，只在触碰时唤醒宁静'
              : 'We do not shout for attention. We return you to your breath.'}
          </h2>
          <p className="text-sm sm:text-base text-yojqi-body leading-relaxed max-w-2xl mx-auto">
            {lang === 'zh'
              ? '在这个被屏幕与通知切碎的时代，心跳与呼吸常常遗忘了自律的节奏。YOJQI 创造随身佩戴的触觉香丸锚点，并在山城云雾江畔营建不受惊扰的高空私享居所。当你的指腹触碰陶丸，当你的目光投向两江浩瀚，浮躁便已悄然止息。'
              : 'In an era fractured by screens and notifications, autonomic calm is rarely restored by thoughts alone. YOJQI crafts tactile wearable anchors and elevated sky residences over the Yangtze mist. Touch the ceramic, breathe in the botanical resin, and find stillness.'}
          </p>
        </div>
      </section>
    </div>
  );
}
