'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, Users, Maximize2, Sparkles, Check, ChevronRight, Lock, Bed, Clock, ShieldCheck } from 'lucide-react';
import { Language, getDictionary } from '@/lib/i18n';
import { RoomAvailabilityQuote } from '@/lib/retreats-pricing';

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
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const images = room.gallery && room.gallery.length > 0 ? room.gallery : [room.coverImage];
  const currentImage = images[activeImageIdx] || room.coverImage;

  const isSoldOut = room.status === 'sold_out' || !room.available;
  const isOnlyFewLeft = room.status === 'only_1_left';

  return (
    <div
      className={`bg-white rounded-3xl border transition-all duration-300 overflow-hidden shadow-sm hover:shadow-xl flex flex-col md:flex-row items-stretch ${
        isSoldOut
          ? 'border-neutral-200 opacity-75'
          : 'border-amber-200/80 hover:border-amber-500'
      }`}
    >
      {/* 1. LEFT COLUMN: Hero Image + Thumbnails */}
      <div className="relative w-full md:w-4/12 lg:w-4/12 min-h-[260px] md:min-h-[300px] bg-neutral-900 overflow-hidden shrink-0 group">
        <Image
          src={currentImage}
          alt={isZh ? room.nameZh : room.nameEn}
          fill
          className={`object-cover transition-transform duration-700 ease-out ${
            isSoldOut ? 'grayscale-25' : 'group-hover:scale-105'
          }`}
          sizes="(max-width: 768px) 100vw, 35vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5 z-10">
          {isSoldOut ? (
            <span className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-neutral-800/90 text-neutral-300 backdrop-blur-xs flex items-center gap-1 shadow-md">
              <Lock className="w-3 h-3" />
              {dict.retreats.soldOut}
            </span>
          ) : isOnlyFewLeft ? (
            <span className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-amber-600/90 text-white backdrop-blur-xs flex items-center gap-1 shadow-md animate-pulse">
              <Sparkles className="w-3 h-3" />
              {dict.retreats.onlyLeft.replace('{n}', String(room.rooms_left || 1))}
            </span>
          ) : (
            <span className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-emerald-600/90 text-white backdrop-blur-xs flex items-center gap-1 shadow-md">
              <Check className="w-3 h-3" />
              {dict.retreats.available}
            </span>
          )}

          <span className="px-2 py-1 text-[10px] font-mono rounded-full bg-black/60 text-amber-200 backdrop-blur-xs">
            {isZh ? room.floorZh : room.floorEn}
          </span>
        </div>

        {/* Bottom Gallery Thumbnails on image */}
        {images.length > 1 && (
          <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center gap-1.5 z-10 overflow-x-auto pb-0.5">
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIdx(idx)}
                className={`relative w-10 h-7 rounded-md overflow-hidden border transition-all ${
                  activeImageIdx === idx
                    ? 'border-amber-400 scale-105 shadow-md'
                    : 'border-white/50 opacity-70 hover:opacity-100'
                }`}
              >
                <Image src={img} alt="thumb" fill className="object-cover" sizes="40px" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 2. CENTER COLUMN: Room Name + Intro + Specs */}
      <div className="p-5 md:p-6 w-full md:w-5/12 lg:w-5/12 flex flex-col justify-between border-b md:border-b-0 md:border-r border-neutral-100 space-y-4">
        <div className="space-y-2">
          {/* Room Name */}
          <div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-yojqi-inkHeading leading-snug">
              {isZh ? room.nameZh : room.nameEn}
            </h3>
            <p className="text-xs text-amber-900/80 font-medium italic mt-0.5">
              {isZh ? room.subtitleZh : room.subtitleEn}
            </p>
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs bg-[#fbf9f5] p-2.5 rounded-xl border border-amber-100/70">
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span className="text-yojqi-ink font-medium">{room.area}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span className="text-yojqi-ink font-medium">
                {isZh ? `宜居 ${room.capacity} 人` : `Up to ${room.capacity} guests`}
              </span>
            </div>

            <div className="col-span-2 flex items-center gap-1.5 truncate">
              <Bed className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span className="text-yojqi-ink font-medium truncate">
                {isZh ? room.bedInfoZh : room.bedInfoEn}
              </span>
            </div>
          </div>

          {/* Perks & Tags */}
          <div className="flex flex-wrap gap-1.5 text-[11px]">
            {(isZh ? room.tagsZh : room.tagsEn).slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200/60 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Cancellation Notice */}
          <div className="text-[11px] text-neutral-500 flex items-center gap-1 pt-1">
            <Clock className="w-3 h-3 text-emerald-600 shrink-0" />
            <span>{isZh ? '入住前48小时内可免费全额退改' : 'Free cancellation up to 48 hours'}</span>
          </div>
        </div>

        {/* View Details Link */}
        <div>
          <Link
            href={`/${lang}/retreats/${room.slug}`}
            className="inline-flex items-center gap-1 text-xs text-amber-900 hover:text-amber-700 font-medium hover:underline underline-offset-2"
          >
            <span>{isZh ? '查看完整房型照片与设施 ↗' : 'View full gallery & amenities ↗'}</span>
          </Link>
        </div>
      </div>

      {/* 3. RIGHT COLUMN: Pricing + Action Button */}
      <div className="p-5 md:p-6 w-full md:w-3/12 lg:w-3/12 flex flex-col justify-between bg-[#fffdfa] shrink-0 space-y-4">
        {/* Pricing Box */}
        <div className="space-y-1.5 text-right md:text-right">
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-mono font-medium">
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span>{dict.retreats.directPerk}</span>
          </div>

          <div className="flex items-baseline justify-end gap-1.5">
            <span className="text-xs text-neutral-400 line-through">
              ¥{Math.round((room.original_ota_total || room.avg_nightly_price * 1.05) / (room.nights || 1))}
            </span>
            <span className="font-serif text-2xl lg:text-3xl font-bold text-amber-950">
              ¥{room.avg_nightly_price}
            </span>
            <span className="text-xs text-amber-800">{dict.retreats.perNight}</span>
          </div>

          {/* Savings pill */}
          {room.direct_savings > 0 && (
            <div className="text-[11px] text-emerald-700 font-mono font-medium">
              {isZh ? `比OTA立省 ¥${room.direct_savings}` : `Save ¥${room.direct_savings}`}
            </div>
          )}

          {/* Stay Total (if dates selected) */}
          {isDateSelected && room.nights > 0 && (
            <div className="pt-1.5 border-t border-amber-100 text-xs text-neutral-600">
              <span className="text-neutral-400">{room.nights}晚总计: </span>
              <span className="font-mono font-bold text-amber-950">¥{room.total_amount}</span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="space-y-2">
          <button
            onClick={() => onBookNow(room)}
            disabled={isSoldOut}
            className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold tracking-wide flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md ${
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
            <span>{isZh ? '百居易实时锁房保障' : 'Hostex Live Sync'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
