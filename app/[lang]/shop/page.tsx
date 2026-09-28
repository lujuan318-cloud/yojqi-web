import React from 'react';
import Link from 'next/link';
import { Language, getDictionary } from '@/lib/i18n';
import { PRODUCTS, getProductsByCategory } from '@/lib/products-data';
import { ProductCard } from '@/components/ProductCard';
import { ShieldCheck, Truck, RotateCcw, Sparkles, Heart } from 'lucide-react';

export default async function ShopPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ category?: string; feel?: string }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const lang = resolvedParams.lang as Language;
  const category = resolvedSearchParams.category || 'all';
  const feel = resolvedSearchParams.feel;
  const dict = getDictionary(lang);
  const isZh = lang === 'zh';

  let products = getProductsByCategory(category);

  // If filtered by emotional feeling state
  if (feel) {
    if (feel === 'sleep') {
      products = products.filter(p => p.category === 'sleep');
    } else if (feel === 'relax') {
      products = products.filter(p => p.category === 'balance');
    } else if (feel === 'focus') {
      products = products.filter(p => p.category === 'focus');
    } else if (feel === 'care' || feel === 'gift') {
      products = products.filter(p => p.category === 'gift');
    } else if (feel === 'protection') {
      products = products.filter(p => p.category === 'protection');
    }
  }

  const feelFilters = [
    { id: 'all', labelZh: '全部器物', labelEn: 'All Objects' },
    { id: 'sleep', labelZh: '更深沉睡眠', labelEn: 'Sleep Better' },
    { id: 'relax', labelZh: '放慢当下节奏', labelEn: 'Slow Down' },
    { id: 'focus', labelZh: '恢复清明专注', labelEn: 'Sharpen Focus' },
    { id: 'protection', labelZh: '符咒护身御气', labelEn: 'Protection & Talismans' },
    { id: 'care', labelZh: '为珍视的人备礼', labelEn: 'Care for Someone' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yojqi-sand text-yojqi-bronze text-xs font-mono uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isZh ? '契合当下身心的器物' : 'Objects for Better Moments'}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-medium text-yojqi-inkHeading">
          {dict.shop.title}
        </h1>
        <p className="text-sm sm:text-base text-yojqi-body leading-relaxed">
          {isZh
            ? '并非单纯陈列商品，而是为你寻找契合此时此刻呼吸与心境的伴行之物。'
            : 'Not an endless catalog, but tangible anchors to accompany your daily somatic journey.'}
        </p>
      </div>

      {/* SHOP BY HOW YOU WANT TO FEEL (Emotional Intention Filter) */}
      <div className="space-y-3">
        <span className="text-xs font-mono uppercase tracking-wider text-yojqi-bronze text-center block font-semibold">
          {isZh ? '按你渴望重返的身心感受选品' : 'Shop by How You Want to Feel'}
        </span>
        <div className="flex flex-wrap items-center justify-center gap-2 pb-4 border-b border-yojqi-border">
          {feelFilters.map((f) => {
            const active = (!feel && f.id === 'all') || feel === f.id;
            return (
              <Link
                key={f.id}
                href={`/${lang}/shop${f.id === 'all' ? '' : `?feel=${f.id}`}`}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all ${
                  active
                    ? 'bg-yojqi-ink text-[#fffdfa] shadow-xs'
                    : 'bg-white border border-yojqi-border text-yojqi-body hover:border-yojqi-bronze hover:text-yojqi-ink'
                }`}
              >
                {isZh ? f.labelZh : f.labelEn}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Product Catalog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} lang={lang} />
        ))}
      </div>

      {/* Brand Reassurance Banner */}
      <div className="mt-16 p-8 rounded-3xl bg-yojqi-warm border border-yojqi-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <Truck className="w-5 h-5 text-yojqi-bronze shrink-0" />
            <div className="text-xs text-yojqi-body">
              <strong className="block text-yojqi-ink font-semibold">
                {lang === 'zh' ? '全球可追踪直邮' : 'Trackable Worldwide Shipping'}
              </strong>
              {lang === 'zh' ? '支持中英文地址与多币种便捷结算' : 'Dispatched with insured courier tracking.'}
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <ShieldCheck className="w-5 h-5 text-yojqi-bronze shrink-0" />
            <div className="text-xs text-yojqi-body">
              <strong className="block text-yojqi-ink font-semibold">
                {lang === 'zh' ? '正统开光与纯天然药材' : 'Authentic Consecration & Pure Herbs'}
              </strong>
              {lang === 'zh' ? '真原矿朱砂 · 坛前敕笔盖印' : '100% genuine cinnabar vermilion & master altar seals.'}
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
