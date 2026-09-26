'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Plus, Shield } from 'lucide-react';
import { Product } from '@/lib/products-data';
import { Language, getDictionary } from '@/lib/i18n';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';

interface ProductCardProps {
  product: Product;
  lang: Language;
}

export function ProductCard({ product, lang }: ProductCardProps) {
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const dict = getDictionary(lang);

  const categoryLabels = {
    sleep: lang === 'zh' ? '夜间安睡' : 'Sleep Ritual',
    focus: lang === 'zh' ? '深度专注' : 'Focus State',
    balance: lang === 'zh' ? '情绪平衡' : 'Daily Balance',
    protection: lang === 'zh' ? '符咒护身' : 'Daoist Protection',
    gift: lang === 'zh' ? '典藏礼盒' : 'Sanctuary Gift',
  };

  const typeLabels = {
    bracelet: lang === 'zh' ? '手腕锚点 · 日常触感' : 'Wrist Anchor · Daily Tactile',
    pendant: lang === 'zh' ? '胸前胸坠 · 呼吸共振' : 'Pendant · Breath Synchrony',
    talisman: lang === 'zh' ? '朱砂手书 · 坛前开光' : 'Hand-Inscribed Vermilion',
    set: lang === 'zh' ? '全境典藏 · 礼遇同频' : 'Complete Set · Shared Ritual',
  };

  return (
    <div className="group flex flex-col bg-white rounded-xl border border-yojqi-border hover:border-yojqi-borderAccent hover:shadow-cardHover transition-all duration-300 overflow-hidden">
      {/* Image container */}
      <Link
        href={`/${lang}/product/${product.slug}`}
        className="relative w-full aspect-square bg-yojqi-warm overflow-hidden block"
      >
        <Image
          src={product.heroImage}
          alt={lang === 'zh' ? product.nameZh : product.nameEn}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className="px-2.5 py-1 text-[11px] font-mono tracking-wider uppercase rounded-full bg-white/95 backdrop-blur-xs text-yojqi-inkHeading border border-yojqi-border shadow-xs flex items-center gap-1">
            {product.category === 'protection' && <Shield className="w-3 h-3 text-amber-700" />}
            <span>{categoryLabels[product.category] || product.category}</span>
          </span>
        </div>
      </Link>

      {/* Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-[11px] font-mono tracking-widest text-yojqi-bronze uppercase mb-1">
            {typeLabels[product.type] || product.type}
          </div>

          <Link href={`/${lang}/product/${product.slug}`}>
            <h3 className="font-serif text-lg font-medium text-yojqi-inkHeading group-hover:text-yojqi-bronze transition-colors line-clamp-1">
              {lang === 'zh' ? product.nameZh : product.nameEn}
            </h3>
          </Link>

          <p className="text-xs text-yojqi-body line-clamp-2 mt-1.5 leading-relaxed">
            {lang === 'zh' ? product.taglineZh : product.taglineEn}
          </p>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-lg font-semibold text-yojqi-ink">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-neutral-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg yojqi-btn-primary text-xs font-medium tracking-wide"
            aria-label={`Add ${product.nameEn} to bag`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{dict.shop.addToBag}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
