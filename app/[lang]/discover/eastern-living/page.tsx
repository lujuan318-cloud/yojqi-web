import React from 'react';
import Link from 'next/link';
import { Sparkles, Coffee, Flame, Moon, Compass, BookOpen, ArrowRight } from 'lucide-react';
import { Language, getDictionary } from '@/lib/i18n';

export default async function EasternLivingPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Language;
  const isZh = lang === 'zh';

  const pillars = [
    {
      id: 'tea',
      titleZh: '一盏独坐 · 听水煮茶',
      titleEn: 'Tea & Solitude Quiet Moment',
      descZh: '以沸水唤醒古树茶气，在热气氤氲间，让过度紧绷的神经系统慢慢降落。',
      descEn: 'Awaken ancient tea leaves with boiling water and settle overstimulated nerves.',
      icon: Coffee,
      duration: '15 mins'
    },
    {
      id: 'incense',
      titleZh: '古法合香 · 随身微孔陶丸',
      titleEn: 'Ancient Incense & Somatic Micro-Capsules',
      descZh: '真原矿药材与微孔储香结构，通过手温与触觉让呼吸找到安顿的定点。',
      descEn: 'Authentic botanicals trapped in porous ceramic beads anchored by body heat.',
      icon: Flame,
      duration: 'Daily'
    },
    {
      id: 'seasonal',
      titleZh: '顺应二十四节气身心流转',
      titleEn: 'Seasonal Rhythm & Natural Living',
      descZh: '春生夏长、秋收冬藏。跟随天时调整饮食、作息与呼吸，不逆势强求。',
      descEn: 'Living in tune with the 24 seasonal solar nodes without counteracting natural tempos.',
      icon: Moon,
      duration: 'Seasonal'
    },
    {
      id: 'quiet',
      titleZh: '留白生活 · 拒绝被信息吞没',
      titleEn: 'Quiet Living in a Loud World',
      descZh: '在夜晚熄灭荧幕，留出 20 分钟纯粹的感官空白，重新听见自己内心的声音。',
      descEn: 'Carving out 20 minutes of screen-free sensory stillness every single dusk.',
      icon: Compass,
      duration: '20 mins'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yojqi-sand text-yojqi-bronze text-xs font-mono uppercase tracking-widest">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{isZh ? '东方生活方式哲学' : 'EASTERN LIVING & MINDFULNESS'}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-medium text-yojqi-inkHeading">
          {isZh ? '在日常中实践东方从容之道' : 'An Eastern Way to Live Well'}
        </h1>
        <p className="text-sm sm:text-base text-yojqi-body leading-relaxed">
          {isZh
            ? '东方生活美学不仅是器物，更是一种在现代喧嚣中守住内心节奏的智慧。煮茶、焚香、静坐、顺应天时，重归身体的安稳。'
            : 'Eastern wellness is not mere ornament, but practical wisdom to anchor your nervous system amidst modern overload.'}
        </p>
      </div>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pillars.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="p-8 rounded-3xl bg-white border border-yojqi-border shadow-card flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-yojqi-sand text-yojqi-bronze flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono uppercase text-yojqi-bronze bg-yojqi-warm px-2.5 py-1 rounded-full">
                    {item.duration}
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-semibold text-yojqi-inkHeading">
                  {isZh ? item.titleZh : item.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-yojqi-body leading-relaxed">
                  {isZh ? item.descZh : item.descEn}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                <Link
                  href={`/${lang}/today`}
                  className="text-xs font-mono uppercase tracking-widest text-yojqi-bronze hover:underline flex items-center gap-1.5"
                >
                  <span>{isZh ? '在今日空间实践' : 'Practice in Today'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
