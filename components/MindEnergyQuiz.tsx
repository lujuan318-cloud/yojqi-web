'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ArrowRight, RotateCcw, Check, ShoppingBag, Shield, Heart } from 'lucide-react';
import { Language } from '@/lib/i18n';
import { PRODUCTS, getProductBySlug } from '@/lib/products-data';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';

interface MindEnergyQuizProps {
  lang: Language;
}

export function MindEnergyQuiz({ lang }: MindEnergyQuizProps) {
  const isZh = lang === 'zh';
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();

  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<{
    state?: string;
    environment?: string;
    intention?: string;
  }>({});
  const [addedAll, setAddedAll] = useState(false);

  const QUESTIONS = [
    {
      step: 1,
      titleZh: "您当下最强烈的身心感受是什么？",
      titleEn: "What is your primary bodily or mental state right now?",
      options: [
        { id: 'anxiety', labelZh: '焦虑内耗 · 情绪波动大 · 神经紧绷', labelEn: 'Anxiety & High Nervous System Tension', score: 'balance' },
        { id: 'insomnia', labelZh: '夜间入睡难 · 多梦易醒 · 屏幕蓝光躁动', labelEn: 'Restless Sleep & Screen Overstimulation', score: 'sleep' },
        { id: 'fog', labelZh: '脑雾昏沉 · 专注力涣散 · 效率低下', labelEn: 'Brain Fog, Distraction & Cognitive Fatigue', score: 'focus' },
        { id: 'clash', labelZh: '运势阻滞 · 职场小人是非 · 冲克不顺', labelEn: 'Stagnant Luck, Workplace Gossip or Zodiac Clash', score: 'protection' },
      ],
    },
    {
      step: 2,
      titleZh: "您最常处于以下哪种日常场景？",
      titleEn: "Which environment dominates your daily routine?",
      options: [
        { id: 'desk', labelZh: '长时间高强度伏案创作与屏幕办公', labelEn: 'Intense Screen & Desk Work' },
        { id: 'social', labelZh: '密集社交应酬 · 频繁穿梭嘈杂通勤', labelEn: 'Crowded Transit & Draining Social Encounters' },
        { id: 'bed', labelZh: '睡前思绪狂奔 · 难以切换至休息模式', labelEn: 'Bedtime Overdrive & Difficulty Unwinding' },
        { id: 'transition', labelZh: '处于重大事业抉择或本命年过渡期', labelEn: 'Major Career Transition or Zodiac Clash Year' },
      ],
    },
    {
      step: 3,
      titleZh: "您最渴望借助 YOJQI 获得的转变是？",
      titleEn: "What is your desired sensory and energetic shift?",
      options: [
        { id: 'ground', labelZh: '随时触手可及的指尖体温心锚，迅速平复心慌', labelEn: 'Tactile physical anchor for instant autonomic calm' },
        { id: 'rest', labelZh: '草木自然沉香环抱，获得无梦深层深睡', labelEn: 'Deep restorative sleep with natural agarwood' },
        { id: 'clarity', labelZh: '清冽冷杉龙脑微循环，保持全天清醒洞察', labelEn: 'Sharp cognitive stamina without caffeine jitters' },
        { id: 'shield', labelZh: '正统道家朱砂法印加持，辟邪化煞转运', labelEn: 'Consecrated Daoist vermilion energy boundary' },
      ],
    },
  ];

  const handleSelectOption = (optionId: string, score?: string) => {
    if (step === 1) {
      setAnswers({ ...answers, state: score || optionId });
      setStep(2);
    } else if (step === 2) {
      setAnswers({ ...answers, environment: optionId });
      setStep(3);
    } else if (step === 3) {
      setAnswers({ ...answers, intention: optionId });
      setStep(4);
    }
  };

  const resetQuiz = () => {
    setStep(1);
    setAnswers({});
    setAddedAll(false);
  };

  // Determine Prescription Recommendation based on answers
  const getPrescription = () => {
    const primaryState = answers.state || 'balance';

    if (primaryState === 'sleep') {
      return {
        typeZh: '【夜眠归根 · 水火既济型】',
        typeEn: 'Nocturnal Deep Sleep Regimen',
        diagnosisZh: '心神浮越、脑干受屏幕蓝光持续刺激，交感神经过度兴奋，导致睡眠浅、易多梦惊醒。',
        diagnosisEn: 'Overstimulated sympathetic nervous system from screen exposure leading to restless delta-brainwave transitions.',
        primaryProdSlug: 'wrist-anchor-ruihe-sanctuary-bracelet',
        talismanSlug: 'the-celestial-health-guard-talisman',
        bundleSaving: 15,
      };
    } else if (primaryState === 'focus') {
      return {
        typeZh: '【清明破雾 · 动能心流型】',
        typeEn: 'Cognitive Clarity & Flow Regimen',
        diagnosisZh: '长时间多任务切换消耗大脑葡萄糖与多巴胺，出现决策疲劳、视线模糊与注意力涣散。',
        diagnosisEn: 'Digital sensory fatigue and dopamine exhaustion creating cognitive brain fog and habitual distraction.',
        primaryProdSlug: 'wrist-anchor-kinetic-energy-bracelet',
        talismanSlug: 'the-scholastic-achievement-talisman-exam-success',
        bundleSaving: 15,
      };
    } else if (primaryState === 'protection') {
      return {
        typeZh: '【正阳御气 · 辟凶趋吉型】',
        typeEn: 'Daoist Auric Protection & Breakthrough',
        diagnosisZh: '近期外在磁场扰动较大，易受人际口舌内耗与流年冲克影响，需引纯阳朱砂法力筑起护界。',
        diagnosisEn: 'Erratic ambient energetic friction and astrological transits requiring authentic cinnabar solar yang grounding.',
        primaryProdSlug: 'wrist-anchor-ambergris-ease-bracelet',
        talismanSlug: 'the-tai-sui-protection-talisman-grand-duke-jupiter',
        bundleSaving: 15,
      };
    } else {
      return {
        typeZh: '【神魂安顿 · 龙涎定心型】',
        typeEn: 'Vagus Nerve Somatic Grounding Regimen',
        diagnosisZh: '迷走神经紧绷，情绪感受器易因外界噪音出现微恐慌，急需通过脉搏温热触觉建立实体心锚。',
        diagnosisEn: 'Hyper-vigilant vagus nerve response needing tactile somatic anchor and warm ambergris aromatic pacing.',
        primaryProdSlug: 'wrist-anchor-ambergris-ease-bracelet',
        talismanSlug: 'the-hundred-solutions-karmic-cleansing-talisman',
        bundleSaving: 15,
      };
    }
  };

  const prescription = getPrescription();
  const prod1 = getProductBySlug(prescription.primaryProdSlug) || PRODUCTS[0];
  const prod2 = getProductBySlug(prescription.talismanSlug) || PRODUCTS[4];

  const handleAddBundle = () => {
    addToCart(prod1, 1);
    addToCart(prod2, 1);
    setAddedAll(true);
    setTimeout(() => setAddedAll(false), 2500);
  };

  return (
    <div className="bg-[#fffdfa] border border-yojqi-border rounded-3xl p-6 sm:p-10 shadow-sm my-12">
      {/* Quiz Progress & Header */}
      <div className="flex items-center justify-between border-b border-yojqi-border pb-4 mb-6">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-yojqi-bronze uppercase">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>{isZh ? '30秒身心状态与能量自测' : '30-Sec Mind & Energy Diagnostic'}</span>
        </div>
        <div className="text-xs font-mono text-neutral-400">
          {step <= 3 ? (isZh ? `步骤 0${step} / 03` : `Step 0${step} of 03`) : (isZh ? '定制配方报告' : 'Your Prescription')}
        </div>
      </div>

      {step <= 3 ? (
        <div className="space-y-6 animate-in fade-in">
          <div className="max-w-2xl space-y-1.5">
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-yojqi-inkHeading">
              {isZh ? QUESTIONS[step - 1].titleZh : QUESTIONS[step - 1].titleEn}
            </h3>
            <p className="text-xs sm:text-sm text-yojqi-body">
              {isZh ? '请凭第一直觉选择最贴近您当下现状的选项。' : 'Select the option that instinctively matches your current condition.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {QUESTIONS[step - 1].options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt.id, (opt as any).score)}
                className="text-left p-5 rounded-2xl bg-white border border-yojqi-border hover:border-yojqi-bronze hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <span className="font-serif text-sm sm:text-base font-medium text-yojqi-ink group-hover:text-yojqi-bronze transition-colors">
                  {isZh ? opt.labelZh : opt.labelEn}
                </span>
                <span className="mt-4 text-xs font-mono text-yojqi-bronze flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>{isZh ? '选择' : 'Select'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Result: Customized Prescription Card */
        <div className="space-y-8 animate-in fade-in">
          <div className="bg-[#fcfaf7] border border-amber-300/70 rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200/60 pb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-amber-800 font-semibold">
                  {isZh ? '身心与能量诊断结果' : 'Diagnostic Assessment'}
                </span>
                <h3 className="font-serif text-2xl font-bold text-yojqi-ink mt-0.5">
                  {isZh ? prescription.typeZh : prescription.typeEn}
                </h3>
              </div>
              <button
                onClick={resetQuiz}
                className="text-xs font-mono text-yojqi-body hover:text-yojqi-ink flex items-center gap-1 self-start sm:self-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{isZh ? '重新测评' : 'Retake Quiz'}</span>
              </button>
            </div>

            <p className="text-sm text-yojqi-body leading-relaxed">
              {isZh ? prescription.diagnosisZh : prescription.diagnosisEn}
            </p>
          </div>

          {/* Recommended Ritual Pair */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold text-yojqi-ink flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yojqi-bronze" />
              <span>{isZh ? '专属配方推荐 · 随身草木锚点 + 道门朱砂护符' : 'Recommended Synchronized Somatic Pair'}</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Product 1 */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-yojqi-border shadow-xs">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-yojqi-sand shrink-0 border border-yojqi-border">
                  <Image
                    src={prod1.heroImage}
                    alt={isZh ? prod1.nameZh : prod1.nameEn}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-mono text-amber-800 uppercase block">
                    {isZh ? '草木触觉锚点' : 'Somatic Scent Anchor'}
                  </span>
                  <h5 className="font-serif text-sm font-semibold text-yojqi-ink truncate">
                    {isZh ? prod1.nameZh : prod1.nameEn}
                  </h5>
                  <span className="text-xs font-mono font-bold text-yojqi-bronze">
                    {formatPrice(prod1.price)}
                  </span>
                </div>
              </div>

              {/* Product 2 */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-yojqi-border shadow-xs">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-yojqi-sand shrink-0 border border-yojqi-border">
                  <Image
                    src={prod2.heroImage}
                    alt={isZh ? prod2.nameZh : prod2.nameEn}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-mono text-amber-800 uppercase block">
                    {isZh ? '正统开光朱砂符' : 'Consecrated Daoist Talisman'}
                  </span>
                  <h5 className="font-serif text-sm font-semibold text-yojqi-ink truncate">
                    {isZh ? prod2.nameZh : prod2.nameEn}
                  </h5>
                  <span className="text-xs font-mono font-bold text-yojqi-bronze">
                    {formatPrice(prod2.price)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 1-Click Bundle Add to Bag */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 bg-amber-50/70 p-5 rounded-2xl border border-amber-200">
            <div>
              <span className="text-xs font-mono text-amber-900 font-semibold block">
                {isZh ? '套组同频结缘价' : 'Synchronized Pair Bundle Price'}
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="font-serif text-xl font-bold text-yojqi-ink">
                  {formatPrice(prod1.price + prod2.price)}
                </span>
                <span className="text-xs text-neutral-400 line-through">
                  {formatPrice(prod1.originalPrice + prod2.originalPrice)}
                </span>
              </div>
            </div>

            <button
              onClick={handleAddBundle}
              className={`w-full sm:w-auto px-7 py-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all ${
                addedAll ? 'bg-emerald-800 text-white' : 'yojqi-btn-primary'
              }`}
            >
              {addedAll ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>{isZh ? '已将整套配方加入购物袋！' : 'Prescription Bundle Added!'}</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isZh ? '一键成对迎请 (加入购物袋)' : 'Add Ritual Pair to Bag'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
