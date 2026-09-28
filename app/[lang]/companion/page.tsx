'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Sparkles,
  Bot,
  Send,
  Trash2,
  Wind,
  Coffee,
  Moon,
  Compass,
  ArrowRight,
  ShieldCheck,
  Headphones
} from 'lucide-react';
import { Language, getDictionary } from '@/lib/i18n';
import { askCompanion, CompanionMode } from '@/lib/companion-service';
import { CompanionMessage } from '@/lib/journey-data';

export default function CompanionPage() {
  const params = useParams();
  const lang = (params.lang as Language) || 'en';
  const dict = getDictionary(lang);
  const isZh = lang === 'zh';

  const [activeMode, setActiveMode] = useState<CompanionMode>('talk');
  const [inputPrompt, setInputPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial welcome message from YOJQI Companion
  const [messages, setMessages] = useState<CompanionMessage[]>([
    {
      id: 'init-1',
      sender: 'companion',
      text: isZh
        ? '晚安。我是 YOJQI 陪伴者。这里是一片安静的留白空间。今夜你无需急于解决难题或达成任何指标。你想随心聊聊，还是做一次呼吸放松？'
        : 'Good evening. I am your YOJQI Companion. In this quiet sanctuary, you are not required to solve anything or meet any targets. Would you like to talk quietly, or take a gentle moment to breathe and reset?',
      mode: 'talk',
      suggestedActions: [
        { id: 'act-listen', labelEn: 'Just listen to me', labelZh: '只是听我说说', action: 'mode:talk' },
        { id: 'act-reset', labelEn: 'Guide a slow breath', labelZh: '带我做一次慢呼吸', action: 'mode:reset' },
        { id: 'act-ritual', labelEn: 'Tonight’s ritual', labelZh: '今夕安眠仪式', action: 'mode:ritual' },
      ],
      timestamp: 'Just now'
    }
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (customText?: string, modeOverride?: CompanionMode) => {
    const textToSend = customText || inputPrompt;
    if (!textToSend.trim()) return;

    const userMsg: CompanionMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsTyping(true);

    const mode = modeOverride || activeMode;

    try {
      const resp = await askCompanion(messages, textToSend, {
        lang,
        mode
      });

      const companionMsg: CompanionMessage = {
        id: `comp-${Date.now()}`,
        sender: 'companion',
        text: resp.message,
        mode: resp.mode,
        suggestedActions: resp.suggestedActions,
        timestamp: 'Just now'
      };

      setMessages((prev) => [...prev, companionMsg]);
    } catch (e) {
      console.error('Companion response error', e);
    } finally {
      setIsTyping(false);
    }
  };

  const handleActionClick = (action: string) => {
    if (action.startsWith('mode:')) {
      const newMode = action.replace('mode:', '') as CompanionMode;
      setActiveMode(newMode);
      handleSendMessage(
        isZh
          ? newMode === 'reset' ? '请带我做一次慢呼吸放松。' : newMode === 'ritual' ? '请为我推荐一个今晚的入睡仪式。' : '我想随便说说。'
          : newMode === 'reset' ? 'Please guide a slow breath reset.' : newMode === 'ritual' ? 'Suggest an evening sleep ritual.' : 'I just want to talk.',
        newMode
      );
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'init-cleared',
        sender: 'companion',
        text: isZh ? '对话已轻柔清空。新的一刻，我依然在此静候。' : 'Conversation memory cleared softly. A new quiet moment begins.',
        timestamp: 'Just now'
      }
    ]);
  };

  const modesConfig: { id: CompanionMode; label: string; icon: any }[] = [
    { id: 'talk', label: dict.companionPage.modeTalk, icon: Bot },
    { id: 'reset', label: dict.companionPage.modeReset, icon: Wind },
    { id: 'ritual', label: dict.companionPage.modeRitual, icon: Moon },
    { id: 'reflect', label: dict.companionPage.modeReflect, icon: Sparkles },
    { id: 'explore', label: dict.companionPage.modeExplore, icon: Compass },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col h-[calc(100vh-8rem)] min-h-[640px]">
      {/* Top Header & Mode Selectors */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-yojqi-border gap-3 shrink-0">
        <div>
          <div className="inline-flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="font-serif text-2xl font-medium text-yojqi-inkHeading">
              {dict.companionPage.name}
            </h1>
          </div>
          <p className="text-xs text-yojqi-body mt-0.5">
            {dict.companionPage.tagline}
          </p>
        </div>

        {/* Clear Memory Trigger */}
        <button
          onClick={clearChat}
          className="text-xs text-neutral-400 hover:text-neutral-600 flex items-center gap-1.5 self-start sm:self-auto"
          title="Clear Conversation"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>{dict.companionPage.clearHistory}</span>
        </button>
      </div>

      {/* Modes Navigation Tabs */}
      <div className="flex items-center gap-2 py-3 overflow-x-auto no-scrollbar shrink-0">
        {modesConfig.map((m) => {
          const Icon = m.icon;
          const active = activeMode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setActiveMode(m.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap transition-colors ${
                active
                  ? 'bg-yojqi-ink text-[#fffdfa]'
                  : 'bg-yojqi-sand text-yojqi-body hover:bg-neutral-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{m.label}</span>
            </button>
          );
        })}
      </div>

      {/* Message History Container (Calm Conversation Space, Not Chatbot Bubbles) */}
      <div className="flex-1 overflow-y-auto py-6 space-y-6 pr-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.sender === 'user' ? 'items-end' : 'items-start'
            } space-y-1.5 animate-in fade-in`}
          >
            <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-400">
              <span>{msg.sender === 'user' ? (isZh ? '你' : 'You') : 'YOJQI Companion'}</span>
              <span>·</span>
              <span>{msg.timestamp}</span>
            </div>

            <div
              className={`p-5 rounded-3xl max-w-2xl text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-yojqi-ink text-white rounded-br-none shadow-sm'
                  : 'bg-white border border-yojqi-border text-yojqi-ink rounded-bl-none shadow-card font-serif'
              }`}
            >
              <p className="whitespace-pre-line text-sm sm:text-base leading-relaxed">
                {msg.text}
              </p>

              {/* Action Buttons Rendered Below Companion Reply */}
              {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                <div className="pt-4 mt-3 border-t border-neutral-100 flex flex-wrap gap-2">
                  {msg.suggestedActions.map((act) => (
                    <button
                      key={act.id}
                      onClick={() => handleActionClick(act.action)}
                      className="px-3.5 py-1.5 rounded-full bg-yojqi-sand hover:bg-yojqi-lift border border-amber-900/10 text-xs font-mono text-yojqi-bronze transition-colors flex items-center gap-1.5"
                    >
                      <span>{isZh ? act.labelZh : act.labelEn}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-neutral-400 italic font-serif">
            <span className="w-2 h-2 rounded-full bg-amber-600 animate-ping" />
            <span>{isZh ? '陪伴者正在静心聆听与思量...' : 'Companion is listening quietly...'}</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box Area */}
      <div className="pt-3 border-t border-yojqi-border shrink-0 space-y-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder={dict.companionPage.placeholder}
            className="flex-1 px-4 py-3.5 rounded-2xl border border-yojqi-border bg-white text-sm text-yojqi-ink placeholder:text-neutral-400 focus:outline-none focus:border-yojqi-bronze focus:ring-1 focus:ring-yojqi-bronze transition-all"
          />
          <button
            type="submit"
            disabled={!inputPrompt.trim() || isTyping}
            className="px-6 py-3.5 rounded-2xl yojqi-btn-primary text-xs font-mono uppercase tracking-widest flex items-center gap-2 disabled:opacity-40 shrink-0"
          >
            <span>{dict.companionPage.send}</span>
            <Send className="w-4 h-4" />
          </button>
        </form>

        <p className="text-[11px] text-neutral-400 text-center">
          {dict.companionPage.disclaimer}
        </p>
      </div>
    </div>
  );
}
