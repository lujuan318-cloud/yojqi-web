'use client';

import React, { useState, useEffect, use, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Calendar,
  Phone,
  ShieldCheck,
  AlertCircle,
  Search,
  CheckCircle2,
  XCircle,
  MapPin,
  Clock,
  Printer,
  Sparkles,
  ArrowLeft,
  RotateCcw,
} from 'lucide-react';
import { Language } from '@/lib/i18n';

interface ReservationData {
  code: string;
  status: string;
  guest_name: string;
  guest_phone: string;
  check_in_date: string;
  check_out_date: string;
  total_amount: number;
  currency: string;
  remarks?: string;
  property_id?: number;
}

function ManageBookingContent({ lang }: { lang: Language }) {
  const searchParams = useSearchParams();
  const isZh = lang === 'zh';

  const initialCode = searchParams.get('code') || '';
  const initialPhone = searchParams.get('phone') || '';

  const [code, setCode] = useState(initialCode);
  const [phone, setPhone] = useState(initialPhone);

  const [loading, setLoading] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [reservation, setReservation] = useState<ReservationData | null>(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [cancelReason, setCancelReason] = useState('行程有变');

  // Auto-lookup if code is provided in URL query
  useEffect(() => {
    if (initialCode) {
      handleLookup(initialCode, initialPhone);
    }
  }, [initialCode]);

  const handleLookup = async (targetCode: string = code, targetPhone: string = phone) => {
    if (!targetCode.trim()) {
      setErrorMessage(isZh ? '请输入预订确认码。' : 'Please provide reservation code.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const res = await fetch('/api/retreats/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reservation_code: targetCode.trim(),
          guest_phone: targetPhone.trim(),
        }),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || (isZh ? '查询失败，未找到订单' : 'Lookup failed'));
      }

      setReservation(data.reservation);
    } catch (err: any) {
      setErrorMessage(err.message || (isZh ? '查询出现异常，请稍后再试' : 'Error querying reservation'));
      setReservation(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelReservation = async () => {
    if (!reservation) return;

    setCancelling(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/retreats/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reservation_code: reservation.code,
          guest_phone: phone || reservation.guest_phone,
          reason: cancelReason,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || (isZh ? '取消失败' : 'Cancellation failed'));
      }

      setSuccessMessage(
        isZh
          ? '预订已成功取消！百居易房态已自动释放，各大 OTA 渠道对应库存已恢复开房。'
          : 'Reservation cancelled! Property inventory reopened in Hostex & OTAs.'
      );
      setShowCancelConfirm(false);
      // Update local reservation state
      setReservation((prev) => (prev ? { ...prev, status: 'cancelled' } : null));
    } catch (err: any) {
      setErrorMessage(err.message || (isZh ? '取消失败，请联系管家' : 'Failed to cancel'));
    } finally {
      setCancelling(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-8 animate-in fade-in duration-500">
      {/* Top Back Nav */}
      <div>
        <Link
          href={`/${lang}/retreats`}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-900 hover:text-amber-700 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{isZh ? '返回重庆宿集直订首页' : 'Back to Sanctuaries'}</span>
        </Link>
      </div>

      {/* Hero Header */}
      <div className="bg-[#fffdfa] border border-amber-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-mono font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
          <span>{isZh ? '百居易中央房态实时直连' : 'Hostex Direct Booking Manager'}</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-yojqi-inkHeading">
          {isZh ? '官网直订订单查询与自助管理' : 'Manage Your Direct Reservation'}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 max-w-xl">
          {isZh
            ? '输入您的预订确认码与手机号，即可实时核验百居易 PMS 房态、查看入住交通指引、或在入住前自助申请免费退订与开房。'
            : 'Look up your reservation, check Hostex live calendar status, or manage cancellations with instant inventory reopening.'}
        </p>

        {/* Query Input Bar */}
        <div className="pt-3 grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-5">
            <label className="block text-[11px] font-medium text-neutral-500 mb-1">
              {isZh ? '预订确认码 (Reservation Code)' : 'Reservation Code'}
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={isZh ? '如 11-xxxxxx-xxxx 或 YQ-...' : 'e.g. 11-xxxxxx or YQ-...'}
              className="w-full px-3.5 py-2.5 bg-white border border-yojqi-border rounded-xl text-xs sm:text-sm font-mono text-yojqi-ink focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
            />
          </div>

          <div className="sm:col-span-4">
            <label className="block text-[11px] font-medium text-neutral-500 mb-1">
              {isZh ? '预订人手机号 (用于安全核验)' : 'Mobile Phone (Security check)'}
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={isZh ? '手机号后4位或完整号码' : 'Phone number'}
              className="w-full px-3.5 py-2.5 bg-white border border-yojqi-border rounded-xl text-xs sm:text-sm font-mono text-yojqi-ink focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
            />
          </div>

          <div className="sm:col-span-3 flex items-end">
            <button
              onClick={() => handleLookup(code, phone)}
              disabled={loading}
              className="w-full py-2.5 px-4 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm disabled:opacity-50"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
              <span>{isZh ? '查询预订' : 'Search'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Alert Messages */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-2.5">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-2.5">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Reservation Details Display Card */}
      {reservation && (
        <div className="bg-white border border-yojqi-border rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in">
          {/* Header Row */}
          <div className="flex flex-wrap items-baseline justify-between gap-3 pb-4 border-b border-neutral-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-yojqi-bronze">
                  {isZh ? '预订详情' : 'Stay Summary'}
                </span>
                <span
                  className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full font-mono flex items-center gap-1 ${
                    reservation.status === 'cancelled'
                      ? 'bg-neutral-100 text-neutral-500 border border-neutral-200'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  }`}
                >
                  {reservation.status === 'cancelled' ? (
                    <>
                      <XCircle className="w-3 h-3 text-neutral-400" />
                      <span>{isZh ? '已退订 (房态已释放开房)' : 'Cancelled (Inventory Reopened)'}</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>{isZh ? '已确认 (百居易锁房中)' : 'Confirmed & Active'}</span>
                    </>
                  )}
                </span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-yojqi-inkHeading mt-1">
                {isZh ? '白虹·两江汇全江景高空宿集' : 'Baihong River View Panoramic Retreat'}
              </h3>
            </div>

            <div className="text-right">
              <span className="text-xs text-neutral-400 block">{isZh ? '预订总金额' : 'Total Amount'}</span>
              <span className="font-serif text-2xl font-bold text-amber-950">
                ¥{reservation.total_amount} <span className="text-xs font-mono font-normal text-neutral-500">CNY</span>
              </span>
            </div>
          </div>

          {/* Grid Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-100 space-y-1">
              <div className="flex items-center gap-1.5 text-neutral-400 font-mono text-[10px] uppercase">
                <Calendar className="w-3.5 h-3.5 text-amber-700" />
                <span>{isZh ? '入住日期' : 'Check-in'}</span>
              </div>
              <div className="font-bold text-yojqi-ink text-sm font-mono">{reservation.check_in_date}</div>
              <div className="text-[11px] text-neutral-500">{isZh ? '15:00 之后' : 'From 15:00'}</div>
            </div>

            <div className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-100 space-y-1">
              <div className="flex items-center gap-1.5 text-neutral-400 font-mono text-[10px] uppercase">
                <Calendar className="w-3.5 h-3.5 text-amber-700" />
                <span>{isZh ? '退房日期' : 'Check-out'}</span>
              </div>
              <div className="font-bold text-yojqi-ink text-sm font-mono">{reservation.check_out_date}</div>
              <div className="text-[11px] text-neutral-500">{isZh ? '12:00 之前' : 'Before 12:00'}</div>
            </div>

            <div className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-100 space-y-1">
              <div className="flex items-center gap-1.5 text-neutral-400 font-mono text-[10px] uppercase">
                <Phone className="w-3.5 h-3.5 text-amber-700" />
                <span>{isZh ? '入住联系人' : 'Guest'}</span>
              </div>
              <div className="font-bold text-yojqi-ink text-sm truncate">{reservation.guest_name}</div>
              <div className="text-[11px] text-neutral-500 font-mono truncate">{reservation.guest_phone || '已登记'}</div>
            </div>

            <div className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-100 space-y-1">
              <div className="flex items-center gap-1.5 text-neutral-400 font-mono text-[10px] uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                <span>{isZh ? '百居易预订码' : 'Hostex Code'}</span>
              </div>
              <div className="font-bold text-amber-950 text-xs font-mono truncate">{reservation.code}</div>
              <div className="text-[11px] text-emerald-700 font-medium">{isZh ? '官方直订渠道 #29' : 'Channel #29'}</div>
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

          {/* Cancellation Action Box */}
          {reservation.status !== 'cancelled' && (
            <div className="pt-4 border-t border-neutral-100 space-y-3">
              {!showCancelConfirm ? (
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-neutral-500 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    <span>{isZh ? '入住前48小时内可免费全额退改。系统将秒级释放房源并重新开房。' : 'Free cancellation up to 48 hours before check-in.'}</span>
                  </div>

                  <button
                    onClick={() => setShowCancelConfirm(true)}
                    className="px-4 py-2.5 rounded-xl border border-red-200 text-red-700 hover:bg-red-50 text-xs font-medium transition-colors cursor-pointer"
                  >
                    {isZh ? '申请取消预订 (释放房源)' : 'Request Cancellation'}
                  </button>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-red-50/70 border border-red-200 space-y-3 animate-in fade-in">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-red-900 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-red-600" />
                      <span>{isZh ? '确认要取消该预订吗？' : 'Confirm Cancellation?'}</span>
                    </h4>
                    <p className="text-xs text-red-700">
                      {isZh
                        ? '点击确认后，百居易将立即释放该物理房间，并自动向 Booking.com、携程等各大渠道恢复开房。如有已支付款项，专属管家将为您办理原路退款。'
                        : 'Hostex will cancel this reservation and reopen calendars on Booking.com/Ctrip instantly.'}
                    </p>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                      {isZh ? '取消原因 (选填)' : 'Cancellation Reason'}
                    </label>
                    <input
                      type="text"
                      value={cancelReason}
                      onChange={(e) => setCancelReason(e.target.value)}
                      placeholder={isZh ? '如行程变动、天气原因等' : 'Change of travel plans'}
                      className="w-full px-3 py-2 bg-white border border-red-200 rounded-xl text-xs text-yojqi-ink"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <button
                      onClick={handleCancelReservation}
                      disabled={cancelling}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                    >
                      {cancelling && <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                      <span>{cancelling ? (isZh ? '正在释放房态...' : 'Reopening...') : (isZh ? '确认取消预订' : 'Confirm Cancel')}</span>
                    </button>

                    <button
                      onClick={() => setShowCancelConfirm(false)}
                      className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-xl text-xs font-medium transition-colors cursor-pointer"
                    >
                      {isZh ? '放弃' : 'Back'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ManageBookingPage({
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
      <ManageBookingContent lang={lang as Language} />
    </Suspense>
  );
}
