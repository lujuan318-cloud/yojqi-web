'use client';

import React, { useState } from 'react';
import { X, Heart, Sparkles, Send, Coffee, Flame, BookOpen, Gift, Check } from 'lucide-react';
import { Language, getDictionary } from '@/lib/i18n';
import { sendCareToPost } from '@/lib/journey-store';

interface CareModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId?: string;
  recipientName?: string;
  lang: Language;
  onCareSent?: () => void;
}

export function CareModal({
  isOpen,
  onClose,
  postId,
  recipientName = 'A fellow traveler',
  lang,
  onCareSent
}: CareModalProps) {
  const dict = getDictionary(lang);
  const isZh = lang === 'zh';

  const [careType, setCareType] = useState<'note' | 'ritual' | 'tea' | 'incense' | 'gift'>('tea');
  const [selectedMessage, setSelectedMessage] = useState<string>(
    isZh ? '今夜愿你安然入梦，无忧无扰。' : 'Sleep well tonight. Let the day gently close.'
  );
  const [customSender, setCustomSender] = useState<string>('');
  const [sentSuccess, setSentSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const careOptions = [
    {
      id: 'tea',
      icon: Coffee,
      title: isZh ? '温热山茶' : 'Send Tea',
      desc: isZh ? '为对方奉上一盏温润大麦茯苓茶' : 'A warm roasted barley & poria infusion'
    },
    {
      id: 'incense',
      icon: Flame,
      title: isZh ? '安神线香' : 'Send Incense',
      desc: isZh ? '点燃一缕幽微沉香，静心定神' : 'A slender strand of calming agarwood'
    },
    {
      id: 'ritual',
      icon: Sparkles,
      title: isZh ? '身心仪式' : 'Send Ritual',
      desc: isZh ? '分享 4-7-8 呼吸减压与放松指引' : '4-7-8 somatic breath pacing guide'
    },
    {
      id: 'note',
      icon: BookOpen,
      title: isZh ? '手书手札' : 'Send a Note',
      desc: isZh ? '写下一句温润的关照与懂得' : 'A thoughtful, handwritten affirmation'
    },
    {
      id: 'gift',
      icon: Gift,
      title: isZh ? '心意礼盒' : 'Send a Gift',
      desc: isZh ? '寄送草木香丸脉搏手绳体验礼遇' : 'Ambergris pulse wrist anchor gift package'
    }
  ];

  const presetMessages = isZh
    ? [
        '今夜愿你安然入梦，无忧无扰。',
        '慢慢深呼吸，你不需要在今夜解决所有问题。',
        '生活可以慢半拍，你值得好好歇一歇。',
        '虽然素未谋面，但我在此处为你留一份温存。',
        '天色已晚，放下手机，放空脑海吧。'
      ]
    : [
        'Sleep well tonight. Let the day gently close.',
        'Take a slow breath. You don’t have to solve everything tonight.',
        'Slow down. You deserve genuine, unhurried rest.',
        'Thinking of you from afar. You are heard and valued.',
        'Drop your shoulders by an inch. You are safe here.'
      ];

  const handleSend = () => {
    if (postId) {
      sendCareToPost(
        postId,
        careType,
        selectedMessage,
        customSender.trim() || (isZh ? '夜行同修者' : 'A caring traveler')
      );
    }
    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      onClose();
      if (onCareSent) onCareSent();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-yojqi-ivory rounded-3xl border border-yojqi-border shadow-2xl overflow-hidden text-yojqi-ink p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-yojqi-body hover:text-yojqi-ink hover:bg-neutral-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {sentSuccess ? (
          <div className="py-12 text-center space-y-4 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-medium text-yojqi-ink">
              {isZh ? '温暖已送达' : 'Care Delivered'}
            </h3>
            <p className="text-sm text-yojqi-body max-w-sm mx-auto">
              {isZh
                ? '你的心意已如同黑夜中的一盏微光，陪伴着同修者。'
                : 'Your gesture of human warmth has been gently delivered to their sanctuary.'}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yojqi-sand text-yojqi-bronze text-xs font-mono uppercase tracking-widest mb-2">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/20" />
                <span>{isZh ? '传递温暖与关照' : 'SEND A LITTLE CARE'}</span>
              </div>
              <h3 className="font-serif text-2xl font-medium text-yojqi-inkHeading">
                {isZh ? `给「${recipientName}」寄出一缕心意` : `Send Care to ${recipientName}`}
              </h3>
              <p className="text-xs text-yojqi-body mt-1">
                {isZh
                  ? '非商业推销，仅是人与人之间最纯粹的理解与安抚。'
                  : 'People helping people feel a little better.'}
              </p>
            </div>

            {/* 1. Care Object Selector */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-yojqi-body block">
                {isZh ? '1. 选择寄送的心意载体' : '1. Choose Care Form'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {careOptions.map((opt) => {
                  const Icon = opt.icon;
                  const active = careType === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setCareType(opt.id as any)}
                      className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                        active
                          ? 'border-yojqi-bronze bg-yojqi-lift text-yojqi-ink shadow-sm'
                          : 'border-yojqi-border bg-white text-yojqi-body hover:border-neutral-400'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-yojqi-sand flex items-center justify-center text-yojqi-bronze mb-2">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold">{opt.title}</div>
                        <div className="text-[10px] text-yojqi-body line-clamp-1 mt-0.5">{opt.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Choose Thoughtful Message */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-yojqi-body block">
                {isZh ? '2. 挑选你想对 Ta 说的话' : '2. Select a Mindful Note'}
              </label>
              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {presetMessages.map((msg) => (
                  <button
                    key={msg}
                    type="button"
                    onClick={() => setSelectedMessage(msg)}
                    className={`w-full text-left p-2.5 rounded-lg border text-xs transition-colors flex items-center justify-between ${
                      selectedMessage === msg
                        ? 'border-yojqi-bronze bg-amber-50 text-yojqi-ink font-medium'
                        : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300'
                    }`}
                  >
                    <span className="line-clamp-1">{msg}</span>
                    {selectedMessage === msg && <Check className="w-3.5 h-3.5 text-yojqi-bronze shrink-0 ml-2" />}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Sender Alias */}
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-neutral-400">
                {isZh ? '你的匿名落款 (可选)' : 'Your Anonymous Alias (Optional)'}
              </label>
              <input
                type="text"
                value={customSender}
                onChange={(e) => setCustomSender(e.target.value)}
                placeholder={isZh ? '例：山城江风 / 夜读者' : 'e.g. A wanderer in Kyoto'}
                className="w-full px-3 py-2 text-xs rounded-xl border border-yojqi-border bg-white text-yojqi-ink focus:outline-none focus:border-yojqi-bronze"
              />
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleSend}
                className="w-full py-3.5 rounded-xl yojqi-btn-primary text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{isZh ? '送出一缕温存' : 'SEND CARE'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
