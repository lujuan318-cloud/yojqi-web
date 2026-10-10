'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  X,
  Clock,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Smartphone,
  CreditCard,
  Globe,
  Copy,
  Check,
  ExternalLink,
} from 'lucide-react';
import { Language, getDictionary } from '@/lib/i18n';
import { RoomAvailabilityQuote } from '@/lib/retreats-pricing';
import {
  PAYMENT_CHANNELS,
  getDirectAccountDetails,
  generateBookingReference,
} from '@/lib/payment-channels';
import { useCurrency } from '@/context/CurrencyContext';

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
  const { formatFromCny, currency } = useCurrency();

  // Step state: 1 = Guest Details, 2 = Payment Channel & Confirmation
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);

  // Hold token and 10-minute countdown
  const [holdToken, setHoldToken] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(600); // 10 minutes = 600s
  const [isHolding, setIsHolding] = useState<boolean>(false);

  // Form Fields
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [arrivalTime, setArrivalTime] = useState('15:00 - 18:00');
  const [specialRequests, setSpecialRequests] = useState('');

  // Selected Payment Channel
  const [selectedChannel, setSelectedChannel] = useState<'alipay' | 'paypal' | 'wise'>('alipay');
  const [paymentReference, setPaymentReference] = useState<string>('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Submission state
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const accountDetails = getDirectAccountDetails();

  // Acquire 10-minute hold and generate payment reference when drawer opens
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
            setErrorMessage(data.error || (isZh ? '房源锁定失败，请重试' : 'Hold lock failed'));
          }
        })
        .catch((err) => {
          console.error('Hold error:', err);
        })
        .finally(() => setIsHolding(false));
    }
  }, [isOpen, room, holdToken, isZh]);

  // Generate reference whenever channel changes
  useEffect(() => {
    if (isOpen) {
      setPaymentReference(generateBookingReference(selectedChannel));
    }
  }, [selectedChannel, isOpen]);

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
      setCurrentStep(1);
    }
  }, [isOpen]);

  if (!isOpen || !room) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Step 1 Validation -> proceed to Step 2
  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestPhone.trim()) {
      setErrorMessage(isZh ? '请填写入住人姓名和联系电话。' : 'Please provide guest name and contact phone.');
      return;
    }
    if (timeLeft <= 0) {
      setErrorMessage(isZh ? '锁房已超时失效，请刷新页面重新选择。' : 'Hold reservation expired. Please refresh.');
      return;
    }
    setErrorMessage(null);
    setCurrentStep(2);
  };

  // Final Step: Submit booking to Hostex OpenAPI & WeCom
  const handleConfirmReservation = async () => {
    if (timeLeft <= 0) {
      setErrorMessage(isZh ? '锁房已超时失效，请重新选择。' : 'Hold reservation expired.');
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);

    try {
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
          payment_channel: selectedChannel,
          payment_reference: paymentReference,
        }),
      });

      const confirmData = await confirmRes.json();
      if (!confirmData.success) {
        throw new Error(confirmData.error || (isZh ? '百居易自动锁房失败' : 'Hostex sync failed'));
      }

      // Successful confirmation: redirect to Voucher page
      const voucherQuery = new URLSearchParams({
        code: confirmData.reservation_code,
        room: isZh ? room.nameZh : room.nameEn,
        in: room.check_in,
        out: room.check_out,
        nights: String(room.nights),
        guest: guestName,
        phone: guestPhone,
        total: String(room.total_amount),
        channel: selectedChannel,
        ref: paymentReference,
      });

      router.push(`/${lang}/retreats/booking-success?${voucherQuery.toString()}`);
    } catch (err: any) {
      console.error('Confirm error:', err);
      setErrorMessage(err.message || (isZh ? '系统繁忙，请稍后再试。' : 'System busy, please retry.'));
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
                {currentStep === 1
                  ? (isZh ? '第一步：填写入住人信息' : 'Step 1: Guest Information')
                  : (isZh ? '第二步：选择支付方式并确认' : 'Step 2: Payment & Confirmation')}
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
              <span>{isHolding ? (isZh ? '正在向百居易请求独占锁房...' : 'Locking room with Hostex...') : dict.retreats.holdNotice}</span>
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

          {/* ================= STEP 1: GUEST DETAILS ================= */}
          {currentStep === 1 && (
            <form id="direct-guest-form" onSubmit={handleProceedToPayment} className="p-4 sm:p-5 space-y-4">
              <div className="space-y-1">
                <h4 className="text-xs font-mono uppercase tracking-wider text-yojqi-bronze font-semibold">
                  {dict.retreats.guestDetails}
                </h4>
                <p className="text-[11px] text-neutral-400">
                  {isZh ? '信息将直传百居易 PMS 系统，用于公安实名登记及入住办理' : 'Transmitted to Hostex PMS for hotel registration'}
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
                  placeholder={isZh ? '例如：13800000000 / +86 ...' : 'Mobile phone number'}
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
                  placeholder={isZh ? '用于接收电子预订确认凭据 Voucher' : 'For electronic stay voucher'}
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
                  <option value="15:00 - 18:00">{isZh ? '15:00 - 18:00 (标准下午入住)' : '15:00 - 18:00 (Standard Check-in)'}</option>
                  <option value="18:00 - 21:00">{isZh ? '18:00 - 21:00 (晚间抵达)' : '18:00 - 21:00 (Evening Arrival)'}</option>
                  <option value="21:00 - 24:00">{isZh ? '21:00 - 24:00 (深夜红眼到店)' : '21:00 - 24:00 (Late Night Arrival)'}</option>
                  <option value="12:00 - 15:00">{isZh ? '12:00 - 15:00 (需先寄存行李)' : '12:00 - 15:00 (Early Luggage Storage)'}</option>
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
                  <li>{isZh ? '专属管家 1 对 1 路线接引与入住' : 'Dedicated 1-on-1 VIP Host Check-in'}</li>
                  <li>{isZh ? '精选高山冷泡工夫迎宾茶礼' : 'Complimentary Kung Fu Welcome Tea'}</li>
                  <li>{isZh ? '全天候免费行李安全寄存' : 'All-day free luggage storage'}</li>
                  <li>{isZh ? '入住前48小时内可免费全额退改' : 'Free cancellation up to 48 hours'}</li>
                </ul>
              </div>
            </form>
          )}

          {/* ================= STEP 2: PAYMENT CHANNEL & CONFIRMATION ================= */}
          {currentStep === 2 && (
            <div className="p-4 sm:p-5 space-y-5">
              {/* Back to Step 1 Button */}
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="inline-flex items-center gap-1 text-xs text-amber-900 hover:text-amber-700 font-medium cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{isZh ? '← 返回修改入住人信息' : '← Back to Guest Details'}</span>
              </button>

              <div className="space-y-1">
                <h4 className="text-xs font-mono uppercase tracking-wider text-yojqi-bronze font-semibold">
                  {isZh ? '请选择支付渠道' : 'Select Payment Channel'}
                </h4>
                <p className="text-[11px] text-neutral-500">
                  {isZh ? '支持支付宝扫码/转账、PayPal 国际直付及 Wise 跨境电汇' : 'Choose your preferred payment method to secure reservation'}
                </p>
              </div>

              {/* Payment Channel Radio Options */}
              <div className="space-y-2.5">
                {PAYMENT_CHANNELS.map((ch) => {
                  const isSelected = selectedChannel === ch.id;
                  return (
                    <div
                      key={ch.id}
                      onClick={() => setSelectedChannel(ch.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                        isSelected
                          ? 'bg-amber-50/70 border-amber-600 ring-2 ring-amber-500/20 shadow-xs'
                          : 'bg-white border-yojqi-border hover:border-amber-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment_channel"
                        checked={isSelected}
                        onChange={() => setSelectedChannel(ch.id)}
                        className="mt-1 text-amber-800 focus:ring-amber-500"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-xs sm:text-sm text-yojqi-ink">
                            {isZh ? ch.nameZh : ch.nameEn}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-amber-100 text-amber-900">
                            {isZh ? ch.badgeZh : ch.badgeEn}
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-500 mt-0.5">
                          {isZh ? ch.descriptionZh : ch.descriptionEn}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Dedicated Payment Details Card */}
              <div className="bg-[#fbf9f5] border border-amber-200/80 rounded-2xl p-4 sm:p-5 space-y-3.5">
                {/* Reference Code Box */}
                <div className="bg-white border border-amber-200 rounded-xl p-3 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-800 block">
                      {isZh ? '专属预订参考码 (Transfer Reference)' : 'Booking Reference Code'}
                    </span>
                    <span className="font-mono text-sm sm:text-base font-bold text-amber-950">
                      {paymentReference}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(paymentReference, 'ref')}
                    className="p-1.5 rounded-lg border border-amber-200 hover:bg-amber-50 text-amber-900 text-xs flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    {copiedKey === 'ref' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'ref' ? (isZh ? '已复制' : 'Copied') : (isZh ? '复制' : 'Copy')}</span>
                  </button>
                </div>

                {/* ALIPAY SPECIFIC BOX */}
                {selectedChannel === 'alipay' && (
                  <div className="space-y-2.5 text-xs">
                    <div className="flex items-center gap-1.5 font-semibold text-amber-950">
                      <Smartphone className="w-4 h-4 text-blue-600" />
                      <span>{isZh ? '支付宝官方收款信息' : 'Alipay Transfer Info'}</span>
                    </div>

                    <div className="space-y-1.5 bg-white p-3 rounded-xl border border-neutral-200">
                      <div className="flex justify-between items-center">
                        <span className="text-neutral-500">{isZh ? '收款户名' : 'Payee Name'}:</span>
                        <span className="font-medium text-yojqi-ink">{accountDetails.alipay.payeeName}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-neutral-500">{isZh ? '支付宝账号' : 'Alipay Account'}:</span>
                        <div className="flex items-center gap-1 font-mono font-bold text-amber-950">
                          <span>{accountDetails.alipay.account}</span>
                          <button
                            type="button"
                            onClick={() => handleCopy(accountDetails.alipay.account, 'ali_acc')}
                            className="p-1 text-neutral-400 hover:text-amber-800"
                          >
                            {copiedKey === 'ali_acc' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] text-neutral-500 leading-relaxed">
                      💡 {isZh ? accountDetails.alipay.instructionsZh : accountDetails.alipay.instructionsEn}
                    </p>
                  </div>
                )}

                {/* PAYPAL SPECIFIC BOX */}
                {selectedChannel === 'paypal' && (
                  <div className="space-y-2.5 text-xs">
                    <div className="flex items-center gap-1.5 font-semibold text-amber-950">
                      <CreditCard className="w-4 h-4 text-blue-800" />
                      <span>{isZh ? 'PayPal 快速收款通道' : 'PayPal Instant Checkout'}</span>
                    </div>

                    <div className="space-y-1.5 bg-white p-3 rounded-xl border border-neutral-200">
                      <div className="flex justify-between items-center">
                        <span className="text-neutral-500">{isZh ? 'PayPal 收款邮箱' : 'PayPal Email'}:</span>
                        <div className="flex items-center gap-1 font-mono font-medium text-amber-950">
                          <span>{accountDetails.paypal.email}</span>
                          <button
                            type="button"
                            onClick={() => handleCopy(accountDetails.paypal.email, 'pp_email')}
                            className="p-1 text-neutral-400 hover:text-amber-800"
                          >
                            {copiedKey === 'pp_email' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    {accountDetails.paypal.payPalMeUrl && (
                      <a
                        href={`${accountDetails.paypal.payPalMeUrl}/${room.total_amount}CNY`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-3 bg-[#0070ba] hover:bg-[#005ea6] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                      >
                        <span>{isZh ? '打开 PayPal 快速付款页面' : 'Open PayPal.Me Checkout'}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

                    <p className="text-[11px] text-neutral-500 leading-relaxed">
                      💡 {isZh ? accountDetails.paypal.instructionsZh : accountDetails.paypal.instructionsEn}
                    </p>
                  </div>
                )}

                {/* WISE SPECIFIC BOX */}
                {selectedChannel === 'wise' && (
                  <div className="space-y-2.5 text-xs">
                    <div className="flex items-center gap-1.5 font-semibold text-amber-950">
                      <Globe className="w-4 h-4 text-emerald-700" />
                      <span>{isZh ? 'Wise 跨境多币种汇款账户' : 'Wise Wire Transfer Details'}</span>
                    </div>

                    <div className="space-y-1.5 bg-white p-3 rounded-xl border border-neutral-200 font-mono text-[11px]">
                      <div className="flex justify-between items-center">
                        <span className="text-neutral-400 font-sans">{isZh ? '收款账户名' : 'Holder'}:</span>
                        <span className="font-bold text-amber-950">{accountDetails.wise.accountHolder}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-neutral-400 font-sans">Wise Tag:</span>
                        <span className="text-yojqi-ink">{accountDetails.wise.wiseTag}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-neutral-400 font-sans">USD Routing / Account:</span>
                        <span className="text-neutral-700">{accountDetails.wise.usdRouting} / {accountDetails.wise.usdAccountNumber}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-neutral-400 font-sans">EUR IBAN:</span>
                        <span className="text-neutral-700">{accountDetails.wise.eurIban}</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-neutral-500 leading-relaxed">
                      💡 {isZh ? accountDetails.wise.instructionsZh : accountDetails.wise.instructionsEn}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Checkout Action Section */}
        <div className="p-4 sm:p-5 border-t border-amber-200/80 bg-[#fbf9f5] space-y-3 sticky bottom-0">
          {/* Price Breakdown */}
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between text-neutral-600">
              <span>{isZh ? `房费原价 (${room.nights} 晚)` : `Base Rate (${room.nights} nights)`}</span>
              <span className="font-mono">{formatFromCny(room.original_ota_total)}</span>
            </div>
            {room.direct_savings > 0 && (
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>{dict.retreats.directPerk}</span>
                <span className="font-mono">-{formatFromCny(room.direct_savings)}</span>
              </div>
            )}
            <div className="flex justify-between items-baseline pt-2 border-t border-neutral-200/70 text-sm font-bold text-yojqi-ink">
              <span>{dict.retreats.totalStay}</span>
              <div className="text-right">
                <span className="font-serif text-2xl text-amber-950">
                  {formatFromCny(room.total_amount)}
                </span>
                {currency !== 'CNY' && (
                  <span className="text-xs font-mono font-normal text-neutral-500 ml-1.5">
                    (¥{room.total_amount} CNY)
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action Trigger Button */}
          {currentStep === 1 ? (
            <button
              type="submit"
              form="direct-guest-form"
              disabled={timeLeft <= 0}
              className="w-full py-3.5 px-4 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-sm font-semibold tracking-wide flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
            >
              <span>{isZh ? '下一步：选择支付方式' : 'Next: Choose Payment Method'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleConfirmReservation}
              disabled={submitting || timeLeft <= 0}
              className="w-full py-3.5 px-4 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-sm font-semibold tracking-wide flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
            >
              {submitting ? (
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
              )}
              <span>
                {submitting
                  ? (isZh ? '正在向百居易锁房并同步OTA关房...' : 'Locking room with Hostex...')
                  : (isZh
                      ? `确认并生成直订凭据 (${formatFromCny(room.total_amount)})`
                      : `Confirm Reservation (${formatFromCny(room.total_amount)})`)}
              </span>
              {!submitting && <ArrowRight className="w-4 h-4" />}
            </button>
          )}

          <div className="text-center text-[10px] text-neutral-400 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>
              {isZh
                ? '百居易 OpenAPI 实时锁房保障 · 自动关停 Booking/携程库存'
                : 'Hostex OpenAPI Realtime Calendar Sync & Protection'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
