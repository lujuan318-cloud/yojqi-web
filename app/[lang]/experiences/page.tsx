import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, MapPin, Coffee, Flame, Compass, ArrowRight, ShieldCheck } from 'lucide-react';
import { Language, getDictionary } from '@/lib/i18n';
import { SANCTUARY_PROPERTIES } from '@/lib/retreats-data';
import { RetreatCard } from '@/components/RetreatCard';

export default async function ExperiencesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Language;
  const dict = getDictionary(lang);
  const isZh = lang === 'zh';

  const experiencePillars = [
    {
      id: 'chongqing',
      titleZh: '重庆高空无人机机位艺术宿集',
      titleEn: 'Chongqing Skyline Drone Show Suites',
      descZh: '在百米两江交汇之巅，避开地面 5 万人潮，私享一线无人机天幕阳台。',
      descEn: 'Front-row panoramic riverfront balcony with unobstructed drone show vantage.',
      icon: MapPin,
      tag: isZh ? '物理空间居停' : 'Physical Residence'
    },
    {
      id: 'tea',
      titleZh: '听水煮茶 · 深山古树茶修',
      titleEn: 'Tea Ceremonies & Mountain Water Meditation',
      descZh: '以深山泉水冲泡古树熟普与高山野白茶，在水沸声中洗涤神识疲惫。',
      descEn: 'Slow tea steeping rituals using mountain spring water and aged arbor tea.',
      icon: Coffee,
      tag: isZh ? '感官仪式' : 'Sensory Ritual'
    },
    {
      id: 'incense',
      titleZh: '古法合香与随身香丸手工体验',
      titleEn: 'Ancient Incense & Somatic Scent Crafting',
      descZh: '研磨天然沉香、龙涎与药材，遵古法炮制专属你脉搏温度的微孔陶丸。',
      descEn: 'Hand-blended natural agarwood and ambergris for your personal pulse temperature.',
      icon: Flame,
      tag: isZh ? '手作体验' : 'Artisan Craft'
    },
    {
      id: 'taoist',
      titleZh: '道家正统法印祈福与清静经共修',
      titleEn: 'Authentic Taoist Consecration & Auric Cleansing',
      descZh: '择吉时吉日设坛加持朱砂灵符，筑起个人与家宅的安稳能量护界。',
      descEn: 'Altar-consecrated cinnabar talismans for personal energetic boundaries.',
      icon: ShieldCheck,
      tag: isZh ? '道门科仪' : 'Taoist Lineage'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yojqi-sand text-yojqi-bronze text-xs font-mono uppercase tracking-widest">
          <Compass className="w-3.5 h-3.5" />
          <span>{isZh ? '具身栖息与沉浸场域' : 'PHYSICAL SANCTUARIES & EXPERIENCES'}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-medium text-yojqi-inkHeading">
          {isZh ? '从江景宿集到古法茶事体验' : 'From River Skyline to Contemplative Retreats'}
        </h1>
        <p className="text-sm sm:text-base text-yojqi-body leading-relaxed">
          {isZh
            ? 'YOJQI 的实体空间并非普通的旅宿，而是为你提供一个从容抽离日常喧嚣、重归感官澄明的沉浸避难所。'
            : 'Physical spaces designed not just as accommodation, but as experiential sanctuaries to reset your sensory baseline.'}
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {experiencePillars.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.id}
              className="p-6 rounded-3xl bg-white border border-yojqi-border shadow-card flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-yojqi-sand text-yojqi-bronze flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                    {p.tag}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-semibold text-yojqi-inkHeading">
                  {isZh ? p.titleZh : p.titleEn}
                </h3>
                <p className="text-xs text-yojqi-body leading-relaxed">
                  {isZh ? p.descZh : p.descEn}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Physical Residences (Baihong & YOJQI Skyline Suites) */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-yojqi-border pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-yojqi-bronze font-semibold block">
              {isZh ? '重庆高空无人机江景美宿' : 'Chongqing Drone Balcony Sanctuaries'}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-yojqi-inkHeading mt-1">
              {isZh ? '白宏江景公寓 & YOJQI 天幕居所' : 'Baihong Residence & YOJQI Skyline Suites'}
            </h2>
          </div>
          <Link
            href={`/${lang}/retreats`}
            className="text-xs font-mono uppercase tracking-widest text-yojqi-bronze hover:underline flex items-center gap-1.5"
          >
            <span>{isZh ? '进入宿集预定专区' : 'VIP Concierge Booking'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {SANCTUARY_PROPERTIES.map((property) => (
            <RetreatCard key={property.id} property={property} lang={lang} />
          ))}
        </div>
      </section>
    </div>
  );
}
