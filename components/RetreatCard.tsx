'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, MapPin, Users, Maximize2, MessageCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { SanctuaryProperty } from '@/lib/retreats-data';
import { Language, getDictionary } from '@/lib/i18n';
import { WeChatModal } from './WeChatModal';
import { useCurrency } from '@/context/CurrencyContext';

interface RetreatCardProps {
  property: SanctuaryProperty;
  lang: Language;
}

export function RetreatCard({ property, lang }: RetreatCardProps) {
  const [wechatModalOpen, setWechatModalOpen] = useState(false);
  const dict = getDictionary(lang);
  const { formatFromCny, currency } = useCurrency();

  const specs = lang === 'zh' ? property.roomSpecsZh : property.roomSpecsEn;

  return (
    <>
      <div className="bg-white rounded-2xl border border-yojqi-border hover:border-yojqi-borderAccent hover:shadow-cardHover transition-all duration-300 overflow-hidden flex flex-col lg:flex-row">
        {/* Visual Hero */}
        <div className="relative w-full lg:w-1/2 aspect-4/3 lg:aspect-auto min-h-[340px] bg-neutral-900 overflow-hidden">
          <Image
            src={property.heroImage}
            alt={lang === 'zh' ? property.nameZh : property.nameEn}
            fill
            className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 text-xs font-medium tracking-wide rounded-full bg-amber-500/90 text-white backdrop-blur-xs flex items-center gap-1.5 shadow-md">
              <Sparkles className="w-3.5 h-3.5" />
              {lang === 'zh' ? property.badgeZh : property.badgeEn}
            </span>
          </div>

          {/* Bottom Title on Image (Mobile) */}
          <div className="absolute bottom-4 left-4 right-4 text-white lg:hidden">
            <h3 className="font-serif text-2xl font-bold">
              {lang === 'zh' ? property.nameZh : property.nameEn}
            </h3>
            <p className="text-xs text-white/80 flex items-center gap-1 mt-1">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{lang === 'zh' ? property.locationZh : property.locationEn}</span>
            </p>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-6 lg:p-8 w-full lg:w-1/2 flex flex-col justify-between">
          <div>
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-yojqi-bronze font-medium mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{lang === 'zh' ? property.locationZh : property.locationEn}</span>
            </div>

            <h3 className="hidden lg:block font-serif text-2xl lg:text-3xl font-medium text-yojqi-inkHeading">
              {lang === 'zh' ? property.nameZh : property.nameEn}
            </h3>

            <p className="text-xs lg:text-sm text-yojqi-bronze font-medium mt-1 mb-4 italic">
              {lang === 'zh' ? property.subtitleZh : property.subtitleEn}
            </p>

            {/* Drone Show Highlight Box */}
            <div className="bg-[#fff8f0] border-l-4 border-amber-600 rounded-r-lg p-3.5 mb-5 text-xs lg:text-sm text-yojqi-bodyStrong leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-amber-900 mb-1">
                <Eye className="w-4 h-4 text-amber-700" />
                <span>{dict.retreats.droneShowSectionTitle}</span>
              </div>
              <p>{lang === 'zh' ? property.droneShowFeatureZh : property.droneShowFeatureEn}</p>
            </div>

            {/* Specifications Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-neutral-50 p-3 rounded-lg border border-neutral-100 mb-5">
              <div className="flex items-center gap-2">
                <Maximize2 className="w-4 h-4 text-yojqi-bronze" />
                <div>
                  <span className="text-neutral-400 block">{dict.retreats.suiteSize}</span>
                  <span className="font-medium text-yojqi-ink">{specs.area}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-yojqi-bronze" />
                <div>
                  <span className="text-neutral-400 block">{dict.retreats.guestCapacity}</span>
                  <span className="font-medium text-yojqi-ink">{specs.capacity}</span>
                </div>
              </div>
            </div>

            {/* Curated Amenities List (Top 3) */}
            <div className="space-y-1.5 mb-6 text-xs text-yojqi-body">
              {(lang === 'zh' ? property.amenitiesZh : property.amenitiesEn).slice(0, 3).map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
            {property.basePrice && (
              <div className="flex items-center justify-between py-2.5 px-3.5 bg-amber-50/70 rounded-lg border border-amber-200/70 mb-4">
                <span className="text-xs text-amber-900 font-medium">
                  {lang === 'zh' ? '✨ 官网直订专享价' : '✨ Direct Booking Privilege'}
                </span>
                <div className="text-right">
                  <span className="font-serif text-lg font-bold text-amber-950">
                    {formatFromCny(property.basePrice)}
                    <span className="text-xs font-normal text-amber-800"> / {lang === 'zh' ? '晚起' : 'night'}</span>
                  </span>
                  {currency !== 'CNY' && (
                    <div className="text-[10px] text-neutral-400 font-mono -mt-0.5">
                      (约合 ¥{property.basePrice} CNY)
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={() => setWechatModalOpen(true)}
              className="flex-1 py-3 px-4 rounded-lg yojqi-btn-primary text-xs font-medium tracking-wide flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-300" />
              <span>{dict.retreats.bookViaWechat}</span>
            </button>

            {property.bookingComUrl && (
              <a
                href={property.bookingComUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-lg border border-yojqi-border hover:border-yojqi-bronze hover:text-yojqi-bronze text-xs font-medium tracking-wide text-center transition-colors flex items-center justify-center gap-1"
              >
                <span>Booking.com 预订 ↗</span>
              </a>
            )}

            <Link
              href={`/${lang}/retreats/${property.slug}`}
              className="py-3 px-4 rounded-lg yojqi-btn-secondary text-xs font-medium tracking-wide text-center"
            >
              {lang === 'zh' ? '查看全景' : 'View Details'}
            </Link>
          </div>
        </div>
      </div>

      <WeChatModal
        isOpen={wechatModalOpen}
        onClose={() => setWechatModalOpen(false)}
        lang={lang}
        wechatId={property.hostConcierge.wechat}
      />
    </>
  );
}
