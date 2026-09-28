'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { X, Sparkles, ArrowRight, Check, Compass, Moon, Wind, Heart, Bot } from 'lucide-react';
import { Language, getDictionary } from '@/lib/i18n';
import { saveOnboardingAnswers } from '@/lib/journey-store';

interface StartJourneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export function StartJourneyModal({ isOpen, onClose, lang }: StartJourneyModalProps) {
  const router = useRouter();
  const dict = getDictionary(lang);
  const isZh = lang === 'zh';

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedNeed, setSelectedNeed] = useState<string>('');
  const [selectedFeeling, setSelectedFeeling] = useState<string>('');
  const [selectedDesired, setSelectedDesired] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 3) {
      setStep((step + 1) as any);
    } else if (step === 3) {
      setIsGenerating(true);
      setTimeout(() => {
        saveOnboardingAnswers({
          need: selectedNeed,
          feeling: selectedFeeling,
          desiredState: selectedDesired
        });
        setIsGenerating(false);
        setStep(4);
      }, 700);
    }
  };

  const handleFinish = () => {
    onClose();
    router.push(`/${lang}/today`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-yojqi-ivory rounded-3xl border border-yojqi-border shadow-2xl overflow-hidden text-yojqi-ink p-6 sm:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-yojqi-body hover:text-yojqi-ink hover:bg-neutral-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Progress indicator */}
        {step < 4 && (
          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-yojqi-bronze">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isZh ? `步骤 ${step} / 3` : `Step ${step} of 3`}</span>
            </div>
            <div className="flex-1 h-1 bg-neutral-200 rounded-full overflow-hidden ml-2">
              <div
                className="h-full bg-yojqi-bronze transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* STEP 1: What brings you here today? */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-2 duration-200">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-yojqi-inkHeading">
                {dict.onboarding.step1}
              </h3>
              <p className="text-xs sm:text-sm text-yojqi-body mt-1">
                {isZh ? '选择最贴合你此刻心境的一个起点。' : 'Choose what feels closest to your state of mind right now.'}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2.5 max-h-72 overflow-y-auto pr-1">
              {dict.onboarding.step1Options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setSelectedNeed(opt)}
                  className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all flex items-center justify-between ${
                    selectedNeed === opt
                      ? 'border-yojqi-bronze bg-yojqi-lift text-yojqi-ink font-medium shadow-sm'
                      : 'border-yojqi-border bg-white text-yojqi-body hover:border-neutral-400'
                  }`}
                >
                  <span>{opt}</span>
                  {selectedNeed === opt && <Check className="w-4 h-4 text-yojqi-bronze" />}
                </button>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                disabled={!selectedNeed}
                onClick={handleNext}
                className="px-6 py-3 rounded-xl yojqi-btn-primary text-xs font-mono uppercase tracking-widest flex items-center gap-2 disabled:opacity-40"
              >
                <span>{dict.onboarding.nextBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: How are you feeling today? */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-2 duration-200">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-yojqi-inkHeading">
                {dict.onboarding.step2}
              </h3>
              <p className="text-xs sm:text-sm text-yojqi-body mt-1">
                {isZh ? '诚实关照身心的疲惫与波澜。' : 'Listen to how your nervous system holds the day.'}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2.5 max-h-72 overflow-y-auto pr-1">
              {dict.onboarding.step2Options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setSelectedFeeling(opt)}
                  className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all flex items-center justify-between ${
                    selectedFeeling === opt
                      ? 'border-yojqi-bronze bg-yojqi-lift text-yojqi-ink font-medium shadow-sm'
                      : 'border-yojqi-border bg-white text-yojqi-body hover:border-neutral-400'
                  }`}
                >
                  <span>{opt}</span>
                  {selectedFeeling === opt && <Check className="w-4 h-4 text-yojqi-bronze" />}
                </button>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs font-mono uppercase tracking-widest text-yojqi-body hover:text-yojqi-ink"
              >
                {dict.onboarding.backBtn}
              </button>
              <button
                type="button"
                disabled={!selectedFeeling}
                onClick={handleNext}
                className="px-6 py-3 rounded-xl yojqi-btn-primary text-xs font-mono uppercase tracking-widest flex items-center gap-2 disabled:opacity-40"
              >
                <span>{dict.onboarding.nextBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: What would feel better right now? */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-2 duration-200">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-yojqi-inkHeading">
                {dict.onboarding.step3}
              </h3>
              <p className="text-xs sm:text-sm text-yojqi-body mt-1">
                {isZh ? '不预设答案，遵从直觉的指引。' : 'No right answers. Follow what instinct gently invites.'}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2.5 max-h-72 overflow-y-auto pr-1">
              {dict.onboarding.step3Options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setSelectedDesired(opt)}
                  className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all flex items-center justify-between ${
                    selectedDesired === opt
                      ? 'border-yojqi-bronze bg-yojqi-lift text-yojqi-ink font-medium shadow-sm'
                      : 'border-yojqi-border bg-white text-yojqi-body hover:border-neutral-400'
                  }`}
                >
                  <span>{opt}</span>
                  {selectedDesired === opt && <Check className="w-4 h-4 text-yojqi-bronze" />}
                </button>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-xs font-mono uppercase tracking-widest text-yojqi-body hover:text-yojqi-ink"
              >
                {dict.onboarding.backBtn}
              </button>
              <button
                type="button"
                disabled={!selectedDesired || isGenerating}
                onClick={handleNext}
                className="px-6 py-3 rounded-xl yojqi-btn-primary text-xs font-mono uppercase tracking-widest flex items-center gap-2 disabled:opacity-40"
              >
                {isGenerating ? (
                  <span>{isZh ? '正在生成旅程...' : 'Generating Journey...'}</span>
                ) : (
                  <>
                    <span>{dict.onboarding.submitBtn}</span>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: YOUR FIRST YOJQI JOURNEY (Generated Result) */}
        {step === 4 && (
          <div className="space-y-6 animate-in zoom-in-95 duration-300">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yojqi-sand text-yojqi-bronze text-xs font-mono uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{dict.onboarding.starterTitle}</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-yojqi-inkHeading">
                {isZh ? '今夕静心修持之旅 (Tonight’s Quiet Journey)' : 'Tonight’s Quiet Journey'}
              </h3>
              <p className="text-xs sm:text-sm text-yojqi-body">
                {dict.onboarding.starterDesc}
              </p>
            </div>

            {/* Personalized Guidance Cards */}
            <div className="space-y-3">
              {/* 1. Personalized Suggestion */}
              <div className="p-4 rounded-2xl bg-white border border-yojqi-border flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-800 shrink-0">
                  <Wind className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-yojqi-bronze font-semibold">
                    {isZh ? '身心指引' : 'Guidance'}
                  </h4>
                  <p className="text-xs text-yojqi-body mt-0.5 leading-relaxed">
                    {isZh
                      ? `你提到了“${selectedNeed || '更好的睡眠'}”，今晚不必强求即刻入睡，先给肩颈留出 5 分钟的微温舒缓。`
                      : `You arrived looking for "${selectedNeed || 'better sleep'}". Tonight, don't force immediate sleep. Give yourself 5 unhurried minutes first.`}
                  </p>
                </div>
              </div>

              {/* 2. Suggested Ritual */}
              <div className="p-4 rounded-2xl bg-white border border-yojqi-border flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-800 shrink-0">
                  <Moon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-yojqi-bronze font-semibold">
                    {isZh ? '推荐仪式' : 'Tonight’s Ritual'}
                  </h4>
                  <p className="text-sm font-medium text-yojqi-ink">
                    {isZh ? '十分钟晚间收束仪式 (10-Minute Evening Reset)' : '10-Minute Evening Reset'}
                  </p>
                  <p className="text-xs text-yojqi-body mt-0.5">
                    {isZh ? '熄灭蓝光干扰，借由 4-7-8 呼吸节律平复心跳。' : 'Disengage from digital luminescence and settle breathing pacing.'}
                  </p>
                </div>
              </div>

              {/* 3. Optional Companion & Community Care */}
              <div className="p-4 rounded-2xl bg-[#fff8f0] border border-amber-900/10 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-amber-900 shrink-0">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-amber-800 font-semibold">
                    {isZh ? '专属陪伴者已就位' : 'Companion Standing By'}
                  </h4>
                  <p className="text-xs text-yojqi-body mt-0.5">
                    {isZh
                      ? '无论心头有何纷扰，YOJQI 陪伴者随时在此倾听，不带评价，没有说教。'
                      : 'Whatever is on your mind, YOJQI Companion is here to listen quietly without judgment.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleFinish}
                className="w-full py-3.5 rounded-xl yojqi-btn-primary text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <span>{dict.onboarding.enterToday}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
