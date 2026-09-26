import React from 'react';
import Link from 'next/link';
import { Language, getDictionary } from '@/lib/i18n';
import { PRODUCTS, getProductsByCategory } from '@/lib/products-data';
import { ProductCard } from '@/components/ProductCard';
import { ShieldCheck, Truck, RotateCcw } from 'lucide-react';

export default async function ShopPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const lang = resolvedParams.lang as Language;
  const category = resolvedSearchParams.category || 'all';
  const dict = getDictionary(lang);

  const products = getProductsByCategory(category);

  const categories = [
    { id: 'all', label: dict.shop.filterAll },
    { id: 'balance', label: dict.shop.filterBalance },
    { id: 'sleep', label: dict.shop.filterSleep },
    { id: 'focus', label: dict.shop.filterFocus },
    { id: 'gift', label: dict.shop.filterGift },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-mono font-medium tracking-widest text-yojqi-bronze uppercase">
          {lang === 'zh' ? 'YOJQI 官方随身锚点选品' : 'YOJQI Wearable Somatic Shop'}
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-medium text-yojqi-inkHeading">
          {dict.shop.title}
        </h1>
        <p className="text-sm sm:text-base text-yojqi-body leading-relaxed">
          {dict.shop.subtitle}
        </p>
      </div>

      {/* Intention Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 pb-4 border-b border-yojqi-border">
        {categories.map((cat) => {
          const isActive = category === cat.id;
          return (
            <Link
              key={cat.id}
              href={`/${lang}/shop${cat.id === 'all' ? '' : `?category=${cat.id}`}`}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all ${
                isActive
                  ? 'bg-yojqi-ink text-[#fffdfa] shadow-xs'
                  : 'bg-white border border-yojqi-border text-yojqi-body hover:border-yojqi-bronze hover:text-yojqi-ink'
              }`}
            >
              {cat.label}
            </Link>
          );
        })}
      </div>

      {/* Product Catalog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} lang={lang} />
        ))}
      </div>

      {/* Brand Reassurance Banner */}
      <div className="mt-16 p-8 rounded-2xl bg-yojqi-warm border border-yojqi-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <Truck className="w-5 h-5 text-yojqi-bronze shrink-0" />
            <div className="text-xs text-yojqi-body">
              <strong className="block text-yojqi-ink font-semibold">
                {lang === 'zh' ? '全球精准直邮' : 'Trackable Worldwide Shipping'}
              </strong>
              {lang === 'zh' ? '支持中英文地址，极速安全送达' : 'Dispatched with global tracking within 48h.'}
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <ShieldCheck className="w-5 h-5 text-yojqi-bronze shrink-0" />
            <div className="text-xs text-yojqi-body">
              <strong className="block text-yojqi-ink font-semibold">
                {lang === 'zh' ? '纯天然草本无害' : '100% Pure Botanical Formulations'}
              </strong>
              {lang === 'zh' ? '严选道地药材与天然树脂合香' : 'Free of synthetic artificial fragrance compounds.'}
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <RotateCcw className="w-5 h-5 text-yojqi-bronze shrink-0" />
            <div className="text-xs text-yojqi-body">
              <strong className="block text-yojqi-ink font-semibold">
                {lang === 'zh' ? '30天静心退换' : '30-Day Mindful Exchange'}
              </strong>
              {lang === 'zh' ? '如不契合身体感官，管家专属协助退换' : 'Quiet, hassle-free returns if sensory fit is unaligned.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
