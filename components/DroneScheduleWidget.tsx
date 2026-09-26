'use client';

import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Eye, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Language } from '@/lib/i18n';

interface DroneScheduleWidgetProps {
  lang: Language;
}

export function DroneScheduleWidget({ lang }: DroneScheduleWidgetProps) {
  const isZh = lang === 'zh';
  const [selectedEventIndex, setSelectedEventIndex] = useState(0);

  const SCHEDULE = [
    {
      dateEn: "Every Saturday & Sunday Evening",
      dateZh: "每周六、周日 常规夜间天幕",
      time: "20:30 - 20:45 (CST)",
      fleetEn: "3,000 to 5,000 Autonomous Drones",
      fleetZh: "3,000 ~ 5,000 架编队高空矩阵",
      statusEn: "Scheduled Regular Flight",
      statusZh: "常规常态化演出",
      locationEn: "Directly above Two-Rivers Confluence (Chaotianmen / Nanbin Road)",
      locationZh: "朝天门两江汇流上方 · 南滨路正对天幕",
      highlightEn: "Panoramic 270° eye-level perspective right from your private suite terrace.",
      highlightZh: "公寓 270° 高空私属露台平视视界，无玻璃反光阻隔。",
    },
    {
      dateEn: "National Day Golden Week (Oct 1 - Oct 7)",
      dateZh: "国庆黄金周特献 (10月1日 - 10月7日)",
      time: "20:00 & 21:30 (Double Flights)",
      fleetEn: "8,000+ Super-Scale Swarm + Dynamic Light Show",
      fleetZh: "8,000+ 架超大规模矩阵 + 两江灯光联动",
      statusEn: "Peak VIP Demand (Advance Booking Required)",
      statusZh: "年度客流高峰 · 需提前锁定房态",
      locationEn: "Grand Two-Rivers Sky Theater",
      locationZh: "两江汇流超级天幕大剧场",
      highlightEn: "Avoid 50,000+ ground crowds while enjoying complimentary high-mountain tea on the balcony.",
      highlightZh: "无需在地面与五万人挤挤挨挨，露台温壶品茗，平视千架战机翱翔。",
    },
    {
      dateEn: "New Year's Eve & Spring Festival Gala",
      dateZh: "跨年元旦 & 农历除夕跨年夜",
      time: "23:45 - 00:15 (Countdown Formation)",
      fleetEn: "10,000+ Drone Midnight Countdown",
      fleetZh: "万架无人机 0 点倒计时天幕巨献",
      statusEn: "Ultra VIP Exclusive",
      statusZh: "跨年顶奢限定机位",
      locationEn: "Two-Rivers Horizon Skyline",
      locationZh: "两江交汇夜空穹顶",
      highlightEn: "Direct eye-level countdown fireworks and laser mapping across the Yangtze river.",
      highlightZh: "长江与嘉陵江交汇处正中 C 位，0 点激光倒计时近在咫尺。",
    },
  ];

  const current = SCHEDULE[selectedEventIndex];

  return (
    <div className="bg-[#fffdfa] border border-yojqi-border rounded-2xl p-6 sm:p-8 shadow-sm my-10 space-y-6">
      {/* Title & Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-yojqi-border pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-yojqi-bronze uppercase">
            <Sparkles className="w-4 h-4" />
            <span>{isZh ? '实时天幕航线与观礼时刻表' : 'Two-Rivers Drone Flight Schedule'}</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-yojqi-ink mt-1">
            {isZh ? '重庆两江汇高空无人机天幕排期' : 'Chongqing Skyline Drone Show Vantage'}
          </h3>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{isZh ? '私属露台 · 告别地面 5 万人流' : 'Private Balcony · Zero Crowds'}</span>
        </div>
      </div>

      {/* Tabs / Date Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {SCHEDULE.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedEventIndex(idx)}
            className={`text-left p-4 rounded-xl border transition-all ${
              selectedEventIndex === idx
                ? 'bg-yojqi-ink text-[#fffdfa] border-yojqi-ink shadow-md'
                : 'bg-white text-yojqi-body border-yojqi-border hover:border-yojqi-bronze hover:text-yojqi-ink'
            }`}
          >
            <span className="text-[11px] font-mono block opacity-80 mb-1">
              {isZh ? `航线排期 0${idx + 1}` : `Flight Window 0${idx + 1}`}
            </span>
            <p className="font-serif text-sm font-semibold truncate">
              {isZh ? item.dateZh : item.dateEn}
            </p>
          </button>
        ))}
      </div>

      {/* Selected Schedule Detail Card */}
      <div className="bg-[#fcfaf7] border border-yojqi-border rounded-xl p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-yojqi-bronze shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-mono uppercase text-neutral-400">
                {isZh ? '起飞时刻' : 'Flight Timing'}
              </span>
              <p className="font-serif text-base font-bold text-yojqi-ink">{current.time}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-mono uppercase text-neutral-400">
                {isZh ? '编队规模' : 'Fleet Swarm Scale'}
              </span>
              <p className="font-serif text-base font-bold text-yojqi-ink">
                {isZh ? current.fleetZh : current.fleetEn}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-mono uppercase text-neutral-400">
                {isZh ? '核心空域与坐标' : 'Airspace Coordinates'}
              </span>
              <p className="text-sm text-yojqi-body mt-0.5">
                {isZh ? current.locationZh : current.locationEn}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between bg-white p-5 rounded-lg border border-yojqi-border">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-amber-800 mb-2">
              <Eye className="w-4 h-4 text-yojqi-bronze" />
              <span>{isZh ? 'YOJQI 百米高空机位视界体验' : 'YOJQI High-Altitude Balcony View'}</span>
            </div>
            <p className="text-sm text-yojqi-body leading-relaxed">
              {isZh ? current.highlightZh : current.highlightEn}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500 font-mono">
            <span>{isZh ? '状态: ' + current.statusZh : 'Status: ' + current.statusEn}</span>
            <span className="text-emerald-700 font-semibold">{isZh ? '● 房态接受实时核实' : '● Live Availability'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
