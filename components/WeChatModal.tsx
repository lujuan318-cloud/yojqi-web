'use client';

import React, { useState } from 'react';
import { X, Check, Copy } from 'lucide-react';
import { Language } from '@/lib/i18n';

interface WeChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  wechatId?: string;
}

export function WeChatModal({
  isOpen,
  onClose,
  lang,
  wechatId = 'YOJQI_Sanctuary_VIP',
}: WeChatModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(wechatId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#fffdfa] rounded-xl border border-yojqi-border shadow-2xl p-6 text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-yojqi-body hover:text-yojqi-ink transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xl">
          微
        </div>

        <h3 className="font-serif text-2xl font-medium text-yojqi-inkHeading mb-1">
          {lang === 'zh' ? 'YOJQI 专属管家微信' : 'VIP Concierge WeChat'}
        </h3>
        <p className="text-sm text-yojqi-body mb-5">
          {lang === 'zh'
            ? '添加管家微信，尊享无人机盛典机位前瞻锁定与行程接引'
            : 'Add our host concierge for front-row drone show coordination and VIP arrival escort.'}
        </p>

        {/* WeChat ID Box */}
        <div className="bg-[#fff8f0] border border-yojqi-borderAccent rounded-lg p-3 mb-4 flex items-center justify-between">
          <div className="text-left">
            <div className="text-xs text-yojqi-bronze uppercase tracking-wider font-semibold">
              WeChat ID / 微信号
            </div>
            <div className="font-mono text-base font-semibold text-yojqi-ink">
              {wechatId}
            </div>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-yojqi-ink text-white hover:bg-yojqi-inkDeep transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>{lang === 'zh' ? '已复制' : 'Copied'}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>{lang === 'zh' ? '一键复制' : 'Copy ID'}</span>
              </>
            )}
          </button>
        </div>

        <div className="p-3 bg-neutral-50 rounded-lg text-xs text-yojqi-body leading-relaxed border border-neutral-100">
          {lang === 'zh' ? (
            <>
              💡 <strong>温馨提示：</strong>
              添加时请备注“无人机公寓预约”或“选品咨询”，我们将为您优先安排管家一对一专属接待。
            </>
          ) : (
            <>
              💡 <strong>Helpful note:</strong>
              When adding, please mention &ldquo;Drone Show Apartment&rdquo; or &ldquo;Somatic Inquiry&rdquo; for prioritized 1-on-1 concierge response.
            </>
          )}
        </div>

        <button
          onClick={onClose}
          className="mt-5 w-full py-2.5 rounded-lg border border-yojqi-border text-sm text-yojqi-body hover:bg-neutral-50 transition-colors"
        >
          {lang === 'zh' ? '关闭' : 'Close'}
        </button>
      </div>
    </div>
  );
}
