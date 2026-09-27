'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Search,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Shield,
  ArrowRight,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { Language, getDictionary } from '@/lib/i18n';
import { OrderRecord } from '@/lib/admin-data';
import { useCurrency } from '@/context/CurrencyContext';

interface TrackOrderPageProps {
  params: Promise<{ lang: string }>;
}

export default function TrackOrderPage({ params }: TrackOrderPageProps) {
  const [lang, setLang] = useState<Language>('zh');
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<OrderRecord | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const { formatPrice } = useCurrency();

  React.useEffect(() => {
    params.then((p) => setLang(p.lang as Language));
  }, [params]);

  const isZh = lang === 'zh';
  const dict = getDictionary(lang);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setOrder(null);

    if (!orderNumber.trim()) {
      setErrorMsg(isZh ? '请输入订单编号' : 'Please enter your Order Number.');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/orders/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderNumber: orderNumber.trim(), email: email.trim() }),
      });

      const data = await res.json();
      if (res.ok && data.order) {
        setOrder(data.order);
      } else {
        setErrorMsg(
          data.error ||
            (isZh
              ? '未查询到匹配的订单，请核对订单号与邮箱。'
              : 'No matching order found. Please verify your order number and email.')
        );
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(isZh ? '网络查询异常，请稍后重试' : 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: OrderRecord['orderStatus']) => {
    switch (status) {
      case 'paid':
        return { labelZh: '已支付 · 待备货开光', labelEn: 'Paid · Preparing', bg: 'bg-amber-100 text-amber-900 border-amber-300' };
      case 'processing':
        return { labelZh: '质检装箱 · 待揽收', labelEn: 'Processing & Consecrating', bg: 'bg-blue-100 text-blue-900 border-blue-300' };
      case 'shipped':
        return { labelZh: '已发货 · 运输中', labelEn: 'Shipped · In Transit', bg: 'bg-indigo-100 text-indigo-900 border-indigo-300' };
      case 'delivered':
        return { labelZh: '已安全送达', labelEn: 'Delivered', bg: 'bg-emerald-100 text-emerald-900 border-emerald-300' };
      case 'cancelled':
        return { labelZh: '已取消', labelEn: 'Cancelled', bg: 'bg-neutral-100 text-neutral-700 border-neutral-300' };
      default:
        return { labelZh: '待付款', labelEn: 'Unpaid', bg: 'bg-neutral-100 text-neutral-700 border-neutral-300' };
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-mono tracking-widest uppercase">
          <Truck className="w-3.5 h-3.5 text-yojqi-bronze" />
          <span>{isZh ? '全球物流追踪与开光进程' : 'Live Order & Consecration Tracking'}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-medium text-yojqi-inkHeading">
          {isZh ? '订单实时物流与加持状态查询' : 'Track Your YOJQI Order'}
        </h1>
        <p className="text-xs sm:text-sm text-yojqi-body leading-relaxed">
          {isZh
            ? '输入您的订单编号（如 YQ-20260927-8848）与下单邮箱，即可实时查验道门开光进程、出库质检及国际干线物流轨迹。'
            : 'Enter your Order Number and Email to inspect consecration packaging, dispatched courier status, and live route milestones.'}
        </p>
      </div>

      {/* Lookup Form */}
      <div className="bg-[#fffdfa] border border-yojqi-border rounded-2xl p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleTrack} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-yojqi-body mb-1.5">
                {isZh ? '订单编号 *' : 'Order Number *'}
              </label>
              <input
                type="text"
                required
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="e.g. YQ-20260927-8848"
                className="w-full px-3.5 py-2.5 rounded-xl border border-yojqi-border bg-white text-sm text-yojqi-ink focus:outline-none focus:border-yojqi-ink transition-colors uppercase font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-yojqi-body mb-1.5">
                {isZh ? '下单邮箱 (选填)' : 'Customer Email (Optional)'}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alexander@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-yojqi-border bg-white text-sm text-yojqi-ink focus:outline-none focus:border-yojqi-ink transition-colors"
              />
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 text-rose-700 text-xs border border-rose-200">
              {errorMsg}
            </div>
          )}

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-8 py-3 rounded-xl yojqi-btn-primary text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
            >
              <Search className="w-4 h-4" />
              <span>{loading ? (isZh ? '正在调取轨迹...' : 'Searching...') : (isZh ? '立即查询物流进度' : 'Track Order Status')}</span>
            </button>

            {/* Quick Demo Fill Button */}
            <button
              type="button"
              onClick={() => {
                setOrderNumber('YQ-20260927-8848');
                setEmail('alexander.vance@london-architects.co.uk');
              }}
              className="text-xs font-mono text-yojqi-bronze hover:underline"
            >
              {isZh ? '填入演示单号 (Sample: 8848)' : 'Use Sample Order (8848)'}
            </button>
          </div>
        </form>
      </div>

      {/* Order Result Card */}
      {order && (
        <div className="bg-white border border-yojqi-border rounded-2xl p-6 sm:p-8 shadow-md space-y-8 animate-in fade-in duration-200">
          {/* Top Bar: Order ID, Status, Carrier */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-5">
            <div>
              <span className="text-[11px] font-mono text-neutral-400 block uppercase">
                {isZh ? '官方凭据订单号' : 'Verified Order ID'}
              </span>
              <h2 className="font-serif text-2xl font-bold text-yojqi-ink font-mono mt-0.5">
                {order.orderNumber}
              </h2>
              <span className="text-xs text-neutral-500">
                {isZh ? `下单时间: ${order.createdAt}` : `Placed on: ${order.createdAt}`}
              </span>
            </div>

            <div className="flex flex-col sm:items-end gap-1.5">
              <span
                className={`px-3 py-1 rounded-full text-xs font-mono font-semibold border inline-flex items-center gap-1.5 self-start sm:self-auto ${
                  getStatusBadge(order.orderStatus).bg
                }`}
              >
                <Package className="w-3.5 h-3.5" />
                <span>{isZh ? getStatusBadge(order.orderStatus).labelZh : getStatusBadge(order.orderStatus).labelEn}</span>
              </span>

              {order.trackingNumber && (
                <div className="text-xs font-mono text-neutral-600">
                  <span>{isZh ? order.carrierNameZh : order.carrierNameEn}: </span>
                  <strong className="text-yojqi-ink select-all">{order.trackingNumber}</strong>
                </div>
              )}
            </div>
          </div>

          {/* Ordered Line Items */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-yojqi-bronze">
              {isZh ? '结缘商品清单' : 'Order Line Items'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 border border-neutral-100"
                >
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-white shrink-0 border border-neutral-200">
                    <Image
                      src={item.heroImage}
                      alt={isZh ? item.nameZh : item.nameEn}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-serif text-xs font-semibold text-yojqi-ink truncate">
                      {isZh ? item.nameZh : item.nameEn}
                    </h4>
                    <div className="flex items-center justify-between text-xs text-neutral-500 mt-1 font-mono">
                      <span>x {item.quantity}</span>
                      <strong className="text-yojqi-ink">{formatPrice(item.price * item.quantity)}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tracking Milestone Timeline */}
          {order.trackingEvents && order.trackingEvents.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-neutral-100">
              <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-yojqi-bronze flex items-center gap-1.5">
                <Truck className="w-4 h-4" />
                <span>{isZh ? '全链路物流与加持轨迹' : 'Fulfillment & Transit Milestones'}</span>
              </h3>

              <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-amber-200 pl-8">
                {order.trackingEvents.map((evt, idx) => (
                  <div key={idx} className="relative space-y-1">
                    <span className="absolute -left-8 top-1 w-2.5 h-2.5 rounded-full bg-amber-500 ring-4 ring-amber-100" />
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-serif text-sm font-bold text-yojqi-ink">
                        {isZh ? evt.titleZh : evt.titleEn}
                      </h4>
                      <span className="text-[11px] font-mono text-neutral-400">{evt.time}</span>
                    </div>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      {isZh ? evt.descriptionZh : evt.descriptionEn}
                    </p>
                    {evt.location && (
                      <span className="text-[10px] font-mono text-amber-800 bg-amber-50 px-2 py-0.5 rounded inline-block border border-amber-200">
                        {evt.location}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Destination Details */}
          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100 text-xs text-neutral-600 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="font-semibold text-yojqi-ink mr-1">{isZh ? '收件人:' : 'Recipient:'}</span>
              <span>
                {order.shippingAddress.recipientName} ({order.shippingAddress.phone})
              </span>
            </div>
            <div>
              <span className="font-semibold text-yojqi-ink mr-1">{isZh ? '派送地址:' : 'Destination:'}</span>
              <span>
                {order.shippingAddress.addressLine1}, {order.shippingAddress.city},{' '}
                {order.shippingAddress.country}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
