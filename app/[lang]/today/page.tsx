'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Sparkles,
  Moon,
  Sun,
  Wind,
  Coffee,
  Heart,
  Bot,
  MessageCircle,
  ArrowRight,
  Check,
  Flame,
  Shield,
  Compass,
  Zap,
  Sliders
} from 'lucide-react';
import { Language, getDictionary } from '@/lib/i18n';
import { getUserProfile, toggleRitualCompletion, updateTodayBalance } from '@/lib/journey-store';
import { SEED_RITUALS, Ritual, INITIAL_USER_PROFILE } from '@/lib/journey-data';
import { PRODUCTS } from '@/lib/products-data';

export default function TodayPage() {
  const params = useParams();
  const lang = (params.lang as Language) || 'en';
  const dict = getDictionary(lang);
  const isZh = lang === 'zh';

  const [profile, setProfile] = useState<any>(INITIAL_USER_PROFILE);
  const [activeRitual, setActiveRitual] = useState<Ritual>(SEED_RITUALS[0]);
  const [completedRituals, setCompletedRituals] = useState<string[]>([]);
  const [editingBalance, setEditingBalance] = useState(false);

  useEffect(() => {
    const prof = getUserProfile();
    setProfile(prof);
    setCompletedRituals(prof.completedRitualIds || []);
  }, []);

  const handleToggleRitual = (ritualId: string) => {
    const updated = toggleRitualCompletion(ritualId);
    setProfile({ ...updated });
    setCompletedRituals(updated.completedRitualIds);
  };

  const balanceMetrics = [
    { key: 'sleep', labelZh: '安睡潜能', labelEn: 'Sleep Balance', val: profile?.todayBalance?.sleep || 72, icon: Moon, color: 'text-indigo-400' },
    { key: 'energy', labelZh: '身体元气', labelEn: 'Vitality', val: profile?.todayBalance?.energy || 65, icon: Sun, color: 'text-amber-400' },
    { key: 'mood', labelZh: '心绪平稳', labelEn: 'Mood Equanimity', val: profile?.todayBalance?.mood || 78, icon: Heart, color: 'text-rose-400' },
    { key: 'stress', labelZh: '日常减压', labelEn: 'Stress Ease', val: profile?.todayBalance?.stress || 42, icon: Wind, color: 'text-teal-400' },
    { key: 'focus', labelZh: '清明心流', labelEn: 'Clarity & Focus', val: profile?.todayBalance?.focus || 68, icon: Zap, color: 'text-amber-500' },
    { key: 'relaxation', labelZh: '从容留白', labelEn: 'Relaxation', val: profile?.todayBalance?.relaxation || 75, icon: Coffee, color: 'text-emerald-400' },
  ];

  // Personalized organic product recommendation
  const recommendedProduct = PRODUCTS.find((p) => p.category === 'sleep') || PRODUCTS[0];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* 1. Header Greeting */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yojqi-sand text-yojqi-bronze text-xs font-mono uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{dict.todayPage.greetingNight}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-medium text-yojqi-inkHeading">
          {dict.todayPage.howFeeling}
        </h1>
        <p className="text-sm text-yojqi-body max-w-xl">
          {isZh
            ? `当前修持旅程：${profile?.currentJourneyZh || '今夕静心修持之旅'}`
            : `Current Journey: ${profile?.currentJourneyEn || 'Tonight’s Quiet Journey'}`}
        </p>
      </div>

      {/* 2. TODAY'S BALANCE (Non-medical state radar) */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white border border-yojqi-border shadow-card space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-medium text-yojqi-inkHeading">
              {dict.todayPage.balanceTitle}
            </h2>
            <p className="text-xs text-yojqi-body mt-0.5">
              {isZh ? '身心节律的自然刻画，非医疗诊断评分。' : 'Natural bodily rhythm indicators. Non-clinical reflections.'}
            </p>
          </div>
          <button
            onClick={() => setEditingBalance(!editingBalance)}
            className="text-xs font-mono uppercase tracking-wider text-yojqi-bronze hover:underline flex items-center gap-1"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{editingBalance ? (isZh ? '完成' : 'Done') : (isZh ? '调整个体觉察' : 'Tune Today')}</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {balanceMetrics.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.key}
                className="p-4 rounded-2xl bg-yojqi-warm border border-yojqi-border flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3">
                  <Icon className={`w-4 h-4 ${item.color}`} />
                  <span className="font-mono text-sm font-semibold text-yojqi-ink">{item.val}%</span>
                </div>
                <div>
                  <div className="text-xs font-medium text-yojqi-ink">
                    {isZh ? item.labelZh : item.labelEn}
                  </div>
                  <div className="w-full h-1.5 bg-neutral-200 rounded-full mt-2 overflow-hidden">
                    <div
                      className="h-full bg-yojqi-bronze rounded-full"
                      style={{ width: `${item.val}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. TODAY'S GUIDANCE & TONIGHT'S RITUAL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Guidance Card */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-yojqi-lift border border-amber-900/15 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-yojqi-bronze font-semibold">
              {dict.todayPage.guidanceTitle}
            </span>
            <p className="font-serif text-xl sm:text-2xl text-yojqi-ink leading-relaxed">
              “{dict.todayPage.guidanceText}”
            </p>
            <p className="text-xs text-yojqi-body leading-relaxed">
              {isZh
                ? '建议在睡前半小时调暗主灯，端起一盏温热无咖啡因茶饮，让肩颈重力自然下沉。'
                : 'Dim primary lighting 30 minutes before bed. Hold a warm cup of herbal tea and let gravity take your shoulders.'}
            </p>
          </div>

          <div className="pt-4 border-t border-amber-900/10">
            <a
              href="#ritual-section"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-yojqi-ink font-semibold hover:text-yojqi-bronze"
            >
              <span>{dict.todayPage.seeRitual}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Right: Active Ritual Details */}
        <div id="ritual-section" className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white border border-yojqi-border shadow-card space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-yojqi-bronze">
                {dict.todayPage.ritualTitle}
              </span>
              <h3 className="font-serif text-2xl font-semibold text-yojqi-inkHeading">
                {isZh ? activeRitual.titleZh : activeRitual.titleEn}
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-yojqi-sand text-xs font-mono text-yojqi-bronze">
              {activeRitual.duration}
            </span>
          </div>

          <p className="text-xs text-yojqi-body leading-relaxed">
            {isZh ? activeRitual.subtitleZh : activeRitual.subtitleEn}
          </p>

          {/* Steps */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
              {isZh ? '实践步骤' : 'Ritual Steps'}
            </span>
            <div className="space-y-2">
              {(isZh ? activeRitual.stepsZh : activeRitual.stepsEn).map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-yojqi-warm text-xs text-yojqi-ink">
                  <span className="w-5 h-5 rounded-full bg-yojqi-sand flex items-center justify-center text-[10px] font-mono text-yojqi-bronze shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ritual Complete Button */}
          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={() => handleToggleRitual(activeRitual.id)}
              className={`px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-widest flex items-center gap-2 transition-colors ${
                completedRituals.includes(activeRitual.id)
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'yojqi-btn-primary'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>
                {completedRituals.includes(activeRitual.id)
                  ? (isZh ? '已完成今夕仪式' : 'Completed Tonight')
                  : (isZh ? '标记完成此仪式' : 'Complete Ritual')}
              </span>
            </button>

            {activeRitual.pairedProductSlug && (
              <Link
                href={`/${lang}/product/${activeRitual.pairedProductSlug}`}
                className="text-xs text-yojqi-bronze hover:underline font-medium"
              >
                {isZh ? '查看伴随器物' : 'Paired Object'} →
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* 4. TALK TO YOUR COMPANION */}
      <section className="p-8 sm:p-10 rounded-3xl yojqi-night-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-300">
            <Bot className="w-4 h-4" />
            <span>YOJQI COMPANION</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium">
            {dict.todayPage.talkCompanionPrompt}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300">
            {isZh
              ? '随时开启一段安静的对话。温润倾听，不急于给出冰冷建议，让思绪自然澄明。'
              : 'Start a quiet conversation anytime. A warm listener who never rushes you.'}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href={`/${lang}/companion`}
            className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-mono uppercase tracking-widest font-semibold flex items-center gap-2 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{dict.todayPage.talkCompanionCta}</span>
          </Link>
          <Link
            href={`/${lang}/listen`}
            className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs font-mono uppercase tracking-widest transition-colors"
          >
            <span>{isZh ? '倾听室' : 'Listening Room'}</span>
          </Link>
        </div>
      </section>

      {/* 5. FOR YOU (Personalized Content, Ritual, Experience, Object) */}
      <section className="space-y-6">
        <div>
          <h3 className="font-serif text-2xl font-semibold text-yojqi-inkHeading">
            {dict.todayPage.forYouTitle}
          </h3>
          <p className="text-xs text-yojqi-body mt-0.5">
            {dict.todayPage.forYouSub}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Experience */}
          <Link
            href={`/${lang}/retreats/baihong-drone-show-apartment`}
            className="group p-5 rounded-2xl bg-white border border-yojqi-border hover:shadow-cardHover transition-all flex flex-col justify-between"
          >
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-yojqi-bronze block">
                {isZh ? '居停体验推荐' : 'Sanctuary Experience'}
              </span>
              <h4 className="font-serif text-lg font-medium text-yojqi-inkHeading group-hover:text-yojqi-bronze transition-colors">
                {isZh ? '白宏高空江景公寓 · 听水夜读' : 'Baihong High-Altitude Riverfront Balcony'}
              </h4>
              <p className="text-xs text-yojqi-body line-clamp-2">
                {isZh
                  ? '在两江汇流之巅，煮一壶古树生普，俯瞰渡轮与无人机天幕。'
                  : 'Watch river confluences with tea and crowd-free night sky drone vistas.'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-yojqi-bronze font-mono">
              <span>{isZh ? '探索宿集' : 'Explore Suite'}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: Journal article */}
          <Link
            href={`/${lang}/wisdom/tactile-grounding-nervous-system-regulation`}
            className="group p-5 rounded-2xl bg-white border border-yojqi-border hover:shadow-cardHover transition-all flex flex-col justify-between"
          >
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-yojqi-bronze block">
                {isZh ? '身体调适指南' : 'Mindful Journal'}
              </span>
              <h4 className="font-serif text-lg font-medium text-yojqi-inkHeading group-hover:text-yojqi-bronze transition-colors">
                {isZh ? '触觉躯体锚定与神经系统自主调节' : 'Tactile Somatic Grounding & Nervous Regulation'}
              </h4>
              <p className="text-xs text-yojqi-body line-clamp-2">
                {isZh
                  ? '为何在信息过载时，指尖的一颗微温陶丸能让呼吸迅速慢下来。'
                  : 'How tactile micro-beads interrupt overthinking loops and restore parasympathetic ease.'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-yojqi-bronze font-mono">
              <span>{isZh ? '阅读随笔' : 'Read Journal'}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: Paired Object */}
          <Link
            href={`/${lang}/product/${recommendedProduct.slug}`}
            className="group p-5 rounded-2xl bg-white border border-yojqi-border hover:shadow-cardHover transition-all flex flex-col justify-between"
          >
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-yojqi-bronze block">
                {isZh ? '伴行物件' : 'Paired Object'}
              </span>
              <h4 className="font-serif text-lg font-medium text-yojqi-inkHeading group-hover:text-yojqi-bronze transition-colors">
                {isZh ? recommendedProduct.nameZh : recommendedProduct.nameEn}
              </h4>
              <p className="text-xs text-yojqi-body line-clamp-2">
                {isZh ? recommendedProduct.summaryZh : recommendedProduct.summaryEn}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-yojqi-bronze font-mono">
              <span>{isZh ? '了解器物' : 'View Object'}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
