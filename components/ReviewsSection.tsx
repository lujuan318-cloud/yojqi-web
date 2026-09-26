'use client';

import React from 'react';
import { Star, ShieldCheck, Sparkles, MapPin } from 'lucide-react';
import { Language } from '@/lib/i18n';

interface ReviewsSectionProps {
  lang: Language;
}

export function ReviewsSection({ lang }: ReviewsSectionProps) {
  const isZh = lang === 'zh';

  const REVIEWS = [
    {
      author: 'Evelyn V.',
      location: 'London, UK',
      verifiedType: isZh ? '已验证购买者 · 龙涎定心胸坠' : 'Verified Buyer · Ambergris Ease Pendant',
      rating: 5,
      date: '2026-09-15',
      textZh: '作为一个全天与代码和屏幕打交道的架构师，我经常被高压会议和无休止的通知推入焦虑。戴上龙涎胸坠后，每次呼吸胸口微微起伏都能闻到非常幽微纯净的古木香气，指尖抚摸黄铜质感，心率很快就恢复平稳。',
      textEn: 'As a software architect constantly facing screen overload, this pendant has become my daily somatic anchor. The subtle botanical warmth over the sternum grounds my breathing during intense production sprints.',
    },
    {
      author: '程先生 (Chen W.)',
      location: '上海 · 陆家嘴金融城',
      verifiedType: isZh ? '已验证迎请 · 赵公明武财神符 + 动能手绳' : 'Verified Buyer · Wealth Talisman & Kinetic Bracelet',
      rating: 5,
      date: '2026-09-20',
      textZh: '朱砂手书非常有神韵，能看出是真正原矿辰砂手工绘制、有道家法印盖章。放进主力钱包后，感觉心气很足很定，近期几个胶着的投资谈判非常顺畅地拿下了。动能手绳在午后三点困倦时按压也是醒脑利器。',
      textEn: 'The authentic cinnabar vermilion script and master altar seals have a powerful presence. Kept in my wallet, it anchors my business confidence. The kinetic bracelet is also an indispensable 3 PM focus reset.',
    },
    {
      author: 'Marcus & Linnea',
      location: 'Singapore',
      verifiedType: isZh ? '已验证住客 · 白宏两江无人机全景套房' : 'Verified Stay · Baihong Drone Balcony Suite',
      rating: 5,
      date: '2026-09-22',
      textZh: '在来重庆之前听说南滨路看无人机人山人海根本走不动路。我们预定了白宏的高空套房，真的太惊艳了！晚上八点半，坐在私属大露台上泡着高山茶，数千架无人机就在我们平视的夜空变换编队，完全不用下楼人挤人，终生难忘。',
      textEn: 'Skipping the 50,000+ crowd on the bridge to watch thousands of drones right from our private 270° balcony with hot Kung Fu tea was the highlight of our China journey. World-class hospitality.',
    },
  ];

  return (
    <div className="my-16 space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold tracking-wider text-yojqi-bronze uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isZh ? '真实缘主与全球住客见证' : 'Verified Collector & Guest Voices'}</span>
        </div>
        <h3 className="font-serif text-2xl sm:text-4xl font-medium text-yojqi-inkHeading">
          {isZh ? '身心与能量的真实共鸣' : 'Experiences of Stillness & Elevation'}
        </h3>
        <p className="text-xs sm:text-sm text-yojqi-body">
          {isZh
            ? '每一份真实的体验反馈，都是对东方草木智慧、道门正法与高空隐奢居停的最佳诠释。'
            : 'Authentic words from practitioners, executives, and mindful travelers across the globe.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {REVIEWS.map((rev, idx) => (
          <div
            key={idx}
            className="p-6 sm:p-7 rounded-2xl bg-white border border-yojqi-border shadow-xs flex flex-col justify-between space-y-4 hover:border-yojqi-bronze transition-colors"
          >
            <div className="space-y-3">
              {/* Rating stars */}
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                ))}
              </div>

              {/* Review content */}
              <p className="text-xs sm:text-sm text-yojqi-body leading-relaxed">
                &ldquo;{isZh ? rev.textZh : rev.textEn}&rdquo;
              </p>
            </div>

            {/* Author info */}
            <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
              <div>
                <h5 className="font-serif text-sm font-semibold text-yojqi-ink">
                  {rev.author}
                </h5>
                <span className="text-[11px] font-mono text-neutral-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-yojqi-bronze" />
                  {rev.location}
                </span>
              </div>

              <div className="text-right">
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <ShieldCheck className="w-3 h-3" />
                  <span>{isZh ? '已验证' : 'Verified'}</span>
                </span>
                <span className="block text-[10px] text-neutral-400 mt-0.5">{rev.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
