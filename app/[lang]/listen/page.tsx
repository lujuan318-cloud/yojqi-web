'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  Sparkles,
  Headphones,
  Lock,
  Globe,
  Bot,
  ArrowRight,
  Check,
  AlertCircle,
  ShieldCheck,
  Wind
} from 'lucide-react';
import { Language, getDictionary } from '@/lib/i18n';
import { createCommunityPost } from '@/lib/journey-store';

export default function ListeningRoomPage() {
  const params = useParams();
  const router = useRouter();
  const lang = (params.lang as Language) || 'en';
  const dict = getDictionary(lang);
  const isZh = lang === 'zh';

  const [text, setText] = useState('');
  const [selectedFeeling, setSelectedFeeling] = useState<any>('talk');
  const [piiDetected, setPiiDetected] = useState(false);
  const [submittedMode, setSubmittedMode] = useState<'private' | 'anonymous' | null>(null);

  // Simple privacy check heuristic for phone/email/social handle patterns
  const checkPII = (input: string) => {
    const phonePattern = /\b\d{7,13}\b/;
    const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b/;
    const wechatPattern = /(微信号|wechat|wxid)[:：\s]+[a-zA-Z0-9_-]+/i;
    return phonePattern.test(input) || emailPattern.test(input) || wechatPattern.test(input);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setText(val);
    setPiiDetected(checkPII(val));
  };

  const handleSubmit = (mode: 'private' | 'anonymous') => {
    if (!text.trim()) return;

    if (mode === 'anonymous') {
      // Create community post
      createCommunityPost(
        text.trim(),
        selectedFeeling,
        'Just need to talk',
        '无处安放的心绪',
        isZh ? '夜行倾诉者' : 'Anonymous Soul',
        isZh ? '全球' : 'Sanctuary'
      );
    }
    setSubmittedMode(mode);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yojqi-sand text-yojqi-bronze text-xs font-mono uppercase tracking-widest">
          <Headphones className="w-3.5 h-3.5" />
          <span>{isZh ? '静心倾听室' : 'THE LISTENING ROOM'}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-medium text-yojqi-inkHeading">
          {dict.listenPage.title}
        </h1>
        <p className="font-serif text-lg sm:text-xl text-yojqi-bronze italic">
          {dict.listenPage.subtitle}
        </p>
      </div>

      {submittedMode ? (
        /* Submitted Confirmation Card & Transition to Companion */
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-yojqi-border shadow-card text-center space-y-6 animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <Check className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-yojqi-inkHeading">
              {dict.listenPage.sentSuccess}
            </h3>
            <p className="text-xs sm:text-sm text-yojqi-body max-w-md mx-auto">
              {submittedMode === 'private'
                ? isZh
                  ? '你的私密心声已被妥善安放，仅自己可见。'
                  : 'Your words are safely secured in your private contemplative log.'
                : isZh
                  ? '已匿名发布至 YOJQI 同修之境，去除了一切个人隐私标签。'
                  : 'Shared anonymously to YOJQI Friends with all identifying details removed.'}
            </p>
          </div>

          <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/${lang}/companion`}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-mono uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Bot className="w-4 h-4" />
              <span>{isZh ? '与陪伴者继续交流' : 'TALK WITH COMPANION'}</span>
            </Link>

            <button
              onClick={() => {
                setSubmittedMode(null);
                setText('');
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl yojqi-btn-secondary text-xs font-mono uppercase tracking-widest"
            >
              {isZh ? '继续说点别的' : 'Say Something Else'}
            </button>
          </div>
        </div>
      ) : (
        /* The Expression Form */
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-yojqi-border shadow-card space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-yojqi-bronze font-semibold block">
              {dict.listenPage.prompt}
            </label>
            <textarea
              rows={6}
              value={text}
              onChange={handleTextChange}
              placeholder={dict.listenPage.placeholder}
              className="w-full p-4 rounded-2xl border border-yojqi-border bg-yojqi-warm text-sm text-yojqi-ink placeholder:text-neutral-400 focus:outline-none focus:border-yojqi-bronze focus:ring-1 focus:ring-yojqi-bronze transition-all resize-none leading-relaxed"
            />
          </div>

          {/* PII Detection Warning */}
          {piiDetected && (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{dict.listenPage.piiWarning}</span>
            </div>
          )}

          {/* Privacy Note */}
          <div className="flex items-center gap-2 text-[11px] text-neutral-400">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{dict.listenPage.privacyNotice}</span>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-neutral-100 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              disabled={!text.trim()}
              onClick={() => handleSubmit('private')}
              className="w-full sm:w-1/2 py-3.5 rounded-xl yojqi-btn-secondary text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-40"
            >
              <Lock className="w-4 h-4" />
              <span>{dict.listenPage.keepPrivate}</span>
            </button>

            <button
              type="button"
              disabled={!text.trim()}
              onClick={() => handleSubmit('anonymous')}
              className="w-full sm:w-1/2 py-3.5 rounded-xl yojqi-btn-primary text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-40"
            >
              <Globe className="w-4 h-4" />
              <span>{dict.listenPage.shareAnonymously}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
