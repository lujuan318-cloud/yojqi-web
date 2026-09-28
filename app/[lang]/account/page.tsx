'use client';

import React, { useState, useEffect } from 'react';
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
  Compass,
  Heart,
  Bot,
  Settings2,
  Trash2,
  CheckCircle2,
  Coffee
} from 'lucide-react';
import { Language, getDictionary } from '@/lib/i18n';
import { INITIAL_ORDERS, OrderRecord } from '@/lib/admin-data';
import { useCurrency } from '@/context/CurrencyContext';
import { getUserProfile } from '@/lib/journey-store';

interface AccountPageProps {
  params: Promise<{ lang: string }>;
}

export default function AccountPage({ params }: AccountPageProps) {
  const [lang, setLang] = useState<Language>('zh');
  const [activeTab, setActiveTab] = useState<'journey' | 'rituals' | 'care' | 'orders' | 'privacy'>('journey');
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Default active for seamless exploration
  const [email, setEmail] = useState('alexander.vance@london-architects.co.uk');
  const [name, setName] = useState('Alexander Vance');
  const [userOrders, setUserOrders] = useState<OrderRecord[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const { formatPrice } = useCurrency();

  useEffect(() => {
    params.then((p) => setLang(p.lang as Language));
    const matched = INITIAL_ORDERS.filter((o) =>
      o.customerEmail.toLowerCase().includes('alexander')
    );
    setUserOrders(matched.length > 0 ? matched : INITIAL_ORDERS);
    setProfile(getUserProfile());
  }, [params]);

  const isZh = lang === 'zh';
  const dict = getDictionary(lang);

  const tabs = [
    { id: 'journey', labelZh: '我的旅程', labelEn: 'My Journey', icon: Compass },
    { id: 'rituals', labelZh: '仪式与偏好', labelEn: 'Rituals & Preferences', icon: Sparkles },
    { id: 'care', labelZh: '温暖关照', labelEn: 'Care & Community', icon: Heart },
    { id: 'orders', labelZh: '订单与物流', labelEn: 'Orders & Tracking', icon: Package },
    { id: 'privacy', labelZh: '隐私与记忆', labelEn: 'Privacy & Memory', icon: ShieldCheck },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-yojqi-border pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-yojqi-bronze">
            <Sparkles className="w-3.5 h-3.5" />
            <span>MY YOJQI · VIP PORTAL</span>
          </div>
          <h1 className="font-serif text-3xl font-medium text-yojqi-inkHeading">
            {isZh ? `你好，${name}` : `Welcome, ${name}`}
          </h1>
          <p className="text-xs text-yojqi-body">
            {email} · {isZh ? '定制身心修持档案' : 'Personalized Sanctuary Profile'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/${lang}/today`}
            className="px-4 py-2 rounded-xl bg-yojqi-ink text-[#fffdfa] text-xs font-mono uppercase tracking-widest hover:bg-neutral-800 transition-colors flex items-center gap-1.5"
          >
            <span>{isZh ? '进入今日空间' : 'Today Space'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-yojqi-border pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider flex items-center gap-2 whitespace-nowrap transition-colors ${
                active
                  ? 'bg-yojqi-sand text-yojqi-ink font-semibold border border-yojqi-border'
                  : 'text-yojqi-body hover:bg-neutral-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5 text-yojqi-bronze" />
              <span>{isZh ? tab.labelZh : tab.labelEn}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: My Journey */}
      {activeTab === 'journey' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="p-8 rounded-3xl bg-yojqi-warm border border-yojqi-border space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-yojqi-bronze font-semibold">
              {isZh ? '当前身心旅程' : 'Current Journey'}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-yojqi-inkHeading">
              {isZh ? profile?.currentJourneyZh || '今夕静心修持之旅' : profile?.currentJourneyEn || 'Tonight’s Quiet Journey'}
            </h2>
            <p className="text-sm text-yojqi-body max-w-xl">
              {isZh ? profile?.currentGoalZh : profile?.currentGoalEn}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-yojqi-border">
              <span className="text-[10px] font-mono text-neutral-400 block">{isZh ? '安睡潜能' : 'Sleep Index'}</span>
              <span className="font-mono text-xl font-bold text-yojqi-ink">{profile?.todayBalance?.sleep || 72}%</span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-yojqi-border">
              <span className="text-[10px] font-mono text-neutral-400 block">{isZh ? '从容放松' : 'Relaxation'}</span>
              <span className="font-mono text-xl font-bold text-yojqi-ink">{profile?.todayBalance?.relaxation || 75}%</span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-yojqi-border">
              <span className="text-[10px] font-mono text-neutral-400 block">{isZh ? '践行仪式数' : 'Completed Rituals'}</span>
              <span className="font-mono text-xl font-bold text-yojqi-ink">{profile?.completedRitualIds?.length || 1}</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Rituals & Preferences */}
      {activeTab === 'rituals' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="p-6 rounded-3xl bg-white border border-yojqi-border space-y-4">
            <h3 className="font-serif text-xl font-semibold text-yojqi-inkHeading">
              {isZh ? '感官与身心偏好配置' : 'Sensory & Timing Preferences'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-yojqi-warm border border-yojqi-border">
                <span className="text-xs font-mono text-neutral-400 block">{isZh ? '偏好草木香氛' : 'Preferred Scent'}</span>
                <span className="text-sm font-medium text-yojqi-ink mt-1 block">
                  {profile?.preferences?.preferredScent || 'Agarwood & Osmanthus'}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-yojqi-warm border border-yojqi-border">
                <span className="text-xs font-mono text-neutral-400 block">{isZh ? '偏好清饮' : 'Preferred Tea'}</span>
                <span className="text-sm font-medium text-yojqi-ink mt-1 block">
                  {profile?.preferences?.preferredTea || 'Aged Arbor Pu-erh'}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-yojqi-warm border border-yojqi-border">
                <span className="text-xs font-mono text-neutral-400 block">{isZh ? '理想停顿仪式时长' : 'Ideal Duration'}</span>
                <span className="text-sm font-medium text-yojqi-ink mt-1 block">
                  {profile?.preferences?.preferredRitualLength || '5 - 10 minutes'}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-yojqi-warm border border-yojqi-border">
                <span className="text-xs font-mono text-neutral-400 block">{isZh ? '最佳定心时间' : 'Preferred Time'}</span>
                <span className="text-sm font-medium text-yojqi-ink mt-1 block">
                  {profile?.preferences?.preferredTime || 'Late Evening (21:30)'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Care & Community */}
      {activeTab === 'care' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="p-8 rounded-3xl bg-white border border-yojqi-border space-y-4">
            <h3 className="font-serif text-xl font-semibold text-yojqi-inkHeading">
              {isZh ? '温暖关照记录' : 'Care Interactions'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-100 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                  <Heart className="w-5 h-5 fill-rose-500" />
                </div>
                <div>
                  <span className="font-mono text-xl font-bold text-rose-950">{profile?.careSentCount || 3}</span>
                  <span className="text-xs text-neutral-600 block">{isZh ? '已向同修寄出的心意' : 'Care gestures sent'}</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-100 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-xl font-bold text-amber-950">{profile?.careReceivedCount || 5}</span>
                  <span className="text-xs text-neutral-600 block">{isZh ? '收到的温暖问候' : 'Care gestures received'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Orders & Tracking */}
      {activeTab === 'orders' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-semibold text-yojqi-inkHeading">
              {isZh ? '历史订单与物流追踪' : 'Order History & Global Tracking'}
            </h3>
            <Link
              href={`/${lang}/track-order`}
              className="text-xs font-mono uppercase tracking-widest text-yojqi-bronze hover:underline"
            >
              {isZh ? '免密单号即时查询' : 'Public Tracking Lookup'} →
            </Link>
          </div>

          <div className="space-y-4">
            {userOrders.map((order) => (
              <div
                key={order.id}
                className="p-6 rounded-3xl bg-white border border-yojqi-border shadow-card space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-neutral-100 gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-yojqi-ink">
                      {order.orderNumber}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase ${
                        order.orderStatus === 'shipped' || order.orderStatus === 'delivered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-neutral-400">{order.createdAt}</span>
                </div>

                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-xs text-yojqi-ink">
                      <span>{isZh ? item.nameZh : item.nameEn} × {item.quantity}</span>
                      <span className="font-mono font-medium">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                {order.trackingNumber && (
                  <div className="p-3 rounded-xl bg-yojqi-warm text-xs flex items-center justify-between">
                    <span className="text-neutral-500">
                      {order.carrierNameZh || order.carrier}: <strong className="text-yojqi-ink font-mono">{order.trackingNumber}</strong>
                    </span>
                    <Link
                      href={`/${lang}/track-order?orderNumber=${order.orderNumber}&email=${order.customerEmail}`}
                      className="text-yojqi-bronze hover:underline font-mono text-[11px]"
                    >
                      {isZh ? '查看流转时间轴' : 'View Milestones'} →
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: Privacy & Memory */}
      {activeTab === 'privacy' && (
        <div className="p-8 rounded-3xl bg-white border border-yojqi-border shadow-card space-y-6 animate-in fade-in">
          <div>
            <h3 className="font-serif text-xl font-semibold text-yojqi-inkHeading">
              {isZh ? '数据自主与对话记忆管理' : 'Data Privacy & Memory Controls'}
            </h3>
            <p className="text-xs text-yojqi-body mt-1">
              {isZh
                ? 'YOJQI 严格捍卫您的情绪与身心隐私。所有对话和记录均受加密保护，您可以随时导出或一键抹除。'
                : 'Your reflections and emotional vulnerability belong only to you. You can export or clear data anytime.'}
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={() => alert(isZh ? '已清空陪伴者记忆' : 'Companion memory cleared')}
              className="px-4 py-2.5 rounded-xl border border-red-200 text-red-700 hover:bg-red-50 text-xs font-mono uppercase tracking-wider flex items-center gap-2"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{isZh ? '一键抹除 AI 陪伴者对话记忆' : 'Clear AI Companion Memory'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
