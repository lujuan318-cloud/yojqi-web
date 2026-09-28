'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Sparkles,
  Bot,
  Calendar,
  CheckCircle2,
  Heart,
  Clock,
  Coffee,
  Flame,
  ArrowRight,
  TrendingUp,
  Sliders,
  Settings2,
  Sparkle
} from 'lucide-react';
import { Language, getDictionary } from '@/lib/i18n';
import { getUserProfile } from '@/lib/journey-store';
import { SEED_RITUALS, Ritual, INITIAL_USER_PROFILE } from '@/lib/journey-data';

export default function JourneyPage() {
  const params = useParams();
  const lang = (params.lang as Language) || 'en';
  const dict = getDictionary(lang);
  const isZh = lang === 'zh';

  const [profile, setProfile] = useState<any>(INITIAL_USER_PROFILE);

  useEffect(() => {
    setProfile(getUserProfile());
  }, []);

  const completedList = SEED_RITUALS.filter((r) =>
    profile?.completedRitualIds?.includes(r.id)
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* 1. Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yojqi-sand text-yojqi-bronze text-xs font-mono uppercase tracking-widest">
          <Sparkle className="w-3.5 h-3.5" />
          <span>{dict.journeyPage.headline}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-medium text-yojqi-inkHeading">
          {dict.journeyPage.headline}
        </h1>
        <p className="text-sm text-yojqi-body max-w-xl">
          {isZh
            ? '长期的个人节奏沉淀与身心觉察。不求一蹴而就，但随草木呼吸渐进。'
            : 'Your long-term personal rhythm, habits, and contemplative space.'}
        </p>
      </div>

      {/* 2. CURRENT JOURNEY */}
      <section className="p-8 sm:p-10 rounded-3xl bg-yojqi-lift border border-amber-900/15 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-card">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-yojqi-bronze font-semibold">
            {dict.journeyPage.currentJourney}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-yojqi-inkHeading">
            {isZh ? profile?.currentJourneyZh || '今夕静心修持之旅' : profile?.currentJourneyEn || 'Tonight’s Quiet Journey'}
          </h2>
          <p className="text-xs sm:text-sm text-yojqi-body max-w-lg">
            {isZh
              ? profile?.currentGoalZh || '告别深夜思绪翻涌，重返深沉自然的睡眠节律。'
              : profile?.currentGoalEn || 'Restoring nervous system ease & unhurried sleep.'}
          </p>
        </div>

        <Link
          href={`/${lang}/today`}
          className="px-6 py-3.5 rounded-xl yojqi-btn-primary text-xs font-mono uppercase tracking-widest flex items-center gap-2 shrink-0"
        >
          <span>{isZh ? '实践今日仪式' : 'Enter Today'}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* 3. CURRENT STATE & 7-DAY TRENDS (Non-clinical) */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white border border-yojqi-border shadow-card space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-yojqi-bronze">
              {dict.journeyPage.currentState}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-medium text-yojqi-inkHeading">
              {isZh ? '近七日身心节律起伏' : 'Seven-Day Bodily Rhythm Waves'}
            </h3>
          </div>
          <span className="text-xs font-mono text-neutral-400">
            {isZh ? '自然波动觉察' : 'Natural Rhythm Waves'}
          </span>
        </div>

        {/* Visual 7-day Bar / Wave Trend */}
        <div className="grid grid-cols-7 gap-2 sm:gap-4 pt-4 border-t border-neutral-100">
          {(profile?.historicalBalances || []).map((day: any) => (
            <div key={day.date} className="flex flex-col items-center gap-2">
              <div className="w-full h-36 bg-yojqi-warm rounded-2xl p-1.5 flex flex-col justify-end">
                <div
                  className="w-full bg-gradient-to-t from-yojqi-bronze to-amber-600 rounded-xl transition-all duration-500"
                  style={{ height: `${day.sleep}%` }}
                />
              </div>
              <span className="font-mono text-xs font-semibold text-yojqi-ink">{day.date}</span>
              <span className="text-[10px] text-neutral-400 font-mono">{day.sleep}%</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-neutral-500 text-center sm:text-left">
          {isZh
            ? '周中工作日往往消耗精力更多，周末在草木香气中回元修复。'
            : 'Midweek often carries heavier cognitive output; rhythm softly recovers toward weekends.'}
        </p>
      </section>

      {/* 4. RECENT PATTERNS & INSIGHTS */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white border border-yojqi-border shadow-card space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-yojqi-bronze">
          {dict.journeyPage.recentPatterns}
        </span>
        <h3 className="font-serif text-xl sm:text-2xl font-medium text-yojqi-inkHeading">
          {isZh ? 'AI 与自我察觉总结' : 'Observed Somatic Patterns'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {((isZh ? profile?.recentPatternsZh : profile?.recentPatternsEn) || []).map((pat: string, idx: number) => (
            <div key={idx} className="p-4 rounded-2xl bg-yojqi-warm border border-yojqi-border flex flex-col justify-between">
              <p className="text-xs text-yojqi-body leading-relaxed">
                “{pat}”
              </p>
              <div className="mt-3 pt-2 border-t border-neutral-200/60 flex items-center justify-between text-[10px] font-mono text-yojqi-bronze">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{isZh ? '觉察沉淀' : 'Observed'}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. RITUAL HISTORY */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white border border-yojqi-border shadow-card space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-yojqi-bronze">
              {dict.journeyPage.ritualHistory}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-medium text-yojqi-inkHeading">
              {isZh ? '实践记录' : 'Completed Rituals Log'}
            </h3>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-mono">
            {completedList.length} {isZh ? '项已践行' : 'Practiced'}
          </span>
        </div>

        <div className="space-y-3 pt-2">
          {completedList.map((ritual) => (
            <div
              key={ritual.id}
              className="p-4 rounded-2xl bg-yojqi-warm border border-yojqi-border flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-yojqi-ink">
                    {isZh ? ritual.titleZh : ritual.titleEn}
                  </h4>
                  <p className="text-xs text-yojqi-body line-clamp-1">
                    {isZh ? ritual.subtitleZh : ritual.subtitleEn}
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono text-neutral-400">{ritual.duration}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 6. PREFERENCES */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white border border-yojqi-border shadow-card space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-widest text-yojqi-bronze">
            {dict.journeyPage.preferences}
          </span>
          <button className="text-xs font-mono uppercase tracking-wider text-yojqi-bronze hover:underline flex items-center gap-1">
            <Settings2 className="w-3.5 h-3.5" />
            <span>{isZh ? '编辑' : 'Edit'}</span>
          </button>
        </div>
        <h3 className="font-serif text-xl sm:text-2xl font-medium text-yojqi-inkHeading">
          {isZh ? '心神舒适区配置' : 'Mindful Environmental Preferences'}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-yojqi-warm border border-yojqi-border space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
              {isZh ? '偏好香气' : 'Preferred Scent'}
            </span>
            <span className="text-xs font-medium text-yojqi-ink block">
              {profile?.preferences?.preferredScent || 'Agarwood & Osmanthus'}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-yojqi-warm border border-yojqi-border space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
              {isZh ? '饮茶习惯' : 'Preferred Tea'}
            </span>
            <span className="text-xs font-medium text-yojqi-ink block">
              {profile?.preferences?.preferredTea || 'Aged Arbor Pu-erh'}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-yojqi-warm border border-yojqi-border space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
              {isZh ? '仪式时长' : 'Ideal Duration'}
            </span>
            <span className="text-xs font-medium text-yojqi-ink block">
              {profile?.preferences?.preferredRitualLength || '5 - 10 minutes'}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-yojqi-warm border border-yojqi-border space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
              {isZh ? '最佳定心时间' : 'Preferred Time'}
            </span>
            <span className="text-xs font-medium text-yojqi-ink block">
              {profile?.preferences?.preferredTime || 'Late Evening'}
            </span>
          </div>
        </div>
      </section>

      {/* 7. YOUR COMPANION RECENT CONTEXT */}
      <section className="p-8 sm:p-10 rounded-3xl yojqi-night-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-300">
            <Bot className="w-4 h-4" />
            <span>{dict.journeyPage.companionTitle}</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium">
            {isZh ? '与陪伴者继续前序对话' : 'Continue Talking with Your Companion'}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-lg">
            {isZh
              ? '陪伴者记住了你对安睡与晚间收束的期望。在安全私密的环境中，随时继续倾吐。'
              : 'Your Companion remembers your evening intentions and continues your conversation with continuity.'}
          </p>
        </div>

        <Link
          href={`/${lang}/companion`}
          className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-mono uppercase tracking-widest font-semibold flex items-center gap-2 shrink-0 transition-colors"
        >
          <span>{dict.journeyPage.continueTalking}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
