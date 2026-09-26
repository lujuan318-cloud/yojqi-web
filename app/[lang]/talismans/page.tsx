import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Shield, Sparkles, Flame, CheckCircle, ArrowRight, BookOpen, Compass } from 'lucide-react';
import { Language, getDictionary } from '@/lib/i18n';
import { getProductsByCategory } from '@/lib/products-data';
import { ProductCard } from '@/components/ProductCard';

export default async function TalismansPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Language;
  const dict = getDictionary(lang);
  const isZh = lang === 'zh';

  const talismans = getProductsByCategory('protection');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden bg-[#181816] text-[#fffdfa] p-8 sm:p-14 border border-yojqi-border">
        <div className="absolute inset-0 bg-radial-gradient opacity-20 pointer-events-none" />
        <div className="max-w-3xl relative z-10 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-900/60 border border-amber-700/50 text-amber-300 text-xs font-mono uppercase tracking-widest">
            <Shield className="w-3.5 h-3.5" />
            <span>{dict.talismans.eyebrow}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            {dict.talismans.title}
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
            {dict.talismans.subtitle}
          </p>

          <div className="pt-4 flex flex-wrap gap-4 text-xs font-mono text-amber-200">
            <span className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-lg border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              {isZh ? '正统道教法师朱砂手书' : 'Hand-inscribed by Daoist Master'}
            </span>
            <span className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-lg border border-white/10">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              {isZh ? '天然辰砂原矿 · 纯阳正气' : 'Pure Yang Cinnabar Vermilion'}
            </span>
            <span className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-lg border border-white/10">
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              {isZh ? '正一三清坛前敕笔盖印' : 'Celestial Altar Consecration'}
            </span>
          </div>
        </div>
      </div>

      {/* 3-Step Consecration Craftsmanship */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono font-medium tracking-widest text-yojqi-bronze uppercase">
            {isZh ? '千载道法传承 · 存思运炁' : 'Ancient Lineage · Consecration Regimen'}
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-semibold text-yojqi-ink">
            {dict.talismans.craftTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#fffdfa] border border-yojqi-border rounded-2xl p-6 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-900 font-mono font-bold text-sm">
              01
            </div>
            <h3 className="font-serif text-lg font-bold text-yojqi-ink">
              {dict.talismans.craftStep1Title}
            </h3>
            <p className="text-xs sm:text-sm text-yojqi-body leading-relaxed">
              {dict.talismans.craftStep1Desc}
            </p>
          </div>

          <div className="bg-[#fffdfa] border border-yojqi-border rounded-2xl p-6 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-900 font-mono font-bold text-sm">
              02
            </div>
            <h3 className="font-serif text-lg font-bold text-yojqi-ink">
              {dict.talismans.craftStep2Title}
            </h3>
            <p className="text-xs sm:text-sm text-yojqi-body leading-relaxed">
              {dict.talismans.craftStep2Desc}
            </p>
          </div>

          <div className="bg-[#fffdfa] border border-yojqi-border rounded-2xl p-6 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-900 font-mono font-bold text-sm">
              03
            </div>
            <h3 className="font-serif text-lg font-bold text-yojqi-ink">
              {dict.talismans.craftStep3Title}
            </h3>
            <p className="text-xs sm:text-sm text-yojqi-body leading-relaxed">
              {dict.talismans.craftStep3Desc}
            </p>
          </div>
        </div>
      </div>

      {/* The 10 Talisman Catalog */}
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-yojqi-border pb-4">
          <div>
            <span className="text-xs font-mono font-medium tracking-widest text-yojqi-bronze uppercase">
              {isZh ? '十方符命 · 各应所求' : 'Authentic 10 Consecrated SKUs'}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-yojqi-ink mt-1">
              {isZh ? '道家手书开光灵符典藏' : 'Consecrated Taoist Talismans Collection'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-yojqi-body">
            {isZh ? '一符一敕令，原矿朱砂真迹，支持全球顺丰/国际专线极速直达' : 'Each talisman is individually hand-inscribed and sealed.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {talismans.map((product) => (
            <ProductCard key={product.id} product={product} lang={lang} />
          ))}
        </div>
      </div>

      {/* Carry & Care Instructions Guide */}
      <div className="bg-yojqi-warm border border-yojqi-border rounded-3xl p-8 sm:p-12 space-y-6">
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-yojqi-bronze uppercase">
            <BookOpen className="w-4 h-4" />
            <span>{isZh ? '道门奉请与随身佩戴指南' : 'Daoist Carrying & Placement Protocol'}</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-yojqi-ink">
            {dict.talismans.howToCarryTitle}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="bg-white p-5 rounded-xl border border-yojqi-border shadow-xs space-y-2">
            <h4 className="font-serif text-base font-bold text-yojqi-ink flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-amber-700" />
              {isZh ? '随身贴身携带' : 'Personal Daily Carry'}
            </h4>
            <p className="text-xs sm:text-sm text-yojqi-body leading-relaxed">
              {dict.talismans.carryWallet}
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-yojqi-border shadow-xs space-y-2">
            <h4 className="font-serif text-base font-bold text-yojqi-ink flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-amber-700" />
              {isZh ? '床头枕下安放' : 'Bedside & Nocturnal'}
            </h4>
            <p className="text-xs sm:text-sm text-yojqi-body leading-relaxed">
              {dict.talismans.carryPillow}
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-yojqi-border shadow-xs space-y-2">
            <h4 className="font-serif text-base font-bold text-yojqi-ink flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-amber-700" />
              {isZh ? '居所大门镇宅' : 'Home Entrance Sanctuary'}
            </h4>
            <p className="text-xs sm:text-sm text-yojqi-body leading-relaxed">
              {dict.talismans.carryHome}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
