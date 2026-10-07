'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, MessageCircle, RefreshCw } from 'lucide-react';
import { Language } from '@/lib/i18n';

interface AIConciergeWidgetProps {
  lang: Language;
}

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

export function AIConciergeWidget({ lang }: AIConciergeWidgetProps) {
  const isZh = lang === 'zh';
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const initialGreeting = isZh
    ? '您好，贵宾！我是白虹·两江汇全江景高空民宿的宿务管家。关于房型视野、无人机天幕观礼、工夫茶礼遇或重庆山城交通，请随时垂询。'
    : 'Greetings! I am your resident VIP Concierge for Baihong River View Retreat in Chongqing. Feel free to ask about riverfront views, drone light shows, tea rituals, or local itinerary recommendations.';

  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: initialGreeting },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickChips = isZh
    ? [
        '阳台房看洪崖洞和两江汇流夜景如何？',
        '无人机灯光秀通常在什么时间上演？',
        '房间内配备工夫茶席和茶叶吗？',
        '可以提前免费寄存行李吗？',
      ]
    : [
        'How clear is the river view from the balcony?',
        'When do the weekend drone light shows start?',
        'Are tea stations and spring water included?',
        'Can I drop off luggage before check-in?',
      ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMessage: Message = { role: 'user', content: query };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/retreats/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: nextMessages.slice(-6),
          lang,
        }),
      });

      const data = await res.json();
      if (data.success && data.reply) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        throw new Error(data.error || 'Failed to get answer');
      }
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: isZh
            ? '管家服务系统正忙，您也可以直接在页面中点击“微信管家预约”与我们真人管家一对一取得联系。'
            : 'Concierge is currently offline. Please reach out to our host team via WhatsApp/WeChat.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative px-4 py-3 bg-neutral-900 hover:bg-black text-[#fffdfa] rounded-full shadow-2xl border border-amber-400/40 flex items-center gap-2.5 transition-all hover:scale-105 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-400/50">
            <Bot className="w-4 h-4 text-amber-300" />
          </div>
          <div className="text-left">
            <span className="block text-xs font-serif font-bold text-amber-200">
              {isZh ? 'AI 宿务管家' : 'AI Concierge'}
            </span>
            <span className="block text-[10px] text-neutral-400 font-mono">
              {isZh ? '在线解答房务与观礼' : 'Ask Anything'}
            </span>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping absolute top-1 right-1" />
        </button>
      </div>

      {/* Slide-out / Modal Dialog */}
      {isOpen && (
        <div className="fixed bottom-22 right-4 sm:right-6 z-50 w-[92vw] sm:w-[400px] h-[550px] max-h-[80vh] bg-[#fffdfa] border border-amber-300/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-neutral-900 text-white p-3.5 sm:p-4 flex items-center justify-between border-b border-amber-500/30">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-amber-600/30 border border-amber-400 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-amber-300" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold text-amber-200">
                  {isZh ? '白虹·宿务东方智能管家' : 'Baihong VIP Concierge'}
                </h4>
                <p className="text-[10px] text-neutral-400 font-mono">
                  {isZh ? '基于 OpenAI 与宿务知识库' : 'Powered by OpenAI Concierge'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3 bg-[#fdfbf7]">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-xs ${
                    m.role === 'user'
                      ? 'bg-amber-800 text-white rounded-br-xs'
                      : 'bg-white border border-amber-100 text-yojqi-ink rounded-bl-xs'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.content}</p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-amber-100 rounded-2xl px-3.5 py-2.5 text-xs text-neutral-500 flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 text-amber-600 animate-spin" />
                  <span>{isZh ? '管家正在为您组织解答...' : 'Concierge is replying...'}</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Query Chips */}
          <div className="p-2 bg-amber-50/50 border-t border-amber-200/50 flex gap-1.5 overflow-x-auto text-[11px] whitespace-nowrap">
            {quickChips.map((chip, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(chip)}
                className="px-2.5 py-1 bg-white hover:bg-amber-100/70 border border-amber-200 rounded-full text-amber-900 transition-colors shrink-0"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-2.5 bg-white border-t border-neutral-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isZh ? '输入您的问题（例如：离地铁多远？）...' : 'Ask concierge anything...'}
              className="flex-1 px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-yojqi-ink focus:outline-hidden focus:ring-1 focus:ring-amber-500"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl disabled:opacity-40 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
