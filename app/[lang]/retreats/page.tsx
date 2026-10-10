import React from 'react';
import { Metadata } from 'next';
import { Language } from '@/lib/i18n';
import { queryAllRoomsAvailability } from '@/lib/retreats-pricing';
import { DirectRetreatsClient } from '@/components/DirectRetreatsClient';
import { DroneScheduleWidget } from '@/components/DroneScheduleWidget';
import { SkylineComparisonSlider } from '@/components/SkylineComparisonSlider';
import { Eye } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isZh = lang === 'zh';

  return {
    title: isZh
      ? '重庆住宿 · 高空全江景宿集直订 | YOJQI 官方直营'
      : 'YOJQI Chongqing Stays | High-Altitude Direct Booking Channel',
    description: isZh
      ? '居于两江之上，静卧山城之巅。官方房态实时保障，官网直订优享 95 折与专属工夫迎宾茶礼。'
      : 'Stay above the rivers of Chongqing. Sleep quietly. Experience the city differently. Direct booking with 5% privilege.',
  };
}

export default async function RetreatsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const currentLang = lang as Language;
  const isZh = currentLang === 'zh';

  // Compute default dates (tomorrow to day after tomorrow)
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const dayAfter = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
  const defaultCheckIn = tomorrow.toISOString().split('T')[0];
  const defaultCheckOut = dayAfter.toISOString().split('T')[0];

  // Fetch initial live quotes for 7 rooms
  const initialRooms = await queryAllRoomsAvailability(defaultCheckIn, defaultCheckOut, 2);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-16">
      {/* Direct Booking Channel Engine */}
      <DirectRetreatsClient
        lang={currentLang}
        initialRooms={initialRooms}
        initialCheckIn={defaultCheckIn}
        initialCheckOut={defaultCheckOut}
      />

      {/* Visual & Contextual Highlights (Day-to-Night Balcony Experience) */}
      <div className="pt-8 border-t border-yojqi-border space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-800">
            {isZh ? '高空私属阳台实景' : 'High-Altitude Balcony Perspective'}
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-medium text-yojqi-inkHeading">
            {isZh ? '日间两江浩渺 · 夜间千厮流光' : 'Daytime River Expanse & Cyberpunk Nightfall'}
          </h3>
        </div>

        <SkylineComparisonSlider lang={currentLang} />

        {/* Drone Show Schedule Widget */}
        <DroneScheduleWidget lang={currentLang} />

        {/* Crowd Gridlock Warning Comparison Box */}
        <div className="bg-[#fff8f0] border border-amber-300 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-start shadow-xs">
          <div className="w-12 h-12 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0">
            <Eye className="w-6 h-6" />
          </div>
          <div className="space-y-2 flex-1">
            <h3 className="font-serif text-xl font-semibold text-amber-950">
              {isZh
                ? '为什么聪明旅人拒绝在江滩桥头苦等数小时？'
                : 'Why Mindful Travelers Skip the Public Bridge Gridlock'}
            </h3>
            <p className="text-xs sm:text-sm text-yojqi-bodyStrong leading-relaxed">
              {isZh
                ? '重庆作为立体魔幻山城，节日期间南滨路与朝天门交通极为拥堵。数十万游客在夜风与嘈杂喇叭声中推挤，极度消耗身心元气。选择白虹高空机位民宿，将万人喧嚣隔绝于双层静音玻璃之外，在私密露台上以最体面的姿态俯瞰天地流光。'
                : 'Chongqing’s vertical topography concentrates massive holiday crowds into bottleneck river quays. By securing a high-altitude sanctuary at Baihong, you transform a hectic tourist chore into an intimate, restorative sensory ritual.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
