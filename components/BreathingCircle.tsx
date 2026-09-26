'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Wind, Sparkles } from 'lucide-react';
import { Language } from '@/lib/i18n';

interface BreathingCircleProps {
  lang: Language;
}

export function BreathingCircle({ lang }: BreathingCircleProps) {
  const isZh = lang === 'zh';
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'idle' | 'inhale' | 'hold' | 'exhale'>('idle');
  const [secondsLeft, setSecondsLeft] = useState(4);
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isActive) {
      if (phase === 'idle') {
        setPhase('inhale');
        setSecondsLeft(4);
      } else if (phase === 'inhale') {
        if (secondsLeft > 1) {
          timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
        } else {
          setPhase('hold');
          setSecondsLeft(7);
        }
      } else if (phase === 'hold') {
        if (secondsLeft > 1) {
          timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
        } else {
          setPhase('exhale');
          setSecondsLeft(8);
        }
      } else if (phase === 'exhale') {
        if (secondsLeft > 1) {
          timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
        } else {
          setPhase('inhale');
          setSecondsLeft(4);
          setCycleCount((c) => c + 1);
        }
      }
    }

    return () => clearTimeout(timer);
  }, [isActive, phase, secondsLeft]);

  const handleToggle = () => {
    if (isActive) {
      setIsActive(false);
      setPhase('idle');
      setSecondsLeft(4);
    } else {
      setIsActive(true);
      setPhase('inhale');
      setSecondsLeft(4);
    }
  };

  const getPhaseText = () => {
    if (!isActive) return isZh ? '点击开启 30 秒定心练习' : 'Tap to Begin 4-7-8 Breathing';
    if (phase === 'inhale') return isZh ? '鼻吸 · 气息深沉入腹 (4s)' : 'Inhale Gently through Nose (4s)';
    if (phase === 'hold') return isZh ? '屏息 · 凝神收摄心神 (7s)' : 'Hold & Settle Mind (7s)';
    if (phase === 'exhale') return isZh ? '慢呼 · 彻底放下紧绷 (8s)' : 'Slow Exhale through Mouth (8s)';
    return '';
  };

  return (
    <div className="bg-gradient-to-b from-[#fffcf8] to-[#f8f5ef] border border-yojqi-border rounded-3xl p-8 sm:p-12 shadow-sm text-center space-y-8 my-12">
      {/* Title */}
      <div className="max-w-xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-mono tracking-widest uppercase">
          <Wind className="w-3.5 h-3.5 text-yojqi-bronze" />
          <span>{isZh ? '数字时代的触觉呼吸锚点' : 'Somatic Autonomic Recalibration'}</span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-medium text-yojqi-inkHeading">
          {isZh ? '即刻身心定心呼吸练习' : 'Synchronize with the 4-7-8 Calm Rhythm'}
        </h3>
        <p className="text-xs sm:text-sm text-yojqi-body">
          {isZh
            ? '跟随圆环脉动：吸气4秒、屏息7秒、呼气8秒。仅需3轮循环，即可激活副交感神经，平息脑海过载。'
            : 'Follow the pulsating circle. 4s inhale, 7s hold, 8s slow exhale. Three cycles switch on parasympathetic calm.'}
        </p>
      </div>

      {/* Pulsing Breathing Circle */}
      <div className="relative w-56 h-56 sm:w-64 sm:h-64 mx-auto flex items-center justify-center">
        {/* Outer subtle halo */}
        <div
          className={`absolute inset-0 rounded-full bg-amber-200/40 blur-xl transition-all duration-1000 ${
            phase === 'inhale'
              ? 'scale-125 opacity-70'
              : phase === 'hold'
              ? 'scale-120 opacity-80'
              : phase === 'exhale'
              ? 'scale-90 opacity-20'
              : 'scale-95 opacity-20'
          }`}
        />

        {/* Outer Ring */}
        <div
          className={`w-full h-full rounded-full border-2 border-amber-400/60 transition-transform duration-1000 flex items-center justify-center ${
            phase === 'inhale'
              ? 'scale-110 shadow-lg'
              : phase === 'hold'
              ? 'scale-105 shadow-md'
              : phase === 'exhale'
              ? 'scale-95 shadow-xs'
              : 'scale-100'
          }`}
        >
          {/* Inner Core */}
          <div
            className={`w-40 h-40 sm:w-44 sm:h-44 rounded-full bg-[#fffdfa] border border-amber-300 shadow-md flex flex-col items-center justify-center transition-transform duration-1000 p-4 ${
              phase === 'inhale'
                ? 'scale-110 bg-amber-50/80'
                : phase === 'hold'
                ? 'scale-105 bg-amber-100/60'
                : phase === 'exhale'
                ? 'scale-95 bg-white'
                : 'scale-100 bg-white'
            }`}
          >
            <span className="text-3xl font-serif font-bold text-yojqi-ink">
              {isActive ? secondsLeft : '4·7·8'}
            </span>
            <span className="text-[11px] font-mono tracking-wider text-yojqi-bronze uppercase mt-1">
              {isActive ? (phase === 'inhale' ? (isZh ? '吸气' : 'Inhale') : phase === 'hold' ? (isZh ? '屏息' : 'Hold') : (isZh ? '呼气' : 'Exhale')) : (isZh ? '定心' : 'Anchor')}
            </span>
          </div>
        </div>
      </div>

      {/* Dynamic Status & Guidance */}
      <div className="space-y-4 max-w-md mx-auto">
        <p className="font-serif text-base sm:text-lg font-medium text-yojqi-ink h-6">
          {getPhaseText()}
        </p>

        {cycleCount > 0 && (
          <div className="text-xs font-mono text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full inline-block border border-emerald-200">
            {isZh ? `已完成 ${cycleCount} 轮呼吸循环 · 身心正在回归清明` : `Completed ${cycleCount} cycles · Nervous system grounded`}
          </div>
        )}

        <div className="pt-2 flex justify-center gap-3">
          <button
            onClick={handleToggle}
            className="px-7 py-3 rounded-full yojqi-btn-primary text-xs sm:text-sm font-medium flex items-center gap-2 shadow-sm"
          >
            {isActive ? (
              <>
                <Pause className="w-4 h-4" />
                <span>{isZh ? '暂停练习' : 'Pause'}</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>{isZh ? '开始呼吸练习' : 'Start Practice'}</span>
              </>
            )}
          </button>

          {isActive && (
            <button
              onClick={() => {
                setPhase('inhale');
                setSecondsLeft(4);
                setCycleCount(0);
              }}
              className="p-3 rounded-full border border-yojqi-border bg-white text-yojqi-body hover:text-yojqi-ink hover:border-yojqi-bronze"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
