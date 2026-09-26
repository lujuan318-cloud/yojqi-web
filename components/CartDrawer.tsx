'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Lock } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Language, getDictionary } from '@/lib/i18n';

interface CartDrawerProps {
  lang: Language;
}

export function CartDrawer({ lang }: CartDrawerProps) {
  const { items, isOpen, closeCart, removeFromCart, updateQuantity, totalPrice, totalCount } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const dict = getDictionary(lang);

  if (!isOpen) return null;

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      const lineItems = items.map((item) => ({
        id: item.product.id,
        name: lang === 'zh' ? item.product.nameZh : item.product.nameEn,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.heroImage,
      }));

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: lineItems,
          lang,
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.message || (lang === 'zh' ? '暂未连接在线收银台，请联系客服' : 'Checkout session simulated successfully.'));
      }
    } catch (err) {
      console.error(err);
      alert(lang === 'zh' ? '结算暂时异常，请稍后重试' : 'Checkout error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-[#fffdfa] h-full shadow-2xl flex flex-col border-l border-yojqi-border z-10">
        {/* Header */}
        <div className="p-5 border-b border-yojqi-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-xl font-medium text-yojqi-inkHeading">
              {dict.nav.bag}
            </h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-yojqi-sand text-yojqi-bodyStrong font-medium">
              {totalCount}
            </span>
          </div>
          <button
            onClick={closeCart}
            className="p-1.5 text-yojqi-body hover:text-yojqi-ink rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-yojqi-sand flex items-center justify-center text-yojqi-bronze">
                <Lock className="w-7 h-7" />
              </div>
              <p className="text-yojqi-body">{dict.shop.emptyBag}</p>
              <button
                onClick={closeCart}
                className="px-6 py-2.5 rounded-lg yojqi-btn-primary text-sm font-medium"
              >
                {dict.shop.continueShopping}
              </button>
            </div>
          ) : (
            items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex gap-4 p-3 bg-white rounded-lg border border-yojqi-border shadow-xs"
              >
                <div className="relative w-20 h-20 rounded-md overflow-hidden bg-yojqi-sand shrink-0">
                  <Image
                    src={product.heroImage}
                    alt={lang === 'zh' ? product.nameZh : product.nameEn}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-serif text-sm font-medium text-yojqi-inkHeading truncate pr-2">
                        {lang === 'zh' ? product.nameZh : product.nameEn}
                      </h4>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-neutral-400 hover:text-rose-500 transition-colors shrink-0"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-xs text-yojqi-bronze font-medium mt-0.5">
                      ${product.price.toFixed(2)}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-100">
                    <div className="flex items-center border border-yojqi-border rounded-md bg-neutral-50">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="p-1 text-yojqi-body hover:text-yojqi-ink"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-mono font-medium">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="p-1 text-yojqi-body hover:text-yojqi-ink"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-sm font-semibold text-yojqi-ink">
                      ${(product.price * quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-yojqi-border bg-white space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-yojqi-body">{dict.shop.total}</span>
              <span className="font-serif text-2xl font-bold text-yojqi-ink">
                ${totalPrice.toFixed(2)} <span className="text-xs font-sans text-neutral-500 font-normal">USD</span>
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-yojqi-body bg-neutral-50 p-2.5 rounded-lg border border-neutral-100">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{dict.shop.guarantee}</span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-lg yojqi-btn-primary flex items-center justify-center gap-2 text-sm font-medium tracking-wide disabled:opacity-50"
            >
              <span>{isLoading ? '...' : dict.shop.checkoutBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
