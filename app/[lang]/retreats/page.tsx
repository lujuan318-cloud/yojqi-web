import React from 'react';
import { Language, getDictionary } from '@/lib/i18n';
import { SANCTUARY_PROPERTIES } from '@/lib/retreats-data';
import { RetreatCard } from '@/components/RetreatCard';
import { Eye, ShieldAlert, Sparkles, Coffee, CalendarCheck, HelpCircle } from 'lucide-react';

export default async function RetreatsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const currentLang = lang as Language;
  const dict = getDictionary(currentLang);

  const droneFAQs = [
    {
      qEn: "When are the official Chongqing drone shows scheduled?",
      qZh: "重庆两江无人机灯光秀通常在什么时间上演？",
      aEn: "Official drone shows take place over major statutory holidays (National Day Golden Week, New Year's Eve, Spring Festival) and select cultural weekend events. Schedules are announced 2-3 days prior. Our VIP concierge monitors the air traffic authority bulletins in real time to alert booked guests immediately.",
      aZh: "官方大型无人机天幕汇演主要在国家法定节假日（国庆黄金周、跨年元旦、春节假期）及重点周末文旅活动期间进行，起降空域通常在朝天门与南滨路交界上方。我们的私享管家会提前监测民航与文旅发布，为在住宾客提供第一手起降时刻同步。",
    },
    {
      qEn: "How does private terrace viewing compare with public viewing areas?",
      qZh: "高空私享露台与地面公共观礼区（如朝天门、千厮门大桥）有什么区别？",
      aEn: "Public riverside areas often attract 50,000 to 100,000 tourists, leading to intense shoulder-to-shoulder pushing, road blockades, and 2-hour waits for taxis. At our high-floor apartments, you relax on a private open-air balcony with a freshly brewed cup of tea, insulated by acoustic glazing, enjoying eye-level aerial sightlines.",
      aZh: "地面公共观景区域（如千厮门大桥、朝天门广场）常年汇聚5万至10万人潮，需提前数小时硬站占位，散场时交通全面管制、极难打车。入住我们的高层公寓，无需人挤人，在私人专属露台边喝茶边平视千架飞星，静谧从容。",
    },
    {
      qEn: "What somatic wellness amenities are provided in the suite?",
      qZh: "公寓内配备了哪些 YOJQI 身心疗愈配置？",
      aEn: "Every stay includes a complimentary YOJQI Somatic Sleep Gift (featuring our Ruihe agarwood anchor), custom acoustic soundproofing, organic herbal foot-soak buckets with Tibetan saffron, handcrafted Kung Fu tea stations with spring water, and high-precision camera tripods for photography.",
      aZh: "每位入住宾客均获赠客房专属 YOJQI 瑞鹤随身安神香丸礼包。全屋配置高密隔音玻璃、整板工夫茶席与甘冽山泉、古法藏红花艾草暖足木桶，以及用于定格夜景大片的专业相机云台三脚架。",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-mono tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>{dict.retreats.eyebrow}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-medium text-yojqi-inkHeading">
          {dict.retreats.title}
        </h1>
        <p className="text-sm sm:text-base text-yojqi-body leading-relaxed">
          {dict.retreats.subtitle}
        </p>
      </div>

      {/* Crowd Gridlock Warning Comparison Box */}
      <div className="bg-[#fff8f0] border border-amber-300 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-start">
        <div className="w-12 h-12 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0">
          <Eye className="w-6 h-6" />
        </div>
        <div className="space-y-2 flex-1">
          <h3 className="font-serif text-xl font-semibold text-amber-950">
            {currentLang === 'zh'
              ? '为什么聪明旅人拒绝在江滩桥头苦等数小时？'
              : 'Why Mindful Travelers Skip the Public Bridge Gridlock'}
          </h3>
          <p className="text-xs sm:text-sm text-yojqi-bodyStrong leading-relaxed">
            {currentLang === 'zh'
              ? '重庆作为立体魔幻山城，节日期间南滨路与朝天门交通极为拥堵。数十万游客在夜风与嘈杂喇叭声中推挤，极度消耗身心元气。选择白宏与YOJQI高空机位公寓，将万人喧嚣隔绝于双层静音玻璃之外，在私密露台上以最体面的姿态俯瞰天地流光。'
              : 'Chongqing’s vertical topography concentrates massive holiday crowds into bottleneck river quays. By securing a high-altitude sanctuary at Baihong or YOJQI Art Residence, you transform a hectic tourist chore into an intimate, restorative sensory ritual.'}
          </p>
        </div>
      </div>

      {/* Properties List */}
      <div className="space-y-12">
        {SANCTUARY_PROPERTIES.map((property) => (
          <RetreatCard key={property.id} property={property} lang={currentLang} />
        ))}
      </div>

      {/* FAQ Section */}
      <div className="pt-8 border-t border-yojqi-border">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-yojqi-bronze uppercase tracking-widest mb-1">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{currentLang === 'zh' ? '观礼常见问题' : 'Drone Show Insights'}</span>
          </div>
          <h2 className="font-serif text-3xl font-medium text-yojqi-inkHeading">
            {currentLang === 'zh' ? '两江机位住宿指南' : 'Frequently Asked Questions'}
          </h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {droneFAQs.map((faq, idx) => (
            <div
              key={idx}
              className="p-6 bg-white rounded-xl border border-yojqi-border shadow-xs space-y-2"
            >
              <h4 className="font-serif text-base sm:text-lg font-medium text-yojqi-inkHeading">
                {currentLang === 'zh' ? faq.qZh : faq.qEn}
              </h4>
              <p className="text-xs sm:text-sm text-yojqi-body leading-relaxed">
                {currentLang === 'zh' ? faq.aZh : faq.aEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
