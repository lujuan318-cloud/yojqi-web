'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  ArrowRight,
  Compass,
  Moon,
  Coffee,
  Wind,
  Zap,
  Shield,
  Heart,
  Bot,
  MessageCircle,
  Users,
  Flame,
  Check,
  ChevronRight,
  Send
} from 'lucide-react';
import { Language, getDictionary } from '@/lib/i18n';
import { UserNeed, SEED_RITUALS, SEED_COMMUNITY_POSTS } from '@/lib/journey-data';
import { getUserProfile, toggleFeelYou } from '@/lib/journey-store';
import { StartJourneyModal } from './StartJourneyModal';
import { CareModal } from './CareModal';

interface DiscoverClientSectionsProps {
  lang: Language;
}

export function DiscoverClientSections({ lang }: DiscoverClientSectionsProps) {
  const dict = getDictionary(lang);
  const isZh = lang === 'zh';

  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [careModalOpen, setCareModalOpen] = useState(false);
  const [selectedPostForCare, setSelectedPostForCare] = useState<any>(null);
  const [activeNeed, setActiveNeed] = useState<UserNeed>('sleep');
  const [userProfile, setUserProfile] = useState<any>(null);
  const [communityPosts, setCommunityPosts] = useState(SEED_COMMUNITY_POSTS);

  useEffect(() => {
    setUserProfile(getUserProfile());
  }, []);

  const needsList: { id: UserNeed; icon: any; label: string; desc: string }[] = [
    {
      id: 'sleep',
      icon: Moon,
      label: dict.v2?.needs?.sleep?.label || 'SLEEP',
      desc: dict.v2?.needs?.sleep?.desc || 'Gentle agarwood & nocturnal quiet for deep rest.'
    },
    {
      id: 'relax',
      icon: Coffee,
      label: dict.v2?.needs?.relax?.label || 'RELAX',
      desc: dict.v2?.needs?.relax?.desc || 'Tea ceremonies & somatic stillness to release tension.'
    },
    {
      id: 'reset',
      icon: Wind,
      label: dict.v2?.needs?.reset?.label || 'RESET',
      desc: dict.v2?.needs?.reset?.desc || '4-7-8 breathing & mist cleansing to interrupt overthinking.'
    },
    {
      id: 'focus',
      icon: Zap,
      label: dict.v2?.needs?.focus?.label || 'FOCUS',
      desc: dict.v2?.needs?.focus?.desc || 'Cooling botanical borneol to cut through digital brain fog.'
    },
    {
      id: 'balance',
      icon: Shield,
      label: dict.v2?.needs?.balance?.label || 'BALANCE',
      desc: dict.v2?.needs?.balance?.desc || 'Tactile ambergris pulse anchors for everyday grounding.'
    },
    {
      id: 'explore',
      icon: Compass,
      label: dict.v2?.needs?.explore?.label || 'EXPLORE',
      desc: dict.v2?.needs?.explore?.desc || 'Immersive Chongqing skyline stays & Taoist wisdom.'
    }
  ];

  const handleFeelYouClick = (postId: string) => {
    const updated = toggleFeelYou(postId);
    if (updated) {
      setCommunityPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...updated } : p))
      );
    }
  };

  const handleOpenCareModal = (post: any) => {
    setSelectedPostForCare(post);
    setCareModalOpen(true);
  };

  return (
    <>
      {/* 1. DISCOVER HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-gradient-to-b from-[#fffaf6] via-[#fffdfa] to-white border-b border-yojqi-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* STATE 2/3/4: Returning or New User Personalized Welcome Banner */}
          {userProfile?.userState && userProfile.userState !== 'anonymous' && (
            <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-amber-900/10 via-amber-800/5 to-transparent border border-amber-900/15 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-900 text-amber-100 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-amber-900 font-semibold">
                    {isZh ? '欢迎回到属于你的 YOJQI 旅程' : 'Welcome Back to Your Journey'}
                  </h4>
                  <p className="text-xs text-yojqi-body">
                    {isZh ? userProfile.currentJourneyZh : userProfile.currentJourneyEn}
                  </p>
                </div>
              </div>
              <Link
                href={`/${lang}/today`}
                className="px-4 py-2 rounded-xl bg-yojqi-ink text-[#fffdfa] text-xs font-mono uppercase tracking-widest hover:bg-neutral-800 transition-colors flex items-center gap-1.5"
              >
                <span>{isZh ? '进入今日空间' : 'Enter Today'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Brand Vision Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yojqi-sand text-yojqi-bronze text-xs font-mono tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{dict.v2?.brandStatement || 'AN EASTERN WAY TO LIVE WELL'}</span>
              </div>

              <div className="space-y-3">
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-yojqi-inkHeading leading-[1.12]">
                  {dict.v2?.brandStatement || 'AN EASTERN WAY TO LIVE WELL'}
                </h1>
                <p className="font-serif text-lg sm:text-xl text-yojqi-bronze italic max-w-2xl">
                  {dict.v2?.heroSubtitle ||
                    'Explore better ways to sleep, rest, reset and live through Eastern rituals, everyday wisdom and meaningful experiences.'}
                </p>
              </div>

              <p className="text-sm sm:text-base text-yojqi-body leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {isZh
                  ? 'YOJQI 并不是单纯的香氛或酒店，而是将古法草木智慧、身体感知仪式、山城高空江景美宿与有温度的人性关照，编织为一段属于你个人的身心旅程。'
                  : 'YOJQI connects lifestyle, wellness, Eastern culture, rituals, experiences, products, AI companionship and human connection into one personal journey.'}
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  type="button"
                  onClick={() => setOnboardingOpen(true)}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl yojqi-btn-primary text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-2.5 shadow-xl hover:scale-[1.02] transition-transform"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>{dict.v2?.startJourney || 'START YOUR JOURNEY'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#user-needs-section"
                  className="w-full sm:w-auto px-7 py-4 rounded-xl yojqi-btn-secondary text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  <Compass className="w-4 h-4 text-yojqi-bronze" />
                  <span>{dict.v2?.exploreYojqi || 'EXPLORE YOJQI'}</span>
                </a>
              </div>
            </div>

            {/* Right Atmospheric Hero Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden border border-yojqi-borderAccent shadow-2xl bg-neutral-950 aspect-[4/5] group">
                <Image
                  src="/images/retreats/baihong-drone-night.jpg"
                  alt="YOJQI Chongqing Skyline & Eastern Living Sanctuary"
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                {/* Floating Experience Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/60 text-yojqi-ink shadow-xl">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono font-semibold tracking-wider text-amber-800 uppercase flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>{isZh ? '真实空间栖息体验' : 'Physical Sanctuary'}</span>
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400">Chongqing · 两江交汇</span>
                  </div>
                  <h4 className="font-serif text-lg font-semibold text-yojqi-inkHeading">
                    {isZh ? '白宏江景无人机机位公寓' : 'Baihong Drone Show Balcony Residence'}
                  </h4>
                  <p className="text-xs text-yojqi-body line-clamp-1 mt-1">
                    {isZh
                      ? '高空露台正对两江交汇浩瀚全景，避开地面人潮，于茶香中平视天幕。'
                      : 'Front-row balcony overlooking the Yangtze & Jialing confluence without crowds.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. USER NEEDS / USER STATES ("What brings you here?") */}
      <section id="user-needs-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-mono font-semibold tracking-widest text-yojqi-bronze uppercase block">
            {isZh ? '身心入口 · 状态导向' : 'Enter Through Your State'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-yojqi-inkHeading">
            {dict.v2?.needsHeadline || 'What brings you here?'}
          </h2>
          <p className="text-xs sm:text-sm text-yojqi-body">
            {dict.v2?.needsSub || 'Enter through how your body and mind feel today.'}
          </p>
        </div>

        {/* Six User Needs Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {needsList.map((item) => {
            const Icon = item.icon;
            const active = activeNeed === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveNeed(item.id)}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                  active
                    ? 'border-yojqi-bronze bg-yojqi-lift text-yojqi-ink shadow-md scale-[1.02]'
                    : 'border-yojqi-border bg-white text-yojqi-body hover:border-neutral-400 hover:bg-neutral-50'
                }`}
              >
                <div>
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                      active ? 'bg-yojqi-ink text-white' : 'bg-yojqi-sand text-yojqi-bronze'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-mono text-xs uppercase tracking-widest font-bold text-yojqi-inkHeading">
                    {item.label}
                  </h3>
                  <p className="text-[11px] text-yojqi-body mt-1.5 leading-relaxed line-clamp-2">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-neutral-100 flex items-center justify-between text-[10px] text-yojqi-bronze font-mono uppercase">
                  <span>{isZh ? '查看仪式' : 'View Ritual'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. LIVING RITUALS SECTION (Filtered by chosen need) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-yojqi-border shadow-card space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-medium tracking-widest text-yojqi-bronze uppercase block mb-1">
                {dict.v2?.livingRituals || 'LIVING RITUALS'}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-yojqi-inkHeading">
                {isZh ? '契合当下的日常停顿与修持' : 'Practices Woven into the Rhythm of Your Day'}
              </h3>
            </div>
            <Link
              href={`/${lang}/today`}
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-yojqi-bronze hover:underline"
            >
              <span>{isZh ? '在「今日空间」实践仪式' : 'Practice in Today Space'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SEED_RITUALS.filter((r) => r.need === activeNeed || activeNeed === 'explore')
              .slice(0, 2)
              .map((ritual) => (
                <div
                  key={ritual.id}
                  className="p-6 rounded-2xl bg-yojqi-warm border border-yojqi-border flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-yojqi-bronze">
                      <span className="px-2 py-0.5 rounded bg-yojqi-sand uppercase">{ritual.duration}</span>
                      <span>{isZh ? ritual.recommendedTimeZh : ritual.recommendedTimeEn}</span>
                    </div>
                    <h4 className="font-serif text-xl font-semibold text-yojqi-inkHeading">
                      {isZh ? ritual.titleZh : ritual.titleEn}
                    </h4>
                    <p className="text-xs text-yojqi-body">
                      {isZh ? ritual.subtitleZh : ritual.subtitleEn}
                    </p>
                    <ol className="space-y-1.5 pt-2 text-xs text-neutral-600 list-decimal list-inside">
                      {(isZh ? ritual.stepsZh : ritual.stepsEn).map((st, i) => (
                        <li key={i} className="line-clamp-1">{st}</li>
                      ))}
                    </ol>
                  </div>
                  {ritual.pairedProductSlug && (
                    <div className="mt-5 pt-3 border-t border-amber-900/10 flex items-center justify-between text-xs">
                      <span className="text-neutral-500 text-[11px]">
                        {isZh ? '伴行触觉物件：' : 'Paired Object:'}
                      </span>
                      <Link
                        href={`/${lang}/product/${ritual.pairedProductSlug}`}
                        className="text-yojqi-bronze hover:underline font-medium text-[11px]"
                      >
                        {isZh ? ritual.pairedProductNameZh : ritual.pairedProductNameEn} →
                      </Link>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* 4. YOJQI COMPANION BANNER ("Listen Before Advising") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="p-8 sm:p-12 rounded-3xl yojqi-night-card space-y-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-800/40 text-amber-300 text-xs font-mono uppercase tracking-widest">
              <Bot className="w-3.5 h-3.5 text-amber-400" />
              <span>{isZh ? '专属陪伴者 · 倾听优先' : 'AI COMPANIONSHIP · LISTEN BEFORE ADVISING'}</span>
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl font-medium text-white">
              {dict.v2?.companionBannerTitle || 'Meet the YOJQI Companion'}
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {dict.v2?.companionBannerDesc ||
                'A quiet, warm, Eastern-inspired AI personality. Listens before advising. No sales pitches, no judgment.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <Link
              href={`/${lang}/companion`}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-amber-500 text-black hover:bg-amber-400 text-xs font-mono uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{isZh ? '与陪伴者静心交谈' : 'TALK TO COMPANION'}</span>
            </Link>

            <Link
              href={`/${lang}/listen`}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
            >
              <span>{isZh ? '前往倾听室自由宣泄' : 'VISIT LISTENING ROOM'}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. YOJQI FRIENDS & HUMAN CARE PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-yojqi-bronze mb-1">
              <Users className="w-3.5 h-3.5" />
              <span>{dict.v2?.friendsBannerTitle || 'YOJQI FRIENDS'}</span>
            </div>
            <h3 className="font-serif text-3xl font-medium text-yojqi-inkHeading">
              {isZh ? '今日同修 · 彼此懂得' : 'Human Care & Vulnerability Stream'}
            </h3>
          </div>
          <Link
            href={`/${lang}/friends`}
            className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-widest text-yojqi-bronze hover:underline"
          >
            <span>{isZh ? '进入全部同修空间' : 'Enter Friends Sanctuary'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Anonymous Human Posts Stream */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {communityPosts.slice(0, 2).map((post) => (
            <div
              key={post.id}
              className="p-6 rounded-2xl bg-white border border-yojqi-border hover:shadow-cardHover transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <span className="px-2 py-0.5 rounded bg-yojqi-sand font-mono text-[10px] text-yojqi-bronze">
                    {isZh ? post.feelingLabelZh : post.feelingLabelEn}
                  </span>
                  <span>{post.city} · {post.timestamp}</span>
                </div>
                <p className="text-sm text-yojqi-ink leading-relaxed italic font-serif">
                  “{post.content}”
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                {/* I Feel You */}
                <button
                  type="button"
                  onClick={() => handleFeelYouClick(post.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs transition-colors ${
                    post.hasFeltYou
                      ? 'bg-rose-50 border-rose-300 text-rose-700'
                      : 'border-neutral-200 text-neutral-600 hover:border-neutral-400'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${post.hasFeltYou ? 'fill-rose-600 text-rose-600' : ''}`} />
                  <span>{dict.friendsPage?.feelYouBtn || 'I FEEL YOU'} ({post.feelYouCount})</span>
                </button>

                {/* Send Care */}
                <button
                  type="button"
                  onClick={() => handleOpenCareModal(post)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yojqi-sand text-yojqi-bronze hover:bg-yojqi-lift text-xs font-medium transition-colors"
                >
                  <Send className="w-3 h-3" />
                  <span>{dict.friendsPage?.sendCareBtn || 'SEND CARE'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Onboarding Flow Modal */}
      <StartJourneyModal
        isOpen={onboardingOpen}
        onClose={() => setOnboardingOpen(false)}
        lang={lang}
      />

      {/* Send Care Modal */}
      <CareModal
        isOpen={careModalOpen}
        onClose={() => setCareModalOpen(false)}
        postId={selectedPostForCare?.id}
        recipientName={selectedPostForCare?.authorAlias}
        lang={lang}
      />
    </>
  );
}
