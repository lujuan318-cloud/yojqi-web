'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  User,
  Package,
  Clock,
  Truck,
  ShieldCheck,
  LogOut,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Language, getDictionary } from '@/lib/i18n';
import { INITIAL_ORDERS, OrderRecord } from '@/lib/admin-data';
import { useCurrency } from '@/context/CurrencyContext';

interface AccountPageProps {
  params: Promise<{ lang: string }>;
}

export default function AccountPage({ params }: AccountPageProps) {
  const [lang, setLang] = useState<Language>('zh');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('alexander.vance@london-architects.co.uk');
  const [name, setName] = useState('Alexander Vance');
  const [password, setPassword] = useState('');
  const [userOrders, setUserOrders] = useState<OrderRecord[]>([]);
  const { formatPrice } = useCurrency();

  React.useEffect(() => {
    params.then((p) => setLang(p.lang as Language));
    // Default load orders for demonstration
    const matched = INITIAL_ORDERS.filter((o) =>
      o.customerEmail.toLowerCase().includes('alexander')
    );
    setUserOrders(matched);
  }, [params]);

  const isZh = lang === 'zh';
  const dict = getDictionary(lang);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoggedIn(true);
    const matched = INITIAL_ORDERS.filter((o) =>
      o.customerEmail.toLowerCase() === email.trim().toLowerCase()
    );
    setUserOrders(matched.length > 0 ? matched : INITIAL_ORDERS.slice(0, 1));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-10">
      {/* Header */}
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yojqi-sand text-yojqi-bronze text-xs font-mono tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isZh ? 'YOJQI 贵宾会员中心' : 'YOJQI VIP Customer Portal'}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-medium text-yojqi-inkHeading">
          {isZh ? '我的账户与订单档案' : 'Account & Order History'}
        </h1>
      </div>

      {!isLoggedIn ? (
        /* Login / Register Card */
        <div className="max-w-md mx-auto bg-white border border-yojqi-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="text-center space-y-1">
            <h3 className="font-serif text-xl font-bold text-yojqi-ink">
              {isZh ? '登录查验您的结缘档案' : 'Sign In to View Orders'}
            </h3>
            <p className="text-xs text-yojqi-body">
              {isZh
                ? '输入您下单时预留的邮箱即可快捷登录。'
                : 'Enter your checkout email to view fulfillment progress.'}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-yojqi-body mb-1 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-yojqi-bronze" />
                <span>{isZh ? '电子邮箱 *' : 'Email Address *'}</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-yojqi-border bg-white text-sm text-yojqi-ink focus:outline-none focus:border-yojqi-ink transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-yojqi-body mb-1 flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-yojqi-bronze" />
                <span>{isZh ? '安全密码 / 验证码' : 'Password'}</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl border border-yojqi-border bg-white text-sm text-yojqi-ink focus:outline-none focus:border-yojqi-ink transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl yojqi-btn-primary text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-sm"
            >
              <span>{isZh ? '立即进入账户中心' : 'Sign In / Instant Access'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-neutral-100 text-center text-xs text-neutral-500">
            <span>{isZh ? '如需免登录极速查单，请访问：' : 'For quick tracking without login, visit: '}</span>
            <Link
              href={`/${lang}/track-order`}
              className="text-yojqi-bronze font-semibold hover:underline block sm:inline mt-1 sm:mt-0 ml-1"
            >
              {isZh ? '【公开物流轨迹追踪】' : 'Track Order Online'}
            </Link>
          </div>
        </div>
      ) : (
        /* Logged In Customer Dashboard */
        <div className="space-y-8 animate-in fade-in">
          {/* User Profile Card */}
          <div className="bg-[#fffdfa] border border-yojqi-border rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-yojqi-sand flex items-center justify-center text-yojqi-bronze text-xl font-serif font-bold">
                {name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-xl font-bold text-yojqi-ink">{name}</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-100 text-amber-900 border border-amber-200">
                    VIP Member
                  </span>
                </div>
                <span className="text-xs text-neutral-500 font-mono">{email}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href={`/${lang}/track-order`}
                className="px-4 py-2 rounded-xl border border-yojqi-border bg-white text-xs font-medium text-yojqi-ink hover:border-yojqi-bronze"
              >
                {isZh ? '单号快速追踪' : 'Track Order'}
              </Link>
              <button
                onClick={() => setIsLoggedIn(false)}
                className="p-2 text-neutral-400 hover:text-rose-600 rounded-xl transition-colors"
                title="Log out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Past Orders List */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold text-yojqi-ink flex items-center gap-2">
              <Package className="w-5 h-5 text-yojqi-bronze" />
              <span>{isZh ? '历史结缘订单与物流进度' : 'Past Orders & Delivery Status'}</span>
            </h3>

            {userOrders.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-yojqi-border text-sm text-neutral-400">
                {isZh ? '暂无历史订单记录' : 'No past orders found for this account.'}
              </div>
            ) : (
              <div className="space-y-4">
                {userOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-6 bg-white rounded-2xl border border-yojqi-border shadow-xs space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 pb-3">
                      <div>
                        <span className="font-mono text-sm font-bold text-yojqi-ink">
                          {ord.orderNumber}
                        </span>
                        <span className="text-xs text-neutral-400 ml-3">{ord.createdAt}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200">
                          {isZh ? ord.carrierNameZh : ord.carrierNameEn} · {ord.trackingNumber}
                        </span>
                        <Link
                          href={`/${lang}/track-order`}
                          className="text-xs font-mono text-yojqi-bronze hover:underline font-semibold"
                        >
                          {isZh ? '查看轨迹 →' : 'Track →'}
                        </Link>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {ord.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-yojqi-sand shrink-0 border border-neutral-200">
                            <Image
                              src={item.heroImage}
                              alt={isZh ? item.nameZh : item.nameEn}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          </div>
                          <div className="min-w-0">
                            <h5 className="font-serif text-xs font-semibold text-yojqi-ink truncate">
                              {isZh ? item.nameZh : item.nameEn}
                            </h5>
                            <span className="text-[11px] font-mono text-neutral-500">
                              x {item.quantity} · {formatPrice(item.price)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                      <span>{isZh ? '收件人: ' + ord.shippingAddress.recipientName : 'Recipient: ' + ord.shippingAddress.recipientName}</span>
                      <strong className="text-sm font-serif font-bold text-yojqi-ink">
                        {isZh ? '合计: ' : 'Total: '} {formatPrice(ord.amountTotal)}
                      </strong>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
