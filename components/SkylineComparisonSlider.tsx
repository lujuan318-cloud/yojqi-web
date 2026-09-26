'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, Sun, Moon } from 'lucide-react';
import { Language } from '@/lib/i18n';

interface SkylineComparisonSliderProps {
  lang: Language;
}

export function SkylineComparisonSlider({ lang }: SkylineComparisonSliderProps) {
  const isZh = lang === 'zh';
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <div className="bg-[#181816] text-[#fffdfa] rounded-3xl p-6 sm:p-10 border border-amber-900/40 my-12 space-y-6 shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-amber-400 uppercase">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{isZh ? '百米高空私属露台 · 270° 双江交汇' : '270° Riverfront Confluence Balcony'}</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
            {isZh ? '拖动滑块：平视重庆两江日夜流光' : 'Slide to Compare: Daytime River vs. Night Drone Show'}
          </h3>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
          <span className="flex items-center gap-1 text-amber-300">
            <Sun className="w-3.5 h-3.5" />
            {isZh ? '白昼两江浩瀚' : 'Day View'}
          </span>
          <span>|</span>
          <span className="flex items-center gap-1 text-indigo-300">
            <Moon className="w-3.5 h-3.5" />
            {isZh ? '夜间数千架天幕' : 'Night Drone Swarm'}
          </span>
        </div>
      </div>

      {/* Comparison Container */}
      <div className="relative w-full aspect-16/9 md:aspect-21/9 rounded-2xl overflow-hidden border border-white/20 select-none">
        {/* Background Image: Night Drone Show */}
        <div className="absolute inset-0">
          <Image
            src="/images/retreats/baihong-drone-night.jpg"
            alt="Night Drone Show View from Balcony"
            fill
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
          <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-xs text-amber-300 px-3 py-1.5 rounded-lg text-xs font-mono border border-amber-500/30">
            {isZh ? '夜幕 · 5000架无人机平视天幕' : 'Night · 5,000 Drone Horizon'}
          </div>
        </div>

        {/* Foreground Image with Clip Path: Daytime Panoramic View */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
        >
          <Image
            src="/images/retreats/yojqi-sanctuary-01.jpg"
            alt="Daytime Two-Rivers Confluence View"
            fill
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
          <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-xs text-white px-3 py-1.5 rounded-lg text-xs font-mono border border-white/20">
            {isZh ? '白昼 · 长江与嘉陵江交汇' : 'Day · Yangtze & Jialing Confluence'}
          </div>
        </div>

        {/* Divider Line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)] pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-amber-400 text-black flex items-center justify-center font-bold text-xs shadow-lg">
            ↔
          </div>
        </div>

        {/* Invisible Range Input Slider */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={handleSliderChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
          aria-label="Slide to compare day and night balcony view"
        />
      </div>

      <p className="text-xs text-center text-neutral-400 font-mono">
        {isZh
          ? '← 左右拖动滑块查看百米高空私属露台日夜实景对比 · 告别地面拥堵，在露台静享天幕 →'
          : '← Drag left & right to inspect balcony sightlines · Private front-row view with zero crowds →'}
      </p>
    </div>
  );
}
