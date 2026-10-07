'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, Users, Maximize2, Sparkles, Check, ChevronRight, Lock } from 'lucide-react';
import { Language, getDictionary } from '@/lib/i18n';
import { RoomAvailabilityQuote } from '@/lib/retreats-pricing';

interface DirectRoomCardProps {
  room: RoomAvailabilityQuote;
  lang: Language;
  onBookNow: (room: RoomAvailabilityQuote) => void;
}

export function DirectRoomCard({ room, lang, onBookNow }: DirectRoomCardProps) {
  const dict = getDictionary(lang);
  const isZh = lang === 'zh';
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const images = room.gallery && room.gallery.length > 0 ? room.gallery : [room.coverImage];
  const currentImage = images[activeImageIdx] || room.coverImage;

  const isSoldOut = room.status === 'sold_out' || !room.available;
  const isOnlyFewLeft = room.status === 'only_1_left';

  return (
    <div
      className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col lg:flex-row ${
        isSoldOut
          ? 'border-neutral-200 opacity-80'
          : 'border-yojqi-border hover:border-amber-400 hover:shadow-cardHover'
      }`}
    >
      {/* Visual Showcase with Gallery Thumbnails */}
      <div className="relative w-full lg:w-5/12 aspect-16/10 lg:aspect-auto min-h-[300px] lg:min-h-[340px] bg-neutral-900 overflow-hidden group">
        <Image
          src={currentImage}
          alt={isZh ? room.nameZh : room.nameEn}
          fill
          className={`object-cover transition-transform duration-700 ease-out ${
            isSoldOut ? 'grayscale-25' : 'group-hover:scale-105'
          }`}
          sizes="(max-width: 1024px) 100vw, 40vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {isSoldOut ? (
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-neutral-800/90 text-neutral-300 backdrop-blur-xs flex items-center gap-1 shadow-md">
              <Lock className="w-3.5 h-3.5" />
              {dict.retreats.soldOut}
            </span>
          ) : isOnlyFewLeft ? (
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-amber-600/90 text-white backdrop-blur-xs flex items-center gap-1 shadow-md animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
              {dict.retreats.onlyLeft.replace('{n}', String(room.rooms_left || 1))}
            </span>
          ) : (
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-emerald-600/90 text-white backdrop-blur-xs flex items-center gap-1 shadow-md">
              <Check className="w-3.5 h-3.5" />
              {dict.retreats.available}
            </span>
          )}

          <span className="px-2.5 py-1 text-xs font-mono rounded-full bg-black/60 text-amber-200 backdrop-blur-xs">
            {isZh ? room.floorZh : room.floorEn}
          </span>
        </div>

        {/* Bottom Gallery Thumbnails on image */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 z-10 overflow-x-auto pb-1">
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIdx(idx)}
                className={`relative w-11 h-8 rounded-md overflow-hidden border-2 shrink-0 transition-all ${
                  activeImageIdx === idx ? 'border-amber-400 scale-105 shadow-md' : 'border-white/50 opacity-70 hover:opacity-100'
                }`}
              >
                <Image src={img} alt="thumbnail" fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Details & Live Pricing */}
      <div className="p-5 sm:p-7 w-full lg:w-7/12 flex flex-col justify-between">
        <div>
          {/* Header Title */}
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1.5">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-yojqi-inkHeading">
              {isZh ? room.nameZh : room.nameEn}
            </h3>
            <span className="text-xs font-mono text-neutral-400">
              {room.area} · {isZh ? room.floorZh : room.floorEn}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-yojqi-bronze italic mb-4">
            {isZh ? room.subtitleZh : room.subtitleEn}
          </p>

          {/* Key Room Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs bg-[#fbf9f5] p-3 rounded-xl border border-amber-100/80 mb-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-700 shrink-0" />
              <div>
                <span className="text-neutral-400 block text-[10px] uppercase font-mono">{dict.retreats.guestCapacity}</span>
                <span className="font-medium text-yojqi-ink">
                  {isZh ? `最多 ${room.capacity} 位` : `Up to ${room.capacity} guests`}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Maximize2 className="w-4 h-4 text-amber-700 shrink-0" />
              <div>
                <span className="text-neutral-400 block text-[10px] uppercase font-mono">{dict.retreats.suiteSize}</span>
                <span className="font-medium text-yojqi-ink">{room.area}</span>
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 flex items-center gap-2">
              <Eye className="w-4 h-4 text-amber-700 shrink-0" />
              <div className="truncate">
                <span className="text-neutral-400 block text-[10px] uppercase font-mono">{isZh ? '床型规制' : 'Bed Type'}</span>
                <span className="font-medium text-yojqi-ink truncate">{isZh ? room.bedInfoZh : room.bedInfoEn}</span>
              </div>
            </div>
          </div>

          {/* Highlights & Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {(isZh ? room.tagsZh : room.tagsEn).slice(0, 4).map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 text-[11px] rounded-md bg-amber-50/70 border border-amber-200/60 text-amber-900 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing Box & Action Buttons */}
        <div className="pt-4 border-t border-neutral-100 space-y-3.5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 bg-amber-50/40 p-3.5 rounded-xl border border-amber-200/70">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-amber-900">
                  {dict.retreats.directPerk}
                </span>
                {room.direct_savings > 0 && (
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono font-medium">
                    {isZh ? `比OTA立省 ¥${room.direct_savings}` : `Save ¥${room.direct_savings}`}
                  </span>
                )}
              </div>
              <div className="text-[11px] text-neutral-500 mt-0.5">
                {isZh
                  ? `共 ${room.nights} 晚 (${room.check_in} 至 ${room.check_out})`
                  : `${room.nights} nights (${room.check_in} to ${room.check_out})`}
              </div>
            </div>

            <div className="text-right sm:text-right">
              <div className="flex items-baseline justify-end gap-1.5">
                <span className="text-xs text-neutral-400 line-through">
                  ¥{Math.round(room.original_ota_total / room.nights)}
                </span>
                <span className="font-serif text-2xl font-bold text-amber-950">
                  ¥{room.avg_nightly_price}
                </span>
                <span className="text-xs text-amber-800">{dict.retreats.perNight}</span>
              </div>
              <div className="text-xs font-mono font-semibold text-amber-900">
                {dict.retreats.totalStay}: ¥{room.total_amount}
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <Link
              href={`/${lang}/retreats/${room.slug}`}
              className="px-4 py-3 rounded-xl border border-yojqi-border hover:border-amber-600 text-xs font-medium text-yojqi-ink transition-colors flex items-center justify-center gap-1"
            >
              <span>{dict.retreats.viewRoom}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={() => onBookNow(room)}
              disabled={isSoldOut}
              className={`flex-1 py-3 px-5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm ${
                isSoldOut
                  ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                  : 'bg-amber-800 hover:bg-amber-900 text-white shadow-md hover:shadow-lg'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{isSoldOut ? dict.retreats.soldOut : dict.retreats.bookNow}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
