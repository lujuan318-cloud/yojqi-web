'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, ArrowRight, ShieldCheck, Heart, Sparkles, Check, Shield } from 'lucide-react';
import { Product, getProductBySlug } from '@/lib/products-data';
import { Language, getDictionary } from '@/lib/i18n';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { ScentPyramid } from '@/components/ScentPyramid';
import { StickyBuyBar } from '@/components/StickyBuyBar';

interface ProductDetailViewProps {
  product: Product;
  lang: Language;
}

export function ProductDetailView({ product, lang }: ProductDetailViewProps) {
  const [selectedImage, setSelectedImage] = useState(product.heroImage);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const dict = getDictionary(lang);

  const pairedProduct = product.pairedSlug ? getProductBySlug(product.pairedSlug) : null;

  const handleAdd = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const typeLabels = {
    bracelet: lang === 'zh' ? '手腕锚点 · 日常触感' : 'Wrist Anchor · Daily Contact',
    pendant: lang === 'zh' ? '胸前胸坠 · 呼吸共振' : 'Pendant · Breath Awareness',
    talisman: lang === 'zh' ? '道门正统朱砂符 · 坛前开光' : 'Hand-Inscribed Vermilion Talisman',
    set: lang === 'zh' ? '全境典藏礼盒' : 'Complete Ritual Box',
  };

  return (
    <div className="space-y-12">
      {/* Top Grid: Gallery & Purchase Column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Gallery (Left) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Display Image */}
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-yojqi-sand border border-yojqi-border shadow-xs">
            <Image
              src={selectedImage}
              alt={lang === 'zh' ? product.nameZh : product.nameEn}
              fill
              priority
              className="object-cover transition-all duration-300"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            {product.category === 'protection' && (
              <div className="absolute top-4 left-4 bg-amber-950/80 backdrop-blur-xs text-amber-200 text-xs font-mono px-3 py-1.5 rounded-full border border-amber-500/40 flex items-center gap-1.5 shadow-md">
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                <span>{lang === 'zh' ? '正一坛前敕笔盖印' : 'Altar Consecrated'}</span>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {product.gallery.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                    selectedImage === img
                      ? 'border-yojqi-bronze shadow-xs'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Purchase Info (Right) */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="text-xs font-mono tracking-widest text-yojqi-bronze uppercase mb-1 flex items-center gap-1.5">
              {product.category === 'protection' && <Shield className="w-3.5 h-3.5 text-amber-700" />}
              <span>{typeLabels[product.type] || product.type}</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-yojqi-inkHeading leading-tight">
              {lang === 'zh' ? product.nameZh : product.nameEn}
            </h1>

            <p className="text-sm text-yojqi-bronze font-medium mt-1 italic">
              {lang === 'zh' ? product.taglineZh : product.taglineEn}
            </p>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3 pt-2 pb-4 border-b border-yojqi-border">
            <span className="font-serif text-3xl font-bold text-yojqi-ink">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-neutral-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-medium">
              {dict.shop.inStock}
            </span>
          </div>

          {/* Summary */}
          <p className="text-sm text-yojqi-body leading-relaxed">
            {lang === 'zh' ? product.summaryZh : product.summaryEn}
          </p>

          {/* Add to Bag Controls */}
          <div className="pt-2 space-y-3">
            <div className="flex gap-3">
              {/* Quantity Selector */}
              <div className="flex items-center border border-yojqi-border rounded-xl bg-white px-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1.5 text-yojqi-body hover:text-yojqi-ink"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-3 font-mono text-sm font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1.5 text-yojqi-body hover:text-yojqi-ink"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Main Action Button */}
              <button
                onClick={handleAdd}
                className="flex-1 py-4 px-6 rounded-xl yojqi-btn-primary font-medium text-sm flex items-center justify-center gap-2 shadow-sm"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>{lang === 'zh' ? '已加入购物袋' : 'Added to Bag'}</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>{dict.shop.addToBag}</span>
                  </>
                )}
              </button>
            </div>

            <div className="text-xs text-center text-yojqi-body pt-1">
              {dict.shop.guarantee}
            </div>
          </div>

          {/* Paired Cross-Linking Recommendation */}
          {pairedProduct && (
            <div className="mt-8 p-4 rounded-xl bg-[#fff8f0] border border-yojqi-borderAccent">
              <div className="text-xs font-mono font-semibold text-yojqi-bronze uppercase mb-1">
                {product.category === 'protection'
                  ? (lang === 'zh' ? '推荐同频结缘搭配：' : 'Recommended Companion Protection Anchor:')
                  : product.type === 'pendant'
                  ? (lang === 'zh' ? '更渴望全天候轻巧触感？推荐搭配同款手绳：' : 'Prefer a quieter all-day route? Start with the bracelet:')
                  : (lang === 'zh' ? '渴望更直观的胸腔仪式感？推荐搭配同款项链：' : 'Want a stronger visible ritual? Choose the pendant version:')}
              </div>
              <Link
                href={`/${lang}/product/${pairedProduct.slug}`}
                className="flex items-center justify-between group mt-2"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-yojqi-sand shrink-0">
                    <Image
                      src={pairedProduct.heroImage}
                      alt={lang === 'zh' ? pairedProduct.nameZh : pairedProduct.nameEn}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div>
                    <h5 className="font-serif text-sm font-medium text-yojqi-inkHeading group-hover:text-yojqi-bronze transition-colors">
                      {lang === 'zh' ? pairedProduct.nameZh : pairedProduct.nameEn}
                    </h5>
                    <span className="text-xs font-mono text-yojqi-bronze font-bold">
                      {formatPrice(pairedProduct.price)}
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-yojqi-bronze group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Scent & Olfactory Pyramid (CRO Interactive Card) */}
      <ScentPyramid product={product} lang={lang} />

      {/* Somatic Benefits & Ritual Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-yojqi-border">
        {/* Left: Somatic Benefits */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-yojqi-border space-y-4">
          <div className="flex items-center gap-2 text-yojqi-bronze">
            <Heart className="w-5 h-5" />
            <h3 className="font-serif text-xl font-medium text-yojqi-inkHeading">
              {dict.shop.somaticBenefits}
            </h3>
          </div>
          <ul className="space-y-3 text-xs sm:text-sm text-yojqi-body">
            {(lang === 'zh' ? product.somaticBenefitsZh : product.somaticBenefitsEn).map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-yojqi-bronze mt-2 shrink-0" />
                <span className="leading-relaxed">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: How to Anchor Ritual */}
        <div className="p-6 sm:p-8 rounded-2xl bg-yojqi-warm border border-yojqi-border space-y-4">
          <div className="flex items-center gap-2 text-yojqi-bronze">
            <Sparkles className="w-5 h-5" />
            <h3 className="font-serif text-xl font-medium text-yojqi-inkHeading">
              {dict.shop.howToUse}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-yojqi-bodyStrong leading-relaxed italic bg-white/70 p-4 rounded-xl border border-yojqi-border">
            &ldquo;{lang === 'zh' ? product.ritualStepZh : product.ritualStepEn}&rdquo;
          </p>

          <div className="pt-2 border-t border-yojqi-border text-xs text-yojqi-body space-y-2">
            <div>
              <strong className="text-yojqi-ink font-semibold mr-1">
                {lang === 'zh' ? '材质用料：' : 'Materials:'}
              </strong>
              {lang === 'zh' ? product.materialsZh : product.materialsEn}
            </div>
            <div>
              <strong className="text-yojqi-ink font-semibold mr-1">
                {lang === 'zh' ? '规格尺寸：' : 'Dimensions:'}
              </strong>
              {lang === 'zh' ? product.dimensionsZh : product.dimensionsEn}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Sticky Bar on Scroll */}
      <StickyBuyBar product={product} lang={lang} />
    </div>
  );
}
