'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Send, MapPin, MessageCircle, Flame } from 'lucide-react';
import { Language, getDictionary } from '@/lib/i18n';
import { WeChatModal } from './WeChatModal';

interface FooterProps {
  lang: Language;
}

export function Footer({ lang }: FooterProps) {
  const [wechatOpen, setWechatOpen] = useState(false);
  const dict = getDictionary(lang);

  return (
    <>
      <footer className="bg-yojqi-soft border-t border-yojqi-border mt-24">
        {/* Top Feature Bar */}
        <div className="border-b border-yojqi-border py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <div className="w-10 h-10 rounded-full bg-yojqi-sand flex items-center justify-center text-yojqi-bronze shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-yojqi-ink">
                    {lang === 'zh' ? '全球多币种便捷结算' : 'Global Multi-Currency'}
                  </h4>
                  <p className="text-xs text-yojqi-body">
                    {lang === 'zh' ? '支持 USD / EUR / GBP / CNY' : 'USD, EUR, GBP, CNY & major cards.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-3">
                <div className="w-10 h-10 rounded-full bg-yojqi-sand flex items-center justify-center text-yojqi-bronze shrink-0">
                  <Flame className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-yojqi-ink">
                    {lang === 'zh' ? '道门正统朱砂开光' : 'Authentic Daoist Seals'}
                  </h4>
                  <p className="text-xs text-yojqi-body">
                    {lang === 'zh' ? '真原矿朱砂 · 坛前敕笔盖印' : '100% genuine cinnabar & master seals.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-3">
                <div className="w-10 h-10 rounded-full bg-yojqi-sand flex items-center justify-center text-yojqi-bronze shrink-0">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-yojqi-ink">
                    {lang === 'zh' ? '全球可追踪直邮' : 'Trackable Global Shipping'}
                  </h4>
                  <p className="text-xs text-yojqi-body">
                    {lang === 'zh' ? '顺丰与国际专线极速直达' : 'Dispatched with insured courier tracking.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-3">
                <div className="w-10 h-10 rounded-full bg-yojqi-sand flex items-center justify-center text-yojqi-bronze shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-yojqi-ink">
                    {lang === 'zh' ? '重庆高空无人机宿集' : 'Chongqing Skyline Suites'}
                  </h4>
                  <p className="text-xs text-yojqi-body">
                    {lang === 'zh' ? '白宏江景公寓 & YOJQI艺术宿集' : 'Baihong & YOJQI Drone Show Balconies'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand Intro */}
            <div className="space-y-4 md:col-span-2">
              <span className="font-serif text-3xl font-semibold tracking-widest text-yojqi-ink">
                YOJQI
              </span>
              <p className="text-sm text-yojqi-body leading-relaxed max-w-md">
                {dict.footer.ethos}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setWechatOpen(true)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-yojqi-borderAccent bg-white text-xs font-medium text-yojqi-bronze hover:bg-yojqi-lift transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>{lang === 'zh' ? '联系管家微信号 (VIP Inquiries)' : 'Connect with WeChat Concierge'}</span>
                </button>
              </div>
            </div>

            {/* Quick Navigation */}
            <div>
              <h5 className="font-serif text-base font-semibold text-yojqi-ink mb-4">
                {dict.footer.quickLinks}
              </h5>
              <ul className="space-y-2.5 text-sm text-yojqi-body">
                <li>
                  <Link href={`/${lang}/shop`} className="hover:text-yojqi-bronze transition-colors">
                    {dict.nav.shop}
                  </Link>
                </li>
                <li>
                  <Link href={`/${lang}/talismans`} className="hover:text-yojqi-bronze transition-colors flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-amber-700" />
                    <span>{dict.nav.talismans}</span>
                  </Link>
                </li>
                <li>
                  <Link href={`/${lang}/retreats`} className="hover:text-yojqi-bronze transition-colors">
                    {dict.nav.retreats}
                  </Link>
                </li>
                <li>
                  <Link href={`/${lang}/wisdom`} className="hover:text-yojqi-bronze transition-colors">
                    {dict.nav.wisdom}
                  </Link>
                </li>
                <li>
                  <Link href={`/${lang}/retreats/baihong-drone-show-apartment`} className="hover:text-yojqi-bronze transition-colors">
                    {lang === 'zh' ? '白宏无人机机位公寓' : 'Baihong Drone Show Apartment'}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Care & Direct Links */}
            <div>
              <h5 className="font-serif text-base font-semibold text-yojqi-ink mb-4">
                {lang === 'zh' ? '客户尊享礼遇' : 'Concierge & Support'}
              </h5>
              <ul className="space-y-2.5 text-sm text-yojqi-body">
                <li>
                  <span className="font-mono text-xs text-neutral-400">Email:</span>
                  <a href="mailto:concierge@yojqi.com" className="ml-1 hover:text-yojqi-bronze">
                    concierge@yojqi.com
                  </a>
                </li>
                <li>
                  <span className="font-mono text-xs text-neutral-400">WeChat:</span>
                  <button onClick={() => setWechatOpen(true)} className="ml-1 hover:text-yojqi-bronze underline decoration-dotted">
                    YOJQI_Sanctuary_VIP
                  </button>
                </li>
                <li className="pt-2 text-xs text-neutral-500">
                  {dict.footer.currencyNote}
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="border-t border-yojqi-border mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
            <p>{dict.footer.copyright}</p>
            <div className="flex space-x-6">
              <span>{dict.footer.shipping}</span>
              <span>{dict.footer.legal}</span>
              <span>{dict.footer.terms}</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Concierge Modal */}
      <WeChatModal
        isOpen={wechatOpen}
        onClose={() => setWechatOpen(false)}
        lang={lang}
      />
    </>
  );
}
