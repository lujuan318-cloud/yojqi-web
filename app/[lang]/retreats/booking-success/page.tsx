'use client';

import React, { use, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Calendar, MapPin, Phone, Printer, ArrowLeft, ShieldCheck, Clock, Sparkles } from 'lucide-react';
import { Language } from '@/lib/i18n';

function BookingSuccessContent({ lang }: { lang: Language }) {
  const searchParams = useSearchParams();
  const isZh = lang === 'zh';

  const reservationCode = searchParams.get('code') || 'YQ-STAY-CONFIRMED';
  const roomName = searchParams.get('room') || (isZh ? '白虹·两江汇全江景高空民宿' : 'Baihong River View Panoramic Retreat');
  const checkIn = searchParams.get('in') || new Date().toISOString().split('T')[0];
  const checkOut = searchParams.get('out') || new Date().toISOString().split('T')[0];
  const nights = searchParams.get('nights') || '1';
  const guestName = searchParams.get('guest') || (isZh ? '贵宾' : 'Guest');
  const guestPhone = searchParams.get('phone') || '';
  const totalAmount = searchParams.get('total') || '688';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-8 animate-in fade-in duration-500">
      {/* Top Back Link */}
      <div>
        <Link
          href={`/${lang}/retreats`}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-900 hover:text-amber-700 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{isZh ? '返回重庆宿集直订首页' : 'Back to Sanctuaries'}</span>
        </Link>
      </div>

      {/* Success Hero Banner */}
      <div className="bg-[#fffdfa] border border-emerald-200 rounded-3xl p-6 sm:p-8 shadow-xl text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-mono font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isZh ? '百居易中央房态已锁房 · 关停外部OTA对应库存' : 'Hostex PMS Confirmed & OTA Auto-Locked'}</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-yojqi-inkHeading">
            {isZh ? '预订成功！期待与您山城相遇' : 'Reservation Confirmed!'}
          </h1>
          <p className="text-xs sm:text-sm text-yojqi-body max-w-lg mx-auto">
            {isZh
              ? '您的直订订单已正式生效。专属东方管家团队已收到您的入住意向，将为您准备迎宾茶席与路线指引。'
              : 'Your direct booking is officially confirmed. Our VIP concierge team is preparing your welcome tea ritual.'}
          </p>
        </div>

        {/* Voucher Reference Box */}
        <div className="inline-flex flex-col items-center justify-center bg-amber-50/70 border border-amber-200/80 rounded-2xl px-6 py-3.5 mx-auto">
          <span className="text-[11px] font-mono text-amber-800 uppercase tracking-widest">
            {isZh ? '预订确认码 (Reservation Code)' : 'Booking Reference'}
          </span>
          <span className="font-mono text-xl sm:text-2xl font-bold text-amber-950 tracking-wider">
            {reservationCode}
          </span>
        </div>
      </div>

      {/* Voucher Details Card (Printable) */}
      <div id="voucher-card" className="bg-white border border-yojqi-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-wrap items-baseline justify-between gap-3 pb-4 border-b border-neutral-100">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-yojqi-bronze">
              {isZh ? '直订住宿凭证' : 'Official Direct Stay Voucher'}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-yojqi-inkHeading mt-0.5">
              {roomName}
            </h3>
          </div>
          <div className="text-right">
            <span className="text-xs text-neutral-400 block">{isZh ? '实付总额' : 'Total Amount'}</span>
            <span className="font-serif text-2xl font-bold text-amber-950">
              ¥{totalAmount} <span className="text-xs font-mono font-normal text-neutral-500">CNY</span>
            </span>
          </div>
        </div>

        {/* Stay Grid Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-100 space-y-1">
            <div className="flex items-center gap-1.5 text-neutral-400 font-mono text-[10px] uppercase">
              <Calendar className="w-3.5 h-3.5 text-amber-700" />
              <span>{isZh ? '入住日期' : 'Check-in'}</span>
            </div>
            <div className="font-bold text-yojqi-ink text-sm font-mono">{checkIn}</div>
            <div className="text-[11px] text-neutral-500">{isZh ? '15:00 之后' : 'From 15:00'}</div>
          </div>

          <div className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-100 space-y-1">
            <div className="flex items-center gap-1.5 text-neutral-400 font-mono text-[10px] uppercase">
              <Calendar className="w-3.5 h-3.5 text-amber-700" />
              <span>{isZh ? '退房日期' : 'Check-out'}</span>
            </div>
            <div className="font-bold text-yojqi-ink text-sm font-mono">{checkOut}</div>
            <div className="text-[11px] text-neutral-500">{isZh ? '12:00 之前' : 'Before 12:00'}</div>
          </div>

          <div className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-100 space-y-1">
            <div className="flex items-center gap-1.5 text-neutral-400 font-mono text-[10px] uppercase">
              <Clock className="w-3.5 h-3.5 text-amber-700" />
              <span>{isZh ? '入住房晚' : 'Stay Duration'}</span>
            </div>
            <div className="font-bold text-yojqi-ink text-sm font-mono">
              {nights} {isZh ? '晚' : 'Nights'}
            </div>
            <div className="text-[11px] text-emerald-700 font-medium">{isZh ? '享官网 95 折' : '5% Direct Discount'}</div>
          </div>

          <div className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-100 space-y-1">
            <div className="flex items-center gap-1.5 text-neutral-400 font-mono text-[10px] uppercase">
              <Phone className="w-3.5 h-3.5 text-amber-700" />
              <span>{isZh ? '入住联系人' : 'Guest'}</span>
            </div>
            <div className="font-bold text-yojqi-ink text-sm truncate">{guestName}</div>
            <div className="text-[11px] text-neutral-500 font-mono truncate">{guestPhone}</div>
          </div>
        </div>

        {/* Location & Navigation */}
        <div className="bg-[#fbf9f5] border border-amber-200/70 rounded-xl p-4 sm:p-5 space-y-2 text-xs">
          <div className="flex items-center gap-1.5 font-semibold text-amber-950">
            <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
            <span>{isZh ? '民宿位置与交通指引' : 'Location & Navigation'}</span>
          </div>
          <p className="text-neutral-700 leading-relaxed">
            {isZh
              ? '重庆市渝中区解放碑/洪崖洞核心商圈（近千厮门大桥、轻轨轨道交通站步行3分钟）。楼下有专用停车场，打车可直接导航至“白虹民宿两江汇”下车。'
              : 'Yuzhong Peninsula, Jiefangbei / Hongyadong CBD, Chongqing (3-minute walk to metro station, overlooking Qiansimen Bridge). Search "Baihong Retreat" on taxi navigation.'}
          </p>
        </div>

        {/* Direct Booking Perks Included */}
        <div className="bg-[#fff8f0] border border-amber-200/90 rounded-xl p-4 sm:p-5 text-xs text-amber-950 space-y-2">
          <div className="font-semibold flex items-center gap-1.5 text-amber-900">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>{isZh ? '已随单生效的官网专属礼遇' : 'Complimentary Stay Perks'}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
            <div className="p-2 bg-white rounded-lg border border-amber-100">
              🍵 {isZh ? '高山冷泡工夫茶迎宾礼' : 'Welcome Kung Fu Tea'}
            </div>
            <div className="p-2 bg-white rounded-lg border border-amber-100">
              🧳 {isZh ? '全天候免费行李寄存' : 'All-Day Luggage Storage'}
            </div>
            <div className="p-2 bg-white rounded-lg border border-amber-100">
              ✨ {isZh ? '专属管家一对一出行指引' : '1-on-1 VIP Host Guide'}
            </div>
          </div>
        </div>

        {/* Contact Concierge & Print Buttons */}
        <div className="pt-4 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl border border-yojqi-border hover:border-amber-600 text-xs font-medium text-yojqi-ink flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>{isZh ? '打印或保存凭证' : 'Print Voucher'}</span>
            </button>

            <Link
              href={`/${lang}/retreats/manage?code=${encodeURIComponent(reservationCode)}&phone=${encodeURIComponent(guestPhone)}`}
              className="px-4 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-medium flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <span>{isZh ? '管理或退改预订' : 'Manage Booking'}</span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-500">{isZh ? '管家微信：' : 'WeChat Concierge:'}</span>
            <span className="font-mono text-xs font-semibold text-amber-950 bg-amber-100 px-2.5 py-1 rounded-md">
              YOJQI_Sanctuary_VIP
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingSuccessPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = use(params);
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center">
          <div className="w-8 h-8 border-3 border-amber-700 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      }
    >
      <BookingSuccessContent lang={lang as Language} />
    </Suspense>
  );
}
