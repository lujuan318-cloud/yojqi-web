'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronLeft,
  Users,
  Maximize2,
  Sparkles,
  Calendar,
  ShieldCheck,
  Check,
  Lock,
  ArrowRight,
  Eye,
  CheckCircle2,
  Clock,
  Phone,
  MessageCircle,
} from 'lucide-react';
import { Language, getDictionary } from '@/lib/i18n';
import { RetreatRoomType } from '@/lib/retreats-catalog';
import { calculateRoomQuote, RoomAvailabilityQuote } from '@/lib/retreats-pricing';
import { DirectBookingDrawer } from './DirectBookingDrawer';
import { AIConciergeWidget } from './AIConciergeWidget';
import { WeChatModal } from './WeChatModal';
import { useCurrency } from '@/context/CurrencyContext';

interface DirectRoomDetailViewProps {
  room: RetreatRoomType;
  lang: Language;
}

export function DirectRoomDetailView({ room, lang }: DirectRoomDetailViewProps) {
  const dict = getDictionary(lang);
  const isZh = lang === 'zh';
  const { formatFromCny, currency } = useCurrency();

  // Dates state
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const dayAfter = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const [checkIn, setCheckIn] = useState(tomorrow);
  const [checkOut, setCheckOut] = useState(dayAfter);

  // Gallery active image
  const [selectedImage, setSelectedImage] = useState(room.coverImage);

  // Dynamic Quote State
  const [quote, setQuote] = useState<RoomAvailabilityQuote | null>(null);
  const [loadingQuote, setLoadingQuote] = useState(true);

  // Drawer & WeChat Modals
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [wechatModalOpen, setWechatModalOpen] = useState(false);

  // Fetch real-time rate & calendar for this room
  useEffect(() => {
    let isCancelled = false;
    setLoadingQuote(true);

    fetch(`/api/retreats/availability?room_key=${room.room_key}&check_in=${checkIn}&check_out=${checkOut}`)
      .then((res) => res.json())
      .then((res) => {
        if (!isCancelled && res.success && res.data) {
          setQuote(res.data);
        }
      })
      .catch((err) => console.error('Quote fetch error:', err))
      .finally(() => {
        if (!isCancelled) setLoadingQuote(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [room.room_key, checkIn, checkOut]);

  const isSoldOut = quote ? quote.status === 'sold_out' || !quote.available : false;
  const isOnlyOneLeft = quote ? quote.status === 'only_1_left' : false;

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      {/* Back Link */}
      <div>
        <Link
          href={`/${lang}/retreats`}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-yojqi-body hover:text-yojqi-ink transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{isZh ? '返回所有重庆房型列表' : 'Back to All Room Types'}</span>
        </Link>
      </div>

      {/* Hero Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 text-xs font-mono font-medium rounded-full bg-amber-100 text-amber-900 border border-amber-200 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            {isZh ? room.badgeZh : room.badgeEn}
          </span>
          <span className="text-xs text-neutral-500 font-mono">
            {isZh ? room.floorZh : room.floorEn} · {room.area}
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-yojqi-inkHeading">
          {isZh ? room.nameZh : room.nameEn}
        </h1>

        <p className="text-sm sm:text-base text-amber-950/80 italic max-w-3xl leading-relaxed">
          {isZh ? room.subtitleZh : room.subtitleEn}
        </p>
      </div>

      {/* Main Gallery Showcase */}
      <div className="space-y-3">
        <div className="relative w-full aspect-16/9 md:aspect-21/9 rounded-3xl overflow-hidden bg-neutral-900 border border-yojqi-border shadow-lg">
          <Image
            src={selectedImage}
            alt={isZh ? room.nameZh : room.nameEn}
            fill
            priority
            className="object-cover transition-all duration-500"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </div>

        {/* Thumbnails Row */}
        {room.gallery.length > 1 && (
          <div className="flex gap-2.5 overflow-x-auto pb-1">
            {room.gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`relative w-24 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                  selectedImage === img
                    ? 'border-amber-500 shadow-md scale-105'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <Image src={img} alt={`Photo ${idx + 1}`} fill className="object-cover" sizes="96px" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Layout Grid: Details (Left) + Direct Booking Sticky Box (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Specs, Amenities, Rules */}
        <div className="lg:col-span-7 space-y-10">
          {/* Room Specs Grid */}
          <div className="bg-[#fffdfa] border border-amber-200/70 rounded-2xl p-5 sm:p-6 space-y-4">
            <h3 className="font-serif text-lg font-bold text-yojqi-inkHeading">
              {isZh ? '空间格局与硬件规制' : 'Suite Specifications'}
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-100 space-y-1">
                <span className="text-[10px] font-mono uppercase text-neutral-400 block">{dict.retreats.suiteSize}</span>
                <span className="font-semibold text-yojqi-ink text-sm">{room.area}</span>
              </div>

              <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-100 space-y-1">
                <span className="text-[10px] font-mono uppercase text-neutral-400 block">{dict.retreats.guestCapacity}</span>
                <span className="font-semibold text-yojqi-ink text-sm">
                  {isZh ? `宜居 ${room.capacity} 位` : `Up to ${room.capacity}`}
                </span>
              </div>

              <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-100 space-y-1">
                <span className="text-[10px] font-mono uppercase text-neutral-400 block">{isZh ? '楼层位置' : 'Floor Level'}</span>
                <span className="font-semibold text-yojqi-ink text-sm font-mono">
                  {isZh ? room.floorZh : room.floorEn}
                </span>
              </div>

              <div className="col-span-2 sm:col-span-3 bg-neutral-50 p-3 rounded-xl border border-neutral-100 space-y-1">
                <span className="text-[10px] font-mono uppercase text-neutral-400 block">{isZh ? '床型规制' : 'Bed Configuration'}</span>
                <span className="font-semibold text-yojqi-ink text-sm">
                  {isZh ? room.bedInfoZh : room.bedInfoEn}
                </span>
              </div>

              <div className="col-span-2 sm:col-span-3 bg-neutral-50 p-3 rounded-xl border border-neutral-100 space-y-1">
                <span className="text-[10px] font-mono uppercase text-neutral-400 block">{isZh ? '景观视野' : 'Scenic Sightline'}</span>
                <span className="font-semibold text-amber-950 text-sm">
                  {isZh ? room.viewZh : room.viewEn}
                </span>
              </div>
            </div>
          </div>

          {/* Drone Show Vantage Feature */}
          <div className="bg-[#fff8f0] border-l-4 border-amber-600 rounded-r-2xl p-5 sm:p-6 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-amber-950">
              <Eye className="w-5 h-5 text-amber-700" />
              <span>{isZh ? '绝佳两江与无人机天幕机位' : 'The Front-Row Vantage Point'}</span>
            </div>
            <p className="text-xs sm:text-sm text-yojqi-bodyStrong leading-relaxed">
              {isZh ? room.droneVantageZh : room.droneVantageEn}
            </p>
          </div>

          {/* Amenities & Comfort */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold text-yojqi-inkHeading">
              {isZh ? '客房舒享与东方美学配套' : 'Curated Amenities & Somatic Rituals'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              {(isZh ? room.amenitiesZh : room.amenitiesEn).map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-yojqi-border">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-yojqi-bodyStrong">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* House Rules & Policies */}
          <div className="bg-white border border-yojqi-border rounded-2xl p-5 sm:p-6 space-y-4 text-xs">
            <h3 className="font-serif text-base font-bold text-yojqi-inkHeading">
              {isZh ? '入住须知与退改政策' : 'House Policies & Cancellation'}
            </h3>
            <div className="space-y-2.5 text-neutral-600 leading-relaxed">
              <div className="flex items-center gap-2 font-medium text-yojqi-ink">
                <Clock className="w-4 h-4 text-amber-700" />
                <span>{isZh ? '入住时间：15:00 之后 · 退房时间：12:00 之前 (提供全天行李寄存)' : 'Check-in: 15:00 · Check-out: 12:00 (Luggage storage included)'}</span>
              </div>
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                <span className="font-semibold block text-amber-950 mb-0.5">{isZh ? '退改守则：' : 'Cancellation:'}</span>
                <span>{isZh ? room.cancellationPolicyZh : room.cancellationPolicyEn}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Live Direct Booking Bar */}
        <div className="lg:col-span-5 sticky top-24 space-y-4">
          <div className="bg-[#fffdfa] border-2 border-amber-300 rounded-3xl p-6 shadow-xl space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-amber-800 bg-amber-100/80 px-2.5 py-1 rounded-full mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>{dict.retreats.directPerk}</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-yojqi-inkHeading">
                {dict.retreats.bookNow}
              </h3>
            </div>

            {/* Date Inputs */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-yojqi-bronze block font-medium">
                  {dict.retreats.checkIn}
                </label>
                <input
                  type="date"
                  value={checkIn}
                  min={tomorrow}
                  onChange={(e) => {
                    setCheckIn(e.target.value);
                    if (e.target.value >= checkOut) {
                      const next = new Date(new Date(e.target.value).getTime() + 24 * 60 * 60 * 1000)
                        .toISOString()
                        .split('T')[0];
                      setCheckOut(next);
                    }
                  }}
                  className="w-full px-3 py-2 bg-neutral-50 border border-yojqi-border rounded-xl text-xs font-mono text-yojqi-ink"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-yojqi-bronze block font-medium">
                  {dict.retreats.checkOut}
                </label>
                <input
                  type="date"
                  value={checkOut}
                  min={checkIn}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-50 border border-yojqi-border rounded-xl text-xs font-mono text-yojqi-ink"
                />
              </div>
            </div>

            {/* Rate & Status Display */}
            {loadingQuote ? (
              <div className="py-6 text-center text-xs text-neutral-400 font-mono">
                {isZh ? '正在从百居易查询实时价格与房态...' : 'Loading live PMS rates...'}
              </div>
            ) : quote ? (
              <div className="space-y-3 pt-2 border-t border-amber-100">
                {/* Availability Badge */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-500 font-mono">
                    {quote.nights} {isZh ? '晚入住' : 'Nights stay'}
                  </span>
                  {isSoldOut ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-neutral-200 text-neutral-600 font-medium flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      {dict.retreats.soldOut}
                    </span>
                  ) : isOnlyOneLeft ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-white font-medium flex items-center gap-1 animate-pulse">
                      <Sparkles className="w-3 h-3" />
                      {dict.retreats.onlyLeft.replace('{n}', '1')}
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-medium flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      {dict.retreats.available}
                    </span>
                  )}
                </div>

                {/* Price Display */}
                <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200/80">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-amber-900 font-medium">
                      {isZh ? '日均直订优享价' : 'Direct Nightly Rate'}
                    </span>
                    <div className="text-right">
                      <span className="font-serif text-3xl font-bold text-amber-950">
                        {formatFromCny(quote.avg_nightly_price)}
                      </span>
                      <span className="text-xs text-amber-800"> {dict.retreats.perNight}</span>
                      {currency !== 'CNY' && (
                        <div className="text-[10px] text-neutral-400 font-mono -mt-0.5">
                          {isZh ? `(约合 ¥${quote.avg_nightly_price} CNY)` : `(approx. ¥${quote.avg_nightly_price} CNY)`}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-baseline mt-2 pt-2 border-t border-amber-200/50 text-xs">
                    <span className="font-semibold text-amber-950">{dict.retreats.totalStay}:</span>
                    <div className="text-right">
                      <span className="font-mono font-bold text-base text-amber-950">
                        {formatFromCny(quote.total_amount)}
                      </span>
                      {currency !== 'CNY' && (
                        <span className="text-[11px] font-mono text-neutral-500 ml-1.5">
                          (约 ¥{quote.total_amount} CNY)
                        </span>
                      )}
                    </div>
                  </div>

                  {quote.direct_savings > 0 && (
                    <div className="text-[11px] text-emerald-700 font-medium mt-1">
                      {isZh
                        ? `✨ 官网直订比 OTA 平台立省 ${formatFromCny(quote.direct_savings)}`
                        : `✨ Save ${formatFromCny(quote.direct_savings)} vs OTA`}
                    </div>
                  )}
                </div>

                {/* Instant Book CTA */}
                <button
                  onClick={() => setIsDrawerOpen(true)}
                  disabled={isSoldOut}
                  className={`w-full py-3.5 px-4 rounded-xl text-sm font-semibold tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                    isSoldOut
                      ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                      : 'bg-amber-800 hover:bg-amber-900 text-white hover:shadow-lg'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>{isSoldOut ? dict.retreats.soldOut : dict.retreats.bookNow}</span>
                  {!isSoldOut && <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            ) : null}

            {/* Offline Concierge CTA */}
            <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
              <button
                onClick={() => setWechatModalOpen(true)}
                className="text-amber-800 hover:underline flex items-center gap-1 cursor-pointer font-medium"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>{dict.retreats.bookViaWechat}</span>
              </button>
              <span className="text-[11px] text-neutral-400 font-mono">
                {isZh ? '百居易自动同步' : 'Hostex Guaranteed'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Direct Booking Drawer Modal */}
      {quote && (
        <DirectBookingDrawer
          room={quote}
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          lang={lang}
        />
      )}

      {/* WeChat Modal */}
      <WeChatModal
        isOpen={wechatModalOpen}
        onClose={() => setWechatModalOpen(false)}
        lang={lang}
        wechatId="YOJQI_Sanctuary_VIP"
      />

      {/* Floating AI Butler */}
      <AIConciergeWidget lang={lang} />
    </div>
  );
}
