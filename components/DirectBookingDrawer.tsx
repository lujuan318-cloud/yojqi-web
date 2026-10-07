'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { X, Clock, ShieldCheck, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';
import { Language, getDictionary } from '@/lib/i18n';
import { RoomAvailabilityQuote } from '@/lib/retreats-pricing';

interface DirectBookingDrawerProps {
  room: RoomAvailabilityQuote | null;
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export function DirectBookingDrawer({ room, isOpen, onClose, lang }: DirectBookingDrawerProps) {
  const router = useRouter();
  const dict = getDictionary(lang);
  const isZh = lang === 'zh';

  // Hold token and 10-minute timer state
  const [holdToken, setHoldToken] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(600); // 10 minutes = 600s
  const [isHolding, setIsHolding] = useState<boolean>(false);

  // Form Fields
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [arrivalTime, setArrivalTime] = useState('15:00 - 18:00');
  const [specialRequests, setSpecialRequests] = useState('');

  // Submission state
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Acquire 10-minute hold when drawer opens
  useEffect(() => {
    if (isOpen && room && !holdToken) {
      setIsHolding(true);
      fetch('/api/retreats/hold', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          room_key: room.room_key,
          check_in: room.check_in,
          check_out: room.check_out,
          property_id: room.assigned_property_id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.hold_token) {
            setHoldToken(data.hold_token);
            setTimeLeft(600);
          } else {
            setErrorMessage(data.error || '房源锁定失败，请重试');
          }
        })
        .catch((err) => {
          console.error('Hold error:', err);
        })
        .finally(() => setIsHolding(false));
    }
  }, [isOpen, room, holdToken]);

  // Countdown timer effect
  useEffect(() => {
    if (!isOpen || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, timeLeft]);

  // Reset when drawer closes
  useEffect(() => {
    if (!isOpen) {
      setHoldToken(null);
      setTimeLeft(600);
      setErrorMessage(null);
    }
  }, [isOpen]);

  if (!isOpen || !room) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestPhone.trim()) {
      setErrorMessage(isZh ? '请填写入住人姓名和联系电话。' : 'Please provide guest name and contact phone.');
      return;
    }

    if (timeLeft <= 0) {
      setErrorMessage(isZh ? '锁房已超时失效，请刷新页面重新选择。' : 'Hold reservation expired. Please refresh.');
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);

    try {
      // 1. Call checkout API
      const checkoutRes = await fetch('/api/retreats/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          room_key: room.room_key,
          check_in: room.check_in,
          check_out: room.check_out,
          hold_token: holdToken,
          guest_name: guestName.trim(),
          guest_phone: guestPhone.trim(),
          guest_email: guestEmail.trim(),
          special_requests: specialRequests.trim(),
          estimated_arrival_time: arrivalTime,
          lang,
        }),
      });

      const checkoutData = await checkoutRes.json();

      if (!checkoutData.success) {
        throw new Error(checkoutData.error || '创建支付订单失败');
      }

      // If live Stripe URL returned, redirect to Stripe Checkout
      if (checkoutData.mode === 'stripe' && checkoutData.url) {
        window.location.href = checkoutData.url;
        return;
      }

      // If in preview/direct mode, confirm directly in Hostex PMS & redirect
      if (checkoutData.mode === 'preview_direct') {
        const confirmRes = await fetch('/api/retreats/confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            room_key: room.room_key,
            property_id: room.assigned_property_id,
            check_in: room.check_in,
            check_out: room.check_out,
            nights: room.nights,
            guest_name: guestName.trim(),
            guest_phone: guestPhone.trim(),
            guest_email: guestEmail.trim(),
            total_amount: room.total_amount,
            currency: room.currency,
            hold_token: holdToken,
            special_requests: specialRequests.trim(),
            estimated_arrival_time: arrivalTime,
          }),
        });

        const confirmData = await confirmRes.json();
        if (confirmData.success) {
          const voucherQuery = new URLSearchParams({
            code: confirmData.reservation_code,
            room: isZh ? room.nameZh : room.nameEn,
            in: room.check_in,
            out: room.check_out,
            nights: String(room.nights),
            guest: guestName,
            phone: guestPhone,
            total: String(room.total_amount),
          });
          router.push(`/${lang}/retreats/booking-success?${voucherQuery.toString()}`);
        } else {
          throw new Error(confirmData.error || '自动确认失败');
        }
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
      setErrorMessage(err.message || '系统繁忙，请稍后再试。');
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-lg bg-[#fffdfa] h-full overflow-y-auto shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        {/* Top Header */}
        <div>
          <div className="p-4 sm:p-5 border-b border-amber-200/60 flex items-center justify-between sticky top-0 bg-[#fffdfa] z-20">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-amber-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>{dict.retreats.directBookingTitle} · {dict.retreats.directPerk}</span>
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-yojqi-inkHeading">
                {dict.retreats.bookNow}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 10-Minute Hold Alert Bar */}
          <div className="bg-amber-500/10 border-b border-amber-200/80 px-4 py-2.5 flex items-center justify-between text-xs text-amber-950 font-medium">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-700 animate-pulse" />
              <span>{isHolding ? '正在向百居易请求锁定房态...' : dict.retreats.holdNotice}</span>
            </div>
            <span className="font-mono font-bold bg-amber-600 text-white px-2 py-0.5 rounded-md text-[11px]">
              {formattedTime}
            </span>
          </div>

          {/* Room Summary Header */}
          <div className="p-4 sm:p-5 border-b border-neutral-100 flex gap-3.5 items-center bg-[#fbf9f5]">
            <div className="relative w-24 h-18 rounded-lg overflow-hidden shrink-0 bg-neutral-900 border border-amber-200/60">
              <Image
                src={room.coverImage}
                alt={isZh ? room.nameZh : room.nameEn}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-serif text-sm sm:text-base font-bold text-yojqi-ink truncate">
                {isZh ? room.nameZh : room.nameEn}
              </h4>
              <p className="text-xs text-amber-900 font-mono mt-0.5">
                {room.check_in} 至 {room.check_out} ({room.nights} {dict.retreats.nights})
              </p>
              <div className="flex items-center gap-2 mt-1 text-[11px] text-neutral-500">
                <span>{room.bedInfoZh}</span>
                <span>·</span>
                <span>{room.area}</span>
              </div>
            </div>
          </div>

          {/* Error Message Alert */}
          {errorMessage && (
            <div className="m-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Guest Information Form */}
          <form id="direct-booking-form" onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-4">
            <div className="space-y-1">
              <h4 className="text-xs font-mono uppercase tracking-wider text-yojqi-bronze font-semibold">
                {dict.retreats.guestDetails}
              </h4>
              <p className="text-[11px] text-neutral-400">
                {isZh ? '用于百居易系统实名登记及办理入离手续' : 'Required for PMS check-in registration'}
              </p>
            </div>

            {/* Guest Name */}
            <div>
              <label className="block text-xs font-medium text-yojqi-ink mb-1">
                {dict.retreats.fullName} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder={isZh ? '例如：张晓明 / Jane Doe' : 'e.g. Jane Doe'}
                className="w-full px-3.5 py-2.5 bg-neutral-50 border border-yojqi-border rounded-xl text-xs sm:text-sm text-yojqi-ink focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-medium text-yojqi-ink mb-1">
                {dict.retreats.phone} <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={guestPhone}
                onChange={(e) => setGuestPhone(e.target.value)}
                placeholder={isZh ? '例如：13800000000 / +86 ...' : 'Mobile number'}
                className="w-full px-3.5 py-2.5 bg-neutral-50 border border-yojqi-border rounded-xl text-xs sm:text-sm text-yojqi-ink focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all font-mono"
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-medium text-yojqi-ink mb-1">
                {dict.retreats.email}
              </label>
              <input
                type="email"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                placeholder={isZh ? '用于接收电子预订确认凭据' : 'For receiving confirmation voucher'}
                className="w-full px-3.5 py-2.5 bg-neutral-50 border border-yojqi-border rounded-xl text-xs sm:text-sm text-yojqi-ink focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all font-mono"
              />
            </div>

            {/* Arrival Time */}
            <div>
              <label className="block text-xs font-medium text-yojqi-ink mb-1">
                {dict.retreats.arrivalTime}
              </label>
              <select
                value={arrivalTime}
                onChange={(e) => setArrivalTime(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-neutral-50 border border-yojqi-border rounded-xl text-xs sm:text-sm text-yojqi-ink focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all"
              >
                <option value="15:00 - 18:00">{isZh ? '15:00 - 18:00 (标准时间)' : '15:00 - 18:00 (Standard)'}</option>
                <option value="18:00 - 21:00">{isZh ? '18:00 - 21:00 (晚间抵达)' : '18:00 - 21:00 (Evening)'}</option>
                <option value="21:00 - 24:00">{isZh ? '21:00 - 24:00 (深夜红眼到店)' : '21:00 - 24:00 (Late Night)'}</option>
                <option value="12:00 - 15:00">{isZh ? '12:00 - 15:00 (需先寄存行李)' : '12:00 - 15:00 (Early Luggage Drop)'}</option>
              </select>
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-xs font-medium text-yojqi-ink mb-1">
                {dict.retreats.specialRequests}
              </label>
              <textarea
                rows={2}
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder={isZh ? '例如：需要高楼层、需要婴儿床品或出行游玩路线规划建议等' : 'e.g. High floor preference, tea refill, luggage storage...'}
                className="w-full px-3.5 py-2 bg-neutral-50 border border-yojqi-border rounded-xl text-xs text-yojqi-ink focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all"
              />
            </div>

            {/* Direct Perks Notice */}
            <div className="bg-[#fff8f0] border border-amber-200/90 rounded-xl p-3.5 text-xs text-amber-950 space-y-1.5">
              <div className="font-semibold flex items-center gap-1.5 text-amber-900">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>{isZh ? '官网直订专属权益包' : 'Complimentary Direct Perks'}</span>
              </div>
              <ul className="space-y-1 text-[11px] text-amber-900/90 list-disc list-inside">
                <li>{isZh ? '免排队专属管家 1 对 1 接引与入住' : 'Dedicated 1-on-1 VIP Host Check-in'}</li>
                <li>{isZh ? '精选高山冷泡工夫迎宾茶礼' : 'Complimentary Kung Fu Welcome Tea'}</li>
                <li>{isZh ? '全天候免费行李安全寄存' : 'All-day free luggage storage'}</li>
              </ul>
            </div>
          </form>
        </div>

        {/* Bottom Checkout Action Section */}
        <div className="p-4 sm:p-5 border-t border-amber-200/80 bg-[#fbf9f5] space-y-3 sticky bottom-0">
          {/* Price Breakdown */}
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between text-neutral-600">
              <span>{isZh ? `房费原价 (${room.nights} 晚)` : `Base Rate (${room.nights} nights)`}</span>
              <span className="font-mono">¥{room.original_ota_total}</span>
            </div>
            {room.direct_savings > 0 && (
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>{dict.retreats.directPerk}</span>
                <span className="font-mono">-¥{room.direct_savings}</span>
              </div>
            )}
            <div className="flex justify-between items-baseline pt-2 border-t border-neutral-200/70 text-sm font-bold text-yojqi-ink">
              <span>{dict.retreats.totalStay}</span>
              <span className="font-serif text-2xl text-amber-950">
                ¥{room.total_amount} <span className="text-xs font-mono font-normal text-neutral-500">CNY</span>
              </span>
            </div>
          </div>

          {/* Secure Payment Trigger Button */}
          <button
            type="submit"
            form="direct-booking-form"
            disabled={submitting || timeLeft <= 0}
            className="w-full py-3.5 px-4 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-sm font-semibold tracking-wide flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
          >
            {submitting ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
            )}
            <span>{submitting ? (isZh ? '正在锁定房态并生成凭据...' : 'Securing Stay...') : dict.retreats.payWithCard}</span>
            {!submitting && <ArrowRight className="w-4 h-4" />}
          </button>

          <div className="text-center text-[10px] text-neutral-400 flex items-center justify-center gap-2">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span>{isZh ? '百居易 OpenAPI 秒级自动关房 · 拒绝超售' : 'Guaranteed by Hostex Central PMS'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
