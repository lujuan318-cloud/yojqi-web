'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  X,
  ShieldCheck,
  Smartphone,
  CreditCard,
  Globe,
  Copy,
  Check,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  Package,
} from 'lucide-react';
import { Language } from '@/lib/i18n';
import {
  PAYMENT_CHANNELS,
  getDirectAccountDetails,
  generateBookingReference,
} from '@/lib/payment-channels';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';

interface DirectProductCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export function DirectProductCheckoutModal({
  isOpen,
  onClose,
  lang,
}: DirectProductCheckoutModalProps) {
  const router = useRouter();
  const isZh = lang === 'zh';
  const { items, totalPrice, clearCart } = useCart();
  const { currency, formatPrice } = useCurrency();

  const [step, setStep] = useState<1 | 2>(1);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [buyerNotes, setBuyerNotes] = useState('');

  const [selectedChannel, setSelectedChannel] = useState<'alipay' | 'paypal' | 'wise'>('alipay');
  const [paymentReference, setPaymentReference] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const accountDetails = getDirectAccountDetails();

  useEffect(() => {
    if (isOpen) {
      setPaymentReference(generateBookingReference(selectedChannel));
    }
  }, [selectedChannel, isOpen]);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !shippingAddress.trim()) {
      setErrorMessage(
        isZh
          ? '请填写收件人姓名、联系电话与收货地址。'
          : 'Please enter recipient name, phone, and delivery address.'
      );
      return;
    }
    setErrorMessage(null);
    setStep(2);
  };

  const handleCompleteOrder = async () => {
    setSubmitting(true);
    setErrorMessage(null);

    try {
      const lineItems = items.map((it) => ({
        id: it.product.id,
        name: isZh ? it.product.nameZh : it.product.nameEn,
        price: it.product.price,
        quantity: it.quantity,
        image: it.product.heroImage,
      }));

      const res = await fetch('/api/checkout/direct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: lineItems,
          customer_name: customerName.trim(),
          customer_phone: customerPhone.trim(),
          customer_email: customerEmail.trim(),
          shipping_address: shippingAddress.trim(),
          payment_channel: selectedChannel,
          payment_reference: paymentReference,
          buyer_notes: buyerNotes.trim(),
          currency,
          lang,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || (isZh ? '订单提交失败，请重试' : 'Order submission failed'));
      }

      // Clear shopping bag
      clearCart();
      onClose();

      // Redirect to Order Success Page
      router.push(`/${lang}/checkout/success?session_id=${data.order_number}`);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || (isZh ? '提交异常，请稍后重试' : 'Checkout error'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#fffdfa] rounded-3xl shadow-2xl border border-yojqi-border overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 border-b border-amber-200/70 flex items-center justify-between bg-[#fbf9f5]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-yojqi-inkHeading">
                {step === 1
                  ? isZh
                    ? '实物商品直付收银台 · 填写配送信息'
                    : 'Direct Checkout · Shipping Details'
                  : isZh
                  ? '实物商品直付收银台 · 选择支付并结算'
                  : 'Direct Checkout · Payment & Confirmation'}
              </h3>
              <p className="text-[11px] text-neutral-500">
                {isZh
                  ? '支持微信/支付宝聚合扫码、PayPal 国际直付及 Wise 跨境汇款'
                  : 'Universal QR (WeChat/Alipay), PayPal Direct & Wise'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* STEP 1: SHIPPING INFORMATION */}
          {step === 1 && (
            <form id="direct-product-form" onSubmit={handleProceedToPayment} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-medium text-yojqi-ink mb-1">
                    {isZh ? '收件人姓名 *' : 'Recipient Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder={isZh ? '例如：张先生 / Lin Wang' : 'e.g. John Doe'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-yojqi-border bg-white text-xs text-yojqi-ink focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-yojqi-ink mb-1">
                    {isZh ? '联系电话 / WhatsApp *' : 'Phone / WhatsApp *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder={isZh ? '用于包裹出库配送与物流通知' : '+1 (555) 000-0000'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-yojqi-border bg-white text-xs text-yojqi-ink focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-yojqi-ink mb-1">
                  {isZh ? '电子邮箱 (选填)' : 'Email (Optional, for tracking updates)'}
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="contact@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-yojqi-border bg-white text-xs text-yojqi-ink focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-yojqi-ink mb-1">
                  {isZh ? '详细收货地址 (国家 / 省市区 / 街道门牌 / 邮编) *' : 'Full Shipping Address *'}
                </label>
                <textarea
                  rows={2}
                  required
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder={
                    isZh
                      ? '支持国内顺丰速运或海外国际快递直邮，请写明具体门牌号与邮编'
                      : 'Country, State/Province, City, Street Address, Postal Code'
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-yojqi-border bg-white text-xs text-yojqi-ink focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-yojqi-ink mb-1">
                  {isZh ? '买家留言 / 特殊包装要求 (选填)' : 'Order Notes / Gift Packaging'}
                </label>
                <input
                  type="text"
                  value={buyerNotes}
                  onChange={(e) => setBuyerNotes(e.target.value)}
                  placeholder={isZh ? '如需定制礼品贺卡或开光祈福寄语，请在此说明' : 'Gift notes or instructions'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-yojqi-border bg-white text-xs text-yojqi-ink focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600"
                />
              </div>

              {/* Items Preview */}
              <div className="bg-amber-50/50 border border-amber-200/60 rounded-2xl p-3.5 space-y-2">
                <span className="text-[11px] font-mono text-amber-900 font-semibold uppercase tracking-wider block">
                  {isZh ? '订购商品清单' : 'Order Summary'}
                </span>
                <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                  {items.map(({ product, quantity }) => (
                    <div key={product.id} className="flex justify-between items-center text-xs">
                      <span className="text-neutral-700 truncate pr-2">
                        {isZh ? product.nameZh : product.nameEn} × {quantity}
                      </span>
                      <span className="font-mono font-medium text-amber-950 shrink-0">
                        {formatPrice(product.price * quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </form>
          )}

          {/* STEP 2: PAYMENT METHOD & SETTLEMENT */}
          {step === 2 && (
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1 text-xs text-amber-900 hover:text-amber-700 font-medium cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{isZh ? '← 返回修改配送信息' : '← Back to Shipping Info'}</span>
              </button>

              {/* Payment Channel Selector */}
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
                        name="product_payment_channel"
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

              {/* Payment Content Display */}
              <div className="bg-[#fbf9f5] border border-amber-200/80 rounded-2xl p-4 space-y-3.5">
                {/* Reference Code Box */}
                <div className="bg-white border border-amber-200 rounded-xl p-3 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-800 block">
                      {isZh ? '专属订单付款参考码 (Order Reference)' : 'Payment Reference Code'}
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

                {/* 1. AGGREGATE PAY (WECHAT / ALIPAY) */}
                {selectedChannel === 'alipay' && (
                  <div className="space-y-3 text-xs">
                    <div className="bg-white p-4 rounded-2xl border border-amber-200/80 flex flex-col items-center justify-center text-center shadow-xs">
                      <div className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-xl overflow-hidden bg-white border border-neutral-100 p-2 shadow-xs">
                        <Image
                          src={accountDetails.alipay.qrImageUrl}
                          alt="WeChat & Alipay Aggregate QR"
                          width={192}
                          height={192}
                          className="object-contain w-full h-full"
                          priority
                        />
                      </div>
                      <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-neutral-600">
                        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="font-medium">{isZh ? '支持手机微信或支付宝直接扫码' : 'Scan via WeChat or Alipay'}</span>
                      </div>
                      <p className="text-[11px] text-amber-900/90 mt-1">
                        {isZh ? '收款户名：重庆农商行渝快付聚合收单 / 百弘江景民宿' : 'Payee: Chongqing Rural Commercial Bank / Baihong'}
                      </p>
                    </div>

                    <div className="bg-amber-500/10 p-2.5 rounded-xl border border-amber-200/70 text-[11px] text-amber-950 leading-relaxed">
                      💡 {isZh ? accountDetails.alipay.instructionsZh : accountDetails.alipay.instructionsEn}
                    </div>
                  </div>
                )}

                {/* 2. PAYPAL */}
                {selectedChannel === 'paypal' && (
                  <div className="space-y-3 text-xs">
                    <div className="bg-white p-3.5 rounded-2xl border border-neutral-200 shadow-xs space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-neutral-500">{isZh ? 'PayPal 收款通道' : 'PayPal URL'}:</span>
                        <div className="flex items-center gap-1 font-mono font-bold text-amber-950">
                          <span>paypal.me/BaihongYojqi</span>
                          <button
                            type="button"
                            onClick={() => handleCopy('https://paypal.me/BaihongYojqi', 'pp_url')}
                            className="p-1 text-neutral-400 hover:text-amber-800"
                          >
                            {copiedKey === 'pp_url' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <a
                      href={`${accountDetails.paypal.payPalMeUrl}/${totalPrice}USD`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 bg-[#0070ba] hover:bg-[#005ea6] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg cursor-pointer"
                    >
                      <span>{isZh ? `前往 PayPal 支付 $${totalPrice.toFixed(2)} USD` : `Open PayPal.Me / $${totalPrice.toFixed(2)} USD`}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <div className="bg-amber-500/10 p-2.5 rounded-xl border border-amber-200/70 text-[11px] text-amber-950 leading-relaxed">
                      💡 {isZh ? accountDetails.paypal.instructionsZh : accountDetails.paypal.instructionsEn}
                    </div>
                  </div>
                )}

                {/* 3. WISE */}
                {selectedChannel === 'wise' && (
                  <div className="space-y-3 text-xs">
                    <div className="bg-white p-4 rounded-2xl border border-amber-200/80 flex flex-col items-center justify-center text-center shadow-xs">
                      <div className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-200 p-2 shadow-xs">
                        <Image
                          src={accountDetails.wise.qrImageUrl}
                          alt="Wise QR Code"
                          width={192}
                          height={192}
                          className="object-contain w-full h-full"
                          priority
                        />
                      </div>
                      <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-neutral-600">
                        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="font-medium">{isZh ? '支持使用 Wise App 直接扫码付款' : 'Scan with Wise App'}</span>
                      </div>
                    </div>

                    <a
                      href={accountDetails.wise.payUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 bg-[#2ed06e] hover:bg-[#25b85f] text-neutral-950 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg cursor-pointer"
                    >
                      <span>{isZh ? '打开 Wise 付款主页 (wise.com/pay/me/juanl4209)' : 'Open Wise Payment Link'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <div className="bg-amber-500/10 p-2.5 rounded-xl border border-amber-200/70 text-[11px] text-amber-950 leading-relaxed">
                      💡 {isZh ? accountDetails.wise.instructionsZh : accountDetails.wise.instructionsEn}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer / Submit */}
        <div className="p-5 border-t border-amber-200/70 bg-[#fbf9f5] space-y-3">
          <div className="flex justify-between items-baseline text-sm font-bold text-yojqi-ink">
            <span>{isZh ? '订单应付总额' : 'Total Amount'}</span>
            <span className="font-serif text-2xl text-amber-950">
              {formatPrice(totalPrice)} <span className="text-xs font-sans text-neutral-500 font-normal">{currency}</span>
            </span>
          </div>

          {step === 1 ? (
            <button
              type="submit"
              form="direct-product-form"
              className="w-full py-3.5 px-4 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-sm font-semibold tracking-wide flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              <span>{isZh ? '下一步：选择支付方式并结算' : 'Next: Payment Method'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleCompleteOrder}
              disabled={submitting}
              className="w-full py-3.5 px-4 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-sm font-semibold tracking-wide flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
            >
              {submitting ? (
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
              )}
              <span>
                {submitting
                  ? isZh
                    ? '正在生成订单并通知库房...'
                    : 'Submitting order...'
                  : isZh
                  ? `我已完成付款，提交订单 (${formatPrice(totalPrice)})`
                  : `I Have Paid · Confirm Order (${formatPrice(totalPrice)})`}
              </span>
              {!submitting && <ArrowRight className="w-4 h-4" />}
            </button>
          )}

          <div className="text-center text-[10px] text-neutral-400 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>
              {isZh
                ? '官方正品保证 · 支持顺丰及国际直邮 · 7天无理由退换'
                : '100% Authentic Guarantee · Worldwide Dispatch · 7-Day Guarantee'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
