'use client';

import React, { useState } from 'react';
import { MessageCircle, X, Sparkles, Phone, Send } from 'lucide-react';
import { Language } from '@/lib/i18n';
import { WeChatModal } from './WeChatModal';

interface FloatingConciergeProps {
  lang: Language;
}

export function FloatingConcierge({ lang }: FloatingConciergeProps) {
  const isZh = lang === 'zh';
  const [wechatOpen, setWechatOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {/* Expanded Quick Options */}
        {isOpen && (
          <div className="bg-white rounded-2xl border border-yojqi-border shadow-2xl p-4 w-64 space-y-3 animate-in slide-in-from-bottom-3 fade-in duration-200">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
              <span className="font-serif text-sm font-semibold text-yojqi-ink flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-yojqi-bronze" />
                {isZh ? 'YOJQI 专属礼宾管家' : 'VIP Resident Concierge'}
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-neutral-400 hover:text-yojqi-ink"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-yojqi-body leading-relaxed">
              {isZh
                ? '在线协助：无人机套房档期核准、朱砂符咒定制咨询、全球直邮追踪。'
                : 'Direct assistance for suite availability, bespoke talismans, and global shipping.'}
            </p>

            <button
              onClick={() => {
                setWechatOpen(true);
                setIsOpen(false);
              }}
              className="w-full py-2.5 px-3 rounded-xl yojqi-btn-primary text-xs font-medium flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-300" />
              <span>{isZh ? '微信一对一咨询' : 'Connect on WeChat'}</span>
            </button>
          </div>
        )}

        {/* Floating Bubble Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative group p-3.5 rounded-full bg-yojqi-ink text-[#fffdfa] shadow-xl hover:bg-yojqi-bronze transition-all hover:scale-105 flex items-center gap-2"
          aria-label="Open Concierge Support"
        >
          <MessageCircle className="w-5 h-5 text-amber-300" />
          <span className="hidden sm:inline text-xs font-medium tracking-wide pr-1">
            {isZh ? 'VIP专属管家' : 'Concierge'}
          </span>
          <span className="absolute top-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
        </button>
      </div>

      {/* WeChat Modal */}
      <WeChatModal
        isOpen={wechatOpen}
        onClose={() => setWechatOpen(false)}
        lang={lang}
      />
    </>
  );
}
