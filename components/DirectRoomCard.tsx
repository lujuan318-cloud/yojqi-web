'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Users,
  Maximize2,
  Sparkles,
  Check,
  ChevronRight,
  Lock,
  Bed,
  Clock,
  ShieldCheck,
  Building,
} from 'lucide-react';
import { Language, getDictionary } from '@/lib/i18n';
import { RoomAvailabilityQuote } from '@/lib/retreats-pricing';
import { useCurrency } from '@/context/CurrencyContext';

interface DirectRoomCardProps {
  room: RoomAvailabilityQuote;
  lang: Language;
  onBookNow: (room: RoomAvailabilityQuote) => void;
  isDateSelected?: boolean;
}

export function DirectRoomCard({
  room,
  lang,
  onBookNow,
  isDateSelected = false,
}: DirectRoomCardProps) {
  const dict = getDictionary(lang);
  const isZh = lang === 'zh';
  const { formatFromCny, currency } = useCurrency();
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const images = room.gallery && room.gallery.length > 0 ? room.gallery : [room.coverImage];
  const currentImage = images[activeImageIdx] || room.coverImage;

  const isSoldOut = room.status === 'sold_out' || !room.available;
  const isOnlyFewLeft = room.status === 'only_1_left';

  return (
    <div
      className={`bg-white rounded-3xl border transition-all duration-300 overflow-hidden shadow-sm hover:shadow-xl flex flex-col lg:flex-row items-stretch ${
        isSoldOut
          ? 'border-neutral-200 opacity-75'
          : 'border-amber-200/90 hover:border-amber-600'
      }`}
    >
      {/* 1. LEFT COLUMN: Hero Image + Thumbnails */}
      <div className="relative w-full lg:w-[380px] min-h-[240px] sm:min-h-[280px] lg:min-h-[300px] bg-neutral-900 overflow-hidden shrink-0 group">
        <Image
          src={currentImage}
          alt={isZh ? room.nameZh : room.nameEn}
          fill
          className={`object-cover transition-transform duration-700 ease-out ${
            isSoldOut ? 'grayscale-25' : 'group-hover:scale-105'
          }`}
          sizes="(max-width: 1024px) 100vw, 380px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

        {/* Top Floating Badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5 z-10">
          {isSoldOut ? (
            <span className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-neutral-900/90 text-neutral-300 backdrop-blur-xs flex items-center gap-1 shadow-md">
              <Lock className="w-3 h-3" />
              {dict.retreats.soldOut}
            </span>
          ) : isOnlyFewLeft ? (
            <span className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-amber-600/95 text-white backdrop-blur-xs flex items-center gap-1 shadow-md animate-pulse">
              <Sparkles className="w-3 h-3 text-amber-200" />
              {dict.retreats.onlyLeft.replace('{n}', String(room.rooms_left || 1))}
            </span>
          ) : (
            <span className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-emerald-700/95 text-white backdrop-blur-xs flex items-center gap-1 shadow-md">
              <Check className="w-3 h-3" />
              {dict.retreats.available}
            </span>
          )}

          <span className="px-2.5 py-1 text-[10px] font-mono rounded-full bg-black/60 text-amber-200 backdrop-blur-xs flex items-center gap-1">
            <Building className="w-3 h-3" />
            <span>{isZh ? room.floorZh : room.floorEn}</span>
          </span>
        </div>

        {/* Bottom Thumbnail Strip */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 z-10 overflow-x-auto pb-0.5">
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIdx(idx)}
                className={`relative w-11 h-8 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                  activeImageIdx === idx
                    ? 'border-amber-400 scale-105 shadow-md'
                    : 'border-white/60 opacity-75 hover:opacity-100'
                }`}
              >
                <Image src={img} alt="thumb" fill className="object-cover" sizes="44px" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 2. CENTER COLUMN: Room Name, Intro, Specs, Perks */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-neutral-100 space-y-4">
        <div className="space-y-3">
          {/* Room Title & Subtitle */}
          <div>
            <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200/70 text-[11px] font-medium">
                <span>{isZh ? room.badgeZh : room.badgeEn}</span>
              </div>
              {room.display_type === 'individual_room' && (
                <span className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 font-mono text-[10px] border border-stone-200 font-medium">
                  {isZh ? '独享房源 · 1:1直选' : 'Dedicated 1:1 Room'}
                </span>
              )}
              {room.display_type === 'room_type' && (
                <span className="px-2 py-0.5 rounded-full bg-amber-100/70 text-amber-800 font-mono text-[10px] border border-amber-200/80 font-medium">
                  {isZh ? '房型池 · 自动安排' : 'Pooled Room Type'}
                </span>
              )}
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-yojqi-inkHeading leading-snug">
              {isZh ? room.nameZh : room.nameEn}
            </h3>
            <p className="text-xs text-amber-950/80 font-medium italic mt-1 leading-relaxed">
              {isZh ? room.subtitleZh : room.subtitleEn}
            </p>
          </div>

          {/* Hardware Specs Grid (Clean, readable pills) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs bg-[#fbf9f5] p-3 rounded-2xl border border-amber-100">
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span className="text-yojqi-ink font-medium">{room.area}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span className="text-yojqi-ink font-medium">
                {isZh ? `宜居 ${room.capacity} 人` : `Max ${room.capacity} guests`}
              </span>
            </div>

            <div className="col-span-2 sm:col-span-1 flex items-center gap-1.5 truncate">
              <Bed className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span className="text-yojqi-ink font-medium truncate">
                {isZh ? room.bedInfoZh : room.bedInfoEn}
              </span>
            </div>
          </div>

          {/* Direct Booking Perks & Tags */}
          <div className="flex flex-wrap gap-1.5 text-[11px]">
            {(isZh ? room.tagsZh : room.tagsEn).slice(0, 4).map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200/70 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Cancellation Notice */}
          <div className="text-[11px] text-neutral-500 flex items-center gap-1.5 pt-0.5">
            <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>{isZh ? '入住前48小时内可免费全额退改' : 'Free cancellation up to 48 hours'}</span>
          </div>
        </div>

        {/* Link to Detail Page */}
        <div>
          <Link
            href={`/${lang}/retreats/${room.slug}`}
            className="inline-flex items-center gap-1 text-xs text-amber-900 hover:text-amber-700 font-semibold hover:underline underline-offset-2"
          >
            <span>{isZh ? '查看完整房型照片与设施详情 ↗' : 'View full gallery & amenities ↗'}</span>
          </Link>
        </div>
      </div>

      {/* 3. RIGHT COLUMN: Pricing & Action Button */}
      <div className="p-5 sm:p-6 w-full lg:w-[280px] flex flex-col justify-between bg-[#fffdfa] shrink-0 space-y-4">
        {/* Pricing Box */}
        <div className="space-y-2 text-left sm:text-right lg:text-right">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-mono font-medium">
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span>{dict.retreats.directPerk}</span>
          </div>

          <div className="flex items-baseline justify-start sm:justify-end lg:justify-end gap-1.5">
            <span className="text-xs text-neutral-400 line-through font-mono">
              {formatFromCny(Math.round((room.original_ota_total || room.avg_nightly_price * 1.05) / (room.nights || 1)))}
            </span>
            <span className="font-serif text-2xl sm:text-3xl font-bold text-amber-950">
              {formatFromCny(room.avg_nightly_price)}
            </span>
            <span className="text-xs text-amber-800">{dict.retreats.perNight}</span>
          </div>

          {/* Show CNY reference if viewing in foreign currency (USD, EUR, GBP, HKD) */}
          {currency !== 'CNY' && (
            <div className="text-[10px] text-neutral-400 font-mono -mt-1">
              {isZh ? `(约合 ¥${room.avg_nightly_price} CNY)` : `(approx. ¥${room.avg_nightly_price} CNY)`}
            </div>
          )}

          {/* Savings Badge */}
          {room.direct_savings > 0 && (
            <div className="text-[11px] text-emerald-700 font-mono font-medium">
              {isZh ? `比OTA立省 ${formatFromCny(room.direct_savings)}` : `Save ${formatFromCny(room.direct_savings)}`}
            </div>
          )}

          {/* Stay Total (if dates selected) */}
          {isDateSelected && room.nights > 0 && (
            <div className="pt-2 border-t border-amber-100 text-xs text-neutral-600">
              <span className="text-neutral-500">{room.nights}晚总额: </span>
              <span className="font-mono font-bold text-amber-950 text-sm">
                {formatFromCny(room.total_amount)}
              </span>
              {currency !== 'CNY' && (
                <span className="text-[10px] text-neutral-400 block font-mono">
                  (约 ¥{room.total_amount} CNY)
                </span>
              )}
            </div>
          )}
        </div>

        {/* Action Button & Direct Booking Tag */}
        <div className="space-y-2">
          <button
            onClick={() => onBookNow(room)}
            disabled={isSoldOut}
            className={`w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-semibold tracking-wide flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md ${
              isSoldOut
                ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                : 'bg-amber-800 hover:bg-amber-900 text-white hover:shadow-lg'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{isSoldOut ? dict.retreats.soldOut : dict.retreats.bookNow}</span>
            {!isSoldOut && <ChevronRight className="w-3.5 h-3.5" />}
          </button>

          <div className="text-[10px] text-neutral-400 font-mono text-center flex items-center justify-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span>{isZh ? '官方直订 · 实时房态保障' : 'Official Direct Stay Guarantee'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
