'use client';

import React from 'react';
import { Sparkles, Wind, Droplets, Feather, Shield } from 'lucide-react';
import { Language } from '@/lib/i18n';
import { Product } from '@/lib/products-data';

interface ScentPyramidProps {
  product: Product;
  lang: Language;
}

export function ScentPyramid({ product, lang }: ScentPyramidProps) {
  const isZh = lang === 'zh';

  if (!product.scentProfile) {
    // If it's a talisman, render the consecrated Daoist energetic structure
    if (product.category === 'protection') {
      return (
        <div className="bg-[#fcfaf7] border border-yojqi-border rounded-xl p-6 my-8 space-y-6">
          <div className="flex items-center gap-2 border-b border-yojqi-border pb-3">
            <Shield className="w-5 h-5 text-amber-700" />
            <h3 className="font-serif text-lg font-medium text-yojqi-ink">
              {isZh ? '道门科仪与法印能量结构' : 'Taoist Seal & Consecrated Energetic Structure'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-yojqi-border shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-amber-800 font-semibold">
                  {isZh ? '01 · 墨宝用料' : '01 · Sacred Ink'}
                </span>
                <h4 className="font-serif text-sm font-semibold text-yojqi-ink mt-1">
                  {isZh ? '高纯原矿朱砂' : 'Pure Mineral Cinnabar'}
                </h4>
                <p className="text-xs text-yojqi-body mt-2">
                  {isZh
                    ? '精选纯阳辰砂矿石细研入墨，自带辟除邪祟、安定心神的强劲磁场。'
                    : 'Natural heavy mineral vermilion carrying concentrated solar yang energy.'}
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-yojqi-border shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-amber-800 font-semibold">
                  {isZh ? '02 · 纸品承载' : '02 · Sacred Parchment'}
                </span>
                <h4 className="font-serif text-sm font-semibold text-yojqi-ink mt-1">
                  {isZh ? '手工古法桑皮黄纸' : 'Handmade Mulberry Paper'}
                </h4>
                <p className="text-xs text-yojqi-body mt-2">
                  {isZh
                    ? '传统草本浸制与日晒干燥，质地厚韧，历经岁月不易泛黄脆化。'
                    : 'Sun-cured fibrous parchment engineered to lock vermilion ink without degradation.'}
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-yojqi-border shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-amber-800 font-semibold">
                  {isZh ? '03 · 坛前法印' : '03 · Altar Seal'}
                </span>
                <h4 className="font-serif text-sm font-semibold text-yojqi-ink mt-1">
                  {isZh ? '正一三清道君印' : 'Celestial Master Stamp'}
                </h4>
                <p className="text-xs text-yojqi-body mt-2">
                  {isZh
                    ? '依道门正规科仪开光，诵经敕笔盖印，锁住纯正护持愿力。'
                    : 'Consecrated at the master altar with strict ritual incantations to seal intention.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }

  const profile = product.scentProfile;

  return (
    <div className="bg-[#fcfaf7] border border-yojqi-border rounded-xl p-6 my-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-yojqi-border pb-3">
        <div className="flex items-center gap-2">
          <Wind className="w-5 h-5 text-yojqi-bronze" />
          <h3 className="font-serif text-lg font-medium text-yojqi-ink">
            {isZh ? '草木香阶与触觉体感谱系' : 'Olfactory Pyramid & Tactile Notes'}
          </h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded bg-amber-100 text-amber-900 border border-amber-200">
          <Droplets className="w-3 h-3" />
          <span>{isZh ? `气味弥散: ${profile.sillageZh}` : `Sillage: ${profile.sillage}`}</span>
        </div>
      </div>

      {/* Pyramid Graphic Blocks */}
      <div className="space-y-3">
        {/* Top Notes */}
        <div className="bg-white p-4 rounded-lg border border-yojqi-border shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0" />
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
                {isZh ? '前调 · 呼吸初触 (Top Notes / Initial Breath)' : 'Top Notes · Initial 5-15 min'}
              </span>
              <p className="font-serif text-sm font-semibold text-yojqi-ink mt-0.5">
                {isZh ? profile.topNotesZh : profile.topNotesEn}
              </p>
            </div>
          </div>
          <span className="text-xs text-yojqi-body md:text-right">
            {isZh ? '醒脑通窍 · 打断内耗' : 'Crisp cognitive disruption'}
          </span>
        </div>

        {/* Heart Notes */}
        <div className="bg-white p-4 rounded-lg border border-yojqi-border shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600 shrink-0" />
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
                {isZh ? '中调 · 沉心共振 (Heart Notes / Sustained Calm)' : 'Heart Notes · 1-4 hours'}
              </span>
              <p className="font-serif text-sm font-semibold text-yojqi-ink mt-0.5">
                {isZh ? profile.heartNotesZh : profile.heartNotesEn}
              </p>
            </div>
          </div>
          <span className="text-xs text-yojqi-body md:text-right">
            {isZh ? '胸腔下沉 · 神经安抚' : 'Parasympathetic steady anchor'}
          </span>
        </div>

        {/* Base Notes */}
        <div className="bg-white p-4 rounded-lg border border-yojqi-border shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-900 shrink-0" />
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
                {isZh ? '尾调 · 余韵贴肤 (Base Notes / Residual Grounding)' : 'Base Notes · All-day sillage'}
              </span>
              <p className="font-serif text-sm font-semibold text-yojqi-ink mt-0.5">
                {isZh ? profile.baseNotesZh : profile.baseNotesEn}
              </p>
            </div>
          </div>
          <span className="text-xs text-yojqi-body md:text-right">
            {isZh ? '温和绵长 · 安定护体' : 'Warm resinous longevity'}
          </span>
        </div>
      </div>

      {/* Tactile Touch Spec */}
      <div className="p-4 bg-amber-50/60 rounded-lg border border-amber-200/80 flex items-start gap-3">
        <Feather className="w-5 h-5 text-yojqi-bronze shrink-0 mt-0.5" />
        <div>
          <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-yojqi-inkHeading">
            {isZh ? '触觉微纹理与躯体心锚反馈' : 'Tactile Sensation & Somatic Trigger'}
          </h4>
          <p className="text-xs text-yojqi-body mt-1 leading-relaxed">
            {isZh ? profile.tactileFeelZh : profile.tactileFeelEn}
          </p>
        </div>
      </div>
    </div>
  );
}
