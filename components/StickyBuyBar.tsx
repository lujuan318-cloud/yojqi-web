'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ShoppingBag, Check } from 'lucide-react';
import { Product } from '@/lib/products-data';
import { Language } from '@/lib/i18n';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';

interface StickyBuyBarProps {
  product: Product;
  lang: Language;
}

export function StickyBuyBar({ product, lang }: StickyBuyBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar once scrolled 450px down
      if (window.scrollY > 450) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAdd = () => {
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!isVisible) return null;

  return (
    <aside aria-label="Quick Add to Bag" className="fixed bottom-0 left-0 right-0 z-40 bg-[#fffdfa]/95 backdrop-blur-md border-t border-yojqi-border shadow-2xl py-3 px-4 sm:px-6 transition-all duration-300 animate-in slide-in-from-bottom-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Thumbnail & Name */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative w-12 h-12 rounded-md overflow-hidden bg-yojqi-sand shrink-0 border border-yojqi-border">
            <Image
              src={product.heroImage}
              alt={lang === 'zh' ? product.nameZh : product.nameEn}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
          <div className="min-w-0">
            <h4 className="font-serif text-sm font-semibold text-yojqi-ink truncate">
              {lang === 'zh' ? product.nameZh : product.nameEn}
            </h4>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="font-mono text-sm font-bold text-yojqi-bronze">
                {formatPrice(product.price)}
              </span>
              <span className="text-xs text-neutral-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Quick Add Button */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleAdd}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 shadow-sm ${
              added
                ? 'bg-emerald-800 text-white'
                : 'yojqi-btn-primary'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>{lang === 'zh' ? '已加入' : 'Added!'}</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>{lang === 'zh' ? '快速加入' : 'Add to Bag'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}
